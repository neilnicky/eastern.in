import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { LH_PAGES, RUNS, SCROLL, SCROLL_PAGES, THROTTLING } from "../../perf/config.ts";
import { args, isStalled, median, medianBy, STALL_FCP_MS, unstalledMedian } from "../../perf/stats.ts";

describe("perf harness", () => {
  it("reports medians, ignoring non-finite values", () => {
    expect(median([5, 1, 9])).toBe(5);
    expect(median([4, 1, 3, 2])).toBe(2.5);
    expect(median([1, NaN, 3])).toBe(2);
    expect(medianBy([{ a: 1, b: 10 }, { a: 3, b: 30 }, { a: 2, b: 20 }])).toEqual({ a: 2, b: 20 });
  });

  it("separates runs that hit the ~2.67 s FCP stall from the rest", () => {
    const row = (fcp: number, lcp: number) => ({ fcp, lcp });
    expect(STALL_FCP_MS).toBe(2600);
    expect(isStalled(row(2680, 2680))).toBe(true);
    expect(isStalled(row(1340, 1500))).toBe(false);
    const r = unstalledMedian([row(1300, 1500), row(2680, 2680), row(1320, 1520), row(2670, 2670), row(1310, 1510)]);
    expect(r).toEqual({ median: { fcp: 1310, lcp: 1510 }, stalled: 2, kept: 3 });
    expect(unstalledMedian([row(2700, 2700)])).toEqual({ median: null, stalled: 1, kept: 0 });
  });

  it("parses --name value and bare flags", () => {
    expect(args(["--base", "http://x", "--quick", "--runs", "3"])).toEqual({ base: "http://x", quick: "true", runs: "3" });
  });

  it("pins the Lighthouse mobile preset, run count and page set", () => {
    expect(THROTTLING).toEqual({ rttMs: 150, throughputKbps: 1638.4, requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675, cpuSlowdownMultiplier: 4 });
    expect(RUNS).toBeGreaterThanOrEqual(5);
    expect(Object.keys(LH_PAGES)).toEqual(["home", "products", "pdp", "recipes", "cookbook", "timeline"]);
    expect(SCROLL_PAGES).toContain("/");
    expect(SCROLL).toMatchObject({ device: "Pixel 7", cpuRate: 4, flickPx: 600, maxPx: 9000 });
  });

  it("keeps the measuring tools at exact versions", () => {
    const pkg = JSON.parse(fs.readFileSync(new URL("../../package.json", import.meta.url), "utf8"));
    for (const dep of ["lighthouse", "chrome-launcher", "@playwright/test"]) expect(pkg.devDependencies[dep], dep).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
