# EASTERN CONDIMENTS — Complete Website Rebuild & Premium Digital Experience

## Reference Reverse Engineering, Existing-Content Preservation, Visual Reconstruction & Production Implementation

You are a senior creative developer, digital art director, brand-experience designer, motion designer, UX architect, and frontend engineer.

Your task is to completely audit, reconstruct, redesign, and rebuild the existing Eastern Condiments website into a premium, modern, visually immersive, production-ready digital experience.

The redesign must be informed by a thorough reverse engineering of the supplied reference website, Agrumea Farm.

The goal is to combine the reference's visual sophistication, layout compositions, typography, imagery, transitions, scrolling behavior, animations, and interaction patterns with Eastern's actual brand identity, products, content, information architecture, and business requirements.

This is a COMPLETE WEBSITE REBUILD, not a homepage redesign.

Every relevant existing page, product, content category, navigation destination, business detail, and functional component must be accounted for. Nothing important should be lost simply because it does not fit the first design concept.

The finished website should feel premium, contemporary, editorial, food-focused, immersive, and unmistakably Eastern.

**Primary objective: Preserve the completeness and authenticity of Eastern's existing website while elevating the entire experience to the visual and interaction quality demonstrated by the reference.**

Do not begin by immediately coding a homepage. First inventory the existing website, reverse-engineer the reference, audit the available content and assets, establish the design direction, and create an implementation plan.

---

# 1. PROJECT SOURCES

## A. Existing website — Eastern Condiments

Primary URL:

https://eastern.in/?prophazecheck=1

This is the source of truth for Eastern's existing website content and functionality.

Inspect the website comprehensively, including the homepage, navigation, all accessible internal routes, product categories, individual product pages, editorial content, contact information, dealer information, and other relevant pages.

The query parameter in the URL may be relevant to site access. If the website behaves differently without it, inspect both versions and determine which content is authoritative.

Do not assume the homepage represents the complete website.

Do not overwrite or discard existing content before it has been inventoried.

## B. Reference website — Agrumea Farm

https://www.agrumeafarm.it/en

This is the primary visual and interaction reference.

Study the reference's complete accessible experience, including its pages, layout structure, imagery, transitions, scrolling behavior, typography, visual storytelling, navigation, and responsive design.

Use the reference to understand how a food and agricultural brand can communicate quality through an immersive digital experience.

The goal is to reconstruct its distinctive visual and interaction patterns as closely as possible, then apply them to Eastern's actual content and brand identity.

## C. Reference screen recording

`/Users/neil/Media/Screenshots/Screen Recording 2026-10-15 at 3.12.11 PM.mov`

This recording is a critical reference for reconstructing the actual experience.

Inspect it alongside the live Agrumea Farm website.

Pay attention to:

- Initial page loading and introductory sequences.
- Hero composition and transitions.
- Header behavior.
- Scroll-triggered animations.
- Section transitions.
- Image reveals and image scaling.
- Pinned or sticky sections.
- Text animation.
- Pointer and hover interactions.
- Page navigation.
- Responsive behavior where shown.
- Timing, easing, momentum, and the overall motion language.

If the recording is not accessible at the supplied path, look for an uploaded copy or another accessible version.

Do not claim to have inspected the recording if you could not access it. Document the limitation and proceed using the live reference and available evidence.

## D. Existing repository

Inspect the current project repository before making changes.

Understand the framework, routes, dependencies, assets, styles, components, build configuration, and deployment setup.

Preserve useful existing infrastructure and functionality.

Do not introduce an unnecessary framework migration or rewrite working infrastructure without a concrete reason.

---

# 2. MANDATORY WORKFLOW

Follow these phases in order.

Do not skip the existing-site audit, reference research, content mapping, or visual validation.

Do not allow the desire for a visually impressive result to cause content omissions.

## PHASE 1 — Audit the entire existing Eastern website

Before designing anything, establish exactly what currently exists.

### A. Build a complete sitemap

Crawl or manually inspect every accessible relevant route.

Identify:

