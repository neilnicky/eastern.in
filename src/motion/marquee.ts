import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reducedMotion, onCleanup } from "./env";
import { START_SLOTS, TAN_ANGLE, TILTS_DEG } from "@/lib/marquee-layout";

/**
 * Reference M2–M4: the home pack marquee. Packs sit on a slightly tilted line and loop forever.
 * Input: scroll through the pinned stage (ScrollTrigger), mouse/touch drag, arrow keys, and focus.
 * Motion: a damped spring per frame (the reference's `velocity += ((target-value)*k - velocity*9)*dt`),
 * with tilt and a small Y-rotation driven by velocity. The badge turns with travel.
 * The first frame (packs at rest, entrance animation) is pure CSS in index.astro, built from the same geometry
 * (lib/marquee-layout.ts), so the visible packs paint without JS; this module takes over after the first paint.
 * With reduced motion, or without scripting, the track is a plain horizontal scroller (CSS).
 *
 * The ticker is demand-driven: it only runs while the hero is on-screen AND the spring is still moving.
 * Any input (scroll progress, drag, keys, focus, resize) wakes it; settling or leaving the viewport
 * stops it, so a finished marquee costs no per-frame style writes.
 */
const K = 26, DAMP = 9.5;
const SETTLE_EPS = 0.05; // px and px/s: below this the spring is considered at rest

export default function marquee(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>("[data-marquee]");
  if (!section || reducedMotion()) return;
  // go live only after the CSS first frame has painted, so LCP never waits on this module
  let cancelled = false, cleanup = () => {};
  const raf = requestAnimationFrame(() => requestAnimationFrame(() => { if (!cancelled) cleanup = live(section); }));
  onCleanup(() => { cancelled = true; cancelAnimationFrame(raf); cleanup(); });
}

function live(section: HTMLElement) {
  const stage = section.querySelector<HTMLElement>("[data-marquee-stage]")!;
  const items = [...section.querySelectorAll<HTMLElement>("[data-marquee-item]")];
  const badge = section.querySelector<HTMLElement>("[data-marquee-badge]");
  const n = items.length;
  section.classList.add("is-live");

  let S = 300, L = n * S;
  const measure = () => {
    const w = stage.clientWidth;
    const perView = w <= 480 ? 1.65 : w <= 1024 ? 3 : 4;
    S = w / perView; // pack size follows from the same breakpoints in CSS (--S / --pw)
    L = n * S;
  };
  measure();

  // Ticker control. Function declarations (hoisted) because ScrollTrigger may call onUpdate synchronously.
  let running = false, onScreen = true;
  function start() { if (!running && onScreen) { running = true; gsap.ticker.add(tick); } }
  function stop() { if (running) { running = false; gsap.ticker.remove(tick); } }
  function wake() { start(); }

  const state = { value: -S * START_SLOTS, velocity: 0 };
  let base = -S * START_SLOTS;
  let scrollTravel = 0;
  const target = () => base + scrollTravel;

  const st = ScrollTrigger.create({
    trigger: section, start: "top top", end: "bottom bottom",
    onUpdate: (self) => { scrollTravel = self.progress * S * 7; wake(); },
  });

  // drag (mouse + touch; vertical touch still scrolls the page via touch-action: pan-y)
  let dragging = false, lastX = 0, moved = 0;
  const ac = new AbortController();
  stage.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; moved = 0; }, { signal: ac.signal });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
    base -= dx * 1.15;
    wake();
  }, { signal: ac.signal });
  window.addEventListener("pointerup", () => { dragging = false; }, { signal: ac.signal });
  stage.addEventListener("click", (e) => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, { capture: true, signal: ac.signal });
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { base += S; e.preventDefault(); wake(); }
    if (e.key === "ArrowLeft") { base -= S; e.preventDefault(); wake(); }
  }, { signal: ac.signal });
  // keyboard focus brings the focused pack to the centre
  items.forEach((it, i) => it.addEventListener("focusin", () => {
    const current = ((i * S - target()) % L + L) % L;
    const delta = current > L / 2 ? current - L : current;
    base += delta;
    wake();
  }, { signal: ac.signal }));

  const wrap = (x: number) => ((((x + L / 2) % L) + L) % L) - L / 2;
  const write = () => {
    const vel = gsap.utils.clamp(-1, 1, state.velocity / 2500);
    for (let i = 0; i < n; i++) {
      const x = wrap(i * S - state.value);
      const focus = Math.max(0, 1 - Math.abs(x) / S); // depth order only; size stays constant
      const y = TAN_ANGLE * x;
      const el = items[i]!;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${TILTS_DEG[i % TILTS_DEG.length]! + vel * 10}deg) rotateY(${vel * -22}deg)`;
      el.style.zIndex = String(Math.round(focus * 10));
    }
    if (badge) badge.style.setProperty("--badge-rot", `${state.value * -0.045}deg`);
  };
  function tick(_t: number, dtMs: number) {
    const dt = Math.min(dtMs, 48) / 1000;
    state.velocity += ((target() - state.value) * K - state.velocity * DAMP) * dt;
    state.value += state.velocity * dt;
    if (Math.abs(target() - state.value) < SETTLE_EPS && Math.abs(state.velocity) < SETTLE_EPS) {
      state.value = target(); state.velocity = 0; // snap, write the resting frame once, then sleep
      write();
      stop();
      return;
    }
    write();
  }

  // pause entirely while the hero is outside the viewport
  const io = new IntersectionObserver(([e]) => { onScreen = !!e?.isIntersecting; onScreen ? start() : stop(); });
  io.observe(section);
  start();

  const ro = new ResizeObserver(() => { const ratio = state.value / S; measure(); state.value = ratio * S; base = state.value - scrollTravel; write(); wake(); });
  ro.observe(stage);
  return () => { stop(); io.disconnect(); ro.disconnect(); st.kill(); ac.abort(); };
}
