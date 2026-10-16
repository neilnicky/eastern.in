// Shared content types. Every record keeps `sourceUrl` so it can be traced back to eastern.in.

/** A block of long-form CMS content, extracted verbatim (see scripts/extract-source.mjs). */
export type Block =
  | { type: "p" | "h"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "img"; src: string; alt: string }
  | { type: "link"; text: string; href: string }
  | { type: "original"; href: string; network: "facebook" | "instagram" | "x" }
  | { type: "video"; href: string };

export type CategorySlug =
  | "spices-masalas"
  | "arabic-range"
  | "5-minute-breakfast"
  | "madhuram-range"
  | "pickles-paste"
  | "breakfast"
  | "vermicelli-macaroni"
  | "beverages"
  | "whole-spices"
  | "breakfast-mix"
  | "gcc"
  | "other-countries"
  | "accompaniments"
  | "cereals"
  | "confectionery"
  | "straight-powders-1";

export interface ProductCategory {
  slug: CategorySlug;
  /** Label as published in the site menus. */
  label: string;
  /** Display label (only differs where the menu used lowercase, e.g. "whole spices"). */
  title: string;
  /** Present in the original main menu ("IB" items are grouped under International). */
  group: "india" | "international";
  /** Hover colour flood for product tiles, chosen from the category's pack colourways. */
  flood: string;
  /** Text colour that reads on `flood`. */
  floodInk: string;
  /** Silhouettes shown behind the pack on hover (see src/components/Spice.astro). */
  spices: SpiceName[];
  sourceUrl: string;
}

export type SpiceName = "chilli" | "star-anise" | "cardamom" | "clove" | "peppercorn" | "turmeric" | "cinnamon" | "curry-leaf" | "coconut";

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Position within its category on the original listing. */
  categoryOrder: number;
  /** Pack string as published, e.g. "100 g Pouch". Only present when the original page had one. */
  pack?: string;
  /** Original image path (relative to eastern.in). The cut-out lives at src/assets/packs/<slug>.webp. */
  image: string;
  imageSize: [number, number];
  /** "BUY NOW" target on the original page (Amazon.in). */
  buyUrl?: string;
  sourceUrl: string;
  /** Records that did not exist as product pages on the old site (see inventory I2). */
  origin?: "new-products-carousel";
}

export interface VideoRecipe {
  kind: "video";
  slug: string;
  title: string;
  date: string;
  youtubeId: string;
  thumb: string | null;
  listingOrder: number;
  products: string[];
  sourceUrl: string;
}

export interface RecipePart {
  heading?: string;
  ingredients?: string[];
  methodTitle?: string;
  method: string[];
  methodStyle: "steps" | "paragraphs";
}

export type CookbookSection = "vegetarian" | "non-vegetarian" | "sweets";

export interface CookbookRecipe {
  kind: "cookbook";
  slug: string;
  title: string;
  subtitle?: string;
  section: CookbookSection;
  images: string[];
  parts: RecipePart[];
  credit?: string;
  note?: string;
  /** Source-content problem found during transcription (shown in docs, not on the page). */
  anomaly?: string;
  products: string[];
  /** Which half of the cookbook spread holds the food photograph (the other half is the printed recipe). */
  photoSide: "left" | "right";
  sourceUrl: string;
  transcription: string;
}

export type Recipe = VideoRecipe | CookbookRecipe;
