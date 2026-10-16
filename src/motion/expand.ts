import { gsap } from "gsap";
import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M11: the lead image card starts inset (page padding, 15 px radius) and opens to full bleed
 * as it scrolls up; its overlay title (if any) fades in once it is wide open.
 */
export default function expand(root: HTMLElement) {
  if (reducedMotion()) return;
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>("[data-expand]").forEach((card) => {
      const pad = Math.round(Math.min(40, Math.max(16, window.innerWidth * 0.028))); // reference inset ≈ 40 px at 1440
      const media = card.querySelector<HTMLElement>("[data-expand-media]");
      const overlay = card.querySelector<HTMLElement>("[data-expand-overlay]");
      // cards visible at load start inset at scroll 0 (as on the reference); later cards start when they enter
      const startsInView = card.getBoundingClientRect().top + window.scrollY < window.innerHeight;
      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: startsInView ? 0 : "top bottom", end: "top top", scrub: true } });
      tl.fromTo(card, { clipPath: `inset(0px ${pad}px round 15px)` }, { clipPath: "inset(0px 0px round 0px)", ease: "none" }, 0);
      if (media) tl.fromTo(media, { scale: 1.12 }, { scale: 1, ease: "none" }, 0);
      if (overlay) gsap.fromTo(overlay, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: "none", scrollTrigger: { trigger: card, start: "top 40%", end: "top top", scrub: true } });
    });
  }, root);
  onCleanup(() => ctx.revert());
}
