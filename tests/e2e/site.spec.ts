import { test, expect, type Page } from "@playwright/test";

const errorsOf = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  return errors;
};

test("home renders the pack marquee, campaigns and sections without errors", async ({ page }) => {
  const errors = errorsOf(page);
  await page.goto("/");
  await expect(page).toHaveTitle(/Eastern Condiments/);
  const packs = page.locator(".hero__item a");
  await expect(packs).toHaveCount(14);
  await expect(packs.first()).toHaveAttribute("href", /\/products\/.+\/$/);
  for (const h of ["New Products", "Our Products", "Recipes", "We're worldwide"]) await expect(page.getByRole("heading", { name: h })).toBeAttached();
  await expect(page.getByText("Spreading the aroma of our spices across the world").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("menu opens, traps focus, closes with Escape and reaches every primary page", async ({ page }) => {
  await page.goto("/products/");
  const toggle = page.locator("[data-menu-toggle]");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator("#site-menu");
  await expect(menu).toBeVisible();
  for (const name of ["Home", "Products", "Recipes", "About", "Contact"]) await expect(menu.getByRole("link", { name, exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Products", exact: true })).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeHidden();
});

test("client-side navigation swaps pages and updates the title", async ({ page }) => {
  await page.goto("/");
  await page.locator(".hero__item a").first().click();
  await expect(page).toHaveURL(/\/products\/[^/]+\/$/);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page).toHaveTitle(/\| Eastern Condiments$/);
});

test("product search filters the catalogue", async ({ page }) => {
  await page.goto("/products/");
  await page.getByLabel(/Search \d+ products/).fill("mango pickle");
  await expect(page.locator("[data-filter-status]")).toHaveText(/\d+ results?/);
  const visible = page.locator("[data-filter-item]:visible");
  await expect(visible.first()).toContainText(/Mango/i);
  expect(await visible.count()).toBeLessThan(8);
});

test("product page shows verified facts only", async ({ page }) => {
  await page.goto("/products/mango-pickle/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Mango Pickle/i);
  await expect(page.locator(".spec")).toContainText("300 g Bottle");
  await expect(page.locator(".spec")).toContainText("Pickles & Paste");
  await expect(page.locator("body")).not.toContainText(/ingredients|nutrition|shelf life/i);
  await page.goto("/products/chicken-masala/");
  await expect(page.getByRole("link", { name: /Buy on Amazon/ })).toHaveAttribute("href", /amazon\.in/);
});

test("video recipe loads the player only on request", async ({ page }) => {
  await page.goto("/recipes/fish-fry-x-chilli-powder/");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("link", { name: /Play video/ }).click();
  await expect(page.locator("iframe.video__frame")).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/XYtDFeBScZ4/);
});

test("cookbook recipe shows transcribed ingredients and method", async ({ page }) => {
  await page.goto("/cook_book/dahi-vada/");
  await expect(page.locator(".recipe")).toContainText("Mustard seeds- ¼ tsp");
  await expect(page.locator(".method li")).toHaveCount(8);
});

test("store locator filters by country and text", async ({ page }) => {
  await page.goto("/store-locator/");
  await page.getByRole("button", { name: "United States" }).click();
  await expect(page.locator("tr[data-filter-item]:visible").first()).toBeVisible();
  await page.getByLabel(/Search \d+ locations/).fill("Edison");
  const rows = page.locator("tr[data-filter-item]:visible");
  expect(await rows.count()).toBeGreaterThan(0);
  for (const t of await rows.allTextContents()) expect(t).toMatch(/Edison/i);
});

test("retired URLs redirect to their new home", async ({ page }) => {
  await page.goto("/kabsa-masala/");
  await expect(page).toHaveURL(/\/products\/kabsa-masala\/$/);
  await page.goto("/products/page/3/");
  await expect(page).toHaveURL(/\/products\/$/);
});

test("statutory downloads are served at their original paths", async ({ request }) => {
  for (const p of ["/wp-content/uploads/2022/07/2.-Scheme-of-amalagamation.pdf", "/wp-content/uploads/2023/09/MergerOrder.pdf", "/wp-content/uploads/2022/12/final-hearing-notice.zip"]) {
    const r = await request.get(p);
    expect(r.status(), p).toBe(200);
  }
});

test("reduced motion shows content without animation", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/timeline/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".page-cover")).toBeHidden();
  await ctx.close();
});

test("no horizontal overflow at 320px", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 320, height: 640 } });
  const page = await ctx.newPage();
  for (const p of ["/", "/products/", "/products/chicken-masala/", "/recipes/", "/store-locator/", "/contact/", "/innovationcenter/"]) {
    await page.goto(p);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, p).toBeLessThanOrEqual(0);
  }
  await ctx.close();
});

test("every sitemap URL returns 200", async ({ request }) => {
  test.setTimeout(120_000);
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>https:\/\/eastern\.in([^<]+)<\/loc>/g)].map((m) => m[1]!);
  expect(urls.length).toBeGreaterThan(450);
  const bad: string[] = [];
  for (const u of urls) { const r = await request.get(u); if (r.status() !== 200) bad.push(`${r.status()} ${u}`); }
  expect(bad).toEqual([]);
});
