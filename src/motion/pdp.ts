import { gsap } from "gsap";
import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M10: the pack starts tucked under the giant product name and rises over it as the page
 * scrolls, turning from −14° to +10° with a slight 3D swing (no WebGL label wrap — packs are flat).
 */
export default function pdp(root: HTMLElement) {
  if (reducedMotion()) return;
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>("[data-pdp]").forEach((hero) => {
      const packEl = hero.querySelector<HTMLElement>("[data-pdp-pack]");
      if (!packEl) return;
      gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=140%", scrub: 0.6 } })
        .fromTo(packEl, { yPercent: 0, rotate: -14, rotateY: -16 }, { yPercent: -120, rotate: 10, rotateY: 14, ease: "none" });
      gsap.from(packEl.firstElementChild, { yPercent: 40, autoAlpha: 0, duration: 1, ease: "headermark", delay: 0.25 });
    });
  }, root);
  onCleanup(() => ctx.revert());
}
