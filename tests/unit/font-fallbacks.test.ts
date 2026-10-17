import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { fromFile } from "@capsizecss/unpack/fs";
import arial from "@capsizecss/metrics/arial";
import timesNewRoman from "@capsizecss/metrics/timesNewRoman";
import { fontFallbackCss, SIZE_ADJUST } from "@/lib/font-fallbacks";

const fontFile = (rel: string) => new URL(`../../node_modules/@fontsource-variable/${rel}`, import.meta.url).pathname;
const read = (rel: string) => fromFile(fontFile(rel));
const text = (rel: string) => fs.readFileSync(new URL(`../../${rel}`, import.meta.url), "utf8");

async function generated() {
  return fontFallbackCss({
    fraunces: await read("fraunces/files/fraunces-latin-opsz-normal.woff2"),
    frauncesItalic: await read("fraunces/files/fraunces-latin-opsz-italic.woff2"),
    figtree: await read("figtree/files/figtree-latin-wght-normal.woff2"),
    timesNewRoman,
    arial,
  });
}

describe("font fallback faces", () => {
  it("committed stylesheet is in sync with the font files (run `pnpm font-fallbacks` after changing a font or SIZE_ADJUST)", async () => {
    expect(text("src/styles/font-fallbacks.css")).toBe(await generated());
  });

  it("derives vertical overrides from the web font's own metrics", async () => {
    const m = await read("figtree/files/figtree-latin-wght-normal.woff2");
    const css = await generated();
    const face = css.split("@font-face").find((b) => b.includes('"Figtree Fallback"'))!;
    const pct = (prop: string) => Number(new RegExp(`${prop}: ([0-9.]+)%`).exec(face)![1]) / 100;
    expect(pct("ascent-override")).toBeCloseTo(m.ascent / (m.unitsPerEm * SIZE_ADJUST.figtree), 3);
    expect(pct("descent-override")).toBeCloseTo(Math.abs(m.descent) / (m.unitsPerEm * SIZE_ADJUST.figtree), 3);
    expect(pct("line-gap-override")).toBe(0);
  });

  it("keeps each measured size-adjust inside a plausible band", () => {
    for (const [name, v] of Object.entries(SIZE_ADJUST)) expect(v, name).toBeGreaterThan(0.85);
    for (const [name, v] of Object.entries(SIZE_ADJUST)) expect(v, name).toBeLessThan(1.15);
  });

  it("is used by the font stacks, after the web font and before the platform faces, with no stray definition left in global.css", () => {
    const css = text("src/styles/global.css");
    expect(css).toMatch(/--font-serif: "Fraunces Variable", "Fraunces Fallback", /);
    expect(css).toMatch(/--font-serif-text: "Fraunces Variable", "Fraunces Text Fallback", /);
    expect(css).toMatch(/--font-sans: "Figtree Variable", "Figtree Fallback", /);
    expect(css).not.toContain("@font-face");
    expect(text("src/layouts/Base.astro")).toContain('import "@/styles/font-fallbacks.css"');
  });
});

describe("small optical sizes use the text fallback", () => {
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : /\.(astro|css)$/.test(e.name) ? [`${dir}/${e.name}`] : []));

  it("no rule sets var(--font-serif) together with an opsz below 100, except the italic cookbook subtitle", () => {
    const root = new URL("../../src", import.meta.url).pathname;
    const offenders = walk(root).flatMap((f) =>
      fs
        .readFileSync(f, "utf8")
        .split("\n")
        .filter((l) => l.includes("var(--font-serif)") && /"opsz" (?:[1-9]\d?|[1-9]\d\b)(?!\d)/.test(l) && !l.includes("italic"))
        .map((l) => `${f.slice(root.length)}: ${l.trim().slice(0, 90)}`),
    );
    expect(offenders).toEqual([]);
  });
});
