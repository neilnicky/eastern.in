# Reference analysis: Agrumea Farm

Reference: https://www.agrumeafarm.it/en (inspected 2026-10-15).

This document reverse-engineers the reference as a working specification for the Eastern rebuild. Every claim is tagged with the evidence it rests on:

- **[REC]**: the supplied screen recording, `~/Media/Screenshots/Screen Recording 2026-10-15 at 3.12.11 PM.mov`. The file is 86.5 s at 3600×2260 and 120 fps. It was inspected as 1 fps contact sheets plus 8 fps sheets around the loader (0–3 s), the menu (31–34 s and 49–52 s) and the product transition (10–13 s). The filename contains a narrow no-break space before "PM".
- **[LIVE]**: headless Chromium captures of 8 routes at 1440×900 and 390×844. Captures use stepped wheel scrolling of 0.75 viewport with a 1.1 s settle between steps. They include computed styles and `:root` custom properties.
- **[CODE]**: the production Nuxt bundles (`/_nuxt/*.js`, 49 chunks) and the Typekit CSS, read for library names, easing curves and configuration constants.

Anything not covered by one of these is marked **inferred**.

---

## 1. Sitemap and page types

| Route (EN) | Page type | Height @1440 | Notes |
|---|---|---|---|
| `/en` | Home: a single fixed viewport. Wheel input drives a jar marquee. | 900 px [LIVE] | The `h1` is visually hidden. The visible elements are the badge, the jars, "Scroll to discover" and the "Privacy & Cookies" link. |
| `/en/dispensa` (Pantry) | Category overview | 11 079 px | Contains 4 category sections and a sticky tab bar. |
| `/en/dispensa/<slug>` ×10 | Product detail | 4 831 px | `marmellata_arancia`, `fregole_bacche`, `gelsi_neri`, `pera_cannella`, `smeralda`, `mennulata`, `smeraldo`, `caponata`, `pestorosso`, `cipolla` [CODE: anchor list] |
| `/en/produzione` | Production (editorial and tables) | 7 318 px | |
| `/en/experience` | Experiences (stacked cards) | 7 032 px | |
| `/en/chi-siamo` | About | 9 286 px | |
| `/en/contatti` | Contact (single screen with physics) | 900 px | |
| `/en/privacy` | Legal | — | |
| External | Shop at `riblo.it/agrumea-farm/` | — | Linked from the menu and footer. |

The site has two locales, IT (default, `/`) and EN (`/en`), with an IT/EN toggle top-left. `hreflang` alternates are present [CODE].

## 2. Global chrome

### Header [REC, LIVE]

- The logo mark plus "AGRUMEA Farm" wordmark sits centred at the top, 126–152 px wide (`--header-logo-width: clamp(126px,10vw,152px)`).
- Top-right is a pill button reading "MENU" with an orange dot. When the menu is open it becomes "CLOSE" with an ×. Each letter is rendered twice (`M M E E N N U U` in the DOM) to support a vertical letter-roll on hover [LIVE text dump].
- Top-left is the IT / EN pill toggle.
- The header does not hide on scroll. It stays fixed and transparent, with no background bar [REC 0:13–0:30].
- Bottom-left is a fixed "Privacy & Cookies" text link on the home and contact screens.

### Menu overlay [REC 0:31.75–0:33.5, 0:49.5–0:52, 1:00–1:02]

1. **Open.** A full-viewport red-orange panel (≈ `#d93a1f`) wipes **down from the top**. The leading edge is straight. Duration is ≈ 0.35–0.4 s, easing in-out.
2. **Items.** Four huge serif uppercase links: HOME, PANTRY, PRODUCTION, EXPERIENCE.
   - They are laid out as a **staircase**: each successive item is indented further right, and the last item is right-aligned.
   - A thin rule separates each item.
   - Each line reveals with a per-character clipped rise ("textveil"), staggered ≈ 60–80 ms per line. The rules draw left-to-right.
   - The current page carries a small ◆ diamond after its label.
   - Secondary links (About, Contacts, Shop ↗) sit in small type bottom-left.
3. **Item hover.** The label's characters roll vertically and are replaced by a duplicate set from below, staggered per character [REC 0:32.6–0:33.2].
4. **Navigate.** A deep plum panel (`#762530`) rises from the bottom over the menu (0:33.3 → 0:33.75). The new page then reveals underneath.
5. **Close.** The panel wipes back up. Items fade and drop first.

