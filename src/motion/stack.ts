import { gsap } from "gsap";
import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M18: sticky cards stack; as card n+1 slides over, card n scales back, tilts and dims.
 * The cards are position: sticky in CSS, so without JS (or with reduced motion) they still stack.
 */
export default function stack(root: HTMLElement) {
  if (reducedMotion()) return;
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    root.querySelectorAll<HTMLElement>("[data-stack]").forEach((list) => {
      const cards = [...list.querySelectorAll<HTMLElement>("[data-stack-card]")];
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.fromTo(card.firstElementChild, { scale: 1, rotate: 0, filter: "brightness(1)" }, {
          scale: 0.9, rotate: -2.5, filter: "brightness(0.86)", ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 18%", scrub: true },
        });
      });
    });
  });
  onCleanup(() => mm.revert());
}
