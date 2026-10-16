# Page mapping: existing → redesigned

Every relevant URL on eastern.in maps to a destination here. **URLs are preserved wherever the content survives**, trailing slash included, so inbound links and search results keep working. Retired URLs get a 301 through `src/content/redirects.ts`. In the static build each redirect is emitted as a redirect page, and `public/_redirects` mirrors them for hosts that honour it.

Template names refer to `src/layouts` and `src/components`. Pattern codes (M1…M22) refer to the motion inventory in `reference-analysis.md`.

## 1. Kept routes

| Original URL | Purpose | Required content | New destination | Template | Reference patterns | Interactions | Status |
|---|---|---|---|---|---|---|---|
| `/` | Front door | 5 campaign banners; 3 featured video recipes; stats (40+ Years of Trust, Perfect taste partner since 1983, No added flavours, 30+ Awards); "We're worldwide" + store link; Recent campaign reel; 7 New Products; cook-book teaser | `/` | `HomePage` | M1–M4 loader + pack marquee + badge; M5; M13 campaign drag gallery; M14 tiles; M21 | Marquee (scroll/drag/keys), gallery drag/keys, video dialog | Implemented |
| `/products/` + `/products/page/N/` | Catalogue index | 16 categories, all products reachable | `/products/` (pages 2–12 → 301 to `/products/`) | `ProductsIndex` | M11 hero expand (Web-banner-5); M16 sticky category bar; M14 tiles; M17 colour-flood band | Category bar, name search | Implemented |
| `/product-category/<slug>/` ×16 (+ `/page/N/`) | Category listing | Category label, all products | Same URL (pages → 301 to page 1) | `CategoryPage` | M5 title veil; M14 tiles | Tiles, other-category strip | Implemented |
| `/products/<slug>/` ×141 | Product detail | Name, image, category, pack string, Amazon link | Same URL | `ProductPage` | M9 shared pack; M10 pack rise over title; spec row; M14 "The other products" | Buy link, related recipes, other products | Implemented |
| — (new: verified Arabic Range packs) | — | Kabsa Masala, Shawarma Masala (homepage "New Products" carousel) | `/products/kabsa-masala/`, `/products/shawarma-masala/` | `ProductPage` | as above | | Implemented (flagged in inventory I2) |
| `/recipes/` | Video recipe library | 36 recipes with YouTube links | `/recipes/` (video + cookbook, tabbed) | `RecipesIndex` | M11 (Web-banner-3); M16 tab bar; tiles | Search, filter (Video / Cook book), video dialog | Implemented |
| `/recipes/<slug>/` ×36 | Video recipe | Title, date, thumbnail, **video** (only on listing before) | Same URL | `VideoRecipePage` | M5; click-to-load player | Player facade, related product | Implemented |
| `/cook_book/` | Cookbook, 3 sliders | 41 cookbook spreads | `/cook_book/` | `CookbookIndex` | M11 (ck-book cover); M16 tabs (Vegetarian / Non-Vegetarian / Sweets) | Tabs, links | Implemented |
| `/vegetarian/`, `/non-vegetarian/`, `/sweets/` | Cookbook sections | Section's spreads | Same URLs | `CookbookSection` | M5; recipe rows | | Implemented |
| — (new: one URL per cookbook recipe) | — | Title, "using Eastern …", ingredients, method, original spread | `/cook_book/<slug>/` | `CookbookRecipePage` | spec table; image | | Implemented |
| `/videos/` | TVCs | 16 videos | `/videos/` | `VideosIndex` | M13 drag gallery; list | Video dialog | Implemented |
| `/videos/<slug>/` ×16 | Video post | Title, date, description, video | Same URL | `VideoPage` | | Player facade | Implemented |
| `/timeline/` | History | 11 dated milestones (infographic) | `/timeline/` | `HistoryPage` | M11 (Eastern Trading Co. photo); M18 stacked cards in turmeric section; archive list | | Implemented |
| `/timeline/<slug>/` ×23 | Legacy history stories | Title, text, image | Same URL | `ArticlePage` | | | Implemented |
| `/we-at-eastern/` | Purpose | Vision, Mission, Values (image text, transcribed) | `/we-at-eastern/` (menu label "About") | `AboutPage` | M11 (web-banner-2); M19 silhouette scene | | Implemented |
| `/innovationcenter/` | Lab | Full text, accreditations, 2 research-paper links, contact email | Same URL | `InnovationPage` | M11 (Adimali factory); spec rows | | Implemented |
| `/contact/` | Contact | Registered + regional office, phone, 3 emails, media line | Same URL | `ContactPage` | M20 falling spice silhouettes | mailto/tel links, map link | Implemented |
| `/store-locator/` | Where to buy | 108 locations + 3 online retailers | Same URL | `StoreLocatorPage` | ruled list, M16 region bar | Search + country/state filter, per-store Google Maps link | Implemented |
| `/dealers/<slug>/` ×108 | Store detail | Name, address, phone(s), coordinates | Same URL | `DealerPage` | spec rows | Map link, tel links | Implemented |
| `/events/`, `/events/<slug>/` ×14 | Events archive | Title, date, location, text, image, link | Same URLs | `ArchiveIndex` / `ArticlePage` | | | Implemented |
| `/contests/`, `/contests/<slug>/` ×40 | Contest archive | Title, brief, image, terms, status | Same URLs | `ArchiveIndex` / `ArticlePage` | | | Implemented |
| `/blogs/`, `/blog-post/<slug>/` ×5 | Company posts | Title, date, text, image, song links | Same URLs | `ArchiveIndex` / `ArticlePage` | | | Implemented |
| `/onam-function/` | Onam 2023 hub | 6 linked posts | → `/blogs/` (301; same posts listed) | — | | | Redirect |
| `/csr-policy/` | Policy | Full text | Same URL | `LegalPage` | | | Implemented |
| `/privacy/` | Policy | Full text | Same URL | `LegalPage` | | | Implemented |
| `/lucky-draw-terms-conditions/` | Offer T&C | Full text | Same URL | `LegalPage` | | | Implemented |
| `/scheme-of-amalgamation/` | Statutory docs | 16 PDF + 1 ZIP | Same URL; files at original `/wp-content/uploads/…` paths | `DocumentsPage` | ruled list | Downloads | Implemented |
| `/wp-content/uploads/2022/07/*.pdf`, `2022/12/final-hearing-notice.zip`, `2023/09/MergerOrder.pdf` | Downloads | files | Same paths (static) | — | | | Implemented |