### Page transition [REC, CODE]

- CSS variables: `--page-transition-duration: 1.8s`, `--page-cover-duration: .9s`, `--page-lift-duration: 975ms`.
- Named eases: `Pagtrans` / `pagein` = `cubic-bezier(.645,.045,.355,1)` (`--ease-premium`).
- The sequence is: a plum cover panel slides up to fill the viewport, the route swaps under it, then the cover lifts away to reveal the new page. The new page's hero title then plays its text-reveal.
- Product → product detail is a special case:
  - The clicked jar **persists**, acting as a shared element: `--page-jar-exit-duration: .42s`, `--page-jar-fade-duration: .35s`.
  - The other jars fade out [REC 0:10.25–0:10.6].
  - The jar slides to bottom-centre while the title reveals line by line.

### Footer [REC 0:23–0:24, LIVE]

- A full-width plum (`#762530`) block. It is revealed by the page scrolling away from it: the footer sits underneath with a parallax lag, giving a "curtain lift" effect. **Inferred** from the motion.
- A huge two-line wordmark, "AGRUMEA" in caps and "Farm" in italic, set in orange (`#e94e1b`) at roughly 14–16 vw.
- A bottom grid with these columns:
  - the logo mark, copyright, company name and VAT;
  - nav links (Home, Pantry, Production, Experience, About · Contacts, Shop);
  - Registered office and Operational office;
  - "Follow us @instagram";
  - a contact line followed by the email in orange.
- "Privacy & Cookies" sits at the very bottom.

## 3. Visual design system [LIVE `:root`, Typekit CSS]

### Colour

| Token | Value | Use |
|---|---|---|
| `--color-white` | `#fdf3eb` | Page background (warm cream) and light text on dark |
| `--color-border` | `#762530` | Plum: body text, rules, footer and transition cover |
| `--color-orange` | `#e94e1b` | Display titles, accents, active pills, email links |
| `--color-yellow` | `#f39200` | Experience section background |
| Menu red | ≈ `#d93a1f` | Menu overlay (sampled from [REC]) |
| Savoury purple | ≈ `#2a0f2e` → `#5a1f5c` gradient | "SAVOURY" section background (sampled) |
| Product tile | ≈ `#fde4d3` | Product grid tile background (sampled) |

The palette is cream, plum and orange, with category-specific colour floods (jar label colours) on product-tile hover.

### Typography

- **Display: Ivy Mode** (`ivymode`, Typekit, weight 400). This is a high-contrast serif used in uppercase only.
  - `--text-hero: clamp(4.1rem, 2.65rem + 5.95vw, …)` gives about 150 px at 1440.
  - `--text-display: clamp(4rem, 2.9rem + 11vw, …)` gives about 205 px at 1440, used for SAVOURY / VISION / the footer wordmark.
  - Line-height 1 (`--line-height-s`), tight. No letter-spacing on display sizes.
  - Small uppercase eyebrows are set in Ivy Mode at 13 px with letter-spacing 0.1em (1.3 px).
- **Text: IvyStyle Sans** (`ivystyle-sans`, weights 400 and 600). Body is 16 px / 1.3.
  - Intro paragraphs are centred, about 18–20 px (`--text-medium`), and capped near 640 px.
  - Labels ("USEFUL TIPS", "AVAILABLE WEIGHTS") are uppercase 600 at 10–11 px in orange.
- **Fallbacks:** "Iowan Old Style", Palatino for the serif; "Avenir Next", Helvetica Neue for the sans.

### Layout and spacing

- A 12-column grid. `--grid-gap-x: clamp(12px,1.45vw,30px)`, container padding `clamp(30px,2vw,40px)`.
- Spacing tokens: `--space-s 2.5rem`, `--space-xs 3.75rem`, `--space-l 6.25rem`, `--space-xl clamp(6rem, 12.5rem)`.
- `--border-round: 15px`. Image cards have about 12–15 px radius. Product tiles are square-cornered with a soft tint.
- Section rhythm: big centred title → generous gap → content. ◆ diamonds bracket centred intro paragraphs as typographic punctuation [REC 0:14, 0:36, 0:53].

### Image treatment

