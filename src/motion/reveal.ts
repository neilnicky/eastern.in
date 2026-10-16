import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M5 "textveil": characters rise inside line masks. Titles only. SplitText keeps an
 * aria-label with the full text on the element, so screen readers get the words, not letters.
 * data-reveal="hero" plays on page load (after the cover lifts); anything else plays on scroll.
 *
 * Layer budget: characters only get `will-change: transform` while their reveal is running; when it
 * finishes their inline transform and will-change are cleared, so a finished title holds no compositor
 * layers (a long page used to keep 200+ permanent layers alive). The split DOM is deliberately kept:
 * reverting it changes a title's height by a few px (line-mask padding) and would shift the page.
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
    const play = () => gsap.to(split.chars, {
      yPercent: 0, duration: 0.95, ease: "textveil", stagger: 0.018, delay: hero ? 0.35 : 0,
      onStart: () => split.chars.forEach((c) => { (c as HTMLElement).style.willChange = "transform"; }),
      onComplete: () => gsap.set(split.chars, { clearProps: "willChange,transform" }),
    });
    if (hero) play();
    else ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
  });
  onCleanup(() => splits.forEach((s) => s.revert()));
}
