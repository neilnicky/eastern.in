import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M2–M4: the home pack marquee. Packs sit on a slightly tilted line and loop forever.
 * Input: scroll through the pinned stage (ScrollTrigger), mouse/touch drag, arrow keys, and focus.
 * Motion: a damped spring per frame (the reference's `velocity += ((target-value)*k - velocity*9)*dt`),
 * with tilt and a small Y-rotation driven by velocity. The badge turns with travel.
 * Without JS or with reduced motion the track is a plain horizontal scroller (CSS default).
 */
const K = 26, DAMP = 9.5;
const ANGLE = (6.5 * Math.PI) / 180;
const TILTS = [-0.053, 0.043, -0.024, 0.057, -0.048, 0.029, -0.038, 0.053].map((r) => (r * 180) / Math.PI);

export default function marquee(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>("[data-marquee]");
  if (!section || reducedMotion()) return;
  const stage = section.querySelector<HTMLElement>("[data-marquee-stage]")!;
  const items = [...section.querySelectorAll<HTMLElement>("[data-marquee-item]")];
  const badge = section.querySelector<HTMLElement>("[data-marquee-badge]");
  const n = items.length;
  section.classList.add("is-live");

  let S = 300, L = n * S;
  const measure = () => {
    const w = stage.clientWidth;
    const perView = w <= 480 ? 1.65 : w <= 1024 ? 3 : 4;
    S = w / perView;
    L = n * S;
    section.style.setProperty("--pack-w", `${Math.min(S * (w <= 480 ? 0.7 : 0.62), 360)}px`);
  };
  measure();

  const state = { value: -S * 1.5, velocity: 0 };
  let base = -S * 1.5;
  let scrollTravel = 0;
  const target = () => base + scrollTravel;

  const st = ScrollTrigger.create({
    trigger: section, start: "top top", end: "bottom bottom",
    onUpdate: (self) => { scrollTravel = self.progress * S * 7; },
  });

  // drag (mouse + touch; vertical touch still scrolls the page via touch-action: pan-y)
  let dragging = false, lastX = 0, moved = 0;
  const ac = new AbortController();
  stage.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; moved = 0; }, { signal: ac.signal });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
    base -= dx * 1.15;
  }, { signal: ac.signal });
  window.addEventListener("pointerup", () => { dragging = false; }, { signal: ac.signal });
  stage.addEventListener("click", (e) => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, { capture: true, signal: ac.signal });
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { base += S; e.preventDefault(); }
    if (e.key === "ArrowLeft") { base -= S; e.preventDefault(); }
  }, { signal: ac.signal });
  // keyboard focus brings the focused pack to the centre
  items.forEach((it, i) => it.addEventListener("focusin", () => {
    const current = ((i * S - target()) % L + L) % L;
    const delta = current > L / 2 ? current - L : current;
    base += delta;
  }, { signal: ac.signal }));

  const wrap = (x: number) => ((((x + L / 2) % L) + L) % L) - L / 2;
  const tick = (_t: number, dtMs: number) => {
    const dt = Math.min(dtMs, 48) / 1000;
    state.velocity += ((target() - state.value) * K - state.velocity * DAMP) * dt;
    state.value += state.velocity * dt;
    const vel = gsap.utils.clamp(-1, 1, state.velocity / 2500);
    for (let i = 0; i < n; i++) {
      const x = wrap(i * S - state.value);
      const focus = Math.max(0, 1 - Math.abs(x) / S); // depth order only; size stays constant
      const y = Math.tan(ANGLE) * x;
      const el = items[i]!;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${TILTS[i % TILTS.length]! + vel * 10}deg) rotateY(${vel * -22}deg)`;
      el.style.zIndex = String(Math.round(focus * 10));
    }
    if (badge) badge.style.setProperty("--badge-rot", `${state.value * -0.045}deg`);
  };
  gsap.ticker.add(tick);

  // M3 intro: packs fade and scale in, staggered from the centre
  gsap.fromTo(items.map((it) => it.firstElementChild), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "headermark", stagger: { each: 0.06, from: "center" }, delay: document.documentElement.classList.contains("is-intro") ? 1.1 : 0.35 });
  if (badge) gsap.fromTo(badge, { autoAlpha: 0, y: 24, rotate: -18 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.9, ease: "headermark", delay: document.documentElement.classList.contains("is-intro") ? 0.6 : 0.1 });

  const ro = new ResizeObserver(() => { const ratio = state.value / S; measure(); state.value = ratio * S; base = state.value - scrollTravel; });
  ro.observe(stage);
  onCleanup(() => { gsap.ticker.remove(tick); ro.disconnect(); st.kill(); ac.abort(); });
}