- **Hero image card**:
  - The page title is set huge above an inset rounded image (left and right margins about 15 px).
  - On scroll the image **expands to full-bleed** and the overlay headline fades in white ("OUR LAND, ONE JAR AT A TIME.", "THE BOUNTY OF OUR LAND", "A TREASURE GUARDED SINCE 1968").
  - Evidence: [REC 0:34–0:36, 0:52–0:53, 1:02–1:04] and [CODE: `expandStart "top top"`, `expandEnd "+=100"`, `scrub:true`].
  - The image also parallaxes `yPercent -10 → 10` [CODE].
- **Drag gallery**: horizontal strip of rounded landscape photos (≈ 3:2), centre-weighted, with the neighbours peeking at both edges. A custom cursor pill reads "● DRAG" [REC 0:16–0:21]. The keyboard instruction "Use the left and right arrow keys to browse the photos." is present [LIVE].
- **Product tiles**: the jar is centred on a pale peach tile. On hover the tile floods with the product's colour, cut-paper fruit silhouettes burst out behind it, and the jar tilts. A cursor pill reads "● DISCOVER THE PRODUCT" [REC 0:22–0:28].
- **Flat silhouettes**: cut-paper fruit and vegetable shapes (tomato, aubergine, blackberry, pear, lemon, fig, orange, strawberry) in brand colours. They appear in About, Contact and the product hovers.

### Controls

- Pills are fully round, with a 1 px outline in plum or a filled orange when active (category tab bar, weights). This is the only place pills appear.
- The sticky **category tab bar** floats bottom-centre on Pantry and Production. It has a white pill container with a shadow. The active tab is filled orange and changes as sections pass [REC 0:37–0:48, 0:54–0:59].

## 4. Page-by-page composition

### Home (`/en`) [REC 0:00–0:10, LIVE]

1. **Loader** (0–0.4 s): a red panel retracts upward, revealing cream. A thin red progress bar runs at the top of the first frame.
2. **Badge** (0.1–0.9 s): a large plum **octagon/rounded polygon** rises from below the fold edge and darkens (opacity 0.2 → 1).
   - Ivy Mode circular text "WE GROW · WE PRESERVE ·" runs along its upper perimeter in orange.
   - The badge is clipped by the viewport bottom: only the top ~40% is visible.
   - [CODE] `--jar-badge-intro-y`, `--jar-badge-intro-rotation: -18deg`, opacity 0 → 1.
3. **Logo** fades in at 0.6–0.9 s.
4. **Jar marquee** (from 1.25 s): about 10 jars fade and scale in along a slightly tilted horizontal line. Each jar has a random tilt (`[-.053,.043,-.024,.057,-.048,.029,-.038,.053]` rad, about ±3°) [CODE].
   - Desktop shows 4 per row with the centre jar larger. Tablet and mobile show 3, with 1 centred on mobile [CODE: `e/(h||c?3:4)`].
   - Wheel or touch input moves the marquee horizontally (infinite loop) with spring physics:
     ```
     velocity += ((target - value) * k - velocity * 9) * dt
     ```
   - The badge rotates with travel via `--jar-circle-rotation`.
   - The jars are **three.js**: an orthographic camera, with each jar label texture mapped onto a `LatheGeometry` cylinder (`CYL_WIDTH .885`, `CYL_CURV 3°`) over the jar photo. Scrolling spins the label around the jar.
5. **Hover** on a jar shows the cursor pill "● DISCOVER THE PRODUCT". **Click** triggers the shared-element PDP transition.
6. "SCROLL TO DISCOVER" sits bottom-centre in small caps.

### Product detail (`/en/dispensa/marmellata_arancia`) [REC 0:10–0:31, LIVE]

1. **Title** "ORANGE MARMALADE": 2 lines of Ivy Mode about 150 px, orange, centred.
   - Small two-line labels sit at the left ("Marmelade and Jams", the category) and right ("Made in Sicily – Italy").
2. **The jar sits under and overlaps the title.** Its cap starts at about 75% of viewport height.
   - On scroll it rises over the title, rotating (tilt about −20° → +20°) while the label spins (WebGL).
   - Evidence: [REC 0:12.3–0:13] and [CODE `setSpin(progress)`, `--ph`].
   - This is a **scrubbed** effect over about 1.5 viewports, `pin:… pinSpacing:false`.
