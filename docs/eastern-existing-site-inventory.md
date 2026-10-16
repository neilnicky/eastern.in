# Eastern Condiments: existing website inventory

Source of truth: https://eastern.in. The audit ran on 2026-10-15.

## 0. Method and access

- **Access.** The site sits behind a Prophaze bot challenge. Every URL, with or without `?prophazecheck=1`, first returns a 503 with a JS snippet. The snippet sets a `BPC` cookie and redirects to `?prophazecheck=2`. A real browser (Playwright Chromium 1.56) passes it, and plain `curl` cannot. The query parameter only selects the challenge step; **content is identical with and without it**, and the challenged and unchallenged views are the same WordPress output.
- **Discovery.** Three sources were combined:
  1. The WordPress sitemap index at `/wp-sitemap.xml`. It has 12 sub-sitemaps and 442 URLs: pages 45, products 141, product_cat 15, recipes 36, dealers 108, contests 40, timeline 23, videos 16, events 14, sliders 5, blog_post 6, category 2.
  2. A breadth-first crawl of every internal link found, which added 52 more URLs (pagination, `/arabic-range/`, `/events/`, `/products/`, `/timeline/`, `/videos/`, `/contests/`, and the `l.eastern.in` short links).
  3. The open WordPress REST API: `pages` 44, `recipes` 36, `blog_post` 6, `media` 136, `categories` 5, `tags` 26. The custom types `products`, `dealers`, `timeline`, `videos`, `events` and `contests` are **not** exposed via REST, so the crawl is authoritative for them.
- **Totals.** 494 URLs were rendered and recorded. Each record has a full-page screenshot, the HTML, extracted headings and text, images (including CSS backgrounds), links, forms, iframes and meta. 753 referenced images and documents were downloaded, plus 1 ZIP, with 0 failures. Raw data is in the git-ignored `.source-cache/`. Curated extracts are in `docs/source/`.
- **Platform.** The site runs WordPress with the "Kallyas"-derived `eastern` theme, Bootstrap 5.3.8 and WooCommerce (residual). Fonts are Domine (Google Fonts) and fontello icons. It loads GTM `GTM-MC3T83F`, GA `UA-54659473-1`, Twitter and Facebook pixels, and Cloudflare.
- **Verification rule.** Every content item below carries its source URL. Text marked *verbatim* is copied exactly.

## 1. Global chrome (all pages)

### 1.1 Header

- **Logo:** `wp-content/uploads/2025/02/Eastern-Logo-withTM.png` (1050×912, PNG). It shows a white italic "Eastern" with a green leaf on the "n" and "TM", on an orange `#FF4F02` flag with a rounded top and a wavy bottom edge. The leaf is green `#67C04D`.
  - The mobile logo is `2023/03/mob-logo.png` (269×53), which is commented out in the current markup.
  - Legacy versions are `themes/eastern/images/logo.png` and `logo-white.png`.
- **Logo info card** (hover popover on desktop), *verbatim*: "Phone: 0484 300 1100 Ext: 300 1234 · Email: socialise@eastern.in · Address: Eastern Condiments No. 34/137 A , NH Bypass, Edapally (P.O), Kochi, India 682024 · Open in Google Maps (https://goo.gl/QV4SpG)". It also links to Twitter, Facebook and LinkedIn.
- **Main menu**, *verbatim* labels. Dropdowns open on hover; the mobile version is a hamburger slide-in.
  - Home → `/`
  - Company (`#`)
    - About Us → `https://www.orklaindia.com/about-us/` (external)
    - History → `/timeline/`
  - Products → `/products/`
    - Spices & Masalas, Arabic Range, 5 Minute Breakfast, Madhuram Range, Pickles & Paste, Breakfast, Vermicelli & Macaroni, Beverages, whole spices, Breakfast Mix → each `/product-category/<slug>/`
    - IB (`#`)
      - GCC → `/product-category/gcc/`
      - Other Countries → `/product-category/other-countries/`
  - Recipes → `/recipes/`
  - TVCs → `/videos/`
  - Contact Us → `/contact/`
  - Offers (`#`)
    - Lucky Draw- Terms & Conditions → `/lucky-draw-terms-conditions/`
- **Side social rail** (fixed, right edge): Facebook `facebook.com/eastern.in`, LinkedIn `linkedin.com/company/orkla-india/`, Instagram `instagram.com/eastern_in/`.
- **Account modal** (on every page): "SIGN IN YOUR ACCOUNT TO HAVE ACCESS TO DIFFERENT FEATURES". It contains:
  - a login form (email, password);
  - a registration form (first name, last name, email, password, confirm);
  - a forgot-password form;
  - Facebook and Twitter login buttons (`/facebook/index.php`, `/twitter/index.php`).
  - All forms post back to the current URL. No page links to the modal from visible navigation (the anchors are `#login_panel`, `#user_reg_panel` and `#forgot_panel`). The features it served (`/profile/`, `/my-recipes/`, `/add-recipe/`, `/edit-recipe/`) redirect to `/` or `/login/`, and `/login/` returns 404, so **the account system is non-functional**.

### 1.2 Footer

There are three link columns:

- **About Eastern:** History `/timeline/` · Contests `/contests/` · TVCs `/videos/` · Corporate Social Responsibility → `https://www.orklaindia.com/sustainability/csr/` (external, even though `/csr-policy/` exists locally) · Contact `/contact/` · Privacy Policy `/privacy/` · Offer Terms & Conditions `/lucky-draw-terms-conditions/`.
- **Products:** Spices & Masalas · Arabic Range · 5 Minute Breakfast · Madhuram Range · Pickles & Paste · Beverages · whole spices · Vermicelli & Macaroni.
- **Cook Book:** Vegetarian `/vegetarian/` · Non-Vegetarian `/non-vegetarian/` · Sweets `/sweets/`.

The bottom line reads "© 2026 Eastern." and "Developed By Ideenkreise Tech Pvt Ltd." (agency credit, `ideenkreisetech.com`). A back-to-top "TOP" link follows.

### 1.3 Metadata (sitewide)

- `<title>` takes the form "Eastern Condiments | <Page>". The homepage title is "Eastern Condiments | India's No.1 Spice Exporter".
- `meta description`: "Eastern Condiments - India's No.1 Spice Exporter" (identical on every page).
- `meta keywords`: "eastern, condiments,eastern curry powder, eastern spices".
- `og:image` is the theme `logo.png`. `og:url` is empty. `fb:pages` is `128848983881453`.
- The favicon is `themes/eastern/images/fav-icon.png`.

## 2. Page-by-page inventory (top-level pages)

Status legend for the Migration column:

- **Keep**: rebuilt with the content preserved.
- **Merge**: content folded into another destination, with a redirect.
- **Retire**: intentionally excluded; the rationale is given in §5.

The planned destinations are detailed in `eastern-page-mapping.md`.

### `/` Home ("Eastern Condiments | India's No.1 Spice Exporter")

- **Purpose:** brand front door; campaign showcase; entry into recipes and products.
- **Hierarchy (visible):**
  1. **Hero slider.** An iOS-slider with 5 slides, arrows, no captions and no links. The headlines are baked into the artwork, *verbatim*:
     - `2025/05/Web-banner-1.jpg`: "Add a perfect, Creamy Touch to every dish" (Coconut Milk Powder).
     - `2025/05/web-banner-2.jpg`: "Your Perfect Sambar Starts with Eastern" (Thani Nadan Sambar Powder and Sambar Powder).
     - `2025/04/Web-banner-3.jpg`: "The Secret to irresistible Chicken Curry" (Chicken Masala).
     - `2025/03/Web-banner-4.jpg`: "From pack to Palada in 5 minutes" (5 Minute Madhuram Sadya Palada Payasam Mix).
     - `2025/02/Web-banner-5.jpg`: "Bring Home the Essence of Authentic Spices" (Kashmiri Chilli, Chilli, Coriander and Turmeric Powders).
     - All five are 1920×849. Each carries the footnote "Suggested servings. Images shown are for illustration purpose only" and a vegetarian mark.
  2. **"Recipes"**: 3 video cards, each with a "Watch Now" button that opens a YouTube popup. Thumbnails are `2025/02/sddefault-11/15/16.jpg`. The cards are:
     - Biriyani x Biriyani Masala (`UOLZM_QQjf4`)
     - Chicken Masala APTS (`l6v1QB0RziQ`)
     - Fish Fry x Chilli Powder (`XYtDFeBScZ4`)
     - A "View All" button links to `/recipes/`.
  3. **Brand stats** (icon plus figure), *verbatim*:
     - "40 +" / "Years of Trust" (`2023/01/honesty.png`).
     - An image badge reading "Perfect taste partner since 1983" (`2025/02/Screenshot-2025-02-21-171410.png`, 516×248).
     - An image badge reading "No added flavours" (`2025/02/Screenshot-2025-02-21-171453.png`, 570×264).
     - "30+" / "Awards" (`2023/01/trophy.png`).
  4. **"WE'RE WORLDWIDE"**: *verbatim* "Spreading the aroma of our spices across the world, Eastern has a presence over 22+ countries and counting!" The world-map image (`2023/01/world-map.png`) links to `/store-locator/`.
  5. **"Recent Campaigns"**: one Instagram reel screenshot (`2025/02/instapng.png`) linking to `instagram.com/reel/DE4vPVLoGmE/`.
  6. **"NEW PRODUCTS"**: an iframe `/custom-slider/index.html` with a jQuery Slick carousel (4 per view, autoplay, arrows). It holds 7 packs:
     - `2025/02/Kabsa-Masala-80g.jpg`
     - `2025/02/shawarma.jpg`
     - `custom-slider/img/Puttu 200g R8 FOP-resized.png`
     - `Palappam 200g R8 FOP-resized.png`
     - `Idiyappam 200g FOP-resized.png`
     - `Idli 200g R8 FOP-resized.png`
     - `Dosa 200g R8 FOP-resized.png`
     - The packs have no links and no alt text.
  7. **Cook book teaser**: image `2023/01/cook-img.png`; heading *verbatim* "Life is the combination of Magic and Food"; copy *verbatim* "We try to Create wonders with spices that makes new Masterpiece Recipes bring magic in all its Flavours. You have to get the right ingredient and have to get the right mixture for highest quality recipes."; CTA "See Our Cook Book" → `/cook_book/`.
- **Hidden in source** (HTML-commented on the live page; **not visible**):
  - An "OUR STORY" paragraph, quoted in §6.
  - A "150 M+ Happy Customers" stat.
  - A "QUALITY PROCESS" block linking `2025/02/Quality-Food-Safety-Policy-Orkla-India.pdf`.
  - A "JOIN OUR NEWSLETTER" signup.
- **Migration:** Keep. See the mapping for the redesigned home composition.

### `/products/` Products ("Our Products")

- **Purpose:** catalogue index.
- **Content:** a sidebar category list (16 categories) and a paginated product grid with 12 per page across 12 pages (`/products/page/2/` … `/page/12/`). Each card shows image and name and links to `/products/<slug>/`. There is no search, no filter and no sort.
- **Migration:** Keep (redesigned catalogue).

### `/product-category/<slug>/` × 16

- **Purpose:** category listings, paginated (12 per page).
- **Content:** the heading is "Our Products" plus "Eastern Condiments" on every category, so **no category has its own title or description**. The body is the product grid.
- `/product-category/arabic-range/` shows *verbatim* "Sorry, no products matched your criteria." even though it is linked from the main menu and footer.
- Full table: Appendix A2.
- **Migration:** Keep. Arabic Range gets its 2 verified packs; see §5.

### `/products/<slug>/` × 141

- **Purpose:** product detail. Full table: Appendix A1.
- **Migration:** Keep, all 141 records, same URLs.

### `/recipes/` Recipes

- **Purpose:** video recipe library.
- **Content:** 36 cards, each with a thumbnail, a "Watch Now" button (YouTube popup) and a title. Ordered newest first.
- The detail pages `/recipes/<slug>/` show only the title, date and thumbnail: **the video link exists only on the listing**. Full table: Appendix A3.
- **Migration:** Keep. Each detail page gains its video.

### `/cook_book/` Cook-Book, plus `/vegetarian/`, `/non-vegetarian/`, `/sweets/`

- **Purpose:** printed-cookbook style recipe cards.
- **Content:** three image sliders (MetaSlider), headed Non-Vegetarian, Vegetarian and Sweets. The banner image is `2023/11/ck-book.jpg` (9260×2675).
- Each slide is a 1920×986 cookbook spread. One half is food photography; the other half holds the **recipe as rendered text in the image**: title, "<Dish> using Eastern <Product>", INGREDIENTS and Method.
- There are **41 unique spreads**. The images have **no alt text**, so the recipe text is inaccessible to screen readers and search.
- `/vegetarian/`, `/non-vegetarian/` and `/sweets/` each show one of the three sliders on its own.
- **Migration:** Keep. Every spread is transcribed into structured text from on-device OCR (Apple Vision), checked against the image, and recorded as a cookbook recipe. The original spread image stays as the visual.

### `/videos/` Videos (menu label "TVCs")

- **Purpose:** TV commercials and brand films.
- **Content:** 16 cards with a thumbnail, "Watch Now" (YouTube popup, or one Facebook video) and a title. Some titles are Malayalam.
- The detail pages `/videos/<slug>/` hold a title, date, short description and thumbnail. Appendix A5.
- **Migration:** Keep.

### `/timeline/` Timeline ("Our Company's Timeline" / "From Past To Future")

- **Purpose:** company history.
- **Content:** a single infographic `2025/02/history_timeline_eastern.png` (1920×1492). Transcribed *verbatim*:
  - **1983:** Establishes full fledged spice factory and coffee powder manufacturing facility in Adimali (photo of the founder).
  - **1985:** Launches range of Blended Spices.
  - **1989:** Get incorporated as Eastern Condiments Pvt Ltd.
  - **1994:** Eastern goes international.
  - **2004:** Launches range of rice products.
  - **2010:** Kothamangalam factory inaugurated.
  - **2016:** Launches range of ready to cook products.
  - **2020:** Merges with MTR Foods, a wholly-owned subsidiary of Orkla. Wins Spices Board award for India's largest spice exporter for the 23rd consecutive time.
  - **2022:** Launches Vermicelli & Macaroni.
  - **2023:** Launches Hyperlocal Innovations for Kerala Chicken Porichathu & Assal Kayam Sambar. Inauguration of the M.E. Meeran Innovation Center.
  - **2024:** Unveiling the New Logo.
- There are also 23 legacy `timeline` posts (`/timeline/<slug>/`) that **the index page no longer links to**. Each holds an undated milestone story; Appendix A4.
- **Migration:** Keep both. The milestones become the history page; the 23 stories become an archive.

### `/we-at-eastern/` We at Eastern

- **Purpose:** brand purpose.
- **Content:** a single image `2023/01/Vision-Mission-Values.jpg` (2363×1064) showing the Eastern, "UNIFY TO TRANSFORM — BUILDING OUR FUTURE" and Orkla logos. Transcribed *verbatim*:
  - **VISION:** "Your Friend in everyday life"
  - **MISSION:** "Improving everyday life with sustainable and enjoyable local brands"
  - **VALUES:** "Brave, Trustworthy, Inspiring"
- **Not linked from navigation**; reachable only by URL or sitemap.
- **Migration:** Keep. It becomes the "About" page and is added to navigation under Company.

### `/innovationcenter/` Innovation Center

- **Purpose:** M.E. Meeran Innovation Center, the NABL lab.
- **Content**, *verbatim*:
  - "M.E.Meeran Innovation Center is a Flagship unit of Eastern Condiments Pvt. Ltd which was formed in the remembrance of Eastern Group Founder Chairman M.E.Meeran …" (full text in `docs/source`).
  - "AWARDS & RECOGNITION":
    - ISO/IEC 17025:2017 NABL Accredited.
    - ISO 14001:2015 (Environment Management System) UKAS Certified.
    - M.E MEERAN INNOVATION CENTER has published 3 Research Papers.
  - Three unlabelled capability paragraphs (product development; research projects; chemical analysis, sensory and shelf-life testing).
  - "For more information contact us at info.mic@eastern.in".
  - "Published Research Papers": Research Paper #1 → `https://l.eastern.in/2z0VxXZ`; Research Paper #2 → `https://l.eastern.in/2gvEcLk`. These are external short links.
- **Images:** `2017/09/banner-mic-easter.png` (760×262), `2017/09/bottle-…png`, and `2017/10/1.png`, `2.png`, `3.png` (250×200 icons).
- **Not linked from navigation.**
- **Migration:** Keep. It goes under Company.

### `/contact/` Contact

