// Shared geometry for the home pack marquee (src/motion/marquee.ts) and its CSS-only first frame (src/pages/index.astro).
// Positions are in units of the slot width S (stage width / packs-per-view), so CSS can resolve them with cqw.

/** The marquee rests with its value at -START_SLOTS × S: item i sits START_SLOTS slots right of its index. */
export const START_SLOTS = 1.5;
/** Packs sit on a line rising 6.5° to the left. */
export const ANGLE_DEG = 6.5;
export const TAN_ANGLE = Math.tan((ANGLE_DEG * Math.PI) / 180);
/** Per-item resting tilt in degrees, cycled. */
export const TILTS_DEG = [-0.053, 0.043, -0.024, 0.057, -0.048, 0.029, -0.038, 0.053].map((r) => (r * 180) / Math.PI);
/** Entrance stagger, matching gsap's `stagger: { each, from: "center" }`: each × (n − 1) spread over the distance from the DOM centre. */
export const ENTRANCE_EACH = 0.06;

/** Wraps a slot offset into [-n/2, n/2), the same loop the ticker applies in pixels. */
export const wrapSlots = (u: number, n: number) => ((((u + n / 2) % n) + n) % n) - n / 2;

export interface InitialSlot { u: number; tilt: number; z: number; delay: number }

/** The resting first frame for n items: slot offset, tilt, depth order and entrance delay. */
export function initialLayout(n: number): InitialSlot[] {
  const dist = (i: number) => Math.abs(i - (n - 1) / 2);
  const minD = dist(Math.floor((n - 1) / 2)), spread = dist(0) - minD || 1;
  return Array.from({ length: n }, (_, i) => {
    const u = wrapSlots(i + START_SLOTS, n);
    return {
      u,
      tilt: TILTS_DEG[i % TILTS_DEG.length]!,
      z: Math.round(Math.max(0, 1 - Math.abs(u)) * 10),
      delay: ((dist(i) - minD) / spread) * ENTRANCE_EACH * (n - 1),
    };
  });
}

/** Items on screen in the first frame at every breakpoint (at most 4 slots per view → |u| < 2.31). */
export const isInitiallyVisible = (u: number) => Math.abs(u) <= 1.5;
/** The centre pair, visible at every breakpoint including phones (1.65 slots per view). */
export const isCentre = (u: number) => Math.abs(u) <= 0.5;
