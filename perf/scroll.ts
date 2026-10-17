// Touch-scroll profile (Pixel 7, CPU throttled) with a reduced-motion control, N runs per page, median reported.
//   pnpm perf:scroll --base http://127.0.0.1:4341 --out perf/out/scroll-after.json [--runs 5] [--pages /,/products/]
import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "@playwright/test";
import { DEFAULT_BASE, RUNS, SCROLL, SCROLL_PAGES } from "./config.ts";
import { args, medianBy } from "./stats.ts";

const a = args();
const base = a.base ?? DEFAULT_BASE;
const runs = Number(a.runs ?? RUNS);
const pages = a.pages ? a.pages.split(",") : SCROLL_PAGES;
const out = a.out ?? "perf/out/scroll.json";

type Row = { taskMs: number; scriptMs: number; layoutMs: number; styleMs: number; layouts: number; recalcs: number; over33: number };
const browser = await chromium.launch();
const result: Record<string, { runs: Row[]; median: Row }> = {};

for (const reduced of [false, true]) {
  for (const p of pages) {
    const rows: Row[] = [];
    for (let i = 0; i < runs; i++) {
      const ctx = await browser.newContext({ ...devices[SCROLL.device]!, reducedMotion: reduced ? "reduce" : "no-preference" });
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: SCROLL.cpuRate });
      await page.goto(base + p, { waitUntil: "networkidle" });
      await page.waitForTimeout(SCROLL.settleMs);
      // Strings, not functions: tsx's esbuild injects a `__name` helper into function bodies that the page does not have.
      const total = (await page.evaluate("document.documentElement.scrollHeight - innerHeight")) as number;
      await page.evaluate("window.__f = []; let last = performance.now(); const tick = (t) => { window.__f.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);");
      await cdp.send("Performance.enable");
      const metrics = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
      const m0 = await metrics();
      const dist = Math.min(total, SCROLL.maxPx);
      for (let y = 0; y < dist; y += SCROLL.flickPx) {
        await cdp.send("Input.synthesizeScrollGesture", { x: 200, y: 600, yDistance: -SCROLL.flickPx, speed: SCROLL.speed, gestureSourceType: "touch" });
        await page.waitForTimeout(SCROLL.gapMs);
      }
      await page.waitForTimeout(SCROLL.tailMs);
      const m1 = await metrics();
      const over33 = (await page.evaluate("window.__f.slice(2).filter((x) => x > 33.4).length")) as number;
      const d = (k: string) => Math.round(((m1[k] ?? 0) - (m0[k] ?? 0)) * 1000);
      const c = (k: string) => (m1[k] ?? 0) - (m0[k] ?? 0);
      rows.push({ taskMs: d("TaskDuration"), scriptMs: d("ScriptDuration"), layoutMs: d("LayoutDuration"), styleMs: d("RecalcStyleDuration"), layouts: c("LayoutCount"), recalcs: c("RecalcStyleCount"), over33 });
      await ctx.close();
    }
    const key = `${p} ${reduced ? "reduced" : "animated"}`;
    result[key] = { runs: rows, median: medianBy(rows) };
    const m = result[key]!.median;
    console.log(key.padEnd(34), `task ${m.taskMs}ms  script ${m.scriptMs}  layout ${m.layoutMs}  style ${m.styleMs}  layouts ${m.layouts}  recalcs ${m.recalcs}  >33ms ${m.over33}   [task runs ${rows.map((r) => r.taskMs).join(" ")}]`);
  }
}
await browser.close();
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ env: { base, runs, scroll: SCROLL, chrome: path.basename(path.dirname(path.dirname(path.dirname(path.dirname(chromium.executablePath()))))) }, pages: result }, null, 1));
console.log(`wrote ${out}`);