- **Content**, *verbatim*:
  - **Registered Office:** Orkla India Limited (formerly known as 'Orkla India Private Limited' and 'MTR Foods Private Limited'), No.1.2nd & 3rd Floor, 100 Feet Inner Ring Road, Ejipura, Ashwini Layout, Vivek Nagar, Bangalore – 560047. Phone 1800 425 5122. Email feedback@orklaindia.com.
  - **Regional Office:** Eastern Division, No. 34/137 A , NH Bypass, Edapally (P.O), Kochi, India 682024. Email feedback@eastern.in.
  - "For Media enquiries, please write to us at mediacell@orklaindia.com". Phone 1800 425 5122.
- **No contact form.**
- **Conflict:** the header info card gives "0484 300 1100 Ext: 300 1234" and socialise@eastern.in. Both are preserved, with the contact page taking precedence; see §6.
- **Migration:** Keep.

### `/eastern-contact/` Eastern Contact

- **Content:** title only, no body.
- **Migration:** Merge → `/contact/` (301).

### `/store-locator/` Store Locator

- **Content:**
  - A full-viewport Google Map (key `AIzaSyDcjSay…`, custom style) with 108 markers from an inline `locations` array (Appendix A9). The map renders tiles but **no markers in a current browser**, so the page looks empty.
  - Below the map, three online-retail badges: Amazon → `l.eastern.in/ShopatAmazon`; urDoorStep → `l.eastern.in/2HIiWx2`; bigbasket → `l.eastern.in/2LKd6xK`.
- **Migration:** Keep. It is rebuilt as a searchable and filterable list with per-store map links, plus the online-retail links.

### `/dealers/<slug>/` × 108

- One post per marker: title, date and body (address and phone; several list multiple distributors). Appendix A9.
- **Migration:** Keep (store detail pages).

### `/events/` Events and `/events/<slug>/` × 14

- **Content:** events archive. Each card has a date, title, excerpt and "Read More". Each detail page has a body, an "Event Date", an "Event Location", an "Event Link" and Facebook/Twitter embeds. Appendix A6.
- **Not linked from navigation**; linked from inside posts.
- **Migration:** Keep (news archive).

### `/contests/` Contests and `/contests/<slug>/` × 40

- **Index:** "Participate in Promotional Contests from Eastern.", then "Sorry! No Active Contests.", then a list of 40 past contests.
- **Detail pages:** question or brief, image, "Contest Over" and terms. Appendix A7.
- **Migration:** Keep (archive), linked from the footer as before.

### `/blogs/`, `/blog-post/<slug>/` × 6 (one is `test`), and `/onam-function/`

- `/blogs/` shows "BLOGS / Company Blogs" with an empty body.
- `/onam-function/` lists 6 posts (Onam 2023 campaign): songs on Spotify, YouTube and Apple Music; the Alleppey boat race; the canter van; the Onam trade fair.
- **Migration:** Keep the 5 real posts plus the Onam page. `/blog-post/test/` is retired.

### `/csr-policy/` Corporate Social Responsibility

- **Content:** full CSR policy text (*verbatim* in `docs/source`). The footer links to Orkla's CSR page instead.
- **Migration:** Keep (legal/policy template). The footer keeps the Orkla link as well.

### `/privacy/` Privacy Policy

- **Content:** a "Privacy Policy for Eastern Condiments Pvt Ltd" built from the GDPR Generator template. It contains a stray "www.website.com" placeholder.
- **Migration:** Keep verbatim (the placeholder is flagged, not edited).

### `/lucky-draw-terms-conditions/` Lucky Draw – Terms & Conditions

- **Content:** terms for the All Kerala Dealers Meet lucky draw of 12 October 2025 (Orkla India Limited). *Verbatim* in `docs/source`.
- **Migration:** Keep. It goes under "Offers".

### `/scheme-of-amalgamation/` Scheme of Amalgamation

