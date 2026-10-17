// Writes src/styles/font-fallbacks.css (see src/lib/font-fallbacks.ts). Run: pnpm font-fallbacks
import fs from "node:fs";
import { fromFile } from "@capsizecss/unpack/fs";
import arial from "@capsizecss/metrics/arial";
import timesNewRoman from "@capsizecss/metrics/timesNewRoman";
import { fontFallbackCss } from "../src/lib/font-fallbacks";

const files = new URL("../node_modules/@fontsource-variable/", import.meta.url);
const read = (rel: string) => fromFile(new URL(rel, files).pathname);

const css = fontFallbackCss({
  fraunces: await read("fraunces/files/fraunces-latin-opsz-normal.woff2"),
  frauncesItalic: await read("fraunces/files/fraunces-latin-opsz-italic.woff2"),
  figtree: await read("figtree/files/figtree-latin-wght-normal.woff2"),
  timesNewRoman,
  arial,
});
const out = new URL("../src/styles/font-fallbacks.css", import.meta.url);
fs.writeFileSync(out, css);
console.log("font fallbacks written:", out.pathname);
