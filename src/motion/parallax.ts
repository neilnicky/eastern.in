import { gsap } from "gsap";
import { reducedMotion, onCleanup } from "./env";

/** Reference M12: images drift yPercent −8 → 8 across the viewport, on screens wider than 480 px. */
export default function parallax(root: HTMLElement) {
  if (reducedMotion()) return;
  const mm = gsap.matchMedia();
  mm.add("(min-width: 481px)", () => {
    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const amount = Number(el.dataset.parallax) || 8;
      gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });
  onCleanup(() => mm.revert());
}
