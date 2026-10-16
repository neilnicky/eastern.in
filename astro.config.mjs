// @ts-check
import { defineConfig } from "astro/config";
import { legacyRedirects } from "./src/content/redirects.ts";

export default defineConfig({
  site: "https://eastern.in",
  // WordPress served every route with a trailing slash; keep that so inbound links resolve unchanged.
  trailingSlash: "always",
  devToolbar: { enabled: false },
  // "class" passes a component's scope through the `class` prop, so parent styles reach child roots.
  scopedStyleStrategy: "class",
  image: { responsiveStyles: false },
  build: { inlineStylesheets: "auto", format: "directory" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  redirects: legacyRedirects,
});
