import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { products } from "@/content/products";
import { productCategories } from "@/content/product-categories";
import { videoRecipes, cookbookRecipes } from "@/content/recipes";
import { stores } from "@/content/stores";
import { milestones, historyStories } from "@/content/history";
import { events, contests, blogPosts, videos } from "@/content/archive";
import { home, amalgamation } from "@/content/pages";
import { legacyRedirects } from "@/content/redirects";
import { allPaths } from "@/pages/sitemap.xml";

const root = path.resolve(__dirname, "../..");
const src = (f: string) => JSON.parse(fs.readFileSync(path.join(root, "docs/source", f), "utf8"));
const normalise = (u: string) => decodeURIComponent(u.replace("https://eastern.in", "")).normalize("NFC");

describe("catalogue", () => {
  it("keeps all 141 original products plus the 2 verified Arabic Range packs", () => {
    const original = src("products.json").filter((p: { url: string }) => !/\/page\//.test(p.url));
    expect(original).toHaveLength(141);
    const slugs = new Set(products.map((p) => p.slug));
    for (const p of original) expect(slugs.has(p.slug), p.slug).toBe(true);
    expect(products).toHaveLength(143);
    expect(slugs.size).toBe(products.length);
  });

  it("puts every product in a known category and every category has products", () => {
    const cats = new Set(productCategories.map((c) => c.slug));
    expect(cats.size).toBe(16);
    for (const p of products) expect(cats.has(p.category), p.slug).toBe(true);
    for (const c of productCategories) expect(products.some((p) => p.category === c.slug), c.slug).toBe(true);
  });

  it("only publishes pack sizes and buy links that existed on the source page", () => {
    const original = new Map(src("products.json").map((p: { slug: string }) => [p.slug, p]));
    for (const p of products) {
      const o = original.get(p.slug) as { description: string | null; buy: { href: string }[] } | undefined;
      if (!o) { expect(p.origin).toBe("new-products-carousel"); continue; }
      expect(p.pack ?? null, p.slug).toBe(o.description ?? null);
      expect(p.buyUrl ?? null, p.slug).toBe(o.buy[0]?.href ?? null);
    }
  });

  it("has a cut-out pack image for every product", () => {
    for (const p of products) expect(fs.existsSync(path.join(root, "src/assets/packs", `${p.slug}.webp`)), p.slug).toBe(true);
  });
});

describe("recipes", () => {
  it("keeps all 36 video recipes with a YouTube id", () => {
    expect(videoRecipes).toHaveLength(36);
    for (const r of videoRecipes) expect(r.youtubeId, r.slug).toMatch(/^[\w-]{11}$/);
  });

  it("transcribes every one of the 41 cookbook cards exactly once (40 recipes; Béchamel Pasta spans two cards)", () => {
    expect(cookbookRecipes).toHaveLength(40);
    const used = cookbookRecipes.flatMap((r) => r.images);
    expect(used).toHaveLength(41);
    expect(new Set(used).size).toBe(41);
    for (const r of cookbookRecipes) expect(r.parts.some((p) => (p.ingredients?.length ?? 0) > 0), r.slug).toBe(true);
  });

  it("only links recipes to products that exist", () => {
    const slugs = new Set(products.map((p) => p.slug));
    for (const r of [...videoRecipes, ...cookbookRecipes]) for (const s of r.products) expect(slugs.has(s), `${r.slug} → ${s}`).toBe(true);
    for (const s of home.campaigns.slides) if (s.product) expect(slugs.has(s.product), s.image).toBe(true);
  });
});

describe("company, archive and stores", () => {
  it("keeps every milestone, story, event, contest, post and video", () => {
    expect(milestones.map((m) => m.year)).toEqual(["1983", "1985", "1989", "1994", "2004", "2010", "2016", "2020", "2022", "2023", "2024"]);
    expect(historyStories).toHaveLength(23);
    expect(events).toHaveLength(14);
    expect(contests).toHaveLength(40);
    expect(blogPosts).toHaveLength(5);
    expect(videos).toHaveLength(16);
  });

  it("keeps all 108 dealer locations with coordinates", () => {
    expect(stores).toHaveLength(108);
    for (const s of stores) {
      expect(Number.isFinite(s.lat) && Number.isFinite(s.lng), s.slug).toBe(true);
      expect(s.region, s.slug).not.toBe("United States");
    }
  });

  it("publishes all 17 statutory documents at their original paths", () => {
    const files = amalgamation.groups.flatMap((g) => g.files);
    expect(files).toHaveLength(17);
    for (const f of files) expect(fs.existsSync(path.join(root, "public", f.href)), f.href).toBe(true);
  });
});

describe("URL coverage", () => {
  it("rebuilds or redirects every URL in the original eastern.in sitemap", () => {
    const built = new Set(allPaths().map(normalise));
    const redirected = new Set(Object.keys(legacyRedirects).map(normalise));
    const missing = src("sitemap-urls.json")
      .map((x: { url: string }) => normalise(x.url))
      .filter((u: string) => !built.has(u) && !redirected.has(u));
    expect(missing).toEqual([]);
  });

  it("points every redirect at a page that exists", () => {
    const built = new Set(allPaths().map(normalise));
    for (const [from, r] of Object.entries(legacyRedirects)) expect(built.has(normalise(r.destination)), `${from} → ${r.destination}`).toBe(true);
  });
});

describe("content honesty", () => {
  const contentText = () =>
    fs.readdirSync(path.join(root, "src/content"), { recursive: true }).filter((f) => /\.(ts|json)$/.test(String(f)))
      .map((f) => fs.readFileSync(path.join(root, "src/content", String(f)), "utf8")).join("\n");

  it("does not publish claims that were hidden on the live site", () => {
    const text = contentText();
    expect(text).not.toMatch(/150\s?M\+/);
    expect(text).not.toMatch(/JOIN OUR NEWSLETTER/i);
  });

  it("contains no placeholder copy", () => {
    expect(contentText()).not.toMatch(/lorem ipsum|\bTODO\b|\bTBD\b|placeholder text/i);
  });
});
