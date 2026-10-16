# Validation report

Date: 2026-10-15. Build: Astro 7.3.8, static output, 520 HTML pages.

## 1. Automated checks

| Check | Command | Result |
|---|---|---|
| Type check | `astro check` | 0 errors, 0 warnings (95 files) |
| Production build | `pnpm build` | Pass. 520 pages, including 59 redirect pages. |
| Unit tests | `pnpm test` | **14 / 14 pass** |
| End-to-end | `pnpm test:e2e` | **26 / 26 pass** (13 tests × desktop 1440 + Pixel 7) |

The unit tests (`tests/unit/content.test.ts`) prove the following:

- All 141 original products are present, plus 2 verified Arabic Range packs. Slugs are unique and categories valid.
- Pack sizes and Amazon links are byte-identical to the source pages, so nothing was added.
- Every product has a cut-out image.
- 36 video recipes, each with a YouTube id.
- All 41 cookbook cards are used exactly once (40 recipes).
- Every recipe and banner links only to products that exist.
- 11 milestones, 23 stories, 14 events, 40 contests, 5 posts, 16 videos and 108 stores are kept, every store with coordinates.
- All 17 statutory documents are published.
- **Every one of the 442 URLs in the original eastern.in sitemap is either rebuilt or redirected**, and every redirect lands on a real page.
- Claims hidden on the live site ("150 M+", the newsletter) are not published, and no placeholder copy exists.

The end-to-end tests (`tests/e2e/site.spec.ts`) cover:

- The home marquee renders 14 linked packs with no console errors.
- The menu opens, marks the current page, and closes on Escape.
- Client-side navigation changes URL and title.
- Product search filters.
- The product page shows only verified facts (no ingredients, nutrition or shelf-life text) and the Amazon link.
- The video player loads `youtube-nocookie` only on click.
- The Dahi Vada card carries its image-verified "¼ tsp".
- The store locator's country and text filter works.
- Retired URLs redirect.
- PDF and ZIP downloads return 200.
- Reduced motion shows content without the cover.
- There is no horizontal overflow at 320 px on 7 templates.
- **Every one of the 450+ sitemap URLs returns 200**, on both projects.

## 2. Visual validation against the reference

Method: stepped-scroll captures of the build (1440×900 and 390×844) compared with captures of the reference at the same viewports and with the supplied recording. Each round fixed the largest discrepancy and re-captured.

| Round | Largest discrepancy found | Fix |
|---|---|---|
| 1 | Home badge filled the viewport because GSAP overwrote its positioning transform | Split positioning and animation layers |
| 1 | Packs too small relative to the reference jars | Marquee pack width raised to about 0.78 of the spacing |
| 1 | Footer top clipped by a sticky curtain taller than the viewport | Replaced with a scroll-linked lift (M21) |
| 1 | Display words broke mid-word on mobile ("WORL/DWIDE") | Mobile type caps, `overflow-wrap: normal` |
| 2 | Tab bar rendered at the top (sticky-bottom misuse) and threw on the `#5-minute-breakfast` selector | Fixed bottom-centre bar with `getElementById` |
| 2 | Timeline stacked cards rendered black (`filter: none` tweened as `brightness(0)`) | Explicit `fromTo` |
| 2 | Recipe card titles overflowed at 320 px | `min-width: 0` and wrap |
| 3 | Home packs too high and the badge too low compared with the reference first frame | Packs at 54% height, badge raised; matches the reference composition |
| 3 | Hero cards loaded already at full bleed (trigger already passed) | Cards visible at load scrub from scroll 0, inset about 40 px at 1440 |
| 3 | PDP pack started over the title; the reference shows only the jar cap at load | Pack starts lower and rises 120% over the title |
| 3 | Display caps visibly shorter than Ivy Mode at equal size | Hero scale ×1.12 |
| 4 | "WE'RE WORL/DWIDE" at 768 px (display cap applied only below 600 px) | Display size capped at 12.4vw at every width |

Matched against the reference, verified on the captures:

- page-opening composition: centred mark, MENU pill, huge centred caps title;
- menu staircase, rules, ◆ on the active item and the orange panel;
- PDP layout: title, side labels, ◆ lead, ruled spec row, "The other products" grid;
- expanding inset hero card;
- sticky tab bar;
- colour-flood range band;
- stacked sticky cards;
- falling-shape contact page;
- footer giant two-line wordmark (caps plus italic);
- drag galleries.

