// Markdown before/after table from two result files of the same kind.  pnpm perf:compare before.json after.json
// Lighthouse files: medians of all runs, plus medians of the runs that did not hit the FCP stall (see perf/README.md).
import fs from "node:fs";
import { unstalledMedian } from "./stats.ts";

const [, , beforeFile, afterFile] = process.argv;
const load = (f?: string) => JSON.parse(fs.readFileSync(f!, "utf8"));
const A = load(beforeFile), B = load(afterFile);
const delta = (x: number, y: number) => (x === y ? "=" : `${y < x ? "" : "+"}${Math.round(((y - x) / (x || 1)) * 100)}%`);
const range = (runs: Record<string, number>[] | undefined, k: string) => {
  const v = (runs ?? []).map((r) => r[k]!).sort((p, q) => p - q);
  return v.length ? `${v[0]}-${v[v.length - 1]}` : "";
};

for (const key of Object.keys(A.pages)) {
  const a = A.pages[key], b = B.pages[key];
  if (!b) continue;
  if ("fcp" in a.median) {
    const ua = unstalledMedian(a.runs), ub = unstalledMedian(b.runs);
    const m = (x: { median: Record<string, number> | null }, k: string) => x.median?.[k] ?? NaN;
    console.log(
      `| ${key} | perf ${a.median.perf}→${b.median.perf} | FCP all-runs ${a.median.fcp}→${b.median.fcp}, un-stalled ${m(ua, "fcp")}→${m(ub, "fcp")} | LCP all-runs ${a.median.lcp}→${b.median.lcp} (${delta(a.median.lcp, b.median.lcp)}), un-stalled ${m(ua, "lcp")}→${m(ub, "lcp")} (${delta(m(ua, "lcp"), m(ub, "lcp"))}) | stalled runs ${ua.stalled}/${a.runs.length}→${ub.stalled}/${b.runs.length} | TBT ${a.median.tbt}→${b.median.tbt} | CLS ${a.median.cls}→${b.median.cls} | KB ${a.median.kb}→${b.median.kb} |`,
    );
  } else {
    const cols = Object.keys(a.median).map((k) => `${k} ${a.median[k]}→${b.median[k]} (${delta(a.median[k], b.median[k])}) [${range(a.runs, k)} → ${range(b.runs, k)}]`);
    console.log(`| ${key} | ${cols.join(" | ")} |`);
  }
}
