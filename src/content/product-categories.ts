import type { CategorySlug, ProductCategory } from "./types";

// Order and labels follow the original main menu (Products ›), then the sidebar-only categories.
// `flood` colours are the hover colour-floods for product tiles (docs/design-direction.md §2.1).
const base = "https://eastern.in/product-category/";
export const productCategories: ProductCategory[] = [
  { slug: "spices-masalas", label: "Spices & Masalas", title: "Spices & Masalas", group: "india", flood: "#B3200F", floodInk: "#FBF2E6", spices: ["chilli", "star-anise", "clove"], sourceUrl: base + "spices-masalas/" },
  { slug: "arabic-range", label: "Arabic Range", title: "Arabic Range", group: "india", flood: "#0F5E57", floodInk: "#FBF2E6", spices: ["cardamom", "clove", "peppercorn"], sourceUrl: base + "arabic-range/" },
  { slug: "5-minute-breakfast", label: "5 Minute Breakfast", title: "5 Minute Breakfast", group: "india", flood: "#E8B04A", floodInk: "#3B160F", spices: ["coconut", "curry-leaf"], sourceUrl: base + "5-minute-breakfast/" },
  { slug: "madhuram-range", label: "Madhuram Range", title: "Madhuram Range", group: "india", flood: "#5A2A6B", floodInk: "#FBF2E6", spices: ["cardamom", "coconut"], sourceUrl: base + "madhuram-range/" },
  { slug: "pickles-paste", label: "Pickles & Paste", title: "Pickles & Paste", group: "india", flood: "#6B7D1F", floodInk: "#FBF2E6", spices: ["chilli", "curry-leaf", "peppercorn"], sourceUrl: base + "pickles-paste/" },
  { slug: "breakfast", label: "Breakfast", title: "Breakfast", group: "india", flood: "#E8B04A", floodInk: "#3B160F", spices: ["coconut", "curry-leaf"], sourceUrl: base + "breakfast/" },
  { slug: "vermicelli-macaroni", label: "Vermicelli & Macaroni", title: "Vermicelli & Macaroni", group: "india", flood: "#D88A2A", floodInk: "#3B160F", spices: ["cardamom", "clove"], sourceUrl: base + "vermicelli-macaroni/" },
  { slug: "beverages", label: "Beverages", title: "Beverages", group: "india", flood: "#4A2A1A", floodInk: "#FBF2E6", spices: ["cinnamon", "cardamom"], sourceUrl: base + "beverages/" },
  { slug: "whole-spices", label: "whole spices", title: "Whole Spices", group: "india", flood: "#7A3B12", floodInk: "#FBF2E6", spices: ["star-anise", "cardamom", "peppercorn"], sourceUrl: base + "whole-spices/" },
  { slug: "breakfast-mix", label: "Breakfast Mix", title: "Breakfast Mix", group: "india", flood: "#E8B04A", floodInk: "#3B160F", spices: ["coconut", "curry-leaf"], sourceUrl: base + "breakfast-mix/" },
  { slug: "gcc", label: "GCC", title: "GCC", group: "international", flood: "#1F4E79", floodInk: "#FBF2E6", spices: ["chilli", "cardamom", "clove"], sourceUrl: base + "gcc/" },
  { slug: "other-countries", label: "Other Countries", title: "Other Countries", group: "international", flood: "#1F4E79", floodInk: "#FBF2E6", spices: ["chilli", "turmeric"], sourceUrl: base + "other-countries/" },
  { slug: "accompaniments", label: "Accompaniments", title: "Accompaniments", group: "india", flood: "#6B3A1E", floodInk: "#FBF2E6", spices: ["curry-leaf", "chilli"], sourceUrl: base + "accompaniments/" },
  { slug: "cereals", label: "Cereals", title: "Cereals", group: "india", flood: "#C9962E", floodInk: "#3B160F", spices: ["coconut", "cardamom"], sourceUrl: base + "cereals/" },
  { slug: "confectionery", label: "Confectionery", title: "Confectionery", group: "india", flood: "#C2185B", floodInk: "#FBF2E6", spices: ["star-anise", "cinnamon"], sourceUrl: base + "confectionery/" },
  { slug: "straight-powders-1", label: "Straight Powders", title: "Straight Powders", group: "india", flood: "#C77A12", floodInk: "#3B160F", spices: ["turmeric", "chilli", "peppercorn"], sourceUrl: base + "straight-powders-1/" },
];

const bySlug = new Map(productCategories.map((c) => [c.slug, c]));
export const getCategory = (slug: CategorySlug): ProductCategory => {
  const c = bySlug.get(slug);
  if (!c) throw new Error(`Unknown category ${slug}`);
  return c;
};
export const categoryUrl = (slug: CategorySlug) => `/product-category/${slug}/`;
