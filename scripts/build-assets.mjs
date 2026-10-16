// Builds the site's image and download assets from the local crawl snapshot (.source-cache/, git-ignored).
//   node scripts/build-assets.mjs           → copies referenced images, cuts out packs, publishes downloads
//   node scripts/build-assets.mjs --force   → re-cuts every pack
// Outputs are committed so the site builds without the snapshot.
import fs from "node:fs";
import path from "node:path";
import { cutout } from "./lib/cutout.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = ROOT + ".source-cache/eastern-assets/";
const UPLOADS_OUT = ROOT + "src/assets/uploads/";
const PACKS_OUT = ROOT + "src/assets/packs/";
const PUBLIC = ROOT + "public/";
const force = process.argv.includes("--force");

if (!fs.existsSync(SRC)) {
  console.error("Missing .source-cache/eastern-assets — re-run the crawl first (see docs/eastern-existing-site-inventory.md §0).");
  process.exit(1);
}

// 1. Every image path referenced by content (data JSON + TS modules).
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
const contentFiles = [...walk(ROOT + "src/content"), ...walk(ROOT + "src/pages"), ...walk(ROOT + "src/components"), ...walk(ROOT + "src/layouts")].filter((f) => /\.(ts|json|astro)$/.test(f));
const refs = new Set();
// Product pack images are only inputs to the cut-outs (step 2), so they are not copied as-is.
const packSources = new Set(JSON.parse(fs.readFileSync(ROOT + "src/content/data/products.json", "utf8")).map((p) => p.image));
for (const f of contentFiles) {
  const text = fs.readFileSync(f, "utf8");
  for (const m of text.matchAll(/(wp-content\/uploads\/[^"'\s)]+?\.(?:jpe?g|png|gif|webp))|(custom-slider\/img\/[^"']+?\.png)/gi)) if (!packSources.has(m[0])) refs.add(m[0]);
}
let copied = 0, missing = [];
for (const rel of refs) {
  const from = SRC + rel;
  const to = UPLOADS_OUT + rel.replace(/^wp-content\/uploads\//, "");
  if (!fs.existsSync(from)) { missing.push(rel); continue; }
  if (!fs.existsSync(to) || force) { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); copied++; }
}
console.log(`images referenced ${refs.size}, copied ${copied}, missing ${missing.length}`);
if (missing.length) console.log("  missing:", missing.join("\n  "));

// 2. Pack cut-outs: one per product (best available source) + the New Products carousel packs.
const products = JSON.parse(fs.readFileSync(ROOT + "src/content/data/products.json", "utf8"));
const extra = [
  { slug: "kabsa-masala", image: "wp-content/uploads/2025/02/Kabsa-Masala-80g.jpg" },
  { slug: "shawarma-masala", image: "wp-content/uploads/2025/02/shawarma.jpg" },
];
const carousel = ["Puttu 200g R8 FOP-resized.png", "Palappam 200g R8 FOP-resized.png", "Idiyappam 200g FOP-resized.png", "Idli 200g R8 FOP-resized.png", "Dosa 200g R8 FOP-resized.png"]
  .map((f) => ({ slug: "new-" + f.split(" ")[0].toLowerCase(), image: "custom-slider/img/" + f }));
fs.mkdirSync(PACKS_OUT, { recursive: true });
let cut = 0;
for (const p of [...products, ...extra, ...carousel]) {
  const out = PACKS_OUT + p.slug + ".webp";
  if (fs.existsSync(out) && !force) continue;
  await cutout(SRC + p.image, out);
  cut++;
}
console.log(`pack cut-outs written ${cut} (total ${fs.readdirSync(PACKS_OUT).length})`);

// 3. Downloads, served at their original URLs so inbound links keep working.
const pages = fs.readFileSync(ROOT + "src/content/pages.ts", "utf8");
const downloads = [...pages.matchAll(/href: "\/(wp-content\/uploads\/[^"]+\.(?:pdf|zip))"/g)].map((m) => m[1]);
for (const rel of downloads) {
  const to = PUBLIC + rel;
  if (fs.existsSync(to) && !force) continue;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(SRC + rel, to);
}
console.log(`downloads published ${downloads.length}`);

// 4. Default social card (1200×630) from the "Authentic Spices" campaign banner.
const sharp = (await import("sharp")).default;
await sharp(SRC + "wp-content/uploads/2025/02/Web-banner-5.jpg").resize(1200, 630, { fit: "cover", position: "right" }).jpeg({ quality: 82 }).toFile(PUBLIC + "og-default.jpg");

// 5. Brand fav-icon (original theme favicon) for <link rel=icon>.
fs.copyFileSync(SRC + "wp-content/themes/eastern/images/fav-icon.png", PUBLIC + "fav-icon.png");
