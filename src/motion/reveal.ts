import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M5 "textveil": characters rise inside line masks. Titles only. SplitText keeps an
 * aria-label with the full text on the element, so screen readers get the words, not letters.
 * data-reveal="hero" plays on page load (after the cover lifts); anything else plays on scroll.
 */
export default function reveal(root: HTMLElement) {
  if (reducedMotion()) return;
  const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
  const splits: SplitText[] = [];
  els.forEach((el) => {
    const split = new SplitText(el, { type: "lines,chars", mask: "lines", linesClass: "line", charsClass: "char", aria: "auto" });
    splits.push(split);
    const hero = el.dataset.reveal === "hero";
    gsap.set(split.chars, { yPercent: 110 });
    const play = () => gsap.to(split.chars, { yPercent: 0, duration: 0.95, ease: "textveil", stagger: 0.018, delay: hero ? 0.35 : 0 });
    if (hero) play();
    else ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
  });
  onCleanup(() => splits.forEach((s) => s.revert()));
}