- Homepage.
- Primary and secondary navigation pages.
- Product categories.
- Individual product pages.
- Product search or filtering functionality.
- Cookbook, recipes, or food-related editorial content.
- Brand and company information.
- Dealer or distribution information.
- Contact pages.
- Social links.
- Relevant articles and resources.
- Footer links.
- Forms, downloads, and other interactive destinations.
- Any additional relevant pages discovered during the audit.

This list is a starting point, not an exhaustive assumption about the site's architecture.

Use internal links, menus, category pages, sitemaps, and other available discovery methods to find relevant routes.

Do not stop when the main navigation has been inspected.

### B. Create a content inventory

Create:

`docs/eastern-existing-site-inventory.md`

For every relevant page, record:

- Current URL and page title.
- Page purpose.
- Content hierarchy.
- Main headings and supporting copy.
- Product or content categories.
- Images and other assets.
- Business details.
- Calls to action.
- Internal links.
- Interactive elements.
- Important metadata.
- Content dependencies.
- Current functionality.
- Migration status.
- Planned destination in the redesigned website.

Where appropriate, preserve the original text accurately rather than replacing it with a rewritten approximation.

Record the source URL of each content item so it can be verified during implementation.

### C. Audit the existing product catalogue

For every accessible product and category, identify the available information.

Depending on the actual page, this may include:

- Product name.
- Product category.
- Product description.
- Product images.
- Ingredients.
- Pack sizes.
- Variants.
- Usage instructions.
- Recipes or serving suggestions.
- Nutrition information.
- Allergen information.
- Storage instructions.
- Product identifiers.
- Product-specific links.
- Related products.
- Availability information, where applicable.

Only record fields that actually exist or can be verified.

Do not invent missing specifications.

Where product data appears in tables, accordions, tabs, or images, extract and preserve the information rather than retaining only the headline description.

### D. Audit existing functionality

Document all meaningful existing behaviors, including:

- Navigation and dropdowns.
- Search and category browsing.
- Product filtering and sorting.
- Product detail interactions.
- Carousels and galleries.
- Recipe or cookbook navigation.
- Forms and form validation.
- Contact and dealer links.
- Downloadable resources.
- Mobile navigation.
- Other interactive components.

For each feature, determine whether it should be preserved, improved, replaced, or intentionally retired.

Do not silently remove a functional feature because it is inconvenient to reproduce.

### E. Establish a completeness checklist

Create:

`docs/eastern-content-migration-checklist.md`

Assign every relevant existing page, content item, product, asset, and functional component a migration status.

Use clear statuses such as:

- Audited.
- Content extracted.
- Asset located.
- Implemented.
- Verified.
- Intentionally excluded with documented rationale.

**No relevant existing content should be considered complete until its redesigned destination has been verified.**

### F. Content integrity and quality control

The existing website may contain outdated information, duplicate pages, broken links, or unrelated content.

Do not blindly reproduce potentially irrelevant, suspicious, injected, or unrelated material.

Distinguish authentic Eastern business content from material that appears unrelated to the brand. Flag uncertain cases for review and document the evidence.

Do not delete potentially legitimate content simply because its presentation is poor.

Preserve authentic content, identify obvious anomalies, and make deliberate, documented decisions about what belongs in the rebuilt website.

**Completion criterion:** You have a reliable inventory of the existing website and a traceable plan for preserving every relevant piece of content and functionality.

---

## PHASE 2 — Reverse-engineer Agrumea Farm in depth

Study the reference as a complete digital experience rather than a collection of screenshots.

### A. Page structure and information architecture

Identify the accessible pages and record:

- Global navigation.
- Homepage composition.
- Hero structure.
- Section sequence.
- Content hierarchy.
- Image and text relationships.
- Product and category presentation.
- Brand storytelling.
- Editorial layouts.
- Supporting information.
- Calls to action.
- Footer structure.
- Responsive variations.
- Internal page transitions.

Inspect the complete experience and all relevant page types.

Do not assume every reference section must appear on Eastern. Determine what each section accomplishes and how its design logic can be applied to Eastern's content.

