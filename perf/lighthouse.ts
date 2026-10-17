// Lighthouse mobile, N fresh-Chrome runs per page, median reported.
//   pnpm perf:lh --base http://127.0.0.1:4341 --out perf/out/after.json [--method devtools|simulate] [--runs 5] [--pages home,products]
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";
import { DEFAULT_BASE, LH_CHROME_FLAGS, LH_PAGES, RUNS, THROTTLING } from "./config.ts";
import { args, median, medianBy } from "./stats.ts";

const a = args();
const base = a.base ?? DEFAULT_BASE;
const method = (a.method ?? "devtools") as "devtools" | "simulate";
const runs = Number(a.runs ?? RUNS);
const names = (a.pages ?? Object.keys(LH_PAGES).join(",")).split(",");
const out = a.out ?? "perf/out/lighthouse.json";
const chromePath = chromium.executablePath();

type Row = { perf: number; fcp: number; lcp: number; tbt: number; cls: number; si: number; kb: number };
const result: Record<string, { runs: Row[]; median: Row; lcpEl: string[] }> = {};
const bench: number[] = [];
let lhVersion = "";

for (const name of names) {
  const rows: Row[] = [];
  const els: string[] = [];
  for (let i = 0; i < runs; i++) {
    const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: LH_CHROME_FLAGS });
    try {
      const r = await lighthouse(
        base + LH_PAGES[name],
        { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"], formFactor: "mobile", throttlingMethod: method, throttling: THROTTLING },
        undefined,
      );
      const lhr = r!.lhr;
      lhVersion = lhr.lighthouseVersion;
      bench.push(lhr.environment.benchmarkIndex);
      const au = lhr.audits;
      const el = (au["largest-contentful-paint-element"]?.details as any)?.items?.[0]?.items?.[0]?.node?.snippet ?? "";
      els.push((el.match(/src="[^"]*\/([^/."]+)/)?.[1] ?? el.slice(0, 24)) as string);
      rows.push({
        perf: Math.round((lhr.categories.performance?.score ?? 0) * 100),
        fcp: Math.round(au["first-contentful-paint"]!.numericValue!),
        lcp: Math.round(au["largest-contentful-paint"]!.numericValue!),
        tbt: Math.round(au["total-blocking-time"]!.numericValue!),
        cls: +au["cumulative-layout-shift"]!.numericValue!.toFixed(3),
        si: Math.round(au["speed-index"]!.numericValue!),
        kb: Math.round(au["total-byte-weight"]!.numericValue! / 1024),
      });
    } finally {
      await chrome.kill();
    }
  }
  result[name] = { runs: rows, median: medianBy(rows), lcpEl: els };
  const m = result[name]!.median;
  console.log(name.padEnd(9), `perf ${m.perf}  fcp ${m.fcp}  lcp ${m.lcp}  tbt ${m.tbt}  cls ${m.cls}  si ${m.si}  kb ${m.kb}   [lcp runs ${rows.map((r) => r.lcp).join(" ")}]`);
}

let sha = "";
try { sha = execSync("git rev-parse --short HEAD", { cwd: path.dirname(new URL(import.meta.url).pathname) }).toString().trim(); } catch {}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  JSON.stringify({ env: { base, method, runs, lighthouse: lhVersion, chrome: path.basename(path.dirname(path.dirname(path.dirname(path.dirname(chromePath))))), throttling: THROTTLING, benchmarkIndexMedian: Math.round(median(bench)), benchmarkIndexRuns: bench.map(Math.round), harnessSha: sha }, pages: result }, null, 1),
);
console.log(`wrote ${out}  (benchmarkIndex median ${Math.round(median(bench))})`);
