// Markdown before/after table from two result files of the same kind.  pnpm perf:compare before.json after.json
import fs from "node:fs";

const [, , beforeFile, afterFile] = process.argv;
const load = (f?: string) => JSON.parse(fs.readFileSync(f!, "utf8"));
const A = load(beforeFile), B = load(afterFile);
const delta = (x: number, y: number) => (x === y ? "=" : `${y < x ? "" : "+"}${Math.round(((y - x) / (x || 1)) * 100)}%`);

for (const key of Object.keys(A.pages)) {
  const a = A.pages[key].median, b = B.pages[key]?.median;
  if (!b) continue;
  const cols = Object.keys(a).map((k) => `${k} ${a[k]}→${b[k]} (${delta(a[k], b[k])})`);
  console.log(`| ${key} | ${cols.join(" | ")} |`);
}
