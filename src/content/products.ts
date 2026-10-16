import extracted from "./data/products.json";
import { productCategories } from "./product-categories";
import type { CategorySlug, Product } from "./types";

/**
 * Arabic Range packs. The original /product-category/arabic-range/ was empty, but both packs appear
 * in the homepage "New Products" carousel (2025/02 uploads) and the Kabsa Masala TVC.
 * See docs/eastern-existing-site-inventory.md I2. Name text is as printed on the pack shot.
 */
const arabicRange: Product[] = [
  { slug: "kabsa-masala", name: "Kabsa Masala", category: "arabic-range", categoryOrder: 0, pack: "80 g", image: "wp-content/uploads/2025/02/Kabsa-Masala-80g.jpg", imageSize: [548, 548], sourceUrl: "https://eastern.in/custom-slider/index.html", origin: "new-products-carousel" },
  { slug: "shawarma-masala", name: "Shawarma Masala", category: "arabic-range", categoryOrder: 1, image: "wp-content/uploads/2025/02/shawarma.jpg", imageSize: [548, 600], sourceUrl: "https://eastern.in/custom-slider/index.html", origin: "new-products-carousel" },
];

export const products: Product[] = [...(extracted as Product[]), ...arabicRange];

const bySlug = new Map(products.map((p) => [p.slug, p]));
export const getProduct = (slug: string): Product => {
  const p = bySlug.get(slug);
  if (!p) throw new Error(`Unknown product ${slug}`);
  return p;
};
export const findProduct = (slug: string) => bySlug.get(slug);
export const productUrl = (slug: string) => `/products/${slug}/`;

export const productsIn = (category: CategorySlug) =>
  products.filter((p) => p.category === category).sort((a, b) => a.categoryOrder - b.categoryOrder);

/** Other products for the "The other products" strip: same category first, then the next category. */
export function otherProducts(product: Product, count = 8): Product[] {
  const same = productsIn(product.category).filter((p) => p.slug !== product.slug);
  if (same.length >= count) {
    const i = Math.max(0, same.findIndex((p) => p.categoryOrder > product.categoryOrder));
    return [...same.slice(i), ...same.slice(0, i)].slice(0, count);
  }
  const ci = productCategories.findIndex((c) => c.slug === product.category);
  const next = productCategories[(ci + 1) % productCategories.length]!;
  return [...same, ...productsIn(next.slug)].slice(0, count);
}

/**
 * The homepage "New Products" carousel (iframe /custom-slider/), in its original order.
 * The carousel had no links; each pack is linked to the catalogue product of the same name and range.
 */
export const newProducts: { image: string; label: string; product: string }[] = [
  { image: "wp-content/uploads/2025/02/Kabsa-Masala-80g.jpg", label: "Kabsa Masala", product: "kabsa-masala" },
  { image: "wp-content/uploads/2025/02/shawarma.jpg", label: "Shawarma Masala", product: "shawarma-masala" },
  { image: "custom-slider/img/Puttu 200g R8 FOP-resized.png", label: "5 Minute Breakfast Puttu", product: "instant-puttu-mix" },
  { image: "custom-slider/img/Palappam 200g R8 FOP-resized.png", label: "5 Minute Breakfast Palappam", product: "instant-appam-mix" },
  { image: "custom-slider/img/Idiyappam 200g FOP-resized.png", label: "5 Minute Breakfast Idiyappam", product: "instant-idiyappam" },
  { image: "custom-slider/img/Idli 200g R8 FOP-resized.png", label: "5 Minute Breakfast Idli", product: "instant-idli" },
  { image: "custom-slider/img/Dosa 200g R8 FOP-resized.png", label: "5 Minute Breakfast Dosa", product: "instant-dosa" },
];
