import fs from "node:fs";
import { test, expect, chromium, webkit, devices, type Browser, type BrowserContextOptions, type Page } from "@playwright/test";

const BASE = "http://127.0.0.1:4341";
const touch = devices["Pixel 7"];
const desktop: BrowserContextOptions = { viewport: { width: 1440, height: 900 } };

async function openMenuOnScrolledPage(page: Page) {
  await page.goto("/products/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);
  await page.locator("[data-menu-toggle]").first().click();
  await page.waitForTimeout(1200);
}

test.describe("the open menu holds the page still", () => {
  const cases: [string, BrowserContextOptions, boolean, string][] = [
    ["touch, motion allowed", touch, false, "clip"],
    ["touch, reduced motion (iOS Reduce Motion)", touch, true, "clip"],
    ["desktop, motion allowed (Lenis stopped)", desktop, false, "clip"],
    ["desktop, reduced motion", desktop, true, "visible"],
  ];
  for (const [name, opts, reduced, overflow] of cases) {
    test(name, async ({ browser }, info) => {
      test.skip(info.project.name !== "desktop", "each case builds its own context, so run it once");
      const ctx = await browser.newContext({ ...opts, baseURL: BASE, reducedMotion: reduced ? "reduce" : "no-preference" });
      const page = await ctx.newPage();
      await openMenuOnScrolledPage(page);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe(overflow);
      const before = await page.evaluate(() => scrollY);
      expect(before).toBeGreaterThan(500);
      if (opts === touch) {
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Input.synthesizeScrollGesture", { x: 200, y: 600, yDistance: -500, speed: 1500, gestureSourceType: "touch" });
      } else {
        await page.mouse.move(700, 450);
        await page.mouse.wheel(0, 500);
      }
      await page.waitForTimeout(800);
      expect(await page.evaluate(() => scrollY), "page behind the menu must not scroll").toBe(before);

      // closing the menu gives scrolling back
      await page.keyboard.press("Escape");
      await page.waitForTimeout(900);
      await page.evaluate(() => window.scrollTo(0, 1200));
      expect(await page.evaluate(() => scrollY)).toBeGreaterThan(before);
      await ctx.close();
    });
  }

  test("also in the WebKit engine (what iOS Safari runs), where installed", async ({}, info) => {
    test.skip(info.project.name !== "desktop", "once");
    test.skip(!fs.existsSync(webkit.executablePath()), "run `pnpm exec playwright install webkit` to include this");
    const browser: Browser = await webkit.launch();
    try {
      for (const reduced of [false, true]) {
        // hasTouch makes (pointer: coarse) match, as on a phone; mobile WebKit contexts do not support wheel input
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, baseURL: BASE, reducedMotion: reduced ? "reduce" : "no-preference" });
        const page = await ctx.newPage();
        await openMenuOnScrolledPage(page);
        const before = await page.evaluate(() => scrollY);
        await page.mouse.move(200, 400);
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(800);
        expect(await page.evaluate(() => scrollY), `reduced=${reduced}`).toBe(before);
        await ctx.close();
      }
    } finally {
      await browser.close();
    }
  });
});

test.describe("ScrollTrigger ignores URL-bar-sized resizes on touch only", () => {
  // Every refresh measures every trigger, so getBoundingClientRect calls after a resize tell us whether one ran.
  async function callsAfterResize(page: Page, size: { width: number; height: number }) {
    await page.evaluate(() => {
      const w = window as unknown as { __g: number };
      w.__g = 0;
      const original = Element.prototype.getBoundingClientRect;
      if (!(Element.prototype.getBoundingClientRect as { __counted?: boolean }).__counted) {
        const counted = function (this: Element) { w.__g++; return original.call(this); };
        (counted as unknown as { __counted: boolean }).__counted = true;
        Element.prototype.getBoundingClientRect = counted;
      }
      w.__g = 0;
    });
    await page.setViewportSize(size);
    await page.waitForTimeout(800);
    return page.evaluate(() => (window as unknown as { __g: number }).__g);
  }

  test("touch: a ~9% height change (URL bar) refreshes nothing; a 30% height change or any width change does", async ({ browser }, info) => {
    test.skip(info.project.name !== "desktop", "builds its own touch context");
    const ctx = await browser.newContext({ ...touch, baseURL: BASE });
    const page = await ctx.newPage();
    await page.goto("/products/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const { width, height } = touch.viewport;
    expect(await callsAfterResize(page, { width, height: Math.round(height * 0.91) }), "URL-bar-sized change").toBe(0);
    expect(await callsAfterResize(page, { width, height: Math.round(height * 0.61) }), "30% height change").toBeGreaterThan(0);
    expect(await callsAfterResize(page, { width: width + 100, height: Math.round(height * 0.61) }), "width change").toBeGreaterThan(0);
    await ctx.close();
  });

  test("desktop: any resize refreshes", async ({ browser }, info) => {
    test.skip(info.project.name !== "desktop", "builds its own desktop context");
    const ctx = await browser.newContext({ ...desktop, baseURL: BASE });
    const page = await ctx.newPage();
    await page.goto("/products/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    expect(await callsAfterResize(page, { width: 1440, height: 820 })).toBeGreaterThan(0);
    await ctx.close();
  });
});

test.describe("split headings stay accessible", () => {
  for (const path of ["/", "/products/", "/products/chicken-masala/", "/recipes/", "/timeline/", "/cook_book/bechamel-pasta/"]) {
    test(`${path}: one label per heading, every split piece hidden from assistive tech`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const headings = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-reveal]")].map((h) => ({
          tag: h.tagName.toLowerCase(),
          text: (h.textContent ?? "").replace(/\s+/g, " ").trim(),
          label: h.getAttribute("aria-label"),
          split: h.querySelectorAll(".char").length,
          exposed: [...h.querySelectorAll("*")].filter((k) => !k.closest("[aria-hidden=true]")).length,
        })),
      );
      expect(headings.length).toBeGreaterThan(0);
      for (const h of headings) {
        expect(h.split, `${h.text} should be split into characters`).toBeGreaterThan(0);
        expect(h.label, `${h.text}: aria-label carries the whole title`).toBe(h.text);
        expect(h.exposed, `${h.text}: split pieces must all be aria-hidden`).toBe(0);
      }
      const first = page.locator("[data-reveal]").first();
      const level = (await first.evaluate((el) => el.tagName)).slice(1);
      await expect(first).toMatchAriaSnapshot(`- heading "${headings[0]!.text}" [level=${level}]`);
    });
  }

  test("the open menu's links keep their names after their text is split", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator("[data-menu-toggle]").first().click();
    await page.waitForTimeout(1500);
    const labels = await page.locator("[data-menu-link] .menu__text").evaluateAll((els) => els.map((e) => (e.textContent ?? "").trim()));
    expect(labels.length).toBeGreaterThanOrEqual(4);
    for (const label of labels) await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label, exact: true })).toBeVisible();
  });
});
