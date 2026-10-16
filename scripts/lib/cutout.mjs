// White-background pack shot -> transparent WebP (packaging pixels untouched). Flood-fills near-white from the border,
// then colour-to-alpha (white) on that region + a 2px fringe, so soft shadows survive as translucent black.
import sharp from 'sharp';
export async function cutout(input, output, { hard = 238, soft = 200, maxHeight = 1200 } = {}) {
  const { data, info } = await sharp(input).resize({ height: maxHeight, withoutEnlargement: true }).flatten({ background: '#ffffff' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const N = W * H, bg = new Uint8Array(N), minc = new Uint8Array(N);
  for (let i = 0; i < N; i++) minc[i] = Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
  const q = new Int32Array(N); let h = 0, t = 0;
  const push = (i) => { if (!bg[i] && minc[i] >= soft) { bg[i] = 1; q[t++] = i; } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (h < t) {
    const i = q[h++], x = i % W, y = (i / W) | 0;
    // grow through near-white freely, through softer greys only from near-white neighbours (shadows)
    const grow = (j) => { if (bg[j]) return; if (minc[j] >= hard || (minc[j] >= soft && minc[i] >= hard - 10)) { bg[j] = 1; q[t++] = j; } };
    if (x > 0) grow(i - 1); if (x < W - 1) grow(i + 1); if (y > 0) grow(i - W); if (y < H - 1) grow(i + W);
  }
  // Packs are convex: anything inside the convex hull of the foreground is pack, not background
  // (white label panels that touch the border would otherwise leak).
  const pts = [];
  for (let y = 0; y < H; y++) {
    let l = -1, r = -1;
    for (let x = 0; x < W; x++) if (!bg[y * W + x] && minc[y * W + x] < 185) { if (l < 0) l = x; r = x; }
    if (l >= 0) { pts.push([l, y], [r, y]); }
  }
  pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [], upper = [];
  for (const p of pts) { while (lower.length >= 2 && cross(lower.at(-2), lower.at(-1), p) <= 0) lower.pop(); lower.push(p); }
  for (const p of [...pts].reverse()) { while (upper.length >= 2 && cross(upper.at(-2), upper.at(-1), p) <= 0) upper.pop(); upper.push(p); }
  const hull = lower.slice(0, -1).concat(upper.slice(0, -1));
  const inside = (x, y) => { for (let k = 0; k < hull.length; k++) { const a = hull[k], b = hull[(k + 1) % hull.length]; if (cross(a, b, [x, y]) < 0) return false; } return true; };
  if (hull.length >= 3) for (let i = 0; i < N; i++) if (bg[i] && inside(i % W, (i / W) | 0)) bg[i] = 0;
  const out = Buffer.from(data);
  for (let i = 0; i < N; i++) {
    if (!bg[i]) continue;
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    // colour-to-alpha against white
    const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    const k = a < 0.02 ? 0 : a;
    const un = (c) => (k ? Math.round(255 - (255 - c) / k) : 0);
    out[i * 4] = Math.max(0, un(r)); out[i * 4 + 1] = Math.max(0, un(g)); out[i * 4 + 2] = Math.max(0, un(b));
    out[i * 4 + 3] = Math.round(k * 255);
  }
  // Normalise framing: crop to the solid pack (alpha > 200) plus a uniform 3% margin, so every pack's visible
  // size matches its box regardless of how much white space or shadow the source photo had.
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (out[(y * W + x) * 4 + 3] > 200) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const m = Math.round(Math.max(x1 - x0, y1 - y0) * 0.03);
  const left = Math.max(0, x0 - m), top = Math.max(0, y0 - m);
  const width = Math.min(W, x1 + m + 1) - left, height = Math.min(H, y1 + m + 1) - top;
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).extract({ left, top, width, height }).webp({ quality: 88, alphaQuality: 90 }).toFile(output);
}
