import { gsap } from "gsap";
import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M19 silhouette scene: while the section is pinned, large spice shapes drift from the edges
 * toward the centred statement, scale up, then part again. Static composition without JS.
 */
export default function converge(root: HTMLElement) {
  if (reducedMotion()) return;
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    root.querySelectorAll<HTMLElement>("[data-converge]").forEach((scene) => {
      const shapes = scene.querySelectorAll<HTMLElement>("[data-converge-shape]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: scene, start: "top top", end: "+=150%", scrub: true, pin: true } });
      shapes.forEach((s, i) => {
        const fx = Number(s.dataset.fromX ?? 0), fy = Number(s.dataset.fromY ?? 0);
        tl.fromTo(s, { xPercent: fx, yPercent: fy, scale: 0.7, rotate: (i % 2 ? -1 : 1) * 25 }, { xPercent: 0, yPercent: 0, scale: 1, rotate: 0, ease: "none", duration: 1 }, 0)
          .to(s, { xPercent: -fx * 0.6, yPercent: -fy * 0.6, scale: 0.85, ease: "none", duration: 0.8 }, 1.1);
      });
      tl.fromTo(scene.querySelectorAll("[data-converge-text]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.3 }, 0.6);
    });
  });
  onCleanup(() => mm.revert());
}