## 2. Redirected and retired routes

| Original URL | Reason (inventory ref) | 301 → |
|---|---|---|
| `/eastern-contact/` | Empty duplicate | `/contact/` |
| `/kabsa-masala/` | Placeholder | `/products/kabsa-masala/` |
| `/shawarma-masala/` | Placeholder | `/products/shawarma-masala/` |
| `/puttu/` | Placeholder | `/products/instant-puttu-mix/` |
| `/chemba-puttu/` | Placeholder | `/products/chemba-puttu-podi/` |
| `/idiyappam_/` | Placeholder | `/products/instant-idiyappam/` |
| `/idly/` | Placeholder | `/products/instant-idli/` |
| `/dosa/` | Placeholder | `/products/instant-dosa/` |
| `/palappam/` | Placeholder | `/products/instant-appam-mix/` |
| `/ghee-upmavu/` | Placeholder | `/products/instant-ghee-upumavu/` |
| `/featured-products/` | HTTP 500 | `/products/` |
| `/featured-recipes/` | Empty search | `/recipes/` |
| `/digital-brochure/` | Empty | `/products/` |
| `/game-page/`, `/game/` | Broken, security (I8) | `/` |
| `/shop/`, `/cart/`, `/checkout/` | No commerce | `/products/` |
| `/my-account/`, `/my-account/lost-password/`, `/profile/`, `/login/` | No account backend | `/` |
| `/my-recipes/`, `/add-recipe/`, `/edit-recipe/` | No account backend | `/recipes/` |
| `/test/`, `/test-2/`, `/test-3/`, `/test1/`, `/testhd/`, `/test123/`, `/test-page/`, `/blog-post/test/` | Test content (I1) | `/` |
| `/sliders/9815/`, `/sliders/banner-2/`, `/sliders/banner-3/`, `/sliders/banner-5/`, `/sliders/banner-6/` | CMS internals | `/` |
| `/category/breakfast/` | Shell | `/product-category/breakfast/` |
| `/category/biriyani-range/` | Shell | `/product-category/spices-masalas/` |
| `/products/page/2/` … `/products/page/12/` | Pagination | `/products/` |
| `/product-category/spices-masalas/page/2/`, `/page/3/`; `/product-category/pickles-paste/page/2/`; `/product-category/gcc/page/2/`–`/page/4/` | Pagination | category page 1 |
| `/onam-function/` | Hub replaced by blog index | `/blogs/` |

## 3. Navigation coverage

Every original navigation target, and where it lives now:

| Original nav item | Original target | New location |
|---|---|---|
| Home | `/` | Menu, logo |
| Company › About Us | orklaindia.com/about-us (external) | Menu "About" → `/we-at-eastern/` plus an "Orkla India ↗" link in the menu Company group and footer |
| Company › History | `/timeline/` | Menu (Company), footer |
| Products and its 12 sub-items, including IB › GCC / Other Countries | categories | Menu category list (16), footer Products column, Products page bar |
| Recipes | `/recipes/` | Menu primary |
| TVCs | `/videos/` | Menu (Explore) "Videos (TVCs)", footer |
| Contact Us | `/contact/` | Menu primary, footer |
| Offers › Lucky Draw T&C | `/lucky-draw-terms-conditions/` | Menu (Explore) "Offers T&C", footer |
| Footer › Contests | `/contests/` | Menu (Company), footer |
| Footer › Corporate Social Responsibility | orklaindia.com CSR | Footer (Orkla link) plus local `/csr-policy/` |
| Footer › Privacy Policy | `/privacy/` | Footer, menu |
| Footer › Cook Book › Veg / Non-Veg / Sweets | `/vegetarian/` etc. | Footer Cook Book column, Cook Book tabs |
| Home › world map | `/store-locator/` | Menu (Explore), footer, home "Worldwide" band, PDP "Find a store" |
| Social rail and header card (FB, X, LinkedIn, IG, phone, email, map) | external | Footer Follow column; Contact page |
| (unlinked) `/we-at-eastern/`, `/innovationcenter/`, `/events/`, `/scheme-of-amalgamation/`, `/csr-policy/`, `/blogs/` | — | Now linked from menu and footer |