### B. Visual design system

Analyze and document:

- Typography families and hierarchy.
- Font weights, sizing, line height, and letter spacing.
- Color palette and contrast.
- Page backgrounds and surface treatments.
- Content widths and grid systems.
- Section spacing.
- Image proportions and cropping.
- Image overlays and transitions.
- Text alignment.
- Decorative details.
- Borders and dividers.
- Navigation styling.
- Buttons and interactive states.
- Responsive typography.
- Composition and visual rhythm.

Pay particular attention to how the reference creates a refined food and agricultural brand experience without relying exclusively on conventional ecommerce layouts.

### C. Motion and interaction analysis

Inspect the actual behavior of:

- Introductory transitions.
- Navigation.
- Scroll-based reveals.
- Image masks and clipping.
- Parallax, where present.
- Sticky or pinned content.
- Text animations.
- Image scaling.
- Hover interactions.
- Page transitions.
- Interactive galleries.
- Scroll-linked movement.
- Mobile-specific interactions.

For each significant animation, document:

1. Trigger.
2. Properties that change.
3. Approximate duration.
4. Easing or spring characteristics.
5. Scroll or pointer dependency.
6. Responsive behavior.
7. Interruption and reversal behavior.

Do not invent technical details about the reference's implementation without evidence.

Where the recording or browser inspection does not reveal the underlying implementation, document the observed behavior and choose a reliable implementation strategy independently.

### D. Reference specification

Create:

`docs/reference-analysis.md`

Include the sitemap, page-by-page observations, section hierarchy, design tokens, motion inventory, interaction specifications, responsive behavior, and any implementation uncertainties.

**Completion criterion:** The reference has been understood well enough to reproduce its important visual and behavioral characteristics intentionally.

---

## PHASE 3 — Establish Eastern's brand identity and content strategy

The reference determines the design inspiration. Eastern determines the identity and content.

### A. Research the existing brand

Use the existing website, official brand assets, and other credible official sources to establish:

- Correct brand name and logo.
- Brand colors.
- Typography and graphic language.
- Existing positioning and brand voice.
- Product portfolio.
- Product-category relationships.
- Company and brand information.
- Existing visual assets.
- Verified contact information.
- Relevant official social channels.

Do not invent a new brand identity without first understanding the existing one.

### B. Preserve recognizable brand elements

Identify which established brand elements must remain recognizable.

These may include the logo, existing colors, packaging identity, product names, category names, brand language, and other visual conventions confirmed by the source material.

The website may substantially improve their presentation, but it should not make Eastern unrecognizable.

### C. Define the design adaptation

Translate the reference's design language into an Eastern-specific visual system.

Retain the reference's important layout and interaction patterns while adapting typography, color, imagery, copy, and component presentation to Eastern.

The final experience should feel like an independently art-directed Eastern website—not Agrumea Farm with a different logo.

### D. Document the design direction

Create:

`docs/design-direction.md`

Explain:

- Brand identity decisions.
- Color and typography tokens.
- Layout principles.
- Image-selection rules.
- Content hierarchy.
- Motion strategy.
- Product presentation.
- Navigation and interaction decisions.
- Intentional departures from the reference.
- How the design preserves Eastern's established identity.

**Completion criterion:** The proposed design is supported by the actual brand and content audit, not generic assumptions about food websites.

---

## PHASE 4 — Define the redesigned website architecture

Design a complete website that accounts for the existing Eastern site.

Do not turn the entire website into a single long landing page if that would remove useful routes, product detail pages, navigation, or existing functionality.

### A. Map existing pages to redesigned destinations

Create a page-mapping table in:

`docs/eastern-page-mapping.md`

For each existing relevant URL, identify:

- Original URL.
- Original purpose.
- Required content.
- New destination.
- New page template.
- Relevant reference patterns.
- Required interactions.
- Migration status.
- Any URL redirect or compatibility requirement.

Every relevant existing page must be accounted for.

When multiple pages are consolidated, preserve all important content and provide an appropriate destination for existing links.

Where URLs change, implement appropriate redirects when the hosting environment supports them.

