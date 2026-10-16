# Design direction: Eastern

**Principle: faithful reconstruction, Eastern content.**

- The reference's layouts, section geometry, type scale, spacing tokens, easing curves and choreography are reproduced as measured.
- Eastern supplies the logo, the colour, every word, every image and every product.
- Departures happen only where Eastern's content or the brief forces them, and each one is listed in §9.

The reference decides **how the site moves and is composed**. Eastern decides **what it says and how it looks**. This document records the decisions that translate one into the other. Every decision rests on the audit (`eastern-existing-site-inventory.md`) or on the reference analysis (`reference-analysis.md`).

## 1. Brand identity: what must stay recognisable

| Element | Source | Treatment |
|---|---|---|
| Logo: white italic "Eastern" on an orange flag with a wavy bottom edge, plus a green leaf | `2025/02/Eastern-Logo-withTM.png`; timeline 2024, "Unveiling the New Logo" | Used **unaltered** as the header mark and on the loader. I traced it into an SVG outline (`src/assets/brand/eastern-logo.svg`) so it stays crisp. Shape, proportions and colours are kept, and the ™ is kept. |
| Brand orange `#FF4F02`, leaf green `#67C04D` | Sampled from the logo PNG | Orange is the signature fill: menu overlay, loader, badge text and accents. The leaf green appears only inside the logo. |
| The flag silhouette (rounded top, wave at the bottom) | Logo shape | Kept in the logo only. The home badge is a minimal hairline ring instead (client feedback, 2026-10-16). |
| Product names, category names, pack wording | Product pages and menus | Used verbatim. "whole spices" is capitalised for display only. |
| Brand lines | Visible site copy | "Perfect taste partner since 1983", "No added flavours", "40 + Years of Trust", "30+ Awards", "22+ countries", "Your Friend in everyday life", "Life is the combination of Magic and Food". Used verbatim, nothing invented. |
| Campaign photography: warm Kerala kitchens, brass uruli, banana leaf | 2025 web banners | Used as the hero image cards. Their baked-in headlines act as the overlay titles, so I add no type over them. |
| Pack design | 141 pack shots | Shown complete, never recoloured. White backgrounds are removed (alpha cutout, shadows kept) so packs can float the way the reference's jars do. |

**What deliberately changes.** The 2016-era template look goes: grey footer, Domine headings, Bootstrap cards, image sliders, the side social rail. The brand itself stays intact.

## 2. Tokens

