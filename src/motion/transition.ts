import { gsap } from "gsap";
import { reducedMotion } from "./env";

/**
 * Reference M1 + M8. A clove cover slides up over the page (0.9 s, pagetrans), the route swaps underneath,
 * then the cover lifts away. On the first visit of a session an orange panel retracts upward instead.
 * Content is never blocked: if anything fails, the cover is hidden and navigation proceeds normally.
 */
const cover = () => document.querySelector<HTMLElement>(".page-cover");

function coverIn(): Promise<void> {
  const el = cover();
  if (!el || reducedMotion()) return Promise.resolve();
  return new Promise((resolve) => {
    gsap.killTweensOf(el);
    gsap.set(el, { visibility: "visible", backgroundColor: "var(--clove)" });
    gsap.fromTo(el, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "pagetrans", onComplete: resolve });
    setTimeout(resolve, 1200); // safety net
  });
}

function coverOut() {
  const el = cover();
  if (!el) return;
  if (getComputedStyle(el).visibility === "hidden" || document.documentElement.classList.contains("is-intro")) return;
  gsap.to(el, { yPercent: -100, duration: 0.975, ease: "pagetrans", delay: 0.05, onComplete: () => gsap.set(el, { visibility: "hidden", yPercent: 100 }) });
}

function intro() {
  const el = cover();
  if (!el) return;
  try { sessionStorage.setItem("eastern-intro", "1"); } catch {}
  if (!document.documentElement.classList.contains("is-intro")) return;
  el.style.animation = "none";
  gsap.set(el, { visibility: "visible", yPercent: 0, backgroundColor: "var(--orange)" });
  gsap.to(el, {
    yPercent: -100, duration: 0.6, ease: "pagetrans", delay: 0.15,
    onComplete: () => { gsap.set(el, { visibility: "hidden", yPercent: 100 }); document.documentElement.classList.remove("is-intro"); },
  });
}

export function initTransitions() {
  intro();
  document.addEventListener("astro:before-preparation", (e) => {
    const ev = e as Event & { loader: () => Promise<void>; sourceElement?: Element; navigationType?: string };
    if (ev.navigationType === "traverse") return; // back/forward: no cover
    const original = ev.loader;
    ev.loader = async () => { await Promise.all([coverIn(), original()]); };
  });
  document.addEventListener("astro:page-load", () => coverOut());
}
