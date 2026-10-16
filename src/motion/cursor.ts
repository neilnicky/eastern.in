import { gsap } from "gsap";
import { finePointer } from "./env";

/** Reference M15: a pill that trails the pointer and names the action ("Discover the product", "Drag"). */
export function initCursor() {
  if (!finePointer()) return;
  const el = document.querySelector<HTMLElement>("[data-cursor-el]");
  const label = el?.querySelector<HTMLElement>("[data-cursor-label]");
  if (!el || !label) return;
  const pos = { x: -100, y: -100 }, target = { x: -100, y: -100 };
  window.addEventListener("pointermove", (e) => { target.x = e.clientX; target.y = e.clientY; }, { passive: true });
  gsap.ticker.add(() => {
    pos.x += (target.x - pos.x) * 0.2;
    pos.y += (target.y - pos.y) * 0.2;
    el.style.transform = `translate3d(${pos.x + 14}px, ${pos.y + 14}px, 0)`;
  });
  document.addEventListener("pointerover", (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
    if (t) { label.textContent = t.dataset.cursor ?? ""; document.documentElement.classList.add("cursor-on"); }
  });
  document.addEventListener("pointerout", (e) => {
    const from = (e.target as HTMLElement).closest("[data-cursor]");
    const to = (e.relatedTarget as HTMLElement | null)?.closest?.("[data-cursor]");
    if (from && from !== to) document.documentElement.classList.remove("cursor-on");
  });
  document.addEventListener("astro:before-swap", () => document.documentElement.classList.remove("cursor-on"));
}
