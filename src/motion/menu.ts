import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { reducedMotion } from "./env";
import { lenis } from "./main";

let open = false;
let tl: gsap.core.Timeline | null = null;
let lastFocus: HTMLElement | null = null;
const splits = new WeakMap<HTMLElement, SplitText>();

const els = () => ({
  menu: document.querySelector<HTMLElement>("[data-menu]"),
  toggle: document.querySelector<HTMLButtonElement>("[data-menu-toggle]"),
});

function setLabels(isOpen: boolean) {
  const { toggle } = els();
  if (!toggle) return;
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.querySelector<HTMLElement>("[data-label-open]")!.hidden = isOpen;
  toggle.querySelector<HTMLElement>("[data-label-close]")!.hidden = !isOpen;
}

function trap(e: KeyboardEvent) {
  const { menu, toggle } = els();
  if (!menu || !open) return;
  if (e.key === "Escape") { e.preventDefault(); closeMenu(); return; }
  if (e.key !== "Tab") return;
  const focusables = [toggle!, ...menu.querySelectorAll<HTMLElement>("a[href], button")];
  const first = focusables[0]!, last = focusables[focusables.length - 1]!;
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

export function openMenu() {
  const { menu } = els();
  if (!menu || open) return;
  open = true;
  lastFocus = document.activeElement as HTMLElement;
  menu.hidden = false;
  document.documentElement.classList.add("menu-open");
  setLabels(true);
  lenis?.stop();
  document.addEventListener("keydown", trap);

  if (reducedMotion()) {
    gsap.set(menu, { clipPath: "inset(0 0 0% 0)" });
  } else {
    const chars = [...menu.querySelectorAll<HTMLElement>("[data-split]")].flatMap((w) => {
      let s = splits.get(w);
      if (!s) { s = new SplitText(w, { type: "chars", mask: "chars" }); splits.set(w, s); }
      return s.chars;
    });
    tl?.kill();
    tl = gsap.timeline({ defaults: { ease: "textveil" } })
      .fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "pagetrans" })
      .fromTo(menu.querySelectorAll(".menu__rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "linedraw", stagger: 0.07 }, 0.25)
      .fromTo(chars, { yPercent: 110 }, { yPercent: 0, duration: 0.95, stagger: 0.018 }, 0.3)
      .fromTo(menu.querySelectorAll(".menu__diamond, .menu__secondary"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6);
  }
  menu.querySelector<HTMLElement>(".menu__link")?.focus({ preventScroll: true });
}

export function closeMenu(instant = false) {
  const { menu } = els();
  if (!menu || !open) return;
  open = false;
  document.documentElement.classList.remove("menu-open");
  setLabels(false);
  document.removeEventListener("keydown", trap);
  lenis?.start();
  const done = () => { menu.hidden = true; gsap.set(menu, { clipPath: "inset(0 0 100% 0)" }); };
  if (instant || reducedMotion()) { tl?.kill(); done(); }
  else {
    tl?.kill();
    tl = gsap.timeline({ onComplete: done })
      .to(menu.querySelectorAll(".menu__secondary, .menu__diamond"), { autoAlpha: 0, duration: 0.2 })
      .to(menu, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "pagetrans" }, 0.05);
  }
  if (!instant) lastFocus?.focus({ preventScroll: true });
}

export function initMenu() {
  document.addEventListener("click", (e) => {
    const toggle = (e.target as HTMLElement).closest("[data-menu-toggle]");
    if (toggle) { e.preventDefault(); open ? closeMenu() : openMenu(); return; }
  });
}
