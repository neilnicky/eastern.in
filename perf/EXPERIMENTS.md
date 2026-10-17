# Experiments

Raw results live in `perf/results/<date>/`. All Lighthouse numbers are `--method devtools`, 5 interleaved runs per page,
medians of the runs that did not hit the FCP stall (see README.md). Compare with `pnpm perf:compare`.

## 2026-10-17: `build.inlineStylesheets: "always"`, then a Figtree preload on top. Not shipped.

Builds: **A** current (`"auto"`), **B** `"always"`, **C** `"always"` + `<link rel="preload" as="font">` for Figtree latin.
Rule agreed beforehand: ship only if FCP **and** LCP improve in the median.

| page | FCP A → B → C | LCP A → B → C |
|---|---|---|
| home | 1,542 → 658 → 865 | 1,616 → 1,582 → 1,929 |
| products | 1,345 → 657 → 785 | 1,733 → 2,208 → 2,164 |
| pdp | 1,329 → 650 → 799 | 1,562 → 1,739 → 1,675 |
| recipes | 1,331 → 642 → 798 | 1,817 → 2,126 → 2,085 |
| cookbook | 1,336 → 659 → 783 | 2,013 → 2,691 → 2,581 |
| timeline | 1,312 → 645 → 776 | 1,844 → 2,287 → 2,229 |

- **B** halves FCP on every page and makes the FCP stall disappear, but LCP is worse on 5 of 6 pages (+11% to +34%) and
  Speed Index is worse too. Cause, from the waterfall: with no render-blocking CSS file, nothing gates layout, so the
  fonts and below-the-fold images start at ~0.65-0.77 s and share the 1.6 Mbps link with the hero image, which then
  finishes 170-470 ms later. The external stylesheet had been acting as an accidental scheduler for those fetches.
- **C** is slower than B on FCP (+130-210 ms; the font competes with the HTML/CSS path) and no better on LCP.
- Inlining also repeats the stylesheet in every HTML document that the ClientRouter fetches on navigation, which the cached
  external file does not.

Follow-up worth trying instead (not done): keep external CSS but stop below-the-fold images and the italic face competing
with the hero image early, e.g. `fetchpriority="low"` on images far below the fold.
