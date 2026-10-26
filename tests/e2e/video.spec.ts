import { test, expect, type Page } from "@playwright/test";

/** Records every request that leaves the site's own origin. */
function watchThirdParty(page: Page) {
  const external: string[] = [];
  page.on("request", (r) => { if (!r.url().startsWith("http://127.0.0.1")) external.push(r.url()); });
  return external;
}

async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
}

test.describe("videos are click-to-load facades, not YouTube iframes", () => {
  const pages: [string, () => Promise<string>][] = [
    ["recipe video page", async () => "/recipes/fish-fry-x-chilli-powder/"],
    ["TVC video page", async () => "/videos/"],
  ];

  for (const [name, route] of pages) {
    test(`${name}: no iframe and no third-party request until play is pressed`, async ({ page }) => {
      const external = watchThirdParty(page);
      let target = await route();
      if (target === "/videos/") {
        // first TVC entry in the listing (a direct goto: a client-side click races the page transition)
        await page.goto(target);
        target = (await page.locator("main a[href^='/videos/']:not([href='/videos/'])").first().getAttribute("href"))!;
      }
      await page.goto(target);
      await settle(page);

      await expect(page.locator("iframe")).toHaveCount(0);
      expect(external, "nothing may be fetched from YouTube/Google before the click").toEqual([]);

      const box = page.locator("[data-video]").first();
      await expect(box.locator("img.video__thumb"), "thumbnail is a local file").toHaveAttribute("src", /^\/_astro\//);
      await expect(box.locator("a[data-video-play]"), "works as a plain link without JS").toHaveAttribute("href", /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);

      await box.locator("a[data-video-play]").click();
      const frame = page.locator("iframe.video__frame");
      await expect(frame).toHaveCount(1);
      await expect(frame).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]{11}\?autoplay=1/);
    });
  }
});
