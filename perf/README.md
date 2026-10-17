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

## Known artifact: bimodal FCP/LCP in `--method devtools`

On this machine, devtools-throttled Lighthouse runs of the site land either at FCP ~1.3 s or at a fixed ~2.67 s
(roughly 45% of runs), **on every build tried** (pre-Batch-1 and current, interleaved) and on every page whose FCP falls near
that window. A trace of a slow run shows the network finished at ~1.27 s, the first layout ran late (1.66 s) and the
first frame was not produced until 2.67 s: a headless frame-scheduling stall, not page work. It does not reproduce in
Playwright with the same CDP throttling, and a trivial static page (FCP ~0.6 s) is unaffected. The root cause was not
pinned down. Because the median of a 50/50 mixture can land in either mode:

- Measure builds **interleaved** (`--bases before=...,after=...`) so the stall hits both equally.
- Read the `[min-max]` spread printed by `perf:compare` beside each median; a median that moved by ~1.3 s with an
  unchanged spread is the artifact, not a change.
- Prefer deterministic signals (bytes, request counts, layout counts, task time) to confirm that a change took effect.
