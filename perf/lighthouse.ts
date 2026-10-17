// Lighthouse mobile, N fresh-Chrome runs per page, median reported.
//   pnpm perf:lh --base http://127.0.0.1:4341 --out perf/out/after.json [--method devtools|simulate] [--runs 5] [--pages home,products]
//   pnpm perf:lh --bases before=http://127.0.0.1:4342,after=http://127.0.0.1:4341 [--out-dir perf/out]   (interleaved A/B)
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";
import { DEFAULT_BASE, LH_CHROME_FLAGS, LH_PAGES, RUNS, THROTTLING } from "./config.ts";
import { args, median, medianBy } from "./stats.ts";

const a = args();
// `--base URL` measures one build; `--bases before=URL,after=URL` interleaves several builds run-by-run so that
// environmental drift (see perf/README.md) lands on all of them equally. Output: `--out FILE` or `--out-dir DIR`.
const bases: Record<string, string> = a.bases
  ? Object.fromEntries(a.bases.split(",").map((x) => x.split("=") as [string, string]))
  : { run: a.base ?? DEFAULT_BASE };
const method = (a.method ?? "devtools") as "devtools" | "simulate";
const runs = Number(a.runs ?? RUNS);
const names = (a.pages ?? Object.keys(LH_PAGES).join(",")).split(",");
const outDir = a["out-dir"] ?? "perf/out";
const chromePath = chromium.executablePath();

type Row = { perf: number; fcp: number; lcp: number; tbt: number; cls: number; si: number; kb: number };
type PageResult = { runs: Row[]; median: Row; lcpEl: string[] };
const result: Record<string, Record<string, PageResult>> = Object.fromEntries(Object.keys(bases).map((k) => [k, {}]));
const bench: number[] = [];
let lhVersion = "";

async function once(url: string): Promise<{ row: Row; el: string }> {
  const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: LH_CHROME_FLAGS });
  try {
    const r = await lighthouse(
      url,
      { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"], formFactor: "mobile", throttlingMethod: method, throttling: THROTTLING },
      undefined,
    );
    const lhr = r!.lhr;
    lhVersion = lhr.lighthouseVersion;
    bench.push(lhr.environment.benchmarkIndex);
    const au = lhr.audits;
    const el: string = (au["largest-contentful-paint-element"]?.details as any)?.items?.[0]?.items?.[0]?.node?.snippet ?? "";
    return {
      el: el.match(/src="[^"]*\/([^/."]+)/)?.[1] ?? el.slice(0, 24),
      row: {
        perf: Math.round((lhr.categories.performance?.score ?? 0) * 100),
        fcp: Math.round(au["first-contentful-paint"]!.numericValue!),
        lcp: Math.round(au["largest-contentful-paint"]!.numericValue!),
        tbt: Math.round(au["total-blocking-time"]!.numericValue!),
        cls: +au["cumulative-layout-shift"]!.numericValue!.toFixed(3),
        si: Math.round(au["speed-index"]!.numericValue!),
        kb: Math.round(au["total-byte-weight"]!.numericValue! / 1024),
      },
    };
  } finally {
    await chrome.kill();
  }
}

for (const name of names) {
  const rows: Record<string, Row[]> = Object.fromEntries(Object.keys(bases).map((k) => [k, []]));
  const els: Record<string, string[]> = Object.fromEntries(Object.keys(bases).map((k) => [k, []]));
  for (let i = 0; i < runs; i++) {
    for (const [label, base] of Object.entries(bases)) {
      const { row, el } = await once(base + LH_PAGES[name]);
      rows[label]!.push(row);
      els[label]!.push(el);
    }
  }
  for (const label of Object.keys(bases)) {
    result[label]![name] = { runs: rows[label]!, median: medianBy(rows[label]!), lcpEl: els[label]! };
    const m = result[label]![name]!.median;
    console.log(`${label.padEnd(7)} ${name.padEnd(9)}`, `perf ${m.perf}  fcp ${m.fcp}  lcp ${m.lcp}  tbt ${m.tbt}  cls ${m.cls}  si ${m.si}  kb ${m.kb}   [lcp runs ${rows[label]!.map((r) => r.lcp).join(" ")}]`);
  }
}

let sha = "";
try { sha = execSync("git rev-parse --short HEAD", { cwd: path.dirname(new URL(import.meta.url).pathname) }).toString().trim(); } catch {}
const chromeName = path.basename(path.dirname(path.dirname(path.dirname(path.dirname(chromePath)))));
fs.mkdirSync(outDir, { recursive: true });
for (const [label, base] of Object.entries(bases)) {
  const file = a.out && !a.bases ? a.out : path.join(outDir, `lh-${label}.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ env: { base, method, runs, lighthouse: lhVersion, chrome: chromeName, throttling: THROTTLING, benchmarkIndexMedian: Math.round(median(bench)), benchmarkIndexRuns: bench.map(Math.round), harnessSha: sha }, pages: result[label] }, null, 1));
  console.log(`wrote ${file}`);
}
