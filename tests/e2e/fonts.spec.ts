import { test, expect, type Page } from "@playwright/test";

/** Holds every web-font response back so the page has to render in the fallback faces first, then swap. */
async function delayFonts(page: Page, ms: number) {
  await page.route("**/*.woff2", async (route) => {
    await new Promise((r) => setTimeout(r, ms));
    await route.continue();
  });
}

const watchLayoutShift = (page: Page) =>
  page.addInitScript(`window.__cls = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: 'layout-shift', buffered: true });`);
const cls = (page: Page) => page.evaluate(() => (window as unknown as { __cls: number }).__cls);

test.describe("web fonts swap in without moving the page", () => {
  test("registers metric-matched fallback faces for Fraunces (upright and italic) and Figtree", async ({ page }) => {
    await page.goto("/");
    const faces = await page.evaluate(() => [...document.fonts].map((f) => `${f.family}|${f.style}`));
    // document.fonts reports family names without quotes
    expect(faces).toEqual(expect.arrayContaining(["Fraunces Fallback|normal", "Fraunces Fallback|italic", "Fraunces Text Fallback|normal", "Figtree Fallback|normal"]));
    expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toMatch(/^"Figtree Variable", "Figtree Fallback"/);
    await page.goto("/timeline/");
    expect(await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(/^"Fraunces Variable", "Fraunces Fallback"/);
    expect(await page.locator(".card__lines").first().evaluate((el) => getComputedStyle(el).fontFamily), "small optical sizes use the text fallback").toMatch(/^"Fraunces Variable", "Fraunces Text Fallback"/);
  });

  test("the cookbook page (italic title, 0.078 CLS before the fallbacks) does not shift when the fonts arrive late", async ({ page }) => {
    await delayFonts(page, 1500);
    await watchLayoutShift(page);
    await page.goto("/cook_book/bechamel-pasta/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.fonts.status === "loading");
    expect(await cls(page), "the page really is in the fallback state at this point").toBeLessThan(0.01);
    await page.waitForFunction(() => document.fonts.status === "loaded", null, { timeout: 15_000 });
    await page.waitForTimeout(500);
    expect(await cls(page)).toBeLessThan(0.01);
  });

  for (const path of ["/", "/products/", "/recipes/", "/timeline/", "/about-us/", "/products/chicken-masala/"]) {
    test(`${path} stays under 0.06 CLS when the fonts arrive late`, async ({ page }) => {
      await delayFonts(page, 1500);
      await watchLayoutShift(page);
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.fonts.status === "loaded", null, { timeout: 15_000 });
      await page.waitForTimeout(800);
      // Display headings re-centre by a few px when the real glyph widths land, so some residual shift is inherent.
      expect(await cls(page)).toBeLessThan(0.06);
    });
  }
});
