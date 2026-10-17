// Single source of truth for the performance harness. Change a value here and results are no longer
// comparable with earlier runs, so re-measure the baseline too (see perf/README.md).

/** Lighthouse pages: name -> path. */
export const LH_PAGES: Record<string, string> = {
  home: "/",
  products: "/products/",
  pdp: "/products/chicken-masala/",
  recipes: "/recipes/",
  cookbook: "/cook_book/bechamel-pasta/",
  timeline: "/timeline/",
};

/** Pages the touch-scroll profile walks. */
export const SCROLL_PAGES = ["/", "/products/", "/timeline/", "/products/chicken-masala/", "/recipes/"];

/** Repeats per page. Always report the median: single runs swing by 2x (see perf/README.md). */
export const RUNS = 5;

/** Lighthouse "mobile" preset values, written out so a Lighthouse upgrade cannot change them silently. */
export const THROTTLING = {
  rttMs: 150,
  throughputKbps: 1638.4,
  requestLatencyMs: 562.5,
  downloadThroughputKbps: 1474.56,
  uploadThroughputKbps: 675,
  cpuSlowdownMultiplier: 4,
};

export const LH_CHROME_FLAGS = ["--headless=new", "--no-sandbox"];

/** Touch-scroll profile: Pixel 7 emulation, CPU throttled, flicks of `flick` px down to `max` px. */
export const SCROLL = {
  device: "Pixel 7",
  cpuRate: 4,
  settleMs: 2500,
  flickPx: 600,
  maxPx: 9000,
  speed: 1800,
  gapMs: 120,
  tailMs: 400,
};

export const DEFAULT_BASE = "http://127.0.0.1:4341";
