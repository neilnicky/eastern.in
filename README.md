# eastern.in rebuild

A complete rebuild of the Eastern Condiments website (eastern.in). It is a static Astro site: every existing page, product, recipe, store and document is preserved at its original URL. The new experience reconstructs the layouts and motion of the reference site.

## Run

```sh
pnpm install
pnpm dev            # local dev server
pnpm build          # astro check + redirects + static build → dist/
pnpm test           # Vitest unit tests (content integrity, URL coverage)
pnpm test:e2e       # Playwright against the production build (run `pnpm build` first)
pnpm spice-masks    # regenerate src/styles/spice-masks.css after editing shapes in src/lib/spices.ts (a unit test checks it is in sync)
```

The following scripts need the local crawl snapshot in `.source-cache/` (git-ignored). Their outputs are committed, so a normal build does not need them.

```sh
node scripts/extract-source.mjs   # crawl snapshot → src/content/data/*.json
node scripts/build-assets.mjs     # images, pack cut-outs, downloads → src/assets, public
pnpm write-docs                   # regenerate the migration checklist and asset inventory
```

## Where things live

| Path | What |
|---|---|
| `src/content/` | Typed content: site config, navigation, categories, products, recipes, history, archive, stores, page copy, redirects. **Edit copy here, not in components.** |
| `src/content/data/` | Verbatim extracts from eastern.in (generated, reviewed). `cookbook.json` is the hand-checked transcription of the 41 cookbook cards. |
| `src/components/`, `src/layouts/`, `src/pages/` | Templates. Routes mirror the original URLs. |
| `src/motion/` | GSAP + ScrollTrigger + Lenis + Matter.js modules, lazy-loaded by `data-*` hooks. All respect `prefers-reduced-motion`. |
| `src/assets/` | Brand SVGs, pack cut-outs, and images mirrored at their original `wp-content/uploads/…` paths. |
| `public/wp-content/uploads/` | Statutory PDFs/ZIP at their original URLs. |
| `docs/` | Audit, reference analysis, design direction, page mapping, migration checklist, asset inventory, validation report. |

## Hosting notes

- `trailingSlash: "always"` matches WordPress URLs.
- Retired URLs get Astro redirect pages, and `public/_redirects` holds real 301s for Netlify or Cloudflare Pages. On other hosts, port `src/content/redirects.ts` to the server config.
- Analytics are off. Set `siteConfig.analytics.gtmId` once a consent policy is agreed.
