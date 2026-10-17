# Performance harness

Pinned so a before/after comparison means the same thing every time. Everything tunable lives in `config.ts`.

```sh
pnpm build && node_modules/.bin/astro preview --port 4341 --host 127.0.0.1 --ignore-lock &
pnpm perf:lh --out perf/out/after.json                  # Lighthouse mobile, 6 pages x 5 runs, devtools throttling
pnpm perf:lh --method simulate --out perf/out/sim.json  # the Lighthouse default (simulated) throttling
pnpm perf:scroll --out perf/out/scroll-after.json       # Pixel 7, 4x CPU touch scroll, animated vs reduced-motion
pnpm perf:compare perf/out/before.json perf/out/after.json
```

To measure a baseline, build the older commit in a `git worktree`, serve it on another port and pass `--base`.

## What is pinned

- Lighthouse 12.8.2 and chrome-launcher 1.2.2 (exact versions in `package.json`).
- Chromium: the one Playwright resolves for the pinned `@playwright/test`, recorded in each result file.
- Throttling: the Lighthouse mobile preset (150 ms RTT, 1.6 Mbps, 4x CPU), written out in `config.ts`.
- A fresh Chrome per Lighthouse run, 5 runs per page, **median** reported. Raw runs are kept in the output.
- The scroll script: Pixel 7, 4x CPU, 600 px flicks to 9,000 px, 120 ms apart, after a 2.5 s settle.

## Reading the numbers

- **Compare medians, never single runs.** Five identical runs of the same build gave home touch-scroll task time of
  1,531-2,710 ms (median 2,311). Any single run in that range is "normal".
- **Layout and recalc counts are deterministic** (462-465 on the same build); use them to confirm a change took effect.
- Lighthouse's default simulated throttling predicts timings from one trace. A small difference in which requests it
  treats as render-blocking moves FCP/LCP by a second, and `benchmarkIndex` (the machine speed it measures) varies by
  hundreds between runs. Prefer `--method devtools`, which throttles the real page load.
- Results from this harness are not comparable with the earlier ad-hoc scratch runs (different Chromium build).
  Re-measure the baseline with the same harness.