3. ◆ followed by a centred description paragraph (about 18 px) containing the ingredients, then "*organic", then ◆.
4. **Spec row**: three columns separated by vertical rules.
   - USEFUL TIPS: text.
   - AVAILABLE WEIGHTS: round pills "240 g" and "1.2 kg".
   - SHELF LIFE: "36 months".
   - On mobile the columns stack vertically, centred [LIVE m-].
5. **Drag gallery** of lifestyle photos (about 5 images).
6. **"THE OTHER PRODUCTS"**: a title, then a 4-up row of product tiles (horizontally scrollable when there are more).
7. Footer.

### Pantry (`/en/dispensa`) [REC 0:34–0:49, LIVE]

1. Title "PANTRY" above an inset image card. The card expands to full-bleed with the overlay "OUR LAND, ONE JAR AT A TIME." (white, Ivy Mode about 64 px, 2 lines).
2. ◆ intro paragraph ◆.
3. **Sections**, one per category:
   - Title (2 lines, about 100 px orange).
   - A two-column row: rounded image on the left (about 55%), and on the right a small paragraph plus "AVAILABLE WEIGHTS" pills.
   - A 4-up product tile row.
4. **SAVOURY** is a colour-flood variation:
   - A full-width dark purple panel with rounded top corners rises over the page.
   - "SAVOURY" is set at display size in cream.
   - A jar pokes up from below and then a full-bleed product hero image fills the panel [REC 0:41–0:42].
5. **MONO PACK**: an image card plus a **spec table** (Product | Shelf life | Weight). Rows are separated by thin plum rules.
6. A sticky bottom tab bar (Jams · Creams · Savoury · Mono Pack) tracks the active section. Clicking a tab smooth-scrolls to it.
7. A closing full-bleed lifestyle image, then the footer.

### Production (`/en/produzione`) [REC 0:51–0:59, LIVE]

- "PRODUCTION" title, then the image card expanding with "THE BOUNTY OF OUR LAND" overlaid.
- ◆ intro ◆.
- "CITRUS FRUITS" title with a char reveal, then a paragraph, then an h3 "CRATES / BOX DA: 10KG".
- **Availability table** (Product | Availability), then the drag gallery.
- "PISTACHIOS & ALMONDS", then an h3 "VACUUM-PACKED / AVAILABLE ALL YEAR ROUND", then a table (Product | Weight | Pcs × ctn), then a drag gallery.
- Sticky tab bar: Citrus Fruits · Dried Fruits.

### Experience (`/en/experience`) [REC 1:02–1:11, LIVE]

- Hero card expands with "AN EXPERIENCE OF PLACES AND FLAVOURS". The image is darkened with a plum multiply.
- ◆ intro ◆.
- **Yellow (`#f39200`) section** "DISCOVER OUR EXPERIENCES" (3 lines).
  - Side eyebrows "HARVESTING & TASTING" and "FLAVOURS & TASTINGS" parallax in opposite directions (`-110 ↔ 110` px) [CODE].
- **Stacked sticky cards** 01. 02. 03.:
  - Each card is white and rounded, about 70% wide. A square photo sits on the left.
  - On the right: a big orange index ("01."), a title in Ivy Mode caps with a bracketed subtitle, and DURATION, THE EXPERIENCE and WHAT'S INCLUDED in small columns.
  - As the next card scrolls up, the previous one scales down slightly, tilts (about −2°) and greys out behind it.
  - Evidence: [CODE timeline `end: +=(n-1)*innerHeight`, `pin`].

### About (`/en/chi-siamo`) [LIVE]

- "ABOUT", then the hero card expanding with "A TREASURE GUARDED SINCE 1968".
- ◆ story paragraph ◆.
- **Silhouette scene** (pinned): large flat shapes (tomato, pear, aubergine, blackberry) move and scale around a small centred tagline "IT'S NOT JUST A BRAND, BUT A PROMISE THAT HAS BEEN KEPT OVER TIME."
  - Evidence: [CODE: `dataset.pauseScale`, `pin:f`, `end:+=1.5*innerHeight`].
- ◆ paragraph ◆.
- "VISION" at display size in cream over a full-bleed sky photo, with a small caption "Growing the future, starting from the earth."
- A pinned jar photo scales down into an inset card. Then the footer.

