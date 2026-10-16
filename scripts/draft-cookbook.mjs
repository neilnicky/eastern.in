// Drafts .source-cache/cookbook.draft.json from the Apple Vision OCR of the cookbook spreads
// (docs/source/cookbook-ocr.txt). The draft is then checked line-by-line against each image and the
// reviewed result is saved as src/content/data/cookbook.json. Never ship the draft unreviewed.
import fs from "node:fs";
const ROOT = new URL("..", import.meta.url).pathname;
const ocr = fs.readFileSync(ROOT + "docs/source/cookbook-ocr.txt", "utf8");
const listings = JSON.parse(fs.readFileSync(ROOT + "docs/source/listings.json", "utf8"));

// section of each slider cache dir (full-size and thumb dirs both appear on the section pages)
const sectionOf = {};
for (const [page, section] of [["/vegetarian/", "vegetarian"], ["/non-vegetarian/", "non-vegetarian"], ["/sweets/", "sweets"]]) {
  for (const s of listings[page].slides) sectionOf[s.split("/cache/")[1].split("/")[0]] = section;
}
const NOISE = /^(Eastern|Easter|Eastem|UA|WAVA|MEN|NA|100%|SEMOLINA|OF WHEAT.?|GOODNE|TURAL|NATURAL GOODNESS|Faster|Chail!|WORTH 210 FREE|SAMBAR PUWDER|00 g|•|• •)$/i;
const out = [];
for (const chunk of ocr.split(/^=== /m).slice(1)) {
  const [head, ...rest] = chunk.split("\n");
  const dir = head.split("/")[1];
  const file = head.split("/").pop();
  const lines = rest.map((l) => l.replace(/^\[[\d.,-]+\]\s*/, "").trim()).filter((l) => l && !NOISE.test(l));
  const iIng = lines.findIndex((l) => /^INGREDIENTS$/i.test(l));
  const iMeth = lines.findIndex((l, i) => i > iIng && /^(Preparation Method|How to make|Method|Second Step)/i.test(l));
  const pre = lines.slice(0, Math.max(0, iIng));
  const subtitle = pre.find((l) => /\busing\b|with Eastern/i.test(l)) ?? null;
  const title = pre.filter((l) => l !== subtitle).join(" ");
  const ingredients = iIng >= 0 ? lines.slice(iIng + 1, iMeth > 0 ? iMeth : undefined).join(" ") : "";
  const method = iMeth > 0 ? lines.slice(iMeth + 1) : [];
  out.push({ image: `wp-content/uploads/slider/cache/${dir}/${file}`, section: sectionOf[dir] ?? null, title, subtitle, ingredientsRaw: ingredients, methodHeading: iMeth > 0 ? lines[iMeth] : null, methodRaw: method });
}
fs.writeFileSync(ROOT + ".source-cache/cookbook.draft.json", JSON.stringify(out, null, 1) + "\n");
console.log(out.length, "spreads;", out.filter((o) => !o.section).length, "without section;", out.filter((o) => !o.ingredientsRaw).length, "without ingredients");
