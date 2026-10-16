import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { reducedMotion, runCleanups } from "./env";
import { initMenu, closeMenu } from "./menu";
import { initCursor } from "./cursor";
import { initTransitions } from "./transition";
import { initPage } from "./page";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
// Named curves measured from the reference bundle (docs/reference-analysis.md §6).
CustomEase.create("pagetrans", ".645,.045,.355,1");
CustomEase.create("linedraw", ".65,.05,.36,1");
CustomEase.create("textveil", ".165,1,.32,1");
CustomEase.create("headermark", ".22,1,.36,1");

export let lenis: Lenis | null = null;
let booted = false;

export function boot() {
  if (booted) return;
  booted = true;

  if (!reducedMotion()) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis?.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  initMenu();
  initCursor();
  initTransitions();

  const onScroll = () => document.documentElement.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });

  // Astro ClientRouter: run page modules after every navigation (and on first load).
  document.addEventListener("astro:page-load", () => {
    onScroll();
    lenis?.scrollTo(0, { immediate: true });
    initPage();
    footerLift();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
  document.addEventListener("astro:before-swap", () => {
    closeMenu(true);
    runCleanups();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/** Reference M21: the footer content lags behind the scroll as it is uncovered (a curtain lift). */
function footerLift() {
  const inner = document.querySelector<HTMLElement>("[data-footer-inner]");
  if (!inner || reducedMotion()) return;
  gsap.fromTo(inner, { yPercent: -18 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: inner.parentElement, start: "top bottom", end: "bottom bottom", scrub: true } });
}