### 2.1 Colour

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--cream` | `#FBF2E6` | Page background (warm, a turmeric-tinted relative of the reference's `#fdf3eb`) | — |
| `--clove` | `#3B160F` | Text, rules, footer, transition cover. Plays the role of the reference's plum. | 14.5:1 on cream |
| `--clove-soft` | `#7A4A3A` | Secondary text | 6.6:1 on cream |
| `--orange` | `#FF4F02` | Brand fills: menu, loader, badge, active pills. **Never small text on cream.** | 2.97:1 (fill only) |
| `--orange-ink` | `#E04400` | Display titles ≥ 40 px (the reference's orange titles) | 3.8:1, AA large |
| `--orange-text` | `#C93D00` | Small orange labels and links | 4.6:1, AA |
| `--turmeric` | `#F2A20C` | Colour-flood section (History) | clove on it 7.6:1 |
| `--leaf` | `#67C04D` | Logo leaf only (not used as a UI colour) | — |
| `--tile` | `#F6E2CC` | Product tile rest state (the reference's peach tile) | — |

Product-tile hover floods use per-category colours, chosen from the pack colourways:

| Category | Hover flood |
|---|---|
| Spices & Masalas | `#B3200F` chilli |
| Breakfast and mixes | `#E8B04A` rice-gold |
| Pickles & Paste | `#6B7D1F` mango-green |
| Madhuram | `#5A2A6B` payasam-purple |
| Beverages | `#4A2A1A` coffee |
| Vermicelli | `#D88A2A` |
| Arabic | `#0F5E57` |
| GCC / Other Countries | `#1F4E79` |
| Whole Spices | `#7A3B12` |

They are defined once in `src/content/product-categories.ts`.

### 2.2 Typography

The reference uses Ivy Mode and IvyStyle Sans. Both are Adobe Fonts (Typekit) licences tied to the reference's own kit and domain, so they cannot be reused. The goal is **fidelity, not reinterpretation**. I chose substitutes by rendering candidates side by side against Ivy Mode in the browser; the comparison sheet is in the session notes:

- **Display: Fraunces Variable** at `opsz 144`, `wght 400`, `SOFT 0`, `WONK 0`, with `letter-spacing: .012em`. Of 16 Google serif candidates it matched Ivy Mode's contrast, serif shape and colour most closely. Ivy Mode sets about 4% wider, which the tracking compensates for. Italic Fraunces sets the second line of the footer wordmark, mirroring the reference's italic "Farm".
- **Text: Figtree Variable**, 400 and 600. It is the closest open match to IvyStyle Sans in width and its rounded humanist forms (compared against Instrument Sans, Albert Sans and Hanken Grotesk).
- **Scale.** The values are copied from the reference's `:root`:

  | Token | Value |
  |---|---|
  | `--text-hero` | `clamp(4.1rem, 2.65rem + 5.95vw, 999999px)` |
  | `--text-display` | `clamp(4rem, 2.9rem + 11vw, 999999px)` |
  | `--text-large` | `2rem` |
  | `--text-medium` | `clamp(1.125rem, 1.085rem + .165vw, 1.25rem)` |
  | `--text-base` | `1rem` |
  | `--text-small` | `.875rem` |
  | label | `.6875rem`, uppercase 600, tracking `.08em` |

- **Line height.** Display copies the reference's `--line-height-s: 1`. Body uses the reference's 1.3 for short copy, rising to 1.5 inside long-form legal and recipe text only, where 1.3 hurts readability over hundreds of words.
- **Domine retired.** Domine, the current site font, was a template default, not brand typography. The logotype is custom lettering and stays as the logo.

### 2.3 Space, grid, radius

- 12-column grid. `--gutter: clamp(12px, 1.45vw, 30px)`, `--pad: clamp(16px, 2vw, 40px)`. The 16 px minimum satisfies the phone gutter.
- `--space-s 2.5rem · --space-m 3.75rem · --space-l 6.25rem · --space-xl clamp(6rem, 12vw, 12.5rem)`
- `--radius: 15px` for image cards. Product tiles stay square, as in the reference.

### 2.4 Punctuation

The reference's ◆ diamond is kept, set in `--clove`. It brackets centred intro paragraphs and marks the active menu item, exactly as on the reference. I considered swapping it for Eastern's logo leaf but rejected that, because it would reinterpret a reference detail without improving anything.

## 3. Layout principles

1. **Title first, huge, centred.** Every page opens with its name in display caps at `--text-hero`, centred under the header, as the reference does.
2. **Image card then full bleed.** A page's lead image starts inset (15 px margins, 15 px radius) and expands to full bleed as the page scrolls. The campaign banners already carry headlines, so the card's "overlay title" is the banner itself. Only plain photographs get a typeset overlay.
3. **Centred intro between diamonds.** Lead copy is set at `--text-medium`, centred, at most 42 rem wide, with ◆ above and below, as on the reference.
4. **Sections are titled, not carded.** Category, history and recipe groupings use big two-line titles and open rows. They are not boxed card grids.
5. **Packs float.** Product imagery is always the cutout pack on cream or a colour flood, never a white JPEG box.
6. **One colour-flood moment per page at most.** Examples: the turmeric History section, the clove "Store locator" band, the orange menu.
7. **Real data stays tabular.** Pack sizes, store lists, the timeline archive and cookbook ingredients use the reference's ruled tables and spec rows, not marketing cards.

## 4. Image-selection rules

- Product pages: only that product's own pack image, in its best available resolution (94 of 141 have hi-res originals).
- Lead images: Eastern's own campaign banners and photography only. There is **no stock imagery**.

  | Page | Lead image |
  |---|---|
  | Products | `Web-banner-5` (authentic spices) |
  | Recipes | `Web-banner-3` (chicken curry) |
  | About | `web-banner-2` (sambar kitchen) |
  | Cook Book | the cookbook cover `ck-book.jpg` |
  | History | the archival "Eastern Trading Company" photograph |
  | Innovation Center | the Adimali factory |

- Recipes: the video thumbnail (YouTube SD, 640×480) is shown at most about 420 px wide so it isn't upscaled. Cookbook recipes use their original 1920×986 spread. The photo half is cropped (`object-position`) for cards, and the full spread is available on the recipe page.
- Low-resolution archive images (contests, events, timeline, 300–960 px) render at intrinsic size or smaller, never stretched.
- Each image is used for one purpose; no banner is repeated on more than two pages.
- Alt text comes from the visible title or baked-in headline, *verbatim*. Pack alt text reads "Eastern <Product name> pack".

## 5. Content hierarchy (navigation)

The full-screen menu follows the reference's staircase of big serif links:

- **Primary:** HOME · PRODUCTS · RECIPES · ABOUT · CONTACT.
- **Secondary:** two small link columns under the staircase.
  - Company: We at Eastern · History · Innovation Center · Events · Contests · CSR
  - Explore: Cook Book · Videos (TVCs) · Store locator · Offers T&C · Privacy · Scheme of Amalgamation
- **Category quick links:** all 16 categories as a horizontal list.

Every destination in the original header, footer and side rail is reachable from the menu or the footer; `eastern-page-mapping.md` lists them.

## 6. Motion strategy

The stack mirrors the reference's real stack (GSAP with ScrollTrigger and CustomEase, Lenis, Matter.js), so timings can be copied rather than imitated. The table maps each reference motion to its Eastern adaptation.

| Ref | Eastern adaptation | Notes |
|---|---|---|
| M1/M2/M3 loader, badge, jars | Orange panel retracts. A **minimal ring badge** rises: two hairline circles with the brand line "PERFECT TASTE PARTNER · SINCE 1983 ·" set on the ring in small tracked caps. It replaced an earlier solid clove flag badge at the client's request (2026-10-16). The packs fade and scale in. | Runs only on the first visit in a session (sessionStorage) and is skipped under reduced motion. Content is never blocked: the panel lifts after 0.75 s, and a CSS safety timeout hides it at 1.6 s even if JavaScript never runs. |
| M4 jar marquee | **Pack marquee.** Cutout packs, all in identical boxes so they read at one consistent size (no centre enlargement), ride a tilted line, about ±3° random tilt, with the same critically damped spring. Input is scroll inside a pinned hero (`ScrollTrigger`, 260 svh on desktop, 220 svh on phones), drag, wheel and arrow keys. The badge rotates with travel. | **Departure:** the reference home is a single screen. Eastern's home must keep its sections (recipes, stats, worldwide, new products, cook book), so the marquee is pinned and then releases into the page. **No WebGL label spin:** Eastern packs are mostly flat boxes and pouches, so a cylinder wrap would distort them. A 2D `rotate` plus `rotateY` (±18°) on velocity gives the same sense of turning. |
| M5 text veil | Per-character rise inside line masks, `textveil (.165,1,.32,1)`, 0.95 s, 0.018 s stagger | Applied to titles only, not body copy. The text is real text with `aria-label` on the line; the split spans are `aria-hidden`. |
| M6/M7 menu | Orange panel wipes down, clove staircase links veil in, rules draw (`linedraw`), letter-roll on hover | Focus is trapped while open. Esc closes it. Under reduced motion it becomes an instant fade. |
| M8 page cover | Clove panel up (0.9 s, `.645,.045,.355,1`), swap, lift. Built on Astro `ClientRouter` with custom lifecycle hooks. | Plain MPA navigation still works if JS fails. |
| M9 shared jar | **Not built as a shared-element morph.** Product links use the same cover transition as every other link. | A View Transitions morph combined with the cover choreography was not implemented in this pass; it is a candidate refinement. This is listed in §9. |
| M10 PDP rise | The pack sits under the giant name and rises over it with rotation −14° → 10°, scrubbed over 1.4 vh | |
| M11 hero expand | Inset card → full bleed. Radius 15 → 0. Scrubbed `top top → +=40%`. | |
| M12 parallax | `yPercent −8 → 8` on lead and gallery images, ≥ 481 px only | |
| M13 drag gallery | Pointer-drag strip with inertia, arrow keys, visible prev/next buttons, "DRAG" cursor pill | |
| M14/M15 tile hover, cursor pill | Tile floods with the category colour, **spice silhouettes** pop behind the pack, pack tilts −6°. A cursor pill reads "● DISCOVER THE PRODUCT". | Hover-capable fine pointers only (`(hover:hover) and (pointer:fine)`) |
| M16 sticky tab bar | Category bar on Products, tab bar on Cook Book (Vegetarian / Non-Vegetarian / Sweets), region bar on Store locator | Real `<nav>` of anchor links, so it works without JS |
| M17 colour-flood section | "Spices & Masalas" flagship band on Products (chilli-red flood, display title in cream) | |
| M18 stacked cards | History milestones 1983 → 2024 in the turmeric section: 11 sticky cards that scale and tilt back | Under reduced motion or on mobile they become a normal stacked list |
| M19 silhouette scene | About: Vision / Mission / Values with spice silhouettes converging | |
| M20 falling shapes | Contact: Matter.js spice silhouettes (chilli, star anise, cardamom, clove, peppercorn, turmeric root, cinnamon, curry leaf, coconut) fall and pile; draggable | Lazy-loaded only on Contact. Under reduced motion a static arranged pile shows instead. |
| M21 footer curtain | Footer revealed beneath the last section | |
| M22 smooth scroll | Lenis, `lerp .1`, with native touch | Disabled under reduced motion |

**Spice silhouettes.** Eastern's counterpart to the reference's cut-paper fruits is a set of flat, cut-paper spice shapes drawn in house as SVG in the palette: dried red chilli, star anise, cardamom pod, clove, peppercorn, turmeric finger, cinnamon quill, curry leaf, coconut half. Each represents ingredients Eastern actually sells (whole spices, straight powders, coconut-milk powder). They are decorative and `aria-hidden`.

**String Tune.** I evaluated it (string-tune.fiddle.digital, `@fiddle-digital/string-tune`). It offers native-scroll smoothing, split text, cursor tracking, progress data and sticky handling. Every one of those is already covered by GSAP and Lenis, which the reference itself uses. Adding it would duplicate the scroll engine, so it is **not adopted**.

**Reduced motion.** `prefers-reduced-motion: reduce` makes the following changes:

- Lenis off, so scroll is native.
- No pinning.
- Text reveals show immediately.
- The marquee becomes a static, horizontally scrollable row.
- Page transitions become a 150 ms fade.
- The Matter.js scene is not started.

No content depends on animation.

## 7. Product presentation

- **Products** page:
  1. "PRODUCTS" title.
  2. Expanding banner.
  3. Intro using the verbatim worldwide line.
  4. A sticky category bar.
  5. One section per category: two-line title, product count, and a tile row of the first 8 products with "All N products" linking to the category page.
  6. An instant search field that filters by name across all 143 products.
- **Category** page: title; tile grid of every product in the category; "other categories" strip; footer.
- **Product** page:
  1. Name at `--text-hero` in two lines.
  2. Side labels: the category on the left, "Eastern · Since 1983" on the right. The second is a brand line, not a claim about the product.
  3. The pack under the title, rising on scroll.
  4. Spec row:
     - PACK: the verbatim pack string as a pill, only if present.
     - CATEGORY: a link.
     - WHERE TO BUY: "Buy on Amazon ↗" if a link exists; otherwise "Find a store" → store locator.
  5. "Cook with it": linked video and cookbook recipes that name this product, if any.
  6. "The other products" in the same category.
- **No invented specifications.** The PDP never renders empty slots for ingredients, nutrition or shelf life, because none exist.

## 8. Navigation and interaction decisions

- **Header.** The logo is centred. A MENU pill (doubled letters, roll on hover) sits top-right. Top-left is "Products" as a direct quick link; it replaces the reference's IT/EN toggle, because Eastern has one language.
- **Footer.** Clove background with the giant "EASTERN" plus italic "Condiments" wordmark in orange. Columns:
  - Products: 16 categories.
  - Company: We at Eastern, History, Innovation Center, Events, Contests, CSR (local and Orkla).
  - Help: Contact, Store locator, Privacy, Offers T&C, Scheme of Amalgamation.
  - Offices: both, verbatim.
  - Follow: Instagram, Facebook, X, LinkedIn.
  - A credit line: "Eastern is a brand of Orkla India", verbatim as the contact page gives the entity "Orkla India Limited".
- **Keyboard.** Every interactive element is reachable. The menu traps focus. Galleries take arrow keys. The tab bars are links. Focus rings are a 2 px clove outline with a 2 px cream offset.
- **Touch.** No hover-only content. All targets are at least 44 px.

## 9. Intentional departures from the reference

1. The home hero is pinned and then releases (§6, M4), rather than a single screen.
2. No WebGL label wrap (§6, M4).
3. Spice silhouettes instead of fruit (§6).
4. No language toggle; a Products quick link instead.
5. Campaign banners carry their own headlines, so lead images have no typeset overlay titles.
6. Body line-height rises to 1.5 only inside long-form legal and recipe text; elsewhere it is the reference's 1.3.
7. A search field on Products and Recipes. The reference has none, but Eastern's catalogue (143 products) and recipe library (77 recipes) need it.
8. The product-click shared-element morph (M9) is replaced by the standard cover transition.
9. Data-heavy Eastern pages have no reference equivalent: the store locator, the scheme documents, CSR and privacy. They use the reference's ruled table and spec-row language for consistency.