Avoid breaking existing inbound links without a reason.

### B. Define global navigation

Reconstruct the navigation using the existing site's verified information architecture.

Improve the visual treatment and usability without removing important destinations.

The navigation should work on desktop, tablet, and mobile.

Ensure dropdowns, mobile menus, active states, keyboard interactions, and direct links behave correctly.

### C. Build the appropriate page templates

Derive the actual page templates from the inventory.

Potential templates include:

- Homepage.
- Product category page.
- Product detail page.
- Recipe or cookbook page.
- Editorial article.
- Brand or company page.
- Dealer or distribution page.
- Contact page.
- Search results, where applicable.

These are possibilities, not a requirement to invent pages that do not exist.

Use shared templates for structurally similar content while preserving the distinct needs of each page type.

### D. Preserve content depth

Do not reduce long-form pages to short summaries if that would remove meaningful information.

Do not replace product specifications with generic marketing copy.

Do not remove recipe details, ingredient information, pack-size tables, supporting descriptions, or other relevant material merely to create more whitespace.

Improve the visual hierarchy while preserving the actual information.

**Completion criterion:** Every existing relevant route has a clear place in the new architecture.

---

## PHASE 5 — Reconstruct the reference's visual experience

The visual and interaction fidelity of the reference is a core requirement.

Reproduce the reference's distinctive observable elements as closely as practical, including:

- Overall page composition.
- Section geometry.
- Hero layout.
- Typography hierarchy.
- Image-to-text relationships.
- Image positioning and crop.
- Scroll choreography.
- Sticky or pinned content.
- Transition sequences.
- Image reveals.
- Text animation.
- Hover states.
- Navigation behavior.
- Spacing and visual rhythm.
- Responsive composition.

Do not reduce a distinctive reference layout to a generic hero followed by uniform cards.

Do not merely copy the reference's colors and insert Eastern's content.

Understand the underlying design logic and reproduce its visual experience using Eastern's authentic brand identity and content.

### Image-to-code workflow

If an image-to-code tool or skill is available, use it where it materially improves reconstruction.

Use screenshots and recording frames to guide:

- Layout proportions.
- Typography.
- Positioning.
- Image cropping.
- Section boundaries.
- Responsive composition.
- Interactive states.

Treat generated code as a starting point, not a finished implementation.

Inspect the rendered result and correct discrepancies against the reference.

### Anti-generic-design review

Use the available Stop Slop skill or guidance if installed.

Apply its principles to avoid:

- Generic AI-generated landing page patterns.
- Repetitive card layouts.
- Arbitrary decorative elements.
- Unnecessary gradients.
- Excessive pill-shaped controls.
- Generic marketing headlines.
- Unmotivated animations.
- Inconsistent spacing.
- Stock imagery that weakens brand authenticity.

Every significant visual decision should serve the reference fidelity, Eastern's brand identity, or a real user need.

---

## PHASE 6 — Build a centralized content architecture

Create a maintainable, typed source of truth for the redesigned website.

Suggested files:

- `src/content/eastern-content.ts`
- `src/content/navigation.ts`
- `src/content/product-categories.ts`
- `src/content/products.ts`
- `src/content/recipes.ts`, if applicable.
- `src/content/site-config.ts`
- `src/content/assets.ts`, if useful.

Adapt the structure to the repository and actual content.

Do not create unnecessary abstractions or split every small item into a separate file without reason.

### A. Brand and site content

Centralize:

- Brand name and logo.
- Site navigation.
- Page headings.
- Existing editorial copy.
- Calls to action.
- Contact details.
- Social links.
- Footer content.
- SEO metadata.
- Other reusable content.

### B. Product content

Where applicable, represent products as typed records containing the fields actually supported by the existing site.

Potential fields include:

- Stable ID or slug.
- Product name.
- Category.
- Description.
- Images.
- Alt text.
- Variants and pack sizes.
- Ingredients.
- Usage information.
- Recipes or serving suggestions.
- Nutrition and allergen information.
- Storage instructions.
- Related products.
- Source URL.
- Relevant metadata.