### Contact (`/en/contatti`) [REC 1:23–1:26, LIVE]

- Two columns. The left half holds the **falling fruit silhouettes**. These are **Matter.js** bodies that drop from above, pile up with gravity and stay draggable [CODE: `matter-js`, `Bodies`].
- The right half holds:
  - "CONTACT" (Ivy Mode about 90 px, orange);
  - a lead sentence in serif about 22 px;
  - three small columns: Registered office · Operational office · Follow us;
  - a paragraph, then the email in orange.
- The whole page is a single screen, with the footer omitted.

## 5. Motion inventory

| # | Motion | Trigger | Properties | Duration / easing | Scroll/pointer | Responsive | Interrupt/reverse | Evidence |
|---|---|---|---|---|---|---|---|---|
| M1 | Loader wipe | first load | red panel `translateY 0 → -100%` | ≈0.4 s, ease-in-out | — | same | n/a | REC 0:00–0:375 |
| M2 | Badge intro | after M1 | `y +23px→0`, opacity 0→1, rotate −18°→0 | ≈0.8 s, `--ease-soft (.22,1,.36,1)` | — | same | — | REC, CODE vars |
| M3 | Jar intro | after M2 (≈1.2 s) | opacity 0→1, scale .9→1, staggered | ≈0.6 s | — | 3/4 per row | — | REC 1.25–1.9 |
| M4 | Jar marquee | wheel/touch | x travel, badge rotation, label spin | spring k with damping 9 (critically damped feel) | wheel delta → target | count by width | continuous | CODE |
| M5 | Text veil reveal | element enters viewport / page in | per-char `yPercent 100→0` inside line mask | ≈0.95–1 s, `textveil (.165,1,.32,1)`, stagger ≈0.02 s/char | IntersectionObserver-like (ScrollTrigger) | same | plays once | CODE `data-text-reveal`, REC |
| M6 | Menu open | MENU click | panel `yPercent -100→0`; items per-char veil; rules scaleX 0→1 | 0.4 s panel + 0.6 s items; `linedraw (.65,.05,.36,1)` for rules | — | items stack smaller on mobile | close reverses at higher timeScale | REC, CODE `timeScale(Qb)`, `reverse()` |
| M7 | Menu item hover | pointerenter | chars roll y −100% / dup from 100% | ≈0.4 s, stagger 0.015 | pointer | hover-capable only | reverses on leave | REC 0:32.6 |
| M8 | Page cover | internal link | plum panel up (cover), swap, lift | 0.9 s cover + 0.975 s lift, `.645,.045,.355,1` | — | same | — | CODE vars, REC 0:33.3 |
| M9 | PDP shared jar | jar click | other jars fade (.35 s); clicked jar moves to bottom-centre (.42 s exit) | as left | — | — | — | REC 0:10–0:11, CODE |
| M10 | PDP jar rise | scroll | jar `y`, `rotate`, label spin | scrubbed over ≈1.5 vh, linear (`ease:none`) | scroll | — | reversible (scrub) | REC 0:12–0:14, CODE |
| M11 | Hero card expand | scroll from top | clip/inset → full-bleed, radius → 0; overlay title fade | scrubbed `top top → +=100…` | scroll | same | reversible | CODE `expandStart/End`, REC |
| M12 | Image parallax | scroll | `yPercent −10 → 10` | scrub, `ease:none` | scroll | ≥481 px only | reversible | CODE `matchMedia("(min-width: 481px)")` |
| M13 | Drag gallery | pointer drag / arrows | x translate with inertia; custom cursor "DRAG" | release momentum (inferred) | pointer | touch swipe | — | REC 0:16–0:21, LIVE aria text |
| M14 | Product tile hover | pointerenter | tile bg colour flood; silhouettes scale/rotate in; jar tilt ≈ −6° | ≈0.5 s, soft ease | pointer | none on touch | reverses on leave | REC 0:25–0:28 |
| M15 | Cursor pill | pointer over interactive media | follows pointer with lag; label swaps (DISCOVER THE PRODUCT / DRAG) | lerp follow | pointer | hidden on touch (`hover:hover and pointer:fine`) | — | REC, CODE media query |
| M16 | Sticky tab bar | scroll | active pill moves to current section; click scrolls | ≈0.3 s | scroll | same, smaller | — | REC 0:37–0:59 |
| M17 | Colour-flood section | scroll into | rounded panel rises, display title, jar rises | scrubbed | scroll | — | reversible | REC 0:40–0:42 |
| M18 | Stacked cards | scroll | card n+1 slides over; card n scales ≈.92, rotate ≈−2°, dims | pinned, scrubbed `(n−1)·vh` | scroll | stacked flow on mobile (inferred) | reversible | CODE, REC 1:06–1:11 |
| M19 | Silhouette scene | scroll | shapes translate/scale toward centre then release | pinned 1.5 vh | scroll | — | reversible | CODE, LIVE |
| M20 | Falling shapes | page load | Matter.js gravity, collisions, drag | physics | pointer drag | fewer bodies on mobile (inferred) | — | CODE, REC 1:23 |
| M21 | Footer curtain | scroll to end | footer revealed beneath content with lag | scroll-linked | scroll | — | reversible | REC 0:23, 0:29 |
| M22 | Smooth scroll | always | Lenis, `lerp .1`, `smoothWheel true`, `syncTouch false` | — | wheel | native touch | — | CODE Lenis constructor defaults |

