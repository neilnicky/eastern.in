import { describe, expect, it } from "vitest";
import { gsap } from "gsap";
import { initialLayout, wrapSlots, START_SLOTS, TILTS_DEG, ENTRANCE_EACH, isInitiallyVisible, isCentre } from "@/lib/marquee-layout";

describe("marquee first frame", () => {
  it("matches the ticker's resting frame (x = wrap(i·S − value), value = −START_SLOTS·S)", () => {
    for (const n of [5, 8, 14]) {
      const S = 317, L = n * S, value = -START_SLOTS * S;
      const wrapPx = (x: number) => ((((x + L / 2) % L) + L) % L) - L / 2; // as in motion/marquee.ts
      initialLayout(n).forEach((slot, i) => {
        expect(slot.u * S).toBeCloseTo(wrapPx(i * S - value), 6);
        expect(slot.tilt).toBe(TILTS_DEG[i % TILTS_DEG.length]);
        expect(slot.z).toBe(Math.round(Math.max(0, 1 - Math.abs(wrapPx(i * S - value)) / S) * 10));
      });
    }
  });

  it("staggers the entrance exactly like gsap's { each, from: 'center' }", () => {
    for (const n of [5, 8, 14]) {
      const targets = Array.from({ length: n }, () => ({}));
      const dist = gsap.utils.distribute({ each: ENTRANCE_EACH, from: "center" });
      initialLayout(n).forEach((slot, i) => expect(slot.delay).toBeCloseTo(dist(i, targets[i], targets), 6));
    }
  });

  it("marks the packs on screen at every breakpoint as visible, and the centre pair as centre", () => {
    const slots = initialLayout(14);
    expect(slots.filter((s) => isInitiallyVisible(s.u)).map((s) => s.u).sort((a, b) => a - b)).toEqual([-1.5, -0.5, 0.5, 1.5]);
    expect(slots.filter((s) => isCentre(s.u))).toHaveLength(2);
    expect(wrapSlots(7, 14)).toBe(-7);
  });
});