Use optional fields where data is unavailable.

Do not use fabricated defaults or empty placeholder values in the rendered website.

### C. Content preservation rules

- Do not hardcode editorial content inside reusable components.
- Preserve original information accurately.
- Keep product records separate from their presentation.
- Centralize navigation and CTA labels.
- Keep asset paths and metadata organized.
- Preserve category relationships.
- Ensure repeated content uses consistent templates.
- Avoid duplicating content across components.
- Make updates possible without rewriting layouts.

**Completion criterion:** The website can be maintained without manually editing individual components to change ordinary content.

---

## PHASE 7 — Rebuild the website and all relevant functionality

Inspect the existing framework and conventions before implementing the redesign.

### Technical requirements

- Preserve the current framework unless a migration is justified.
- If using Next.js, use App Router conventions when appropriate to the existing project.
- Use TypeScript with meaningful types.
- Follow proper Server and Client Component boundaries.
- Use semantic HTML.
- Build reusable components with clear responsibilities.
- Keep data and presentation separate.
- Optimize images and fonts.
- Avoid unnecessary client-side JavaScript.
- Avoid redundant dependencies.
- Preserve working deployment configuration.
- Ensure direct navigation and page refreshes work.
- Keep the project runnable throughout implementation.

### Functional requirements

Rebuild the existing relevant features, including those discovered during the audit.

Depending on what currently exists, these may include:

- Navigation and dropdowns.
- Product category browsing.
- Product detail pages.
- Search.
- Product filters.
- Recipe and cookbook navigation.
- Carousels and galleries.
- Forms.
- Dealer links.
- Contact actions.
- Downloads.
- Responsive mobile interactions.

Do not claim a feature works merely because its interface looks correct.

If a feature relies on an unavailable API or backend, establish the limitation and implement a reliable alternative or documented integration point.

Do not invent a live ecommerce checkout, shopping cart, inventory system, or purchasing workflow unless the existing website or project requirements support it.

---

## PHASE 8 — Motion, scrolling, and physics

The reference's movement and transitions are important parts of the experience.

Reproduce meaningful animation patterns rather than adding motion indiscriminately.

### Required motion work

- Identify the actual motion patterns in the reference.
- Reconstruct the trigger and outcome of each significant animation.
- Match timing, easing, and spring behavior where observable.
- Use scroll-linked motion where the reference uses it.
- Reproduce meaningful image transitions and reveals.
- Preserve navigation and page-transition behavior.
- Avoid layout shifts and accidental overflow.
- Respect reduced-motion preferences.
- Ensure interactions remain usable on touch devices.
- Clean up event listeners, observers, and animation frames.
- Avoid blocking access to content with unnecessary preloaders.

### Investigate available tools

Use the following resources where available and relevant.

**Stop Slop:** Inspect the installed skill or guidance and apply its principles to visual quality and intentionality. Do not invent an API or installation.

**Image-to-code:** Use available screenshot-to-code or visual reconstruction workflows to improve structural fidelity. Verify all generated output in the actual application.

**String Tune:** https://string-tune.fiddle.digital/

Investigate its documentation, capabilities, integration requirements, and compatibility with the existing framework before using it for physics-driven interactions.

If the reference contains inertia, spring motion, or pointer-driven movement, determine whether these are best implemented through the existing animation stack, a compatible library, or a carefully scoped custom solution.

Do not add experimental libraries merely because they are available.

**The objective is high-fidelity motion with a clear purpose, not maximum animation density.**

---

## PHASE 9 — Asset migration and image quality

Images are central to this project.

The redesign must use appropriate Eastern assets and reproduce the reference's image presentation without substituting unrelated content.

### Asset discovery

Inspect:

- Images already present in the repository.
- Existing website assets.
- Product packaging imagery.
- Product photographs.
- Brand and campaign assets.
- Recipe and food photography.
- Relevant downloadable assets.
- Other authentic, publicly available Eastern media.

Create an asset inventory that records:

- Original source.
- Local path or verified URL.
- Associated product or page.
- Image dimensions and aspect ratio.
- Intended placement.
- Alt text.
- Preferred crop and focal position.
- Migration status.

### Asset rules

- Preserve authentic product packaging and product identity.
- Use the correct image for each product.
- Do not substitute a different product because its image looks better.
- Do not stretch or distort images.
- Preserve image quality and appropriate aspect ratios.
- Use deliberate object positioning.
- Avoid repeating the same images unnecessarily.
- Prefer optimized local assets when permitted.
- Avoid unreliable external hotlinking.
- Do not fabricate packaging, ingredients, certifications, or product claims.

If a required asset is inaccessible, document the gap and use an appropriate development fallback until the authentic asset can be obtained.

---

## PHASE 10 — Production quality, accessibility, and responsiveness

The finished website must be fully functional and robust, not just visually impressive.

### Performance

- Optimize image delivery and font loading.
- Avoid unnecessary JavaScript.
- Prevent layout shifts.
- Lazy-load appropriate below-the-fold assets.
- Prioritize the initial viewport.
- Avoid excessive animation dependencies.
- Keep transitions smooth on realistic mobile hardware.
- Ensure long pages remain responsive.
- Avoid loading the entire product catalogue unnecessarily when the architecture supports more efficient delivery.

### Accessibility

- Use semantic page structure.
- Support keyboard navigation.
- Maintain visible focus indicators.
- Use meaningful alt text.
- Provide sufficient color contrast.
- Ensure accessible menus and overlays.
- Label form fields.
- Provide clear validation errors.
- Respect reduced-motion preferences.
- Maintain usable touch targets.
- Do not make essential content dependent on animation.

### Responsive validation

Test at approximately:

- Desktop: 1440px.
- Laptop: 1280px.
- Tablet: 768px.
- Mobile: 390px.
- Narrow mobile: 320px.

Validate every major page template, not just the homepage.

Check navigation, image crops, typography, product tables, category layouts, galleries, long-form content, and interactive components.

---

## PHASE 11 — Visual validation and iterative refinement

Do not consider the redesign complete simply because the application builds.

Use browser automation, screenshots, reference frames, and available inspection tools to compare the reference and implementation.

### Visual comparison workflow

For each major section or page template:

1. Inspect the relevant reference state.
2. Capture the implementation at the same viewport.
3. Compare layout proportions and section geometry.
4. Compare typography, alignment, and spacing.
5. Compare image selection, crop, and scale.
6. Exercise equivalent interactions.
7. Compare scrolling and transitions.
8. Identify the largest discrepancy.
9. Correct it.
10. Repeat the comparison.

Prioritize:

1. Overall composition.
2. Section geometry.
3. Typography and spacing.
4. Image quality and positioning.
5. Interaction behavior.
6. Animation timing.
7. Fine visual details.

Do not rely on memory when screenshots or the supplied recording can be used.

### Content-completeness validation

Compare the redesigned website against the original content inventory.

Verify that:

- Every relevant existing page has a destination.
- Every relevant product has been accounted for.
- Product descriptions and specifications have been preserved.
- All relevant recipes and cookbook content have been accounted for.
- Important company and brand information remains available.
- Dealer and contact information is preserved where relevant.
- Existing navigation destinations are accounted for.
- Relevant images and downloadable assets are migrated.
- Existing functional components are preserved or deliberately replaced.
- Internal links point to valid destinations.
- No important content has been silently dropped.

### Functional validation

Confirm that:

- All navigation items work.
- All relevant pages render.
- Product links open the correct products.
- Category browsing behaves correctly.
- Search and filters work when present.
- Forms submit through real integrations or documented handoffs.
- Contact links work.
- Downloads work.
- There are no broken images.
- There are no dead buttons.
- Direct routes and refreshes work.
- There are no avoidable console errors.
- Responsive layouts work.
- Reduced-motion preferences are respected.

Run the available linting, type checks, tests, and production build. Resolve implementation-related failures.

---

# 3. REQUIRED DELIVERABLES

Create and maintain the following artifacts, adapting the paths to the existing repository:

- `docs/eastern-existing-site-inventory.md` — full existing-site audit.
- `docs/eastern-content-migration-checklist.md` — traceable preservation checklist.
- `docs/eastern-page-mapping.md` — original-to-redesigned route mapping.
- `docs/reference-analysis.md` — complete Agrumea Farm reverse-engineering report.
- `docs/design-direction.md` — Eastern-specific design decisions.
- Centralized typed content files.
- Product and category data models where appropriate.
- An asset manifest or equivalent asset organization.
- All required redesigned pages and reusable components.
- A final validation report documenting completed work, unresolved issues, and any intentional exclusions.

Keep research, content, layout, motion, and business logic separated where practical.

Do not stop after creating the documents. They are working artifacts that support the completed implementation.

---

# 4. WORKING METHOD

Work autonomously through the complete project.

Do not ask me to make decisions that can be resolved through repository inspection, reference research, or professional judgment.

Ask only when a missing decision materially affects the outcome and cannot responsibly be inferred.

Do not silently discard difficult requirements.

Do not overwrite the existing project before its content and functionality have been inventoried.

Do not replace the entire existing website with a single landing page.

Do not fabricate content to fill gaps.

Do not claim that an asset, page, interaction, or animation has been inspected or tested if it has not.

When a source is inaccessible, document the limitation and use the best available evidence.

Maintain a runnable project throughout implementation.

---

# 5. DEFINITION OF DONE

The project is complete only when:

- [ ] The entire relevant existing Eastern website has been inventoried.
- [ ] All relevant existing pages and content categories have been accounted for.
- [ ] Every relevant product has been migrated or its omission explicitly documented.
- [ ] Existing product descriptions and specifications have been preserved.
- [ ] Relevant recipes, cookbook material, company information, dealer information, and contact details have been accounted for.
- [ ] Existing navigation and functional components have been preserved or deliberately replaced.
- [ ] The Agrumea Farm reference has been thoroughly inspected.
- [ ] The supplied recording has been inspected or its inaccessibility documented.
- [ ] The reference's important visual and interaction patterns have been reconstructed.
- [ ] Eastern's existing brand identity remains recognizable.
- [ ] The redesigned site feels premium, cohesive, and specific to Eastern.
- [ ] All relevant page templates are implemented.
- [ ] The content model is centralized and maintainable.
- [ ] All relevant assets have been accounted for.
- [ ] Navigation and interactive functionality work.
- [ ] No fabricated business or product claims have been introduced.
- [ ] Desktop, tablet, and mobile layouts have been validated.
- [ ] Motion is purposeful, performant, and accessible.
- [ ] No major visual discrepancies remain unaddressed.
- [ ] Content completeness has been checked against the original inventory.
- [ ] Available tests, type checks, linting, and production builds pass.
- [ ] Documentation and the final validation report are complete.

---

# 6. FINAL EXECUTION INSTRUCTIONS

Start by inspecting the repository and confirming access to the Eastern website, the Agrumea Farm reference, and the supplied screen recording.

Then follow this sequence:

**Audit Eastern → Inventory every relevant page and component → Reverse-engineer Agrumea Farm → Research Eastern's brand → Map existing content → Define the design direction → Implement the complete website → Reconstruct motion and interactions → Validate visual fidelity → Verify content completeness → Refine.**

Do not start by immediately generating a hero section.

Do not omit existing pages simply because the new design looks better without them.

Do not reduce the project to a homepage redesign.

Do not use generic AI-generated layouts as a substitute for reference reconstruction.

Do not invent business information or product specifications.

Do not claim exact visual fidelity without comparing the rendered implementation against the reference.

**The final objective is a complete, premium, modern, responsive, production-ready Eastern Condiments website that preserves every relevant part of the original site while recreating the distinctive visual design, scrolling experience, transitions, and interaction patterns of Agrumea Farm as faithfully as practical.**

Begin with Phase 1. Inspect and document the existing site before making design or implementation changes. Continue through every phase until the complete website has been implemented, validated, and refined.