import type { ImageMetadata } from "astro";

// Every content image keeps its original eastern.in path (wp-content/uploads/…). scripts/build-assets.mjs
// mirrors those files into src/assets/uploads/, so lookups stay traceable to the source site.
const uploads = import.meta.glob<ImageMetadata>("/src/assets/uploads/**/*.{jpg,jpeg,png,webp,gif,JPG,PNG}", { eager: true, import: "default" });
const packs = import.meta.glob<ImageMetadata>("/src/assets/packs/*.webp", { eager: true, import: "default" });

const keyFor = (original: string) =>
  "/src/assets/uploads/" + original.replace(/^\/?wp-content\/uploads\//, "").replace(/^\/?custom-slider\//, "custom-slider/");

/** Resolve an original eastern.in image path to its optimisable asset. Throws at build time if missing. */
export function upload(original: string): ImageMetadata {
  const img = uploads[keyFor(original)];
  if (!img) throw new Error(`Missing asset for ${original} (run \`pnpm assets\`)`);
  return img;
}
export const hasUpload = (original: string | null | undefined) => !!original && !!uploads[keyFor(original)];

/** Cut-out pack shot for a product slug (or "new-puttu" etc. for carousel packs). */
export function pack(slug: string): ImageMetadata {
  const img = packs[`/src/assets/packs/${slug}.webp`];
  if (!img) throw new Error(`Missing pack cut-out for ${slug} (run \`pnpm assets\`)`);
  return img;
}