- **Content:** statutory documents for the ECPL–MTR amalgamation: **16 PDFs and 1 ZIP**. The list:
  - Notice & Explanatory Statement (unsecured and secured creditors)
  - Scheme of Amalgamation
  - NCLT Order (creditors' meeting)
  - Valuation Certificate
  - ECPL Board report
  - Supplementary accounting statement
  - Proxy forms (unsecured and secured)
  - Attendance slips (unsecured and secured)
  - E-meeting instruction kits (unsecured and secured)
  - Newspaper advertisements (Financial Express, Udayavani)
  - Final hearing notice (ZIP)
  - Merger Order (2023)
- **Not in navigation.**
- **Migration:** Keep. Every document is served at its **original URL** (`/wp-content/uploads/2022/07/…`) so inbound links keep working.

### `/digital-brochure/` Digital Brochure

- Title only; the body is empty (no embed).
- **Migration:** Retire, with a redirect to `/products/`.

### `/game-page/` Game

- An iframe of `/game/`. That page currently throws a **PHP fatal error that exposes a database host and username**.
- **Migration:** Retire. Flag to Eastern as a security issue.

### `/featured-products/`

- Returns **HTTP 500**. Its HTML still renders 2018 "offer" banners (Mughlai combo etc.) linking to dead `l.eastern.in` short links.
- **Migration:** Retire → `/products/`.

### `/featured-recipes/`

- A recipe search UI with "Sorry, no recipes matched your criteria." and no data.
- **Migration:** Retire → `/recipes/`. Search is reimplemented on the new recipes page.

### `/kabsa-masala/`, `/shawarma-masala/`, `/puttu/`, `/chemba-puttu/`, `/idiyappam_/`, `/idly/`, `/dosa/`, `/palappam/`, `/ghee-upmavu/`

- Each has a title and a one-word body. These are probably QR or landing placeholders for packs.
- **Migration:** Merge → the matching product page (301).

### WooCommerce and account leftovers

- `/shop/`, `/cart/`, `/checkout/` (→ `/cart/`), `/my-account/`, `/my-account/lost-password/`, `/profile/`, `/my-recipes/`, `/add-recipe/` (→ 404), `/edit-recipe/`.
- **Migration:** Retire → `/` or `/products/`. There is no commerce or account backend; see §5.

### Test and internal pages

- `/test/`, `/test-2/`, `/test-3/`, `/test1/`, `/testhd/`, `/test123/`, `/test-page/`, `/blog-post/test/`, and `/sliders/<id>/` × 5 (the slider custom post type, which exposes the hero banners as posts).
- **Migration:** Retire (not linked).

### `/category/breakfast/` and `/category/biriyani-range/`

- WordPress post categories that render a generic "Our Products" shell. Their pagination 404s.
- **Migration:** Retire → `/product-category/breakfast/` and `/product-category/spices-masalas/` respectively.

## 3. Functionality audit

| Feature | Where | Current behaviour | Decision |
|---|---|---|---|
| Main nav with dropdowns (3 levels) | all | Hover dropdowns; "Company", "IB" and "Offers" are `#` parents | **Improve.** Full-screen menu (reference pattern) listing every destination; parents become labelled groups, not dead links |
| Mobile nav | all | Hamburger slide-in | **Improve.** Same overlay, touch-sized |
| Logo info card | all | Hover popover with phone, email, address, map | **Replace.** The details live on Contact and in the footer |
| Social rail | all | Fixed right rail (FB, LinkedIn, IG) | **Replace.** Social links in the menu and footer, adding YouTube (used by every video) and X/Twitter (`eastern_in`, in the header card) |
| Hero slider | home | Auto iOS-slider, 5 slides, arrows | **Improve.** Campaign banners as a draggable, keyboard-operable gallery |
| YouTube popups | home, recipes, videos | Magnific-style popup | **Improve.** Click-to-load `youtube-nocookie` player on each detail page and in an accessible dialog on listings |
| New Products carousel (iframe) | home | Slick in an iframe, autoplay | **Replace.** Native component, no iframe, no autoplay |
| Product browsing | `/products/`, categories | Sidebar list and paginated grid (12/page) | **Improve.** Category sections with a sticky category bar, category pages show all products (≤37), plus a client-side search and category filter |
| Product search / filter / sort | — | **None exists** | **Add (light).** Instant name search on `/products/`; no fabricated attributes to filter on |
| Product detail | 141 | Image, name, pack string, optional Amazon "BUY NOW", "SALE!" badge | **Keep** image, name, pack and Amazon link. **Retire** the "SALE!" badge (WooCommerce default with no price or offer behind it) |
| Image zoom | product | `.zoom` lightbox on the pack image | **Replace.** A large pack view in the PDP hero |
| Cookbook sliders | cook book | MetaSlider of image-only spreads | **Improve.** Structured, readable recipes with the original spread kept as the visual |
| Recipe search | `/featured-recipes/` | Search UI with no data | **Replace.** Working client-side search across video and cookbook recipes |
| Store locator map | `/store-locator/` | Google Map; markers fail to render | **Replace.** Searchable list (country, state, city) with "Open in Google Maps" per store from the original coordinates. No API key needed |
| Online retailers | `/store-locator/` | 3 badges → short links | **Keep** (same targets) |
| Contact | `/contact/` | Static details, mailto links | **Keep.** No form existed, and none is invented |
| Account login / register / forgot / social login | all | Modal forms; dependent pages redirect or 404 | **Retire.** No working backend; documented |
| Newsletter signup | home (commented out) | Hidden | **Not built.** Hidden by the client |
| Game | `/game-page/` | Fatal error | **Retire** |
| Downloads (PDF/ZIP) | amalgamation, home (hidden) | Direct links | **Keep** at original URLs |
| Facebook / Twitter / Instagram embeds | events, timeline, contests, blog | Third-party iframes | **Replace** with a plain "View original post" link (privacy, performance); text preserved |
| Spotify / YouTube / Apple Music links | Onam song post | Icon links | **Keep** |
| Back-to-top | all | "TOP" link | **Replace.** Not needed with the footer menu; keyboard Home works |
| Analytics (GTM, GA UA, pixels) | all | Loaded on every page | **Documented integration point.** Not hard-coded; `siteConfig.analytics` holds the GTM ID, off by default until consent policy is confirmed |

## 4. Content integrity findings (anomalies)

| # | Finding | Evidence | Decision |
|---|---|---|---|
| I1 | Test pages published | `/test/`, `/test-2/`, `/test-3/`, `/test1/`, `/testhd/`, `/test123/`, `/test-page/` (2026-05-05), `/blog-post/test/` | Retire |
| I2 | Arabic Range category empty although in nav and footer | `/product-category/arabic-range/` | Populate with the 2 Arabic Range packs verified on the homepage "New Products" carousel (Kabsa Masala 80 g, Shawarma Masala) and by the Kabsa Masala TVC. Flagged for client confirmation |
| I3 | Product BUY NOW points to a different product | `chicken-masala` → Amazon "Eastern Chilly Chicken Masala 100g" | Link preserved, flagged; the PDP label reads "Buy on Amazon" |
| I4 | Duplicate image across products | `fish-masala` and `fish-masala-2` share `fish-masala-1.jpg`; `sambar-masala` and `sambar-powder` share `sambarpowder.jpg` | Preserved as published, flagged |
| I5 | Recipe slug/title mismatch | `/recipes/eastern-meat-masala-recipe/` is titled "Kabsa Masala" | Keep slug (inbound links); title as published |
| I6 | Conflicting phone/email | Header card: 0484 300 1100 Ext 300 1234 / socialise@eastern.in. Contact page: 1800 425 5122 / feedback@eastern.in | Contact page is primary; the header-card details are kept as "Kochi office" secondary lines. Flagged |
| I7 | Conflicting history figures | Hidden home copy says "established in 1989" and "23 years largest exporter"; visible timeline says 1983 inception / 1989 incorporation / 23rd consecutive award (2020); a 2018 post says "18th time"; visible stats say "40 +" years | Use only visible, current statements verbatim. Hidden copy not published |
| I8 | Exposed DB credentials (host and username) via PHP fatal | `/game/` | Retire page; report to client |
| I9 | Google Maps API key in page source; markers not rendering | `/store-locator/` | Not reused; list-based locator |
| I10 | Privacy policy contains a template placeholder | "www.website.com" | Preserved verbatim, flagged for legal review |
| I11 | Footer CSR link goes off-site while a local CSR page exists | footer vs `/csr-policy/` | Both preserved |
| I12 | Same-name products in several categories | e.g. Rasam Powder (`rasam-powder`, `rasam-powder-3`); Rice Powder ×3 | These are separate SKUs per market or category (domestic, GCC, Breakfast Mix). All kept, each shown with its category |
| I13 | Category listings use "Our Products" as title for every category; one label is lowercase ("whole spices") | category pages | Use the menu labels; capitalise "Whole Spices" in display only (slug unchanged) |
| I14 | `l.eastern.in` short links | many | Real redirect service on a separate host; preserved as external links (not crawlable here) |
| I15 | "SALE!" badge on 21 products without any price | product pages | Retired (see §3) |
| I16 | Legacy timeline posts reference other Eastern Group ventures (Sunidra mattresses, Eastern Treads, Eastern Aqua Mineral, Eastern Newton School) | `/timeline/*` | Authentic group history; preserved in the archive with their original wording |

| I17 | The Olan cookbook card repeats the Avial method word for word. It mentions yoghurt, coconut paste and cumin, none of which are Olan ingredients. | `/vegetarian/` card `f5df0e6…/2.jpg` vs `17fd0ca…/3.jpg` | Olan is published with its ingredients and the original card. The duplicated method is not transcribed. Ask Eastern for the correct method. |
| I18 | Store data problems: duplicate store posts (`taj-groceries`/`-2`, `sri-gayathri-foods`/`-2`, `indian-groceries-spices`/`-2`); misspelt states ("Illinos", "Illiniois"); one post with an empty title (`/dealers/1609/`, "Mannuthy") | dealers posts | All URLs are kept. Addresses are shown verbatim. Regions are normalised for grouping only. |
| I19 | The cookbook cards contain typos, e.g. "Easter sambar powder", "Finaly", "papper", "Roated Vermicelli", "READYY!!" | cookbook cards | Transcribed verbatim to preserve the published text. Listed here for editorial correction. |

No injected, spam or unrelated third-party content was found beyond I1 and I8.

## 5. Intentional exclusions (summary)

| Excluded | Rationale | Redirect |
|---|---|---|
| Test pages (I1) | Not content | → `/` |
| WooCommerce shop/cart/checkout/my-account | No commerce exists; the brief forbids inventing checkout | → `/products/` |
| Account system (login/register/profile/my/add/edit-recipe) | Non-functional; no backend available | → `/` or `/recipes/` |
| `/game-page/` | Broken, and a security exposure | → `/` |
| `/digital-brochure/` | Empty | → `/products/` |
| `/featured-products/` (500), `/featured-recipes/` (empty) | Broken or empty | → `/products/`, `/recipes/` |
| `/sliders/<id>/` | CMS internals | → `/` |
| `/category/*` | Shells | → product category |
| "SALE!" badge | No offer data | — |
| Hidden home blocks (story, 150M+, quality process, newsletter) | Commented out by the client; claims conflict (I7) | Recorded in §6 for review |

## 6. Hidden source content (not published; client review)

The "OUR STORY" text is HTML-commented on `/`. *Verbatim*, first version:

> "Eastern established in 1989 is one of the leading players in the Indian spice market today. The company quickly expanded and diversified into a full-fledged manufacturer and distributor of blended masalas and straight powders. Eastern today focuses its innovation towards bringing authentic Indian food to its consumers and has continuously grown its portfolio to include regional cuisine favorites of rice powders, beverages, pickles and other ready-to-eat meals. Eastern has been awarded India's largest spice exporter by the Spices Board of India for the last 23 years and exports its wide portfolio to GCC countries, US, UK, Canada, Europe, Singapore, Malaysia, Maldives, Yemen, and Australia among others. Headquartered in Kochi, Kerala, Eastern is a subsidiary of Norwegian conglomerate Orkla."

The other hidden blocks are:

- "150 M+ / Happy Customers"
- "QUALITY PROCESS — We make sure that every batch of production undergo International quality processes without fail. [Click here for our Quality Policy → Quality-Food-Safety-Policy-Orkla-India.pdf]"
- "JOIN OUR NEWSLETTER — Let's Make every day delicious ! Sign up here for …"

## 7. Brand facts verified elsewhere

- Orkla India "About us" (orklaindia.com/about-us/, read 2026-10-15):
  - 1983 is listed as the "Inception of Eastern".
  - 2021: MTR acquired a 67.8% stake in Eastern Condiments.
  - 2023: "Orkla completes MTR-Eastern merger and reorganizes Indian operations under Orkla India".
  - Eastern sits alongside MTR and Rasoi Magic.
- Official channels referenced by the site:
  - instagram.com/eastern_in
  - facebook.com/eastern.in
  - twitter.com/eastern_in
  - linkedin.com/company/orkla-india
  - YouTube (individual videos only; no channel URL appears on the site)

---

## Appendices (generated from `docs/source/*.json`)

### A1. Product catalogue (141 product records)

Fields present on the live product template: name (h1), one pack image, an optional description (in practice only a pack-size string), a "SALE!" badge (WooCommerce default, no price), an optional "BUY NOW" link (Amazon.in), and the category-sidebar widget. The `h4`/`h5`/`.product_meta` slots are empty on every product. **No ingredients, nutrition, allergens, usage, storage or shelf-life data exists on any product page.**

| # | Slug (URL `/products/<slug>/`) | Name | Category | Pack (verbatim) | Image (best source, px) | SALE badge | Buy link |
|---|---|---|---|---|---|---|---|
| 1 | `instant-appam-mix` | Instant Appam Mix | 5 Minute Breakfast | — | `2025/02/appam.jpg` 548×600 |  |  |
| 2 | `instant-dosa` | Instant Dosa | 5 Minute Breakfast | — | `2025/02/insta-dosa.jpg` 548×600 |  |  |
| 3 | `instant-ghee-upumavu` | Instant Ghee Upumavu | 5 Minute Breakfast | — | `2025/02/gheeuppumavu.jpg` 548×600 |  |  |
| 4 | `instant-idiyappam` | Instant Idiyappam | 5 Minute Breakfast | — | `2025/02/idiyappam-1.jpg` 548×600 |  |  |
| 5 | `instant-idli` | Instant Idli | 5 Minute Breakfast | — | `2025/02/insta-idli.jpg` 548×600 |  |  |
| 6 | `instant-puttu-mix` | Instant Puttu Mix | 5 Minute Breakfast | — | `2025/02/puttu.jpg` 548×600 |  |  |
| 7 | `kasuri-methi` | Kasuri Methi | Accompaniments | 25 g Duplex | `2023/01/Kasuri-Methi-scaled.jpg` 2339×2560 |  |  |
| 8 | `tamarind-pizhi-puli` | Tamarind (Pizhi Puli) | Accompaniments | 200 g Pouch | `2023/01/Tamirant-scaled.jpg` 2339×2560 |  |  |
| 9 | `adimali-kappi` | Adimali Kappi | Beverages | 100 g Pouch | `2023/01/Adimali-Kappi-scaled.jpg` 2339×2560 |  |  |
| 10 | `chukku-kappi-powder` | Chukku Kappi Powder | Beverages | 100 g Duplex | `2023/01/Chukku-Kappi-Powder-scaled.jpg` 2339×2560 |  |  |
| 11 | `pure-coffee-powder` | Pure Coffee Powder | Beverages | 100 g Pouch | `2023/01/Pure-Coffee-Powder-scaled.jpg` 2339×2560 |  |  |
| 12 | `appam-powder` | Appam Powder | Breakfast | 1 kg Pouch | `2023/01/Appam-Powder-scaled.jpg` 2339×2560 |  |  |
| 13 | `dosa-powder` | Dosa Powder | Breakfast | 500g pouch | `2023/01/Dosa-Powder-scaled.jpg` 2339×2560 |  |  |
| 14 | `easy-palappam-mix` | Easy Palappam Mix | Breakfast | 1 kg Pouch | `2023/01/Easy-Palappam-scaled.jpg` 2339×2560 |  |  |
| 15 | `idiyappam-powder` | Idiyappam Powder | Breakfast | 1 kg Pouch | `2023/01/Idiyappam-Powder-scaled.jpg` 2339×2560 |  |  |
| 16 | `idly-powder` | Idly Powder | Breakfast | 500g Pouch | `2023/01/Idly-Powder-scaled.jpg` 2339×2560 |  |  |
| 17 | `pathiri-powder` | Pathiri Powder | Breakfast | 1kg pouch | `2023/01/Pathiri-Powder-scaled.jpg` 2339×2560 |  |  |
| 18 | `puttu-powder` | Puttu Powder | Breakfast | 1 kg Pouch | `2023/01/Puttu-Powder-scaled.jpg` 2339×2560 |  |  |
| 19 | `puttu-powder-chamba` | Puttu Powder Chamba | Breakfast | 500 g Pouch | `2023/01/Puttu-Powder-Chamba-scaled.jpg` 2339×2560 |  |  |
| 20 | `rice-powder` | Rice Powder | Breakfast | 5 KG Pouch | `2023/01/Rice-Powder-scaled.jpg` 2339×2560 |  |  |
| 21 | `roasted-rava` | Roasted Rava | Breakfast | 500 g Pouch | `2023/01/Roasted-Rava-scaled.jpg` 2339×2560 |  |  |
| 22 | `appam-podi` | Appam Podi | Breakfast Mix | 500g | `2026/06/appam-podi.jpg` 548×600 |  |  |
| 23 | `chemba-puttu-podi` | Chemba Puttu Podi | Breakfast Mix | 500g | `2026/06/chemba-puttu.jpg` 548×600 |  |  |
| 24 | `dosa-podi` | Dosa Podi | Breakfast Mix | 500g | `2026/06/dosa-podi.jpg` 548×600 |  |  |
| 25 | `easy-palappam-mix-2` | Easy Palappam Mix | Breakfast Mix | 500g | `2026/06/palappam-podi.jpg` 548×600 |  |  |
| 26 | `idiyappam-podi` | Idiyappam Podi | Breakfast Mix | 500g | `2026/06/idiyappam-podi.jpg` 548×600 |  |  |
| 27 | `idli-podi` | Idli Podi | Breakfast Mix | 500g | `2026/06/idlipodi.jpg` 548×600 |  |  |
| 28 | `pathiri-podi` | Pathiri Podi | Breakfast Mix | 500g | `2026/06/pathiri-podi.jpg` 548×600 |  |  |
| 29 | `puttu-podi` | Puttu Podi | Breakfast Mix | 500g | `2026/06/puttu-podi.jpg` 548×600 |  |  |
| 30 | `rice-powder-3` | Rice Powder | Breakfast Mix | 500g | `2026/06/rice-powder.jpg` 548×600 |  |  |
| 31 | `roasted-rava-2` | Roasted Rava | Breakfast Mix | 500g | `2026/06/roasted-rava.jpg` 548×600 |  |  |
| 32 | `rice-flakes` | Rice Flakes | Cereals | 500 g Pouch | `2023/01/Rice-Flakes-scaled.jpg` 2339×2560 |  |  |
| 33 | `laban-fruit-flavour-chews` | Laban – Fruit Flavour Chews | Confectionery | Rs.10 Sachet | `2023/01/FOP-scaled.jpg` 2339×2560 |  |  |
| 34 | `laban-orange-flavour-chews` | Laban – Orange Flavour Chews | Confectionery | Rs.10 Sachet | `2023/01/Laban-Osum-Orange-scaled.jpg` 2339×2560 |  |  |
| 35 | `laban-strawberry-flavour-chews` | Laban – Strawberry Flavour Chews | Confectionery | Rs.10 Sachet | `2023/01/Laban-Strawberry-scaled.jpg` 2339×2560 |  |  |
| 36 | `butter-chicken-masala-powder-2` | Butter Chicken Masala Powder | GCC | — | `2023/01/Butter-Chicken-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 37 | `channa-masala-powder-2` | Channa Masala Powder | GCC | — | `2023/01/Channa-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 38 | `chettinadu-vegetable-masala-powder-2` | Chettinadu Vegetable Masala Powder | GCC | — | `2023/01/Chettinadu-Vegetable-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 39 | `chicken-tikka-spice-mix-3` | Chicken Tikka Spice Mix | GCC | — | `2023/01/Chicken-Tikka-Spice-Mix-2-scaled.jpg` 2339×2560 |  |  |
| 40 | `dal-makhani-masala-powder-2` | Dal Makhani Masala Powder | GCC | — | `2023/01/Dal-Makhani-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 41 | `fish-fry-masala` | Fish Fry Masala | GCC | — | `2023/01/Fish-Fry-Masala-scaled.jpg` 2339×2560 |  |  |
| 42 | `hyderabadi-biryani-mix-3` | Hyderabadi Biryani Mix | GCC | — | `2023/01/Hyderabadi-Biryani-Mix-2-scaled.jpg` 2339×2560 |  |  |
| 43 | `korma-spice-mix-2` | Korma Spice Mix | GCC | — | `2023/01/Korma-Spice-Mix-1-scaled.jpg` 2339×2560 |  |  |
| 44 | `meen-mulaku-masala-powder-2` | Meen Mulaku Masala Powder | GCC | — | `2023/01/Meen-Mulaku-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 45 | `methi-mutter-malai-masala-powder-2` | Methi Mutter Malai Masala Powder | GCC | — | `2023/01/Methi-Mutter-Malai-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 46 | `mixed-vegetable-pickle-2` | Mixed Vegetable Pickle | GCC | — | `2023/01/Mixed-Vegetable-Pickle-1-scaled.jpg` 2339×2560 |  |  |
| 47 | `mustard-whole-2` | Mustard Whole | GCC | — | `2023/01/Mustard-Whole-1-scaled.jpg` 2339×2560 |  |  |
| 48 | `mutton-biriyani-masala-powder-2` | Mutton Biriyani Masala Powder | GCC | — | `2023/01/Mutton-Biriyani-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 49 | `mutton-masala-powder-2` | Mutton Masala Powder | GCC | — | `2023/01/Mutton-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 50 | `nutmeg-pickle-2` | Nutmeg Pickle | GCC | — | `2023/01/Nutmeg-Pickle-1-scaled.jpg` 2339×2560 |  |  |
| 51 | `omani-masala-powder-2` | Omani Masala Powder | GCC | — | `2023/01/Omani-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 52 | `palada-2` | Palada | GCC | — | `2023/01/Palada-1-scaled.jpg` 2339×2560 |  |  |
| 53 | `palada-mix-3` | Palada Mix | GCC | — | `2023/01/Palada-Mix-2-scaled.jpg` 2339×2560 |  |  |
| 54 | `palak-paneer-masala-powder-2` | Palak Paneer Masala Powder | GCC | — | `2023/01/Palak-Paneer-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 55 | `paneer-butter-masala-powder-2` | Paneer Butter Masala Powder | GCC | — | `2023/01/Paneer-Butter-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 56 | `pani-puri-masala-powder-2` | Pani Puri Masala Powder | GCC | — | `2023/01/Pani-Puri-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 57 | `pappadam-2` | Pappadam | GCC | — | `2023/01/Pappadam-1-scaled.jpg` 2339×2560 |  |  |
| 58 | `pav-bhaji-masala-powder-2` | Pav Bhaji Masala Powder | GCC | — | `2023/01/Pav-Bhaji-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 59 | `pepper-chicken-masala-powder-2` | Pepper Chicken Masala Powder | GCC | — | `2023/01/Pepper-Chicken-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 60 | `pickle-powder-3` | Pickle Powder | GCC | — | `2023/01/Pickle-Powder-2-scaled.jpg` 2339×2560 |  |  |
| 61 | `pineapple-pickle-2` | Pineapple Pickle | GCC | — | `2023/01/Pineapple-Pickle-1-scaled.jpg` 2339×2560 |  |  |
| 62 | `prawn-chutney-powder` | Prawn Chutney Powder | GCC | — | `2023/01/Prawn-Chutney-Powder-scaled.jpg` 2339×2560 |  |  |
| 63 | `prawn-pickle-2` | Prawn Pickle | GCC | — | `2023/01/Prawn-Pickle-1-scaled.jpg` 2339×2560 |  |  |
| 64 | `puliyinchi-pickle-3` | Puliyinchi Pickle | GCC | — | `2023/01/Puliyinchi-Pickle-2-scaled.jpg` 2339×2560 |  |  |
| 65 | `puttu-powder-chemba-2` | Puttu Powder Chemba | GCC | — | `2023/01/Puttu-Powder-Chemba-1-scaled.jpg` 2339×2560 |  |  |
| 66 | `puttu-powder-white-2` | Puttu Powder White | GCC | — | `2023/01/Puttu-Powder-White-1-scaled.jpg` 2339×2560 |  |  |
| 67 | `rasam-powder-3` | Rasam Powder | GCC | — | `2023/01/Rasam-Powder-2-scaled.jpg` 2339×2560 |  |  |
| 68 | `rice-powder-2` | Rice Powder | GCC | — | `2023/01/Rice-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 69 | `sambar-powder-3` | Sambar Powder | GCC | — | `2023/01/Sambar-Powder-2-scaled.jpg` 2339×2560 |  |  |
| 70 | `sesame-oil-2` | Sesame Oil | GCC | — | `2023/01/Sesame-Oil-1-scaled.jpg` 2339×2560 |  |  |
| 71 | `super-garam-masala-powder-2` | Super Garam Masala Powder | GCC | — | `2023/01/Super-Garam-Masala-Powder-1-scaled.jpg` 2339×2560 |  |  |
| 72 | `tamarind-2` | Tamarind | GCC | — | `2023/01/Tamarind-1-scaled.jpg` 2339×2560 |  |  |
| 73 | `gothambu-payasam` | Gothambu Payasam | Madhuram Range | — | `2025/02/gothamu-payasam.jpg` 548×600 |  |  |
| 74 | `palada-payasam` | Palada Payasam | Madhuram Range | — | `2025/02/palad-payasam.jpg` 548×600 |  |  |
| 75 | `paripu-payasam` | Paripu Payasam | Madhuram Range | — | `2025/02/parippu-payasam.jpg` 548×600 |  |  |
| 76 | `semiya-payasam` | Semiya Payasam | Madhuram Range | — | `2025/02/semiya-payasam.jpg` 548×600 |  |  |
| 77 | `pav-bhaji-masala-powder` | Pav Bhaji Masala Powder | Other Countries | — | `2023/01/Pav-Bhaji-Masala-Powder-scaled.jpg` 2339×2560 |  |  |
| 78 | `amla-pickle` | Amla pickle | Pickles & Paste | 400g bottle | `2023/01/Amla-pickle-scaled.jpg` 2339×2560 |  |  |
| 79 | `chicken-pickle` | Chicken Pickle | Pickles & Paste | 150 g Bottle | `2023/01/Chicken-Pickle-scaled.jpg` 2339×2560 |  |  |
| 80 | `fish-pickle` | Fish Pickle | Pickles & Paste | 150 g Bottle | `2023/01/Fish-Pickle-scaled.jpg` 2339×2560 |  |  |
| 81 | `garlic-pickle` | Garlic Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Garlic-Pickle-scaled.jpg` 2339×2560 |  |  |
| 82 | `ginger-garlic-paste` | Ginger Garlic Paste | Pickles & Paste | — | `2023/01/Ginger-Garlic-Paste-scaled.jpg` 2339×2560 |  |  |
| 83 | `gongura-pickle` | Gongura Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Gongura-Pickle-scaled.jpg` 2339×2560 |  |  |
| 84 | `gooseberry-pickle` | Gooseberry Pickle | Pickles & Paste | 400 g Bottle | `2023/01/Gooseberry-Pickle-scaled.jpg` 2339×2560 |  |  |
| 85 | `hot-sweet-lime-pickle` | Hot & Sweet Lime Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Hot-Sweet-Lime-Pickle-scaled.jpg` 2339×2560 |  |  |
| 86 | `kadumango-pickle` | Kadumango Pickle | Pickles & Paste | 400 g Bottle | `2023/01/Kadumango-Pickle-scaled.jpg` 2339×2560 |  |  |
| 87 | `lime-pickle` | Lime Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Lime-Pickle-scaled.jpg` 2339×2560 |  |  |
| 88 | `mango-pickle` | Mango Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Mango-Pickle-scaled.jpg` 2339×2560 |  |  |
| 89 | `mango-thokku-pickle` | Mango Thokku Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Mango-Thokku-Pickle-scaled.jpg` 2339×2560 |  |  |
| 90 | `mixed-veg-pickle` | Mixed Veg Pickle | Pickles & Paste | 1 Kg Bottle | `2023/01/Mixed-Veg-Pickle-scaled.jpg` 2339×2560 |  |  |
| 91 | `prawn-pickle` | Prawn Pickle | Pickles & Paste | 150 g Bottle | `2023/01/Prawn-Pickle-scaled.jpg` 2339×2560 |  |  |
| 92 | `puliyinchi-pickle` | Puliyinchi pickle | Pickles & Paste | 400g bottle | `2023/01/Puliyinchi-pickle-scaled.jpg` 2339×2560 |  |  |
| 93 | `red-chilli-pickle` | Red Chilli Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Red-Chilli-Pickle-scaled.jpg` 2339×2560 |  |  |
| 94 | `tender-mango-pickle` | Tender Mango Pickle | Pickles & Paste | 400 g Bottle | `2023/01/Tender-Mango-Pickle-scaled.jpg` 2339×2560 |  |  |
| 95 | `tomato-pickle` | Tomato Pickle | Pickles & Paste | 300 g Bottle | `2023/01/Tomato-Pickle-scaled.jpg` 2339×2560 |  |  |
| 96 | `white-lime-pickle` | White Lime Pickle | Pickles & Paste | 400 g Bottle | `2023/01/White-Lime-Pickle-scaled.jpg` 2339×2560 |  |  |
| 97 | `assal-kayam-sambar-powder` | Assal Kayam Sambar Powder | Spices & Masalas | — | `2025/02/asal-kayam-sambar.jpg` 548×600 |  |  |
| 98 | `biriyani-masala` | Biriyani Masala | Spices & Masalas | — | `2023/01/biriyani-masala-1.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Biriyani-Masala-Powder-100g/dp/B01CHIKM5A/ref=sr_1_1_sspa) |
| 99 | `black-pepper-powder` | Black Pepper Powder | Spices & Masalas | 100 g Pouch | `2023/01/black-pepper-powder-3.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Black-Pepper-100g/dp/B01CHIKBBU/ref=sr_1_2) |
| 100 | `channa-masala` | Channa Masala | Spices & Masalas | — | `2023/01/Channa-Masala-scaled.jpg` 2339×2560 |  |  |
| 101 | `chat-masala` | Chat Masala | Spices & Masalas | — | `2023/01/Chatt-Masala-scaled.jpg` 2339×2560 |  |  |
| 102 | `chicken-fry-masala` | Chicken Fry Masala | Spices & Masalas | — | `2023/01/Chicken-Fry-Masala-scaled.jpg` 2339×2560 | yes | [Amazon](https://www.amazon.in/Eastern-Kabab-Masala-100g/dp/B01CHIKDSG/ref=sr_1_5_f3_0o_fs) |
| 103 | `chicken-kabab-masala` | Chicken Kabab Masala | Spices & Masalas | — | `2023/01/chicken-kabab-masala-1.jpg` 548×600 |  |  |
| 104 | `chicken-masala` | Chicken Masala | Spices & Masalas | — | `2023/01/chickenmasala.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Chilly-Chicken-Masala-100g/dp/B013QO7YAA/ref=sr_1_1_sspa) |
| 105 | `chicken-porichathu` | Chicken Porichathu | Spices & Masalas | — | `2023/01/chicken-porichatthu.jpg` 548×600 |  |  |
| 106 | `chilli-powder` | Chilli Powder | Spices & Masalas | — | `2023/02/chilli-p.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/s) |
| 107 | `chilly-chicken-masala` | Chilly Chicken Masala | Spices & Masalas | — | `2023/01/Chilly-Chicken-Masala-scaled.jpg` 2339×2560 |  |  |
| 108 | `coriander-powder-5` | Coriander Powder | Spices & Masalas | — | `2023/02/coriander-powder.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Coriander-Powder-250g-Pack/dp/B01MT3HSZL/ref=sr_1_1_f3_wg) |
| 109 | `crushed-chilly` | Crushed Chilly | Spices & Masalas | 100 g Pouch | `2023/01/chilli-flakes.jpg` 548×600 |  |  |
| 110 | `cumin-powder` | Cumin Powder | Spices & Masalas | 100 g Pouch | `2023/01/cumin-powder-2.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Cumin-Powder-100g/dp/B018TLE1I8/ref=sr_1_5) |
| 111 | `egg-masala` | Egg Masala | Spices & Masalas | — | `2023/01/egg-masala-1.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Topps-Eastern-Egg-Masala-100g/dp/B0963ZH3RT/ref=sr_1_2) |
| 112 | `fish-masala` | Fish Masala | Spices & Masalas | — | `2023/01/fish-masala-1.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Powder-Fish-Masala-Pouch/dp/B002UOYPV4/ref=sr_1_5_f3_0o_fs) |
| 113 | `fish-masala-2` | Fish Masala | Spices & Masalas | — | `2023/01/fish-masala-1.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Powder-Fish-Masala-Pouch/dp/B002UOYPV4/ref=sr_1_5_f3_0o_fs) |
| 114 | `garam-masala` | Garam Masala | Spices & Masalas | — | `2023/01/garam-masala-1.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Garam-Masala-100g/dp/B01MQ0EGMA/ref=sr_1_fkmr3_1_f3_wg) |
| 115 | `jaljeera-powder` | Jaljeera Powder | Spices & Masalas | — | `2023/01/Jaljeera-Powder-scaled.jpg` 2339×2560 |  |  |
| 116 | `kashmiri-chilli` | Kashmiri Chilli | Spices & Masalas | — | `2023/02/kashirchilli.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Kashmiri-Chilly-Powder-250g/dp/B01CHIKBCO/ref=sr_1_2_f3_wg_sspa) |
| 117 | `kitchen-king` | Kitchen King | Spices & Masalas | — | `2023/01/Kitchen-King-scaled.jpg` 2339×2560 |  |  |
| 118 | `meat-masala-2` | Meat Masala | Spices & Masalas | — | `2023/02/meat-masala.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Masala-Meat-100g/dp/B08GLTZG49/ref=sr_1_1_sspa) |
| 119 | `meat-ularthu-masala` | Meat Ularthu Masala | Spices & Masalas | — | `2023/01/meat-ularathu.jpg` 548×600 |  |  |
| 120 | `mutton-masala-kerala` | Mutton Masala Kerala | Spices & Masalas | — | `2025/02/muttonmasala-kerala.jpg` 548×600 |  |  |
| 121 | `pav-bhaji-masala` | Pav Bhaji Masala | Spices & Masalas | — | `2023/01/Pav-Bhaji-Masala-scaled.jpg` 2339×2560 |  |  |
| 122 | `pickle-powder-2` | Pickle Powder | Spices & Masalas | — | `2023/01/pickle-powder-3.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Pickle-Masala-Powder-100g/dp/B00HTX37WY/ref=sr_1_1_sspa) |
| 123 | `rasam-powder` | Rasam Powder | Spices & Masalas | — | `2023/01/rasam-powder-3.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Rasam-Powder-100g-Pack/dp/B08WKCFLJN/ref=sr_1_5) |
| 124 | `sambar-masala` | Sambar Masala | Spices & Masalas | — | `2023/02/sambarpowder.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Sambar-Powder-100g/dp/B01MRLY195/ref=sr_1_1) |
| 125 | `sambar-powder` | Sambar Powder | Spices & Masalas | — | `2023/02/sambarpowder.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Sambar-Powder-100g/dp/B01MRLY195/ref=sr_1_1) |
| 126 | `turmeric-powder-4` | Turmeric Powder | Spices & Masalas | — | `2023/02/turmeric-masala.jpg` 548×600 | yes | [Amazon](https://www.amazon.in/Eastern-Turmeric-Powder-250g/dp/B005FIVLUK/ref=sr_1_1_f3_wg_sspa) |
| 127 | `vegetable-masala` | Vegetable Masala | Spices & Masalas | — | `2023/01/Vegetable-Masala-scaled.jpg` 2339×2560 |  |  |
| 128 | `black-pepper-powder-4` | Black Pepper Powder | Straight Powders | 100 g Pouch | `2023/01/Black-Pepper-Powder-scaled.jpg` 2339×2560 | yes | [Amazon](https://www.amazon.in/Eastern-Black-Pepper-100g/dp/B01CHIKBBU/ref=sr_1_2) |
| 129 | `crushed-chilly-4` | Crushed Chilly | Straight Powders | 100 g Pouch | `2023/01/Crushed-Chilly-scaled.jpg` 2339×2560 |  |  |
| 130 | `cumin-powder-3` | Cumin Powder | Straight Powders | 100 g Pouch | `2023/01/Cumin-Powder-scaled.jpg` 2339×2560 | yes | [Amazon](https://www.amazon.in/Eastern-Cumin-Powder-100g/dp/B018TLE1I8/ref=sr_1_5) |
| 131 | `dry-ginger-powder-4` | Dry Ginger Powder | Straight Powders | 100 g Pouch | `2023/01/Dry-Ginger-Powder-scaled.jpg` 2339×2560 | yes | [Amazon](https://www.amazon.in/Eastern-Dry-Ginger-Powder-100g/dp/B01CHIKBD8/ref=sr_1_5) |
| 132 | `fennel-powder-4` | Fennel Powder | Straight Powders | 100 g Pouch | `2023/01/Fennel-Powder-scaled.jpg` 2339×2560 |  |  |
| 133 | `fenugreek-powder-4` | Fenugreek Powder | Straight Powders | 100 g Pouch | `2023/01/Fenugreek-Powder-scaled.jpg` 2339×2560 |  |  |
| 134 | `kayam` | Kayam | Straight Powders | — | `2023/01/kayam-scaled.jpg` 2339×2560 |  |  |
| 135 | `macaroni-elbow` | Macaroni Elbow | Vermicelli & Macaroni | 400 g Pouch | `2023/01/Macaroni-Elbow-scaled.jpg` 2339×2560 |  |  |
| 136 | `roasted-vermicelli` | Roasted Vermicelli | Vermicelli & Macaroni | 400 g Pouch | `2023/01/Roasted-Vermicelli-scaled.jpg` 2339×2560 |  |  |
| 137 | `vermicelli` | Vermicelli | Vermicelli & Macaroni | 400 g Pouch (long) | `2023/01/Vermicelli-scaled.jpg` 2339×2560 |  |  |
| 138 | `cumin-seed` | Cumin Seed | whole spices | — | `2025/02/cumin-seed.jpg` 548×600 |  |  |
| 139 | `fennel-seed` | Fennel Seed | whole spices | — | `2025/02/fennel-seed.jpg` 548×600 |  |  |
| 140 | `fenugreek-seed` | Fenugreek Seed | whole spices | — | `2025/02/fenugreen-seed.jpg` 548×600 |  |  |
| 141 | `mustard-seed` | Mustard Seed | whole spices | — | `2025/02/mustard-seed.jpg` 548×600 |  |  |

### A2. Product categories (16)

| Slug | Label (menu) | In main menu | In footer | Products | Listing pages |
|---|---|---|---|---|---|
| `confectionery` | Confectionery | no (sidebar only) |  | 3 | 1 |
| `straight-powders-1` | Straight Powders | no (sidebar only) |  | 7 | 1 |
| `arabic-range` | Arabic Range | yes | yes | 0 | 1 |
| `pickles-paste` | Pickles & Paste | yes | yes | 19 | 2 |
| `gcc` | GCC | yes (under "IB") |  | 37 | 4 |
| `breakfast-mix` | Breakfast Mix | yes |  | 10 | 1 |
| `spices-masalas` | Spices & Masalas | yes | yes | 31 | 3 |
| `cereals` | Cereals | no (sidebar only) |  | 1 | 1 |
| `madhuram-range` | Madhuram Range | yes | yes | 4 | 1 |
| `5-minute-breakfast` | 5 Minute Breakfast | yes | yes | 6 | 1 |
| `breakfast` | Breakfast | yes |  | 10 | 1 |
| `whole-spices` | whole spices | yes | yes | 4 | 1 |
| `accompaniments` | Accompaniments | no (sidebar only) |  | 2 | 1 |
| `other-countries` | Other Countries | yes (under "IB") |  | 1 | 1 |
| `vermicelli-macaroni` | Vermicelli & Macaroni | yes | yes | 3 | 1 |
| `beverages` | Beverages | yes | yes | 3 | 1 |

### A3. Video recipes (36 `recipes` posts)

Each post body is empty in the REST API and on its detail page, which shows only the title, the post date and a thumbnail. The video link exists only on the `/recipes/` listing ("Watch Now" → YouTube popup).

| Slug (`/recipes/<slug>/`) | Title | Posted | YouTube | Thumbnail |
|---|---|---|---|---|
| `thani-nadan-sambar` | Thani Nadan Sambar | 2026-10-12 | youtube.com/watch?v=g6AyPqZ-_V8 | `2026/10/g6AyPqZ-_V8-SD.jpg` |
| `special-chicken-curry` | Special Chicken Curry | 2026-10-12 | youtube.com/watch?v=OkcmGTgq1ho | `2026/10/OkcmGTgq1ho-SD.jpg` |
| `chicken-kondattam` | Chicken Kondattam | 2026-10-12 | youtube.com/watch?v=5-uH0lqPfsM | `2026/10/5-uH0lqPfsM-SD.jpg` |
| `nadan-chicken-curry` | Nadan Chicken Curry | 2026-10-12 | youtube.com/watch?v=WwLvw3m0ono | `2026/10/WwLvw3m0ono-SD.jpg` |
| `restaurant-style-sambar` | Restaurant Style Sambar | 2026-10-12 | youtube.com/watch?v=Ds9tIhzIDpM | `2026/10/Ds9tIhzIDpM-SD.jpg` |
| `ulli-sambar` | Ulli sambar | 2026-10-12 | youtube.com/watch?v=PAew4XEMlLQ | `2026/10/PAew4XEMlLQ-SD.jpg` |
| `breakfast-sambar` | Breakfast Sambar | 2026-10-12 | youtube.com/watch?v=9Euft82XZv8 | `2026/10/9Euft82XZv8-SD.jpg` |
| `sadya-sambar` | Sadya Sambar | 2026-10-12 | youtube.com/watch?v=8WKJYAGVaCI | `2026/10/8WKJYAGVaCI-SD.jpg` |
| `jeera-rice-x-cumin-seeds` | Jeera Rice x Cumin Seeds | 2025-02-18 | www.youtube.com/watch?v=ZMg9mByXAiU | `2025/02/sddefault-28.jpg` |
| `turmeric-powder` | TURMERIC Powder | 2025-02-18 | www.youtube.com/watch?v=KTpwgusyx7E | `2025/02/sddefault-27.jpg` |
| `rasam-powder` | Rasam Powder | 2025-02-18 | www.youtube.com/watch?v=b3Tnc-e-PV8 | `2025/02/sddefault-26.jpg` |
| `mutton-kerala` | Mutton Kerala | 2025-02-18 | www.youtube.com/watch?v=PacZAKJKYuc | `2025/02/sddefault-25.jpg` |
| `mutton-masala` | Mutton Masala | 2025-02-18 | www.youtube.com/watch?v=n942wKz8Fd8 | `2025/02/sddefault-24.jpg` |
| `meat-ularth-masala` | Meat Ularth Masala | 2025-02-18 | www.youtube.com/watch?v=Bw-MrvC7dvQ | `2025/02/sddefault-23.jpg` |
| `meat-masala` | Meat Masala | 2025-02-18 | www.youtube.com/watch?v=h17qxoJTtVM | `2025/02/sddefault-22.jpg` |
| `fish-curry-x-kashmiri-chilli` | Fish Curry x Kashmiri Chilli | 2025-02-18 | www.youtube.com/watch?v=-xTDrsxTnk8 | `2025/02/sddefault-21.jpg` |
| `egg-curry-x-garam-masala` | Egg Curry x Garam Masala | 2025-02-18 | www.youtube.com/watch?v=E1kKn-ZC7Po | `2025/02/sddefault-20.jpg` |
| `fish-curry-x-fish-masala` | Fish Curry x Fish Masala | 2025-02-18 | www.youtube.com/watch?v=Sbqa5ygFkgc | `2025/02/sddefault-19.jpg` |
| `egg-curry-x-egg-masala` | Egg Curry x Egg Masala | 2025-02-18 | www.youtube.com/watch?v=as01s3FZkrY | `2025/02/sddefault-18.jpg` |
| `meat-roast-x-coriander-powder` | Meat Roast x Coriander Powder | 2025-02-18 | www.youtube.com/watch?v=3V0XTSp32ZI | `2025/02/sddefault-17.jpg` |
| `fish-fry-x-chilli-powder` | Fish Fry x Chilli Powder | 2025-02-18 | www.youtube.com/watch?v=XYtDFeBScZ4 | `2025/02/sddefault-16.jpg` |
| `chicken-masala-apts` | Chicken Masala APTS | 2025-02-18 | www.youtube.com/watch?v=l6v1QB0RziQ | `2025/02/sddefault-15.jpg` |
| `chicken-masala` | Chicken Masala | 2025-02-18 | www.youtube.com/watch?v=hZzfc-Do-Vg | `2025/02/sddefault-14.jpg` |
| `chicken-kabab-masala` | Chicken Kabab Masala | 2025-02-18 | www.youtube.com/watch?v=i3lwgp8UN-o | `2025/02/sddefault-13.jpg` |
| `black-pepper-powder` | Black Pepper Powder | 2025-02-18 | www.youtube.com/watch?v=MFqR2UtDnAs | `2025/02/sddefault-12.jpg` |
| `biriyani-x-biriyani-masala` | Biriyani x Biriyani Masala | 2025-02-18 | www.youtube.com/watch?v=UOLZM_QQjf4 | `2025/02/sddefault-11.jpg` |
| `semiya-payasam` | Semiya Payasam | 2025-02-18 | www.youtube.com/watch?v=CgL74kKHDGU | `2025/02/sddefault-10.jpg` |
| `palada-payasam` | Palada Payasam | 2025-02-18 | www.youtube.com/watch?v=LPVNNj-3FEk | `2025/02/sddefault-9.jpg` |
| `gothambu-payasam` | Gothambu Payasam | 2025-02-18 | www.youtube.com/watch?v=fsrc5CFUv0c | `2025/02/sddefault-8.jpg` |
| `instant-ghee-upumavu` | Instant Ghee Upumavu | 2025-02-18 | www.youtube.com/watch?v=4DZE64yPd1A | `2025/02/sddefault-7.jpg` |
| `instant-idli` | Instant Idli | 2025-02-18 | www.youtube.com/watch?v=RxVM-db7vcQ | `2025/02/sddefault-6.jpg` |
| `instant-dosa` | Instant Dosa | 2025-02-18 | www.youtube.com/watch?v=iqDpaDqS7Yc | `2025/02/sddefault-5.jpg` |
| `instant-idiyappam` | Instant Idiyappam | 2025-02-18 | www.youtube.com/watch?v=iNEjdXxJnTI | `2025/02/sddefault-4.jpg` |
| `instant-appam-mix` | Instant Appam Mix | 2025-02-18 | www.youtube.com/watch?v=w-TxaCBeSVI | `2025/02/sddefault-3.jpg` |
| `instant-puttu-mix` | Instant Puttu Mix | 2025-02-18 | www.youtube.com/watch?v=a4OAGpKPMi4 | `2025/02/sddefault-2.jpg` |
| `eastern-meat-masala-recipe` | Kabsa Masala | 2025-02-17 | www.youtube.com/watch?v=97wTidRS_1Q | `2025/02/sddefault.jpg` |

### A4. Timeline posts (23)

| URL | Title | Date | Summary (first 140 chars, verbatim) | Images | Embeds/links |
|---|---|---|---|---|---|
| `/timeline/sunidra-mattress/` | Sunidra Mattress | Tuesday, January 10, 2017 | India’s most comfortable mattresses – Sunidra – a flagship company of Eastern Group, started production in 1999. | 0 |  |
| `/timeline/top-two-star-exporters-southern-region-gold-award/` | Top Two Star Exporters in the Southern region (Gold) Award | Tuesday, January 23, 2018 | The Federation of Indian Exports Organisation’s ‘Top Two Star Exporters in the Southern region (Gold) Award’, was presented by the Vice Pres | 1 | www.facebook.com/plugins/like.php?href=https%3A%2F |
| `/timeline/tie-up-with-mccormick/` | Tie up with McCormick | Wednesday, January 11, 2017 | Strategic Tie up with McCormick the World’s largest Spices company. | 1 |  |
| `/timeline/introduction-of-blended-spices/` | Introduction of Blended Spices | Tuesday, January 10, 2017 | With the expansion of business to neighboring districts and a steady increase in demand of Eastern spices, the range of ‘Blended Spices’ wer | 0 |  |
| `/timeline/cold-storage-unit-at-teni/` | Cold Storage Unit at Theni | Tuesday, January 10, 2017 | Catering to boost the production of ‘Ready-to-cook’ range of products, Eastern installed a cold storage unit in Theni, Tamil Nadu. | 0 |  |
| `/timeline/takes-over-mohanlal-taste-buds/` | Takes over ‘Mohanlal Taste Buds’ | Tuesday, January 10, 2017 | More spice added to the spice family. | 0 |  |
| `/timeline/eastern-rak-factory/` | Eastern RAK Factory | Saturday, January 14, 2017 | Expansion of trade meant rise in demand for products. In a move to cater to the Middle East consumers Eastern set up its production unit in | 0 |  |
| `/timeline/wind-energy/` | Wind Energy | Tuesday, January 10, 2017 | Owing to the nature that gives us all these spices, in a step towards sustainable development, Eastern’s first Wind Mills sprouted up on the | 0 |  |
| `/timeline/head-quarters-in-cochin/` | Head Quarters in Cochin | Saturday, January 14, 2017 | Eastern opened its corporate office, incorporating all its flagships. The building utilizes a majority of its power requirements from the so | 0 |  |
| `/timeline/eastern-condiments-pvt-ltd-incorporated/` | Eastern Condiments Pvt. Ltd Incorporated | Tuesday, January 10, 2017 | Eastern Condiments Private Limited was incorporated in 1989. | 0 |  |
| `/timeline/largest-spice-exporter-award-for-the-18th-time-in-a-row/` | Largest Spice Exporter Award For The 18th Time In a Row | Wednesday, December 12, 2018 | The Spices Board of India annual awards for the Top Most Exporter of Curry Powder/Spice Mix for the year 2014-15 have been awarded to Easter | 1 |  |
| `/timeline/established-eastern-coffee-and-curry-powder/` | Established Eastern Coffee and Curry Powder | Tuesday, January 10, 2017 | Eastern set up its full-fledged spice factory and Coffee powder manufacturing facility in Adimali, the leading spice producing district in K | 0 |  |
| `/timeline/the-beginning-of-the-road/` | The beginning of the road | Wednesday, September 7, 2016 | Mr. M. E. Meeran laid foundation to Eastern Trading Company, popularly known as ETC. | 1 |  |
| `/timeline/successfully-cleared-the-tpm-certification-assessment/` | Successfully cleared the TPM Certification Assessment | Wednesday, September 26, 2018 | The Eastern Group has successfully cleared the TPM Certification Assessment. The Exhaust and Tube Mill Division (Certificate ofCommitment), | 1 |  |
| `/timeline/expansion-of-trade/` | Expansion of Trade | Tuesday, January 10, 2017 | With the debut of Mr. Navas Meeran into the Eastern chain of business, the company steadily expanded its ventures out side Kerala. And to ma | 0 |  |
| `/timeline/eastern-retreads/` | Eastern Treads | Tuesday, January 10, 2017 | Company expands its business in the line of treads. | 0 |  |
| `/timeline/new-factory-in-adimali/` | New Factory in Adimali | Tuesday, January 10, 2017 | New production unit is set up in Adimali to cater to the rising consumer demands for Eastern spices. | 1 |  |
| `/timeline/quality-testing-labs/` | Quality Testing Labs | Tuesday, January 10, 2017 | From the very beginning, product quality has been Eastern’s prime agenda, making no compromise with its taste, texture and aroma. To make it | 0 |  |
| `/timeline/rice-products/` | Rice Products | Saturday, January 14, 2017 | Determined to deliver the best quality food to every citizen, Eastern entered the Indian granaries. New range of Rice Products were launched | 0 |  |
| `/timeline/eastern-aqua-mineral/` | Eastern Aqua Mineral | Tuesday, January 10, 2017 | Eastern Aqua Mineral is the Quality Packaged Drinking water from the Eastern Group of Companies. Another venture aimed at the goodwill of pr | 0 |  |
| `/timeline/adimali-lab/` | Adimali Lab | Saturday, January 14, 2017 | Safety and quality of the product have always topped Easter Group’s priorities. Eastern set up its full automated hi-tech lab in Adimali. Th | 0 |  |
| `/timeline/becoming-the-largest-distributors/` | Becoming the Largest Distributors | Tuesday, January 10, 2017 | Mr. Meeran entered the distribution business, which is reputed for the most disciplined and profitable distribution system. | 0 |  |
| `/timeline/eastern-newton-school/` | Eastern Newton School | Saturday, January 14, 2017 | Availing quality education to students from the remotest places of eastern Kerala, Eastern Group set up a top-notch CBSE affiliated school c | 0 |  |

### A5. Videos (TVCs) (16)

| URL | Title | Date | Summary (first 140 chars, verbatim) | Images | Embeds/links |
|---|---|---|---|---|---|
| `/videos/bhoomika-2016-p-k-valsamma/` | Bhoomika 2016 – P K Valsamma – Short Film | Wednesday, March 2, 2016 | On account of International Women’s day 2015, “Eastern’s Bhoomika” to honour the womanhood by recognising the special women in our lives. | 1 |  |
| `/videos/bhoomika-2017-short-film/` | Bhoomika 2017 Short Film | Monday, February 13, 2017 | ‘Bhoomika’ – a venture by Eastern Condiments – endeavors to bring to light the women stalwarts in your life. | 1 |  |
| `/videos/%e0%b4%b8%e0%b4%be%e0%b4%ae%e0%b5%8d%e0%b4%aa%e0%b4%be%e0%b5%bc-%e0%b4%aa%e0%b4%b2%e0%b4%b5%e0%b4%bf%e0%b4%a7%e0%b4%82-%e0%b4%aa%e0%b5%86%e0%b5%bc%e0%b4%ab%e0%b5%86%e0%b4%95%e0%b5%8d%e0%b4%b1/` | സാമ്പാർ പലവിധം! പെർഫെക്റ്റാക്കാൻ ഈസ്റ്റേൺ! \| കേരളത്തിന്റെ No.1 സാമ്പാർ പൗഡർ | Monday, October 12, 2026 |  | 1 |  |
| `/videos/71st-nehru-trophy-boat-race-veeyapuram/` | 71st Nehru Trophy BOAT RACE #veeyapuram | Monday, October 12, 2026 |  | 1 |  |
| `/videos/eastern-chicken-masala-tvc-new/` | Eastern Chicken Masala TVC New | Monday, February 13, 2023 |  | 1 |  |
| `/videos/eastern-5-minute-breakfast-perfect-puttu-morning-in-5-minutes-keralas-leading-brand/` | Eastern 5-Minute Breakfast \| Perfect Puttu Morning in 5 Minutes! \| Kerala’s Leading Brand | Wednesday, February 19, 2025 |  | 1 |  |
| `/videos/eastern-chicken-song-ft-sooraj-santhosh-x-manikuttan/` | Eastern Chicken Song \| ft. Sooraj Santhosh x Manikuttan | Monday, October 12, 2026 |  | 1 |  |
| `/videos/eastern-kabsa-masala-2025-arabic-range-tvc-20s-your-perfect-taste-partner/` | Eastern Kabsa Masala \| 2025 Arabic Range TVC – 20s \| Your Perfect Taste Partner | Friday, February 28, 2025 |  | 1 |  |
| `/videos/%e0%b4%88%e0%b4%b8%e0%b5%8d%e0%b4%b1%e0%b5%8d%e0%b4%b1%e0%b5%87%e0%b5%ba-5-%e0%b4%ae%e0%b4%bf%e0%b4%a8%e0%b4%bf%e0%b4%b1%e0%b5%8d%e0%b4%b1%e0%b5%8d-%e0%b4%ac%e0%b5%8d%e0%b4%b0%e0%b5%87%e0%b4%95/` | ഈസ്റ്റേൺ 5-മിനിറ്റ് ബ്രേക്ക്‌ഫാസ്റ്റ് \| പെർഫെക്റ്റ് പാലപ്പം 5 മിനിറ്റിൽ! | Wednesday, February 19, 2025 |  | 1 |  |
| `/videos/eastern-chicken-masala-i-keralas-no-1-masala-for-your-perfect-chicken-curry/` | Eastern Chicken Masala I Kerala’s No.1 Masala for your perfect Chicken Curry | Monday, October 12, 2026 |  | 1 |  |
| `/videos/eastern-5-minute-breakfast-your-perfect-idli-in-5-minutes-keralas-leading-brand/` | Eastern 5-Minute Breakfast \| Your perfect Idli in 5 Minutes! \| Kerala’s Leading Brand | Wednesday, February 19, 2025 |  | 1 |  |
| `/videos/eastern-meat-masala-tvc/` | Eastern Meat Masala TVC | Monday, February 13, 2023 |  | 1 |  |
| `/videos/eastern-perfect-onam-song-undo-unde-i-sithara-krishnakumar-bijibal-rafeeq-ahamed/` | Eastern Perfect Onam Song ‘Undo Unde’ I Sithara Krishnakumar, Bijibal & Rafeeq Ahamed | Monday, February 13, 2023 |  | 1 |  |
| `/videos/%e0%b4%88%e0%b4%b8%e0%b5%8d%e0%b4%b1%e0%b5%8d%e0%b4%b1%e0%b5%87%e0%b5%ba-5-%e0%b4%ae%e0%b4%bf%e0%b4%a8%e0%b4%bf%e0%b4%b1%e0%b5%8d%e0%b4%b1%e0%b5%8d-%e0%b4%ac%e0%b5%8d%e0%b4%b0%e0%b5%87%e0%b4%95-2/` | ഈസ്റ്റേൺ 5-മിനിറ്റ് ബ്രേക്ക്‌ഫാസ്റ്റ് \| പെർഫെക്റ്റ് പാലപ്പം 5 മിനിറ്റിൽ! | Wednesday, February 19, 2025 |  | 1 |  |
| `/videos/eastern-sambar/` | Eastern Sambar | Monday, February 13, 2023 |  | 1 |  |
| `/videos/9726/` | Eastern 5-Minute Breakfast \| Perfect Puttu Morning in 5 Minutes! \| Kerala’s Leading Brand | Wednesday, February 19, 2025 |  | 1 |  |

### A6. Events (14)

| URL | Title | Date | Summary (first 140 chars, verbatim) | Images | Embeds/links |
|---|---|---|---|---|---|
| `/events/inauguration-of-computer-lab-for-the-government-school-kudur/` | Inauguration of Computer lab for the Government School, Kudur | On 19th of September 2018, the lab was formally inaugurated and handed over to the school authorities by Mr. Firoz Meeran, Managing Director, Eastern Condiments Pvt. Ltd., Mr. Mohanlal Menon, Director, Eastern Condiments, and the guest honor, Dr. K. N. Manjunath, General Physician. Vikram Hospital and Mrs N. Manjunath, in a ceremony organized in the school premises. | The Eastern Group, recently, sponsored a computer lab of the Government School, Kudur with the installation of 10 computers along with the b | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/events/easternpass-age-vimala-college-feb-2018/` | Eastern PASS-AGE’ at Vimala College | Posted by Eastern Condiments on Friday, 23 February 2018 | ‘Eastern PASS-AGE’ conducted at Vimala College for Women, Thrissur – An exercise to empower the ‘women of tomorrow’ with an enhanced underst | 1 |  |
| `/events/bhoomika-2018/` | Eastern Bhoomika 2018 – Unsung Heroes | Based on the write up of 60 words and a paragraph of that woman posted by various participants through mails and social media , a panel will select those special women. Selected women will be honoured and awarded in the presence of eminent personalities at a prestigious venue of Lucknow, Agra, Varanasi, Chennai, Bangalore,Cochin,Hyderabad simultaneously on March 2018. | Every woman has the strength and innate potential to scale new heights, to achieve something in their respective field. They inspire others | 1 |  |
| `/events/launched-new-product-chicken-kabab-masala/` | Launched New Product Chicken Kabab Masala |  | Excited to announce that we’ve launched Eastern Chicken Kabab Masala in Karnataka with a phenomenal launch event hosted at Bangalore. Event | 1 |  |
| `/events/eastern-bhoomika-2017/` | Eastern Bhoomika 2017 |  | ‘Bhoomika’ – a venture by Eastern Condiments – endeavors to bring to light the women stalwarts in your life. A dedication to those women who | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/events/launched-new-product-kayam/` | Launched New Product Kayam |  | Here is to a new chapter! Presenting our new product Eastern Kayam, launched today with a spectacular event at Adimali. Event Date 15 Januar | 1 |  |
| `/events/orkla-sustainability-academy/` | Orkla Sustainability Academy |  | At Eastern we aspire to “Become a local Champion of Sustainability” and would like to see our employees imbibe Sustainability in their every | 1 |  |
| `/events/eastern-homechefs-with-soumya-bijesh/` | Eastern HomeChef’s with Soumya Bijesh |  | The Easy Cooking with Eastern had a great time with Soumya Bijesh. Thank you Soumya, for showing us the easiness in making Paneer Butter Mas | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/events/perungudi-lake-festival-2017/` | Perungudi Lake Festival 2017 | — Eastern Condiments (@eastern_in) February 12, 2017 | We are sponsoring Lake Festival event at Chennai on 12th Feb 2017. Join us for the Eastern Perungudi Lake Festival. support us in our effort | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56 |
| `/events/we-successfully-launched-our-new-product-vermicelli/` | We successfully launched our new product – Vermicelli |  | We successfully launched our new product – Vermicelli – at a Bloggers Meet in Kochi. The meet was led by renowned Chef Regi Mathew and the P | 1 |  |
| `/events/distribution-free-vegetable-saplings-panampally-nagar-safe-veggies/` | Distribution of Free Vegetable Saplings | Posted by Eastern Condiments on Tuesday, 27 February 2018 | An initiative to Distribute Free Vegetable Saplings was organised at Silver Park, Panampilly Nagar, on the evening of 24.02.2018. The event | 1 |  |
| `/events/the-home-makers-fest-2022/` | The Home Makers’ Fest 2022 | More than excited and happy to be the official spice partner of The Home Makers’ Fest 2022 at Darbar Hall Ground, Ernakulam. The 10 day fest was inaugurated by Hibi Eden (MP)…Come and say Hi at our stall, we would love to see you there. Visit us at stall no.29. | Event Date 01 September 202212:00 Event Location Ernakulam Event Link Click here | 1 |  |
| `/events/bhoomika-2015/` | Eastern Bhoomika 2015 | programme generated in 2015, it was extended to Karnataka and Uttar Pradesh in 2016. The selected women from these states were honored on the same day at the same time in all the locations. | On the occasion of the Women’s Day, Eastern Condiments is bringing some of the behind- the-scenes-women to the limelight. The aim of the cam | 1 |  |
| `/events/eastern-global-short-film-awards/` | Eastern Global Short Film Awards | Posted by Global Short Film Awards on Tuesday, 2 January 2018 | Register Now Submit Your Short Films Focus Awards Watch Promo video Event Website Winners of 2016 Our Jury BIJUKUMAR DAMODARAN Film Director | 7 | www.facebook.com/plugins/video.php?href=https%3A%2 |

### A7. Contests (40)

| URL | Title | Date | Summary (first 140 chars, verbatim) | Images | Embeds/links |
|---|---|---|---|---|---|
| `/contests/guessthedish-contest/` | #GuessTheDish contest | — Eastern Condiments (@eastern_in) February 5, 2018 | #GuessTheDish Let’s see how many of you can get this right! If you can, you could win a spicy gift hamper! Five winners will be randomly cho | 3 | www.facebook.com/plugins/post.php?href=https%3A%2F; platform.twitter.com/embed/Tweet.html?dnt=false&em; www.facebook.com/plugins/comment_embed.php?href=ht |
| `/contests/spicequest-question-3/` | Spice Quest – Question #3 | Posted by Eastern Condiments on Sunday, 14 May 2017 | #SpiceQuest #Contest Q3. This spice has incredible amount of Vitamin “A”! Guess the spice 🙂 #SpiceQuest #Contest Q3. This spice has incredi | 1 |  |
| `/contests/guess-the-new-product-contest/` | Guess the New Product Contest |  | Contest Over Terms & Conditions HOW TO ENTER Comment on the Box Above ( Special Consideration) Comment on the Facebook post. Tweet on our Of | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56; |
| `/contests/republic-with-eastern/` | Republic with Eastern |  | Answer questions on Eastern twitter Handle and stand a chance to win Exciting Gift Hampers from Eastern Condiments. Feed #RepublicwithEaster | 2 | platform.twitter.com/widgets/follow_button.1227a56; platform.twitter.com/widgets/follow_button.1227a56; platform.twitter.com/embed/Tweet.html?dnt=false&em |
| `/contests/gold-dhamaka/` | Gold Dhamaka Winners |  | Anju P R, Anachal Anshad M Y,Muvattupuzha Seethy Muhammad, Poochakuthu Jerish J, Elappara Sibin Varghese, Kozhimala Vishnu Suresh, Vallakada | 1 |  |
| `/contests/spice-quest-question-1/` | Spice Quest Question #1 |  | #SpiceQuest contest starts here !! Participate now and win prizes! Winner Contest Over Terms & Conditions | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F; www.facebook.com/plugins/comment_embed.php?href=ht |
| `/contests/kiss-the-planet-contest/` | Kiss the Planet Contest |  | “The Earth does not belong to us; we belong to the earth “. It is time for all of us to come together on this day to pledge to make our plan | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/contests/my-lunch-box-contest/` | My Lunch Box Contest |  | Contest Over Terms & Conditions Follow Eastern India of Twitter. Retweet the Tweet. Invite your friends to Tweet about #MyLunchBox | 1 | platform.twitter.com/widgets/tweet_button.1227a567; platform.twitter.com/widgets/follow_button.1227a56; platform.twitter.com/widgets/tweet_button.1227a567 |
| `/contests/ilovedad-fathers-day/` | #ILoveDad Fathers day | 3.The contest will go live on June 08,2016 and will end at 6:00pm on June 16, 2016 . | Express your love for your Father at this Fathers Day and win exciting prizes from Eastern. Contest Over Terms & Conditions The Contestant a | 1 |  |
| `/contests/punjabi-range-guess-new-product-6/` | Punjabi Range – Guess new Product #6 |  | Guess our sixth new Product from the lip-smacking range of exotic Punjabi masalas !! How to Enter Guess the right product and Comment on the | 1 | www.facebook.com/plugins/video.php?href=https%3A%2; platform.twitter.com/embed/Tweet.html?dnt=false&em; www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/contests/celebrateunsungheroes-onam-contest/` | #CelebrateUnsungHeroes – Onam Contest |  | Contest Over Terms & Conditions HOW TO ENTER ReTweet the Official Twitter post GIFT DELIVERY : For Ease of management and Cost Saving we mig | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56; |
| `/contests/guess-our-product-contest-sweepstakes/` | Guess our Product |  | Guess the Product Correctly and you 5 lucky winners could get a nice Gift Hamper. Participate on Twitter Participate on Facebook Contest Ove | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; www.facebook.com/plugins/post.php?href=https%3A%2F; platform.twitter.com/widgets/widget_iframe.1227a56 |
| `/contests/guess-the-new-product/` | Guess the New Product |  | Can you guess our new product? Ten lucky winners will get an exciting gift hamper from Eastern! No.of Winners Gift Contest Ends by 10 Gift H | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F; platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/embed/Tweet.html?dnt=false&em |
| `/contests/hot-with-summer/` | Hot with Summer | Posted by Eastern Condiments on Wednesday, 15 March 2017 | What’s the spiciest dish you’ve ever eaten? Share with us and win an exciting gift hamper 🙂 What’s the spiciest dish you’ve ever eaten? Sha | 1 | www.facebook.com/plugins/comment_embed.php?href=ht |
| `/contests/ponnona-selfie/` | Ponnona Selfie | The contest will go live on September 08,2016 and will end at 6:00pm on September 15th, 2016 . | Share your own Onam selfie with us and win a gold coin !! Contest Over Terms & Conditions The Contestant agrees to provide complete and corr | 1 | oembed.jotform.com/62501398265458#?secret=3KOvu3Su |
| `/contests/eastern-40-year-celebration-offer/` | Eastern 40 Year Celebration Offer |  | Contest Over Terms & Conditions 1. Contest Details, Concept and Participation These terms and conditions apply to the Eastern Condiments – C | 1 |  |
| `/contests/stop-gif-contest-feb-2017/` | Stop the GIF contest – Feb 2017 |  | Stop the GIF at the right time! Comment with the screenshot of the answer and win an exciting gift hamper! #contest Contest Over Terms & Con | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/contests/can-guess-idiom-contest/` | Can you guess the idiom ? |  | Can you cook up an answer for this Food Idiom? A winner will be randomly chosen! Get on your thinking cap! Win exciting gift hamper from Eas | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F; platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56 |
| `/contests/spot-the-odd-one-out-contest/` | Spot the Odd one out Contest |  | Tweet Feed #Spottheoddoneout Tweets Contest Over Terms & Conditions | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56; |
| `/contests/ormayile-onam/` | Ormayile Onam |  | Ormayile Onam contest, Submit your Onam Memories to us and Get Gift Coupon worth Rs.3000/- from Eastern India. or Winner Congrats Gopi Krish | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F; platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56 |
| `/contests/stay-natural/` | Stay Natural |  | Share with us your natural tips and tricks that can chase cold and cough away! Contest Over Terms & Conditions HOW TO ENTER Comment on the B | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/contests/spice-quest-question-2/` | Spice Quest Question #2 |  | #SpiceQuest #Contest Q2. This spice helps to relieve hiccups! Guess the spice 🙂 Winners Contest Over Terms & Conditions | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/contests/summer-drink-contest/` | Summer Drink Contest |  | What’s your favourite summer drink? Is it a rejuvenating glass of Nimbu pani? Or a soothing, tongue tingling glass of Lassi? Or some other c | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/contests/taste-love-contest/` | Taste of Love Contest | Posted by Eastern Condiments on Friday, 12 May 2017 | #TasteofLove Delight your Mom with your delicious recipes this #MothersDay & share it with us ,win exciting gift hampers! #Contest #TasteofL | 1 |  |
| `/contests/gujarati-range-guess-new-product-3/` | Gujarati Range – Guess new Product #3 |  | Guess our second new Product from the lip-smacking range of exotic Gujarati masalas !! Twitter Contest Over Terms & Conditions HOW TO ENTER | 1 | www.facebook.com/plugins/video.php?href=https%3A%2; platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56 |
| `/contests/eastern-malayala-pachakam-ramzan-food-fest/` | Eastern Malayala Pachakam Ramzan Food Fest |  | Submit your Ramzan Recipes and Win Exciting Gift Hampers from Eastern. Contest Over Terms & Conditions When Submitting the recipes., Contest | 1 |  |
| `/contests/punjabi-range-guess-new-product-4/` | Punjabi Range – Guess new Product #4 | Posted by Eastern Condiments on Wednesday, 28 June 2017 | Winner We’re happy to finally announce the winners of our #Guessournewproduct #Contest! Congrats to all winners! Contest Over Terms & Condit | 1 | www.facebook.com/plugins/video.php?href=https%3A%2 |
| `/contests/momnme/` | #MomnMe | The contest will go live on May 06,2016 and will end at 6:00pm on May 14, 2015. | Share your Most cherished Mom n ME Photo with us. A lucky winner will get Gift Voucher worth Rs.3000 Contest Over Terms & Conditions The Con | 1 |  |
| `/contests/punjabi-range-guess-new-product-2/` | Punjabi Range – Guess new Product #2 | Posted by Eastern Condiments on Thursday, 8 June 2017 | Guess our second new Product from the lip-smacking range of exotic Punjabi masalas !! Post your guess as a comment to this post and five luc | 1 |  |
| `/contests/punjabi-range-guess-new-product-5/` | Punjabi Range – Guess new Product #5 |  | Contest Over Terms & Conditions HOW TO ENTER Comment on the Box Above ( Special Consideration) Comment on Facebook post. Tweet on our Offici | 1 | www.facebook.com/plugins/video.php?href=https%3A%2 |
| `/contests/stop-the-gif/` | Stop the GIF |  | Stop the GIF when the cake is baked! Comment with the screenshot of the right answer and 10 lucky winners will stand a chance to win an exci | 1 | www.facebook.com/plugins/video.php?href=https%3A%2; platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56 |
| `/contests/grihalakshmi/` | My Chukku Kappi Moment – Contest | The contest will go live on April 13th, 2018 and will end at 6:00 pm on October 30th, 2020. | ഷെയർ ചെയ്യാം ആഹ്ലാദ മുഹൂർത്തങ്ങൾ പരമ്പരാഗത രീതിയിൽ തയ്യാറാക്കുന്ന ചുക്ക് കാപ്പിയിലുണ്ട് നിരവധി ആരോഗ്യദായക ഗുണങ്ങൾ. ആസ്വദിക്കൂ, ആവി പറക്കും ഈ | 3 |  |
| `/contests/oru-kalakkan-selfie-contest-%e0%b4%92%e0%b4%b0%e0%b5%81%e0%b4%95%e0%b4%b2%e0%b4%95%e0%b5%8d%e0%b4%95%e0%b5%bb%e0%b4%b8%e0%b5%86%e0%b5%bd%e0%b4%ab%e0%b4%bf/` | #ഒരുകലക്കൻസെൽഫി Contest | April 2018 | No.of Winners Gift Contest Ends by 1 Prize Worth 5000 INR 18 Post your Vishu selfies on Facebook using the contest Hashtag below the contest | 1 |  |
| `/contests/punjabi-range-guess-new-product-3/` | Punjabi Range – Guess new Product #3 | Secret Tip — Added on 19 June 2017 — | Guess our #3 Product from the lip-smacking range of exotic Punjabi masalas !! The Product name might have some links with Ludhiana. Winner W | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56; |
| `/contests/spice-quest-question-4/` | Spice Quest : Question #4 | Posted by Eastern Condiments on Thursday, 18 May 2017 | #Spicequest #contest Q4. Too much of this spice can make you hallucinate! Guess the spice ! #Spicequest #contest Q4. Too much of this spice | 1 |  |
| `/contests/know-your-spice/` | Know Your Spice | The contest will go live on June 01,2016 and will end at 6:00pm on June 30, 2015 and the contest consists of 8 rounds , the winner of each .round will be announced upon closing of that round | The contest is open to all Indian citizens aged 18 or above with the exception of employees, their immediate family members, agents, distrib | 1 |  |
| `/contests/gujarati-range-guess-new-product-2/` | Gujarati Range – Guess new Product #2 |  | Contest Over Terms & Conditions HOW TO ENTER Comment on the Box Above ( Special Consideration) Comment on Facebook post. Tweet on our Offici | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56; |
| `/contests/guess-new-product-gujarati-1/` | Gujarati Range – Guess new Product #1 |  | Contest Over Terms & Conditions | 1 | platform.twitter.com/embed/Tweet.html?dnt=false&em; platform.twitter.com/widgets/widget_iframe.1227a56; |
| `/contests/holi-recipe-contest/` | Holi Recipe Contest |  | Share with us your Favourite Holi Recipe and take a Gift hamper home from Eastern. Contest Over Terms & Conditions Submit your recipes here | 1 | www.facebook.com/plugins/post.php?href=https%3A%2F |
| `/contests/punjabi-range-guess-new-product-1/` | Punjabi Range – Guess new Product #1 | Posted by Eastern Condiments on Saturday, 3 June 2017 | Guess our new Product from the lip-smacking range of exotic Punjabi masalas !! Guess our new Product from the lip-smacking range of exotic P | 1 |  |

### A8. Blog posts (6)

| URL | Title | Date | Summary (first 140 chars, verbatim) | Images | Embeds/links |
|---|---|---|---|---|---|
| `/blog-post/onam-song/` | Listen to “ഓണം തിരുവോണം..” song | Friday, August 11, 2023 | Now Enjoy Our Onam Song On | 6 |  |
| `/blog-post/boat-race-alleppey/` | Boat Race @Alleppey | Tuesday, August 1, 2023 |  | 1 | www.instagram.com/reel/Ch4iv0sh_YW/embed/captioned |
| `/blog-post/canter-van-activity/` | Canter Van Activity | Tuesday, August 1, 2023 |  | 5 |  |
| `/blog-post/onam-2023-song/` | Atham Pathum Perfectakkam | Tuesday, August 1, 2023 |  | 1 | www.youtube.com/embed/T7o_hKVUjKI |
| `/blog-post/eastern-perfect-onam-song-undo-unde/` | Onam Song ‘Undo Unde’ | Tuesday, August 1, 2023 |  | 1 | www.youtube.com/embed/YjdxLT950tE |
| `/blog-post/test/` | Onam Trade Fair | Monday, July 31, 2023 |  | 5 |  |

### A9. Dealers / store locator (108 `dealers` posts; 108 map markers)

The store locator embeds a `locations` array of [name, lat, lng, address HTML] used to drop Google Maps markers. Each `/dealers/<slug>/` post repeats one marker's details; some posts (e.g. "Uttar Pradesh Range – II") list many distributors in the body.

| Marker name | Lat, Lng | Address / phone (verbatim, tags stripped) |
|---|---|---|
| Patidar Supermarket | 40.498338, -74.644778 | 649 US-206, Hillsborough Township, NJ 08844, USA +1 908-308-5940 |
| Star Bazaar | 40.5352218, -74.5074054 | 1760 Easton Ave, Somerset, NJ 08873, USA +1 732-356-3000 |
| Delight Big Bazar | 40.408263, -74.5089507 | 2058 US-130, Monmouth Junction, NJ 08852, USA |
| Patidar Supermarket | 40.498338, -74.644778 | Patidar Hillsborough, NJ 08844 United States |
| Royal Malabar Inc | 42.0723372, -87.8394839 | 911 Greenwood # B, Glenview, Illinos 60025, USA |
| Patel Brothers | 41.9084057, -88.0800262 | 1568 Ogden Ave, Naperville, IL 60540, USA |
| Spice Bazaar Grocers | 42.2402348, -87.9694307 | 131 W Townline Rd, Vernon Hills, Illinois 60061, USA +1 847-549-0065 |
| Desi needs | 42.2402348, -87.9694307 | 3900 Washington St IJ, Gurnee, Illinos 60031, USA |
| Avkar Grocer | 41.746611, -88.167793 | Naperville, Illinois United States |
| Kashmir Garden | 40.08633632034192, -75.04545412952267 | Krewstown Rd Philadelphia, PA 19115 United States Get directions |
| Indian Grocery Outlet | 40.53642301836389, -74.39668841849108 | Edison, NJ 08817 United States Get directions |
| Patel Brothers Grocery | 40.0986564, -74.944316 | 1915 Street Rd, Bensalem, PA 19020, USA Located in: Bensalem Plaza Shopping Center. +1 215-447-8154 |
| Shiva Bazzar | 42.192045014878744, -71.1977381963993 | Shiva Bazzar 111 Lenox St Norwood, MA 02062 United States Get directions |
| Indian Food and Spices | 42.300111498254935, -71.4321624564791 | Indian Food and Spices 855 Worcester Rd Framingham, MA 01701 United States Get directions (508) 628-3100 |
| Bawarchi Biryanis | 42.29825, -71.425857 | 700 Worcester Rd Framingham, MA 01702 United States Get directions |
| Patidar Supermarket | 40.44043256491992, -74.52837366431777 | New Jersey United States Get directions |
| Patel Brothers | 42.048908002865936, -88.10130852823796 | Patel Brothers Schaumburg, Illinois United States Get directions |
| Patel Brothers | 41.768346, -88.186932 | 1568 W Ogden Ave Naperville, IL 60540 United States Get directions |
| Patel Brothers | 41.941951, -88.1654247 | 2410 Army Trail Rd, Hanover Park, Illinois 60133,United States Get Directions |
| Ambica Foods | 41.937481, -88.112432 | 366 Army Trail Rd #350, Bloomingdale, IL 60108, United States Get Directions |
| Desi Bazaar | 41.93720571683011, -88.07743493060906 | Glendale Heights, IL 60139 United States Get directions |
| Masalas &#038; More | 41.73104600634424, -88.20664836354852 | Illinois United States Get directions |
| Al-Haseeb | 40.603234, -74.131595 | Al-Haseeb 318A Bradley Ave (Willowbrook Rd) Staten Island, NY 10314 United States Get directions +1 718-983-9212 |
| Patel Brothers Grocery | 40.09851533669156, -74.94517202410417 | Patel Brothers Grocery 1915 Street Rd Bensalem, PA 19020 United States Get directions |
| Indian Market | 41.4182655590415, -73.46368051105473 | Indian Market Danbury, CT 06811 United States Get directions |
| Bombay Sweets And Spices | 41.41458025277691, -73.45885290968609 | Bombay Sweets And Spices Danbury, CT United States Get directions |
| Indian Grocery Store | 41.536794, -72.616973 | Indian Grocery Store 749 Saybrook Rd Middletown, CT 06457 United States Get directions |
| Sai Foods | 41.67035721753105, -72.64310940598968 | 2086-2140 Connecticut 99 Rocky Hill, CT 06067 United States Get directions |
| Om Foods Market | 41.68468, -72.65526 | 1321 Silas Deane Hwy, Wethersfield, CT 06109, USA Get Directions |
| Indian Market | 37.54618024393195, -121.98167509108896 | Indian Market 3911 Stenerson Ln Fremont, CA 94538 United States Get directions |
| Indo Lanka Cash &#038; Carry | 33.85963, -118.08252 | Indo Lanka Cash &amp; Carry 18743 Pioneer Blvd Artesia, CA 90701 United States Get directions |
| Delight Big Bazaar Farmers Market | 40.86472873976118, -74.3987354173023 | New Jersey United States Get directions |
| Subzi Mandi | 40.86407580276588, -74.40218259209998 | 1449-1625 U.S. 46 Parsippany-Troy Hills Township, NJ07054 United States Get directions |
| Triveni Indian Supermarket | 32.823666690811166, -96.99432161261717 | Irving, TX United States Get directions |
| East West General Store | 32.846168518066406, -96.59735107421875 | Garland, TX 75043 United States Get directions |
| Patel Bros | 28.05407683126686, -82.44558272727195 | 1251 E Fowler Ave Tampa, FL 33612 United States Get directions |
| Sri Gayathri Foods | 43.035415788083455, -88.14896428502188 | 19035 W Bluemound Rd Ste 7 Brookfield, WI 53045 United States Get directions |
| Taj Groceries | 43.11894941191779, -88.05638125238937 | 5597 N Lovers Lane Rd (Silver Spring) Milwaukee, WI 53225 United States Get directions |
| Indian Groceries &#038; Spices | 43.05976794648545, -88.04593532282924 | 10633 W North Ave Wauwatosa, WI 53226 United States Get directions |
| Bharat Mart | 43.050827, -87.89429 | Milwaukee, WI United States Get directions |
| Best Food Store | 42.98267724884334, -87.92926006852089 | 3413 S 13th St (Holt Ave) Milwaukee, WI 53215 United States Get directions |
| Southern Spices | 41.72597856, -88.205502 | 2959 Artesian Rd Naperville, IL 60564 United States Get directions |
| Avkar Grocer Inc | 41.7464699, -88.1681786 | 1411 Plainfield-Naperville Rd, Naperville, IL 60564, USA Get directions |
| A1 Indian Groceries | 41.767956, -87.973427 | 6601 S Cass Ave, Westmont, IL 60559, USA Get Directions |
| Falcon plaza Grocers | 41.768203, -87.973786 | Westmont, IL United States Get directions |
| Subzi-Mandi Grocery | 40.574311, -74.330889 | 1538 Oak Tree Rd Iselin, New Jersey 08830 Get Directions |
| Meena Bazzar | 40.5727715, -74.3387714 | 1650 Oak Tree Road, Edison, NJ 08820, USA Get Directions |
| Patel Cash &#038; Carry | 40.57304, -74.33273 | 1551 Oak Tree Rd Iselin, New Jersey 08830 Get Directions |
| India Grocers | 40.571111, -74.340631 | 1665 Oak Tree Road, Edison, NJ 08820, USA Get Directions |
| Patel Brothers | 40.571863, -74.343709 | 1681 Oak Tree Road, Edison, NJ 08820, USA Get Directions |
| Apna Bazar | 40.574232, -74.345854 | 1700 Co Rd 604, Edison, NJ 08820, USA Get Directions |
| Shivam Groceries | 33.9512308, -84.5009887 | 1812 Lower Roswell Rd, Marietta, GA 30068, USA Get Directions |
| Suvidha Indo-Pak Groceries | 34.0775319, -84.1623674 | 3495 Peachtree Pkwy #105, Suwanee, GA 30024, USA Get Directions |
| Taj Groceries | 43.11894941191779, -88.05638125238937 | 5597 N Lovers Lane Rd (Silver Spring) Milwaukee, WI 53225 United States Get directions |
| Indian Groceries &#038; Spices | 43.05976794648545, -88.04593532282924 | 10633 W North Ave Wauwatosa, WI 53226 United States Get directions |
| Sri Gayathri Foods | 43.035415788083455, -88.14896428502188 | 19035 W Bluemound Rd Ste 7 Brookfield, WI 53045 United States Get directions |
| Patel Bros Grocery Store | 28.05407683126686, -82.44558272727195 | 1251 E Fowler Ave, Tampa, FL 33612, United States |
| Cherians International Fresh Market | 34.1054555, -84.1783011 | 2255 Callaway Ct, Cumming, GA 30041, USA |
| Cherians International Groceries | 33.7989943, -84.2788048 | 751 Dekalb Industrial Way, Decatur, GA 30033, USA |
| India Cash and Carry | 37.53011226075858, -121.99938112653473 | Fremont, CA 94538 United States |
| Coconut Hill Indian Foods | 37.492991, -121.931718 | 46129 Warm Springs Blvd Fremont, CA 94539 United States |
| Rasayani office | 18.8866286, 73.1547516 | Eastern Condiments Pvt Ltd. C/o Archana Oil Compound, Plot No. 5/1, 5/2, Turade Village,, Rasayani, Maharashtra 410207 |
| Pune Office | 18.4416508, 73.9728646 | 10, Hadapsar - Saswad - Jejuri Rd Dhava Mile Area, Pimpalmala Wadki, Hadapsar - Saswad - Jejuri Rd, Dhava Mile Area, Pimpalmala, Wadki, Maharashtra 412308 |
| Lucknow Office | 26.774956, 80.894826 | Hindnagar Colony, Transport Nagar, Lucknow, Uttar Pradesh 226012 |
| Uttar Pradesh Range | 25.6135068, 83.50702030000002 | Dangwal And Sons - Naveen , Rc14 Tara Enclave Khora Sunday Market ,ph No. 08527247329,, Uttar Pradesh, India Suraj Foods - Begumganj,maqbra Sadar,,, Uttar Pradesh, India Maa Vaisno Agency , Kaushambi Karan Chauraha, Sarai Akil, Kaushambi,, Uttar Pradesh, India Praveen General Store , Tikait Nagar, Barabanki, Uttar Pradesh, India Ranjeet Traders , Baburi Chandauli, Varanasi,, Uttare Pradesh, India R.k. Enterprises ,Renukoot Darji Market, Renukoot, Sonebhadra,, Uttar Pradesh, India Verma Traders , Farrukhabad - Machhilili Tola Fatehgarh,, Uttar Pradesh, India Raj Traders , Jhansi ,c.p.mission Compound,opp. Jal Sansthan Office,, Uttar Pradesh, India Shubham Enterprises ,Sh 10/301 S Chhatareepur, Shivpur, Varanasi,, Uttare Pradesh, India Satya Narayan Kesarwani &amp; Brothers Katra Fateh Mohmood Khar Etawah,, Uttar Pradesh, India Shubhi Traders Vijay Nagar,, Uttare Pradesh, India Vishwanath Prasad Shri Prakash - Chaman Singh Bag Road,, Uttar Pradesh, India Aradhya Enterprises , Village Bahar Gaon, Itaunja Tehsil,bkt,, Uttar Pradesh, India S.m Enterprises , Akhada Pura Near Shahpur Bas Stand Main Road,,, Uttar Pradesh, India M/s Jain Trading Co. , North Civil Lines, Muzaffarnagar,, Uttar Pradesh, India Om Sai Om Traders , Haqiqtpura Maunath Bhanjan,, Uttar Pradesh, India M/s Manish Kirana Store ,Birya Ganj ,tilhar,, Uttar Pradesh, India Dinesh Agencies , Lal Gopalganj, Jethwara Road, Soraon,,, Uttar Pradesh, India Rishabh Traders ,Adarsh Nagar Sector -1,,, Uttar Pradesh, India Kanodia And Sons , Madhubani Colony Kanth Road,, Uttar Pradesh, India Adarsh Enterprises, Akbarpur Sarai Ghagh,,, Uttar Pradesh, India M/s Satya Narayan Oil Mill- Sampurana Nagar Road Paliya Kalan(Kheri),, Uttar Pradesh, India Barkha Enterprises , Moh. Bhagwant Nagar Near Shiv Mandir Mallawa,, Uttar Pradesh, India Jhalak Traders , H No 382 Bhot Bakkaal Tehsil Sadar,, Uttar Pradesh, India Shoeb Enterprises, Vill. Shitlapur, Jarwaroad, Tulsipur Diss. Balrampur,, Uttar Pradesh, India Ms Lala Mansha Ram Sweets , Pilibhit,, Uttar Pradesh, India Uday Maan Industry , Rambagh Near Pull Baghpat Road,, Uttar Pradesh, India Ram Ji Traders , Karuna Bazar, Chauraha Lalganj Raebareli,, Uttar Pradesh, India A.b.traders , F-80 Sida Sathariya Mungrabadshah Pur,, Uttar Pradesh, India Aanya Traders ,siddheswar Nagar I.t.i,, Uttar Pradesh, India Aisling Global Corporation , Behind Cold Storage, New Teachers Colony,dadri,, Uttar Pradesh, India M/s Jeeshan Agenciess , Gayas Market Sattibazar,, Uttar Pradesh, India Goyal Agencies - Dankour Anaj Mandi Dankour,, Uttar Pradesh, India Mittal Traders - Etah Hathi Gate, Subhash Marg,, Uttar Pradesh, India M/s Jbr Stores, Purainia Talab Balrampur,, Uttar Pradesh, India Bal Kumar Sohan Lal Trading Co, Choti Palia, Palia Khurd Palia, Kheri,, Uttar Pradesh, India M/s A.a.j Store ,Katarnia Road Mohalla Beldaran Tola Nanpra,, Uttar Pradesh, India M/s Shyam Agencies, B-38/47-u-1,tulsipur Road Mahmoorganj,, Uttar Pradesh, India Chaurasia Trading Company , Azad Road Barthana,, Uttar Pradesh, India Shivangi Traders ,C 82 Sri Radha Puram,, Uttar Pradesh, India A.K. Enterprises- Lucknow , Pr 175, Nehru Enclave, Gomtinagar, Lucknow,, Uttar Pradesh, India Chedilal Satish Kumar , Gulamali Pura,chhawni Bazar,bahraich,, Uttar Pradesh, India A P Traders , Achary Ram Nagina Lal Marg Bhirguashram,, Uttar Pradesh, India Dahuja Traders, B 14, Nai Basti, Near Dr. Bangall Wali Gali,,, Uttar Pradesh, India Maa Shitla Kerana Store ,4/313 Sarai Goberdhan Chetgand,, Uttar Pradesh, India A.k. Traders , Moh- Madharey Tola, Po- Sadar, Jaunpur.,, Uttar Pradesh, India Ankit Traders ,592 Shahganj Chauraha Sultanpur,, Uttar Pradesh, India A.k.enterprises , Main Road, Duddhi,, Uttar Pradesh, India Pal Stores, Mahdewa, Ghazipur,, Uttar Pradesh, India |
| Uttar Pradesh Range &#8211; II | 28.5355161, 77.39102649999995 | A.b.traders 9307952920 Near Kewal Palace, Uttar Pradesh, India D K Trading Co 9927036042 Packaa Bagh, Bareilly, Uttar Pradesh, India Babita Enterprises 9554446350 Sheer Govardhan, Uttar Pradesh, India Dileep Trading Company 9795852782 Dhanuwa,rampur,, Uttar Pradesh, India Jay Kay Enterprises 9450247005 Near Pani Ki Tanki , New Mahal , Mugalsarai .,erode-(D.t), Uttar Pradesh, India Millan Traders 9307165461 Raziya Complex, Uttar Pradesh, India Prabhu Krapa Traders 8726452032 256/9 Babu Purwa Coloney Kidwai Nagar, Uttar Pradesh, India Shree Hanuman Traders 9369192965 Sukrawari Bazar, Bharatganj, Allahabad, Uttar Pradesh, India Suryansh Trading Company 9918011119 Moodghat Road, Uttar Pradesh, India Govind Traders 9807892402 H. No. 592, Shahganj,gandhi Nagar,sultanpur, Uttar Pradesh, India R.s.enterprises 9919657957 161 A Barra 6, Kanpur, Uttar Pradesh, India Shri Balaji Traders - Mau 9452202388 Haqiqatpura, Mau Nath Bhanjan, Mau ., Uttar Pradesh, India S R M Traders 9453181800 Gahiri Sagra Sunder Pur , Uttar Pradesh, India Sana Traders 9044006807 1/a, Bhram Nagar G.t. Road Bilhaur, Uttar Pradesh, India Raahul Distributors &amp; Supplie 8853887700 694 W2 Basant Vihar Naubasta Kanpur, Uttar Pradesh, India Suyash Enterprises 9519060911 512 Surya Enclave Sector 12, Uttar Pradesh, India Swastik Enterprises 7270838474 Mayank Jaiswal,,nayapura Kareli, Uttar Pradesh, India Sneh Agencies 9956924282 502,a B Nagar Back To Sunder Takies, Unnao, Uttar Pradesh, India Gupta Khad Bhandar 9520001101 Main Bazar, Nakur, Dis. Saharanpur, Up., Uttar Pradesh, India Al - Shajar Trading Co 9634532640 H.no.11/1023,,aali Ki Chungi Saharanpur, Up ., Uttar Pradesh, India Gupta Trading Company 7505447710 C 10/5, Jiyapura Nayapandariba, Uttar Pradesh, India Lila Traders (Rv) 7398845422 Loha Bazar , Lakhimpur, Uttar Pradesh, India Bhardwaj Trading Co 9319940650 45/125,nagla Ajita Sector - 8,,avas Vikas Agra, Uttar Pradesh, India Ajay Store - Allahabad 9389222256 65 A/ 63a Chahchand, Zero Road, Uttar Pradesh, India Haldia Marketing Company 9554594474 Tarabganj Road Chungi Naka Gonda Up, Uttar Pradesh, India Bajpai General Store 9984759001 117/n 19 Tulsi Nagar Kakadeo,, Uttar Pradesh, India Dwivedi Enterprises 9935301368 4/208,purana , Kanpur, Uttar Pradesh, India Lalit Kumar Traders 9305319090 I-659, Gujaini Colony,,near Pv School Kanpur, Uttar Pradesh, India Gupta Agencies - Banda 8355056156 Railway Station , Near Allahabad Bank,khurand Roda, Banda, Uttar Pradesh, India Sanjay Kirana Store-sitapur 9721610130 Serpur ,tahsil-laharpur , Uttar Pradesh, India Subham Trading Co 9873193131 H. No. 188 Shakari Nagar, Near Awantika, Uttar Pradesh, India Krishna Agency - Fatehpur 8574451092 384- Peeranpur Fatehpur,near- Nav Bharti School, Uttar Pradesh, India Maha Laxmi Trading Co 9616073581 Chandra Colony, Peernagar, Ghazipur,, Uttar Pradesh, India Goyal Agencies - Sonebadhra 9044545607 Anpura Bazar, Anpura,,up, India Sunita Enterprises 9574703828 Police Line Road, Near Aggarwal Cold Storage,,,up, India Uttam Traders 9616976747 Naya Bazar, Chudi Market,,up, India Balaji Traders - Farrukhabad 9125908786 Lingiganj 1st Gate , Farrukhabad,, Uttar Pradesh, India Vansh Enterprises 9839809301 441/l/3/20, Old Topkhana Bari Road, Balaganj,,up, India Gupta Agency - Varanasi 7505099622 Sa 6/149a 4 J D Nagar Phase 1 Akatha Pahariya,, Uttar Pradesh, India Aksha General Stores 8115324677 Daniyal Pur Mod, Safedabad, Nawab Ganj,, Uttar Pradesh, India Jagadamba Trading Co 9758059666 Peeth Bazar, Rampur, Maniharan Dist.,, Uttar Pradesh, India Shree Ram Enterprises 9795094154 Choori Gali , Obra , Sonebhadra, Uttar Pradesh, India Maha Laxmi Traders 9616329596 Galla Mandi Jharwal Kasba Dist., Uttar Pradesh, India Nishoo Agencies 9984008779 Near Chandan Palece, Chilbila In Front Of Adarsh Dhaba, Uttar Pradesh, India Astha General Stores 8355000935 Shakaramandi, Sadar, Jaunpur., Uttar Pradesh, India Mittal &amp; Sons 9871400329 D - 72, Village Ram Pur Jagir Greater Noida, Noida., Uttar Pradesh, India Bhavna Marketing 9415232495 Rani Chouk, Saidpur , Ghazipur Up., Uttar Pradesh, India Shri Shyama Shyam Trading 7071935827 Lala Ka Gola,anraura Chunar, Mirzapur Up, Uttar Pradesh, India Hariom Enterprises 9415618681 Bajaj Agency Robertsganj, Sonbhadra, Uttar Pradesh, India Suresh Agency - Varanasi 9026080275 N-10/62 D.l.w Road Kakarmatta, Varanasi, Uttar Pradesh, India Ram Raj Traders 8923465217 Vijay Nagar Colony Etah, Etah Up, Uttar Pradesh, India Uday Chemical Works 9411464611 A 281 - Trans Yamuna Colony Agra, Uttar Pradesh, India Ankit Traders 9670919555 Sankat Mochan Welleslyganj, Uttar Pradesh, India Ok Traders 9452484051 Gohnna, Dostpur Road, Jaiawal Rice Mill, Uttar Pradesh, India |
| UttarPradesh Range | 26.846709, 80.946159 | Nisha Trading Co - Sahidabad 340, Girdhar Enclave, Shahibabad, Uttar Pradesh 9250097662 Rastogi Traders 9753600341 Mr. Shekhar Rastogi Mishra Building , Uttar Pradesh Super Mak Marketing 107 Anantpura, Azamgarh, Uttar Pradesh 9532052829 Shree Mohan Agency - Shikandrabad Kesri Wada ,uttar Pradesh 9359914422 Nisha Trading Co - Noida J - 239, Sect - 22, Uttar Pradesh 9718277633 Vaishno Sales 9058769603 Saharanpur, Opp. ITC , Khalassi Line, Uttar Pradesh Goel Agency - Shamli 8923211796 Mandi Marsganj, Uttar Pradesh Virendra Traders-lucknow 9792133330Mr. Virendra Kumar Gupta 3/72, Uttar Pradesh Shree Prakash Traders 8858284201 Bartan Mandi Lakhimpur, Uttar Pradesh Bansal Traders 9219563098 160/260,topchi Wada, Near Sahar Kotwali, Uttar Pradesh Kavita Associates 9319311911 26-vidhya Nagar, Sector-3,shastri Nagar, Uttar Pradesh Shivam Enterprises 9936397212 444/2 - Bal Mukund Road, Uttar Pradesh Aman &amp; Brothers 9889338778 1064, Arya Samaj Mandir, Uttar Pradesh Kundan Enterprises 8382943507 Galla Mandi, Uttar Pradesh Mewa Lal Ramesh Chandra 8381946751 435, Katra, Allahabad, Uttar Pradesh Radha Agencies 9450886467 Shop No.-37 Gda Complex, Uttar Pradesh S. M. Agency 9161048087 Firojapur Ramabai Nagar, Uttar Pradesh Akhtar Hussain 9044903665 Sabji Mandi Kannauj, Uttar Pradesh Komal Traders 9616267128 133, Jaidoon Muraintola, Uttar Pradesh Shahina Bano 7499166012 Retail Shop No. 7 Numaish Purwa Masjid , Uttar Pradesh Maa Gaytri Marketing 8090441514 Bedi Puliya, Uttar Pradesh Suresh Agencies - Sultanpur 9839632528 9622001304 588, Gandhi Nagar, Uttar Pradesh Raju General Store 9335603444 70/16, Minjahpur,, Uttar Pradesh |
| Puducherry | 11.7027158, 75.53640419999999 | Nas Traders Mahy 9496297243 Aneesha Store Mahy 9946679456 |
| Kannur | 11.874478, 75.370366 | Sugesh Chakkarakal 9895099166 Vasu Chakkarakal 4973296382 Shamsheena Chakkarakal 9605040255 M K Traders Chakkarakal 9895614334 Irivery Store Chakkarakal 9447054833 Wayanadu Store Anjarakandi 9447853831 S M Traders Chakkarakal Reshmi Store Mambaram 9847506650 Wayanadu Store Yechoor 9633306952 Wayanadu Store Varam 9495326493 Mini Store Thalassery 9446657108 Family Store Muzhuppilangadu 9847452248 Malabar Traders Mattannur 9447084915 Thayif Store Mattannur 9446772953 Cee Pee Traders Mattannur 7356712511 Prince Sivapuram 9562181840 E T C Trading Company Uruvachal 9447286701 I T C Store Uruvachal 9447682880 Abaha Traders Irikoor 9847299817 A T C Irikoor 9947032597 Sree Saradha Kolayadu 4902303269 Alakandy Smkt Kuthuparamba 9447700805 Alakandy Store Kuthuparamba 9447700805 N K Store Kuthuparamba 9995101551 C K Store Kuthuparamba 9947558569 Prince Kuthuparamba 9447549928 Azees Store Kuthuparamba 9400461586 Kerala Store Panoor 9895522738 Fmily Marginfree Smkt Panoor 9400646903 A N Traders Panoor 9495783401 Sree Narayana Panoor 8547599712 New Sree Narayana Panoor 9947281454 Shlimar Store Kallikandy 9567876839 K N K Traders Parakkadavu 9496383409 Bismi Store Parakkadavu 9447484427 Bismi Smkt Parakkadavu 9447484427 Sharmina Store Kuthuparamba 9400407671 |
| Calicut | 11.2587531, 75.78041000000007 | Sobhana Stationary Big Bazar Calicut 9995044675 Jose Traders Big Bazar Calicut 9387427001 S R Traders Big Bazar Calicut 9447292325 Real Foods &amp;bakers Kalicut Market 9446968531 Kairaly Store Calicut Market 9895516713 Presy Store Calicut Market 9744961383 Triveny Store Calicut Market 9895707932 Shaji Store Calicut Market 9895797978 P K H Enterprices Fish Market Kkd 9447311099 Vijaya Store Fish Market Kkd 9037918774 Star Trading Compani Valiyangady Kkd 8111819616 Lenjith Agrico Kozhikodu 9946013535 We Mart Kakkattil 4962445228 Iratty Smkt Nadapuram 9447660798 Moidhu Store Kallachi 9495474849 Rubiyan Kallachi 8086206040 Kunjandy Palayam 4952703063 K P Janardhnan Palayam 4952723680 Prabha Store Naduvattam 9746823863 Chitra Smkt Pantheerankavu 9388294254 |
| Cherkala | 12.511566, 75.058194 | Sirsy Cherkkala 9447439375 Thulasy Store Bandadukka 9495802931 Karwar Store Mulleriya 9656699886 |
| Kasaragod | 12.4386702, 75.20122900000001 | Rahman Store Kasaragod 9895132299 K M Traders Kasaragod 9447925759 Viswas Associate Kasaragod 9567658053 Kadeeja Traders Mallankai 9447449797 Kabeer Store Santhosh Nagar 9947282303 Teisha Naimarmoola 9895522262 |
| Chinnakada | 8.887349700000001, 76.58566589999998 | Badhrudheen Store Karuvatta 9995581258 G T Traders Polayathodu 8136909869 Supreme Chinnakada 9846017388 Dhanya Kollam 9446007221 Super Traders Chinnakada 4742747172 General Store Kollam 4742750943 A K Agencies Kollam 9847074422 A N Store Kollam 8086604030 Nazer Tea Kollam 9446787527 Sadhik Store Kollam 9446504412 S K Stores Kollam 9895066148 Luba Traders Kollam 9746925368 Thaivila Storre Punnathadam 4742520929 I B Stores Kundara 9847349182 Anu Store Chandhanathoppu 9495611914 Stains Trading Co Kollam 4747762842 Sajas Agency Karikkodu,moonamkutty 9947828559 Perumkuzhiyil Super Mkt Edappallykotta 4762671741 Puthenvila Store Kundara 7034344402 Al Manama Kollam 8943336015 B Kada Kadappakada 9544944077 |
| Kollam | 8.8932118, 76.61413960000004 | P M S S R Kollam 4742749695 A S K Store Kollam 4742750303 N Bakakrishna Pillai Kollam 9446344509 K S Stores Kollam 9447071924 Vava Tea Store Kollam 9809088070 Mahalakshmy Store Kollam 9895716923 Janardhanapillai Store Kollam 9037404759 A M Traders Kollam 9895660105 Sulaiman Store Kollam 9605441444 Njaramoottil Store Parippally 9388428473 Soorya Margin Free Kulanada 9747014137 Suma Rice Store Paravoor 4742516464 S R Traders Oyoor 8129766613 |
| Kayamkulam | 9.184365899999998, 76.51515599999993 | Meera Store Mannar 4792312319 Manjerikalam Brothers Mannar 4792310473 Sakthi Treaderrs Mavelikkara 4792303485 Sameer Stores Kayamkulam 9995007145 Haridhase Store Kayamkulam 4792445971 Koyikkilethu Store Kayamkulam 9447424306 Valiyaveedan Puthiyakavu 4762620387 Hudha Store Chakkuvally 9447430039 Naaz Agency Kayamkulam 9847491008 K S Stores Kayamkulam 9947835388 O S Traders Kayamkulam 9037205713 Sam Agency Mavelikkara 4792301697 |
| Pathanamthitta | 9.264758200000001, 76.78704140000002 | P P Store Pathanamthitta 9447032639 United Store Pathanamthitta 9656564333 Malabar Biriyani Pathanamthitta 9746584770 C P Store Pathanamthitta 4682222214 Jasmin Cold Storage Pathanamthitta 4682325477 Alankar Super Bazar Pathanamthitta 9847232666 Shajahan Provision Store Pathanamthitta 9895093000 |
| Punalur | 9.009768, 76.92973540000003 | M Johny and Sons Punalur 9446786401 Alanjery store Alanjery 9447659665 C S Basheer Punalur 9447247630 |
| Kannanallur | 8.8941233, 76.678184 | Riyan Biriyany Pandhalam 9495392563 R B Traders Pandhalam 9447564388 M M Traders Pandhalam 4734251165 K Sankaranarayan Reddiyar Parakkodu 4734216618 A B Store perumpuzha 9847155550 |
| Mansoor traders | 10.8067836, 76.196485 | Pattambi, Kerala 679303, India 9846169747 |
| Bismillah stores | 10.8067836, 76.196485 | Pattambi, Kerala 679303, India 9846077750 |
| City traders | 10.802634, 76.217494 | Ongallur, Kerala, India 9946410724 |
| K.M Stores | 10.792236, 76.323204 | Vaniyamkulam-I, Kerala, India 9048172029 |
| Anil kumar | 10.559572, 76.177375 | Choorakkattukara 9426154912 |
|  | 10.5284793, 76.26818709999998 | Mannuthy 9947674516 |
| T.C.M stores | 10.733606, 75.9748803 | Maranchery, Kerala, India 9946241460 |
| Super Stores | 10.765478, 75.926653 | Ponnani, Kerala, India 9746153437 |
| Unique stores | 10.7677201, 75.92590129999996 | Ponnani, Kerala, India 9562133884 |
| Karimbanackal Stores | 10.782869, 76.008836 | Edappal, Kerala, India 9847407358 |
| Chaithanya Stores | 10.7838616, 76.00759449999998 | Edappal, Kerala, India 9895439699 |
| Karthika stores | 10.8337466, 76.04887959999996 | Kumbidi, Kerala, India 9446153581 |
| Shihla stores | 10.7346997, 76.05080720000001 | Valayamkulam 9447626251 |
| Beeru sons | 10.351213, 76.116372 | Chamakkala, Kerala, India 4802842758 |
| Brothers Stores | 10.335058, 76.139052 | Kalamuri, Kaipamangalam, Kerala 680681, India 9846884138 |
| Asheer Traders | 10.3351386, 76.13942420000001 | Kalamuri, Kaipamangalam, Kerala 680681, India 994653533 3 |
| Guru Stores | 10.3092561, 76.14649029999998 | Perinjanam, Kerala, India 9447305085 |
| E.R.K trading | 10.3215169, 76.14504090000003 | Moonnupeedika, Kerala 680681, India 9447155238 |
| C.R.S Stores | 10.6515875, 76.07109949999995 | Puzhikala Kunnamkulam, Kerala 680503, India 9447530311 |
| M.P. Paul stores | 10.1672856, 76.439884 | Kalady, Kerala, India 9388862348 |
| V.P.M stores | 10.131939, 76.4821849 | Perumbavoor, Kerala, India 9847956252 |
| Xavier stores | 9.537979, 76.69826799999998 | Pathipalam, Kanam, Kerala 686515, India 9446869301 |
| Xavier stores | 10.131939, 76.4821849 | Perumbavoor, Kerala, India 9447052217 |
| Salamath Stores | 10.7676064, 76.26529089999997 | Shoranur, Kerala, India 8136830855 |
| J.R traders | 10.6941373, 76.35 | Chelakkara, Kerala 680586, India 9447834248 |
| V M Stores | 10.6941373, 76.34636239999998 | Chelakkara, Kerala 680586 India 9447670162 |
| Friends Stores | 10.0601903, 76.6350827 | Kothamangalam 9946186366 |
| Eastern Condiments &#8211; Bengaluru | 13.0180197, 77.6537512 | Eastern Condiments Premaa Plaza, 252,1st floor, 10th Main, 1st Block, HRBR Layout, 100 ft Road, Bangalore, 560043 |
| Eastern Condiments &#8211; Kochi | 10.0202551, 76.3101725 | EASTERN HQ 3A, 3rd Floor Eastern Corporate Office, 34/137 E N.H. By Pass, Edappally P.O Kochi, Kerala, India - 682024 PH: +91 - 484 - 3001 100 |
| Eastern Condiments &#8211; Kolkata | 22.513585, 88.2693855 | C1-50/B/NEW, B.B.T Road L.S.T Kolkatta Santoshpur Govt. Colony P.O - Santhoshpur(M) South 24 Paraganas Kolkata - 700142 West Bengal |
