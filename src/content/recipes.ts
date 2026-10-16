import videoData from "./data/video-recipes.json";
import cookbookData from "./data/cookbook.json";
import type { CookbookRecipe, CookbookSection, Recipe, VideoRecipe } from "./types";

/**
 * Products named in each video recipe's title ("Fish Curry x Fish Masala", "Instant Idli", …).
 * Titles that name a dish but no product (e.g. "Nadan Chicken Curry") stay unlinked; nothing is guessed.
 */
const videoProducts: Record<string, string[]> = {
  "biriyani-x-biriyani-masala": ["biriyani-masala"],
  "jeera-rice-x-cumin-seeds": ["cumin-seed"],
  "fish-fry-x-chilli-powder": ["chilli-powder"],
  "meat-roast-x-coriander-powder": ["coriander-powder-5"],
  "egg-curry-x-egg-masala": ["egg-masala"],
  "fish-curry-x-fish-masala": ["fish-masala"],
  "egg-curry-x-garam-masala": ["garam-masala"],
  "fish-curry-x-kashmiri-chilli": ["kashmiri-chilli"],
  "turmeric-powder": ["turmeric-powder-4"],
  "rasam-powder": ["rasam-powder"],
  "mutton-kerala": ["mutton-masala-kerala"],
  "meat-ularth-masala": ["meat-ularthu-masala"],
  "meat-masala": ["meat-masala-2"],
  "chicken-masala-apts": ["chicken-masala"],
  "chicken-masala": ["chicken-masala"],
  "chicken-kabab-masala": ["chicken-kabab-masala"],
  "black-pepper-powder": ["black-pepper-powder"],
  "semiya-payasam": ["semiya-payasam"],
  "palada-payasam": ["palada-payasam"],
  "gothambu-payasam": ["gothambu-payasam"],
  "instant-ghee-upumavu": ["instant-ghee-upumavu"],
  "instant-idli": ["instant-idli"],
  "instant-dosa": ["instant-dosa"],
  "instant-idiyappam": ["instant-idiyappam"],
  "instant-appam-mix": ["instant-appam-mix"],
  "instant-puttu-mix": ["instant-puttu-mix"],
  // Published at /recipes/eastern-meat-masala-recipe/ but titled "Kabsa Masala" (inventory I5).
  "eastern-meat-masala-recipe": ["kabsa-masala"],
};

export const videoRecipes: VideoRecipe[] = (videoData as Omit<VideoRecipe, "kind" | "products">[])
  .map((r) => ({ ...r, kind: "video" as const, products: videoProducts[r.slug] ?? [] }))
  .sort((a, b) => a.listingOrder - b.listingOrder);

export const cookbookRecipes: CookbookRecipe[] = (cookbookData as Omit<CookbookRecipe, "kind">[]).map((r) => ({ ...r, kind: "cookbook" as const }));

export const cookbookSections: { slug: CookbookSection; label: string; path: string }[] = [
  { slug: "vegetarian", label: "Vegetarian", path: "/vegetarian/" },
  { slug: "non-vegetarian", label: "Non-Vegetarian", path: "/non-vegetarian/" },
  { slug: "sweets", label: "Sweets", path: "/sweets/" },
];

export const recipeUrl = (r: Recipe) => (r.kind === "video" ? `/recipes/${r.slug}/` : `/cook_book/${r.slug}/`);

/** Recipes (video and cookbook) that name a product, for "Cook with it" on product pages. */
export const recipesForProduct = (slug: string): Recipe[] => [
  ...videoRecipes.filter((r) => r.products.includes(slug)),
  ...cookbookRecipes.filter((r) => r.products.includes(slug)),
];

/** The three recipes featured on the original homepage, in order. */
export const featuredRecipeSlugs = ["biriyani-x-biriyani-masala", "chicken-masala-apts", "fish-fry-x-chilli-powder"];
