import { test, expect, devices, type Page } from "@playwright/test";

/** Counts inline-style mutations on the hero packs (the marquee ticker is their only writer after load). */
async function watchHeroPacks(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __packMutations: number };
    w.__packMutations = 0;
    new MutationObserver((records) => {
      for (const r of records) if ((r.target as HTMLElement).classList.contains("hero__item")) w.__packMutations++;
    }).observe(document.querySelector(".hero__track")!, { attributes: true, attributeFilter: ["style"], subtree: true });
  });
}
const packMutations = (page: Page) => page.evaluate(() => (window as unknown as { __packMutations: number }).__packMutations);
const resetPackMutations = (page: Page) => page.evaluate(() => { (window as unknown as { __packMutations: number }).__packMutations = 0; });

test.describe("marquee ticker is demand-driven", () => {
  test("writes styles while the hero is moving, then goes quiet once settled and when off-screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-marquee].is-live")).toBeAttached();
    await page.waitForTimeout(3500); // initial spring settles
    await watchHeroPacks(page);

    // control: scrolling through the pinned hero must move the packs (so the observer is not blind)
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(600);
    expect(await packMutations(page), "packs should animate while scrolling through the hero").toBeGreaterThan(5);

    // settled while still on-screen: no per-frame writes
    await page.waitForTimeout(3500);
    await resetPackMutations(page);
    await page.waitForTimeout(1000);
    expect(await packMutations(page), "no style writes once the spring has settled").toBe(0);

    // off-screen: scroll fully past the hero, then watch for 1 s
    const past = await page.evaluate(() => {
      const h = document.querySelector<HTMLElement>("[data-marquee]")!;
      return h.offsetTop + h.offsetHeight + 300;
    });
    await page.evaluate((y) => window.scrollTo(0, y), past);
    await page.waitForTimeout(500);
    await resetPackMutations(page);
    await page.waitForTimeout(1000);
    expect(await packMutations(page), "no style writes while the hero is off-screen").toBe(0);

    // and it wakes up again when the hero returns
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(600);
    expect(await packMutations(page), "ticker resumes when the hero is back in view").toBeGreaterThan(0);
  });
});

test("split-text reveals leave no will-change layers behind once they have played", async ({ page }) => {
  await page.goto("/products/");
  await page.waitForTimeout(1500);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 700) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(3500); // let the last reveal finish
  const left = await page.evaluate(() => {
    const chars = [...document.querySelectorAll<HTMLElement>(".char")];
    return {
      chars: chars.length,
      charsWithWillChange: chars.filter((c) => getComputedStyle(c).willChange !== "auto").length,
      charsWithInlineTransform: chars.filter((c) => c.style.transform !== "").length,
      // the only intended compositor hint left on the page is the hero card's clip-path scrub
      otherWillChange: [...document.querySelectorAll("*")].filter((e) => getComputedStyle(e).willChange !== "auto" && !e.classList.contains("hero-card")).map((e) => e.tagName + "." + e.className).slice(0, 5),
    };
  });
  expect(left.chars, "split structure is kept (no layout shift)").toBeGreaterThan(0);
  expect(left.charsWithWillChange, "no character keeps will-change").toBe(0);
  expect(left.charsWithInlineTransform, "no character keeps an inline transform").toBe(0);
  expect(left.otherWillChange).toEqual([]);
});

test.describe("product tile hover shapes", () => {
  test("a touch device renders zero spice SVGs on /products/", async ({ browser }) => {
    const ctx = await browser.newContext({ ...devices["Pixel 7"] });
    const page = await ctx.newPage();
    await page.goto("/products/");
    await expect(page.locator(".tile").first()).toBeVisible();
    expect(await page.locator("svg.spice").count()).toBe(0);
    // and the shape layer itself does not render on touch
    expect(await page.locator(".tile__shapes").first().evaluate((e) => getComputedStyle(e).display)).toBe("none");
    await ctx.close();
  });

  test("hover-capable pointers still draw the masked silhouettes", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "hover only");
    await page.goto("/products/");
    const tile = page.locator("#spices-masalas .tile").nth(2);
    await tile.scrollIntoViewIfNeeded();
    await tile.hover();
    await page.waitForTimeout(1200);
    const s = await tile.evaluate((t) => {
      const pick = (el: Element, pseudo: string) => { const cs = getComputedStyle(el, pseudo); return { opacity: cs.opacity, mask: cs.maskImage || cs.webkitMaskImage }; };
      const shapes = t.querySelector(".tile__shapes")!;
      return [pick(t, "::before"), pick(shapes, "::before"), pick(shapes, "::after")];
    });
    for (const p of s) { expect(p.opacity).toBe("1"); expect(p.mask).toContain("data:image/svg+xml"); }
  });
});