`prefers-reduced-motion` is read by the jar slider (`Re=window.matchMedia("(prefers-reduced-motion: reduce)")`) [CODE]. I did not verify how each effect degrades.

## 6. Implementation evidence (libraries)

Found in the bundles [CODE]:

- **GSAP** with ScrollTrigger, CustomEase and Flip (a `Flip` string is present). The named CustomEases are:

  | Name | Curve |
  |---|---|
  | `Pagtrans`, `pagein` | `.645,.045,.355,1` |
  | `linedraw` | `.65,.05,.36,1` |
  | `textveil` | `.165,1,.32,1` |
  | `headermark` | `.22,1,.36,1` |

  CSS adds `--ease-out-expo .16,1,.3,1`, `--ease-don-expo .19,1,.22,1` and `--ease-don-power .165,.84,.44,1`.
- **Lenis** smooth scroll (default `lerp .1`).
- **three.js**: an orthographic jar renderer using `LatheGeometry` and `MeshStandardMaterial` with a spot light.
- **Matter.js**: the contact-page physics.
- A **custom text reveal system**: splits into chars with a `--fp-char-index` variable and is enabled via `html.is-text-reveal-enabled`.
- The framework is **Nuxt 3** with `_payload.json` hydration. Fonts load from Typekit (`yey3ruw`).

## 7. Responsive behaviour [LIVE m-*]

- The header keeps the logo centred. The MENU pill shrinks. The IT/EN toggle stays.
- Home: 3 jars across, the centre one in focus. The badge is smaller with the text still legible. "SCROLL TO DISCOVER" moves into the badge.
- PDP: the title drops to about 2 lines at about 46 px. The category label moves above the title. The spec row stacks into centred blocks, each with its own rule.
- Galleries: one image about 85% wide with the next peeking.
- Footer: the wordmark is about 20 vw. Columns go to 2-up, then stack.
- The tab bar remains bottom-centre and narrower.

## 8. What Eastern takes from this, and uncertainties

What Eastern adopts:

- the global chrome: centred mark, MENU pill, menu staircase and cover transition;
- the type system: a display serif in caps with ◆ punctuation;
- the expanding hero card;
- the sticky category tab bar;
- product tiles with colour flood;
- the PDP title/pack overlap with the scroll rise;
- drag galleries;
- stacked cards;
- falling shapes on Contact;
- the curtain footer.

How each maps onto Eastern content is set out in `docs/design-direction.md` and `docs/eastern-page-mapping.md`.

Uncertainties:

- **WebGL label spin.** I could not inspect the label textures. The Eastern packs are mostly flat boxes and pouches, so a cylindrical label wrap does not apply. I replace it with a 2D tilt and perspective rotation; see the design direction.
- **Exact spring constants for the marquee.** The constants are minified. The observed feel is critically damped, settling in about 0.6 s.
- **Footer curtain mechanics.** The parallax footer is inferred from the motion, not from code.
- **Mobile physics body count on Contact.** Not observed.
- **The Italian locale was not inspected beyond confirming that it exists.** Eastern has a single locale (English), so it is not needed.