## 3. Remaining differences and unresolved issues

**Motion and visuals**

1. **No WebGL label spin and no shared-element pack morph (M9).** Packs are flat, so they turn in 2D. Product links use the cover transition. See the design direction §9.
2. **Fonts are substitutes.** Ivy Mode and IvyStyle Sans are Adobe-licensed to the reference, so Fraunces and Figtree were chosen by side-by-side render. Swapping in Adobe Fonts later is a one-line token change if Eastern licenses them.
3. **Hero card overlay titles.** Campaign banners carry baked-in headlines, so most lead images have no typeset overlay. Plain photography from Eastern would allow the reference treatment everywhere.

**Content and assets**

4. **47 packs exist only at 548×600.** They are slightly soft at the largest PDP size on retina screens.
5. **The logo SVG is a trace**, accurate at UI sizes. Replace it with master artwork.

**Process**

6. **Motion timings were judged from 8 fps recording frames and bundle constants**, not measured frame by frame in the live reference for every effect.
7. **Not tested:** real devices (only emulated), Safari and Firefox (Chromium only), and screen-reader runs (semantic structure, labels and keyboard paths were checked in code and e2e).

## 4. Content completeness and intentional exclusions

See `eastern-content-migration-checklist.md`, which is generated from the shipped data and lists a status per item.

Exclusions:

- test pages;
- WooCommerce cart, shop and account pages, and the broken account system;
- the game (which leaks database details);
- the empty digital-brochure and featured-recipes pages, and the featured-products page that returns 500;
- slider CMS pages;
- the "SALE!" badge;
- blocks hidden on the live homepage;
- the Olan cookbook method (a duplicate of Avial's);
- analytics, pending consent.

Each has a rationale in the inventory §4–§6 and a redirect where a URL existed.

## 5. Questions for Eastern (blocking launch-readiness, not the build)

1. Confirm the Arabic Range packs (Kabsa Masala 80 g and Shawarma Masala) and supply product details (I2).
2. The Chicken Masala "BUY NOW" link points to Chilly Chicken Masala on Amazon (I3).
3. Duplicate pack images: fish-masala and fish-masala-2, sambar-masala and sambar-powder (I4).
4. Supply the correct Olan method (I17), and say whether the cookbook typos should be corrected (I19).
5. Which contact details are current: 1800 425 5122 / feedback@ addresses, or 0484 300 1100 / socialise@ (I6)?
6. The `/game/` page exposes a database host and username in a PHP error (I8). Fix it on the current host now.
7. The privacy policy contains the template text "www.website.com" (I10). Needs legal review.
8. Should the Quality & Food Safety Policy PDF be published (it was hidden on the homepage)?
9. Analytics and consent: re-enable GTM-MC3T83F?
10. Master assets: hi-res pack renders for 47 SKUs, vector logo, and plain food photography.

## 6. Definition of done: status

| Criterion | Status |
|---|---|
| Existing site inventoried | Done (494 URLs crawled, 753 assets) |
| All pages and categories accounted for | Done (unit test: 442/442 sitemap URLs) |
| Every product migrated or omission documented | Done (141 + 2) |
| Descriptions and specifications preserved | Done (pack strings and links verbatim; no invented specs) |
| Recipes, cookbook, company, dealer and contact info | Done (cookbook transcribed and image-verified) |
| Navigation and functions preserved or replaced | Done (checklist §5) |
| Reference inspected | Done (live site, bundles, 86.5 s recording) |
| Recording inspected | Done |
| Reference patterns reconstructed | Done, except the M9 morph and WebGL spin (documented) |
| Eastern identity recognisable | Done (unaltered logo, brand orange, real packs and campaigns) |
| Templates implemented | Done (17 templates, 520 pages) |
| Centralised content model | Done (`src/content`) |
| Assets accounted for | Done (`eastern-asset-inventory.md`) |
| Navigation and interactivity work | Done (e2e) |
| No fabricated claims | Done (unit tests guard source parity) |
| Desktop, tablet and mobile validated | Done. 1440, 768 and 390 captured and fixed; 320 tested for overflow. A display-type break found at 768 was fixed. |
| Motion purposeful and accessible | Done (reduced-motion paths, e2e) |
| No major visual discrepancies unaddressed | The remaining ones are listed in §3 |
| Completeness checked against the inventory | Done |
| Tests, type checks and build pass | Done |
| Documentation complete | Done |
