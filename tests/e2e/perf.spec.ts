import { test, expect, type Page } from "@playwright/test";

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
