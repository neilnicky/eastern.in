import { onCleanup, finePointer } from "./env";

/**
 * Reference M13 drag gallery. The strip is a native horizontal scroller (touch, trackpad, keyboard and
 * no-JS all work); this adds mouse drag with release inertia, arrow-key stepping and prev/next buttons.
 */
export default function gallery(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-gallery]").forEach((g) => {
    const strip = g.querySelector<HTMLElement>("[data-gallery-strip]");
    if (!strip) return;
    const ac = new AbortController();
    const { signal } = ac;
    const step = () => (strip.querySelector<HTMLElement>(":scope > *")?.offsetWidth ?? strip.clientWidth * 0.6) + 16;
    g.querySelector("[data-gallery-prev]")?.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior: "smooth" }), { signal });
    g.querySelector("[data-gallery-next]")?.addEventListener("click", () => strip.scrollBy({ left: step(), behavior: "smooth" }), { signal });
    strip.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); strip.scrollBy({ left: step(), behavior: "smooth" }); }
      if (e.key === "ArrowLeft") { e.preventDefault(); strip.scrollBy({ left: -step(), behavior: "smooth" }); }
    }, { signal });

    if (finePointer()) {
      let down = false, moved = 0, startX = 0, startLeft = 0, lastX = 0, lastT = 0, v = 0, raf = 0;
      strip.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        down = true; moved = 0; startX = lastX = e.clientX; startLeft = strip.scrollLeft; lastT = performance.now(); v = 0;
        cancelAnimationFrame(raf);
        strip.classList.add("is-dragging");
      }, { signal });
      window.addEventListener("pointermove", (e) => {
        if (!down) return;
        const now = performance.now();
        v = (e.clientX - lastX) / Math.max(1, now - lastT);
        lastX = e.clientX; lastT = now;
        moved = Math.abs(e.clientX - startX);
        strip.scrollLeft = startLeft - (e.clientX - startX);
      }, { signal });
      window.addEventListener("pointerup", () => {
        if (!down) return;
        down = false;
        strip.classList.remove("is-dragging");
        const glide = () => { v *= 0.94; strip.scrollLeft -= v * 16; if (Math.abs(v) > 0.02) raf = requestAnimationFrame(glide); };
        raf = requestAnimationFrame(glide);
      }, { signal });
      // a drag must not click through to a link
      strip.addEventListener("click", (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, { capture: true, signal });
      onCleanup(() => cancelAnimationFrame(raf));
    }
    onCleanup(() => ac.abort());
  });
}
