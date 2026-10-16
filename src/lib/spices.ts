import type { SpiceName } from "@/content/types";

// Faceted polygon silhouettes on a 0–100 viewBox. Decorative only (see src/components/Spice.astro).
const star = (lobes: number, outer: number, inner: number, jitter = 0) =>
  Array.from({ length: lobes * 2 }, (_, i) => {
    const r = i % 2 ? inner : outer - (i % 4 === 0 ? jitter : 0);
    const a = (Math.PI * i) / lobes - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
const blob = (n: number, r: number, wobble: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n;
    const rr = r + (i % 3 === 0 ? wobble : i % 3 === 1 ? -wobble / 2 : 0);
    return `${(50 + rr * Math.cos(a)).toFixed(1)},${(50 + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

export const SPICES: Record<SpiceName, { points: string; color: string; ratio: number }> = {
  chilli: { points: "70,6 78,4 80,14 88,20 91,32 85,48 73,63 57,77 39,88 19,96 5,98 13,90 30,80 46,66 57,51 63,35 64,21 66,13", color: "#B3200F", ratio: 1 },
  "star-anise": { points: star(8, 48, 15, 4), color: "#5A2A1E", ratio: 1 },
  cardamom: { points: "50,2 66,14 74,34 76,52 72,72 62,88 50,98 38,88 28,72 24,52 26,34 34,14", color: "#7C9A3A", ratio: 0.62 },
  clove: { points: "50,2 60,8 66,4 72,12 66,22 70,30 60,34 56,40 54,96 46,98 44,40 40,34 30,30 34,22 28,12 34,4 40,8", color: "#4A2418", ratio: 0.5 },
  peppercorn: { points: blob(11, 46, 4), color: "#2B1A14", ratio: 1 },
  turmeric: { points: "8,58 14,44 28,40 36,28 48,30 52,40 64,36 78,22 90,26 92,40 82,50 88,60 80,72 62,72 50,80 34,78 20,74", color: "#E39A10", ratio: 1 },
  cinnamon: { points: "8,46 86,22 94,32 94,44 18,70 8,62", color: "#9B5A2A", ratio: 1 },
  "curry-leaf": { points: "50,2 64,16 72,36 72,58 64,78 50,98 36,78 28,58 28,36 36,16", color: "#2F6B2F", ratio: 0.6 },
  coconut: { points: "4,40 96,40 92,58 82,74 66,86 50,90 34,86 18,74 8,58", color: "#6B3A1E", ratio: 1 },
};
