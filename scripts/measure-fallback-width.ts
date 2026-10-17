// Measures how much wider (or narrower) the web fonts render the site's real text than their system fallbacks, to
// choose `size-adjust` in src/lib/font-fallbacks.ts. Needs the built site served:
//   node_modules/.bin/astro preview --port 4341 --host 127.0.0.1 --ignore-lock &  pnpm exec tsx scripts/measure-fallback-width.ts
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://127.0.0.1:4341";
const pages = ["/", "/products/", "/products/chicken-masala/", "/recipes/", "/cook_book/", "/cook_book/bechamel-pasta/", "/cook_book/baked-chicken-macaroni-casserole/", "/cook_book/chicken-dum-porotta/", "/timeline/", "/about-us/", "/contact-us/", "/contact/", "/innovationcenter/", "/we-at-eastern/"];
const FALLBACK = { serif: "Times New Roman", serifItalic: "Times New Roman", serifText: "Times New Roman", sans: "Arial" };

// A string, not a function: tsx's esbuild injects a `__name` helper into function bodies that the page does not have.
const probe = `(fallback) => {
  const sums = { serif: [0, 0, 0], serifItalic: [0, 0, 0], serifText: [0, 0, 0], sans: [0, 0, 0] };
  const seen = new Set();
  const root = document.querySelector('#main') ?? document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const holder = document.createElement('div');
  holder.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap';
  document.body.appendChild(holder);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    // Split headings hold aria-hidden character spans; measure the heading as one string instead.
    const host = n.parentElement && n.parentElement.closest('[data-reveal]');
    const el = host ?? n.parentElement;
    const text = (host ? host.textContent : n.textContent).replace(/\\s+/g, ' ').trim();
    if (!text || !el || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName) || (!host && el.closest('[aria-hidden=true],[hidden]')) || el.closest('[hidden]')) continue;
    const cs = getComputedStyle(el);
    const kind = cs.fontFamily.startsWith('"Fraunces Variable"') ? (cs.fontStyle === 'italic' ? 'serifItalic' : (/\"opsz\" ([0-9.]+)/.exec(cs.fontVariationSettings) || [0, 144])[1] >= 100 ? 'serif' : 'serifText') : cs.fontFamily.startsWith('"Figtree Variable"') ? 'sans' : null;
    if (!kind || cs.display === 'none') continue;
    const key = kind + cs.fontSize + cs.fontWeight + cs.fontStyle + cs.fontVariationSettings + cs.letterSpacing + cs.textTransform + text;
    if (seen.has(key)) continue; seen.add(key);
    const s = document.createElement('span');
    s.textContent = text;
    // Longhands, not the font shorthand: Chrome serialises the shorthand as '' whenever font-variation-settings is set.
    s.style.cssText = 'font-family:' + cs.fontFamily + ';font-size:' + cs.fontSize + ';font-weight:' + cs.fontWeight + ';font-style:' + cs.fontStyle + ';font-stretch:' + cs.fontStretch + ';font-variation-settings:' + cs.fontVariationSettings + ';font-feature-settings:' + cs.fontFeatureSettings + ';letter-spacing:' + cs.letterSpacing + ';text-transform:' + cs.textTransform + ';line-height:normal';
    holder.appendChild(s);
    const web = s.getBoundingClientRect().width;
    s.style.fontFamily = '"' + fallback[kind] + '"';
    const fb = s.getBoundingClientRect().width;
    holder.removeChild(s);
    if (web > 0 && fb > 0) { sums[kind][0] += web; sums[kind][1] += fb; sums[kind][2]++; }
  }
  holder.remove();
  return sums;
}`;

const browser = await chromium.launch();
const total = { serif: [0, 0, 0], serifItalic: [0, 0, 0], serifText: [0, 0, 0], sans: [0, 0, 0] } as Record<string, number[]>;
for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 412, height: 915 } });
  await page.goto(base + p, { waitUntil: "networkidle" });
  await page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); // let the italic face load too
  await page.waitForTimeout(600);
  await page.evaluate("document.fonts.ready");
  const r = (await page.evaluate(`(${probe})(${JSON.stringify(FALLBACK)})`)) as Record<string, number[]>;
  for (const k of ["serif", "serifItalic", "serifText", "sans"]) for (let i = 0; i < 3; i++) total[k]![i]! += r[k]![i]!;
  console.log(p.padEnd(32), `serif ${r.serif![2]} ratio ${(r.serif![0]! / (r.serif![1] || 1)).toFixed(4)}   text-opsz ${r.serifText![2]} ratio ${(r.serifText![0]! / (r.serifText![1] || 1)).toFixed(4)}   italic ${r.serifItalic![2]} ratio ${(r.serifItalic![0]! / (r.serifItalic![1] || 1)).toFixed(4)}   sans ${r.sans![2]} strings ratio ${(r.sans![0]! / (r.sans![1] || 1)).toFixed(4)}`);
  await page.close();
}
await browser.close();
const f = (k: string) => (total[k]![0]! / total[k]![1]!);
console.log(`\nwidth-weighted size-adjust:  Fraunces display (opsz>=100) vs ${FALLBACK.serif}: ${(f("serif") * 100).toFixed(1)}%   Fraunces text-opsz: ${(f("serifText") * 100).toFixed(1)}%   Fraunces italic vs ${FALLBACK.serifItalic} Italic: ${(f("serifItalic") * 100).toFixed(1)}%   Figtree vs ${FALLBACK.sans}: ${(f("sans") * 100).toFixed(1)}%`);
