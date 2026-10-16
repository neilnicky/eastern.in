import type { APIRoute } from "astro";
import { products, productUrl } from "@/content/products";
import { productCategories, categoryUrl } from "@/content/product-categories";
import { videoRecipes, cookbookRecipes, recipeUrl } from "@/content/recipes";
import { historyStories } from "@/content/history";
import { events, contests, blogPosts, videos } from "@/content/archive";
import { stores } from "@/content/stores";

export const staticPaths = [
  "/", "/products/", "/recipes/", "/cook_book/", "/vegetarian/", "/non-vegetarian/", "/sweets/", "/videos/", "/timeline/", "/we-at-eastern/",
  "/innovationcenter/", "/contact/", "/store-locator/", "/events/", "/contests/", "/blogs/", "/privacy/", "/csr-policy/", "/lucky-draw-terms-conditions/", "/scheme-of-amalgamation/",
];

export const allPaths = () => [
  ...staticPaths,
  ...productCategories.map((c) => categoryUrl(c.slug)),
  ...products.map((p) => productUrl(p.slug)),
  ...videoRecipes.map(recipeUrl),
  ...cookbookRecipes.map(recipeUrl),
  ...historyStories.map((s) => s.path),
  ...events.map((e) => e.path),
  ...contests.map((c) => c.path),
  ...blogPosts.map((b) => b.path),
  ...videos.map((v) => v.path),
  ...stores.map((s) => s.path),
];

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? "https://eastern.in/").replace(/\/$/, "");
  const urls = allPaths().map((p) => `<url><loc>${base}${encodeURI(decodeURI(p))}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml" } });
};
