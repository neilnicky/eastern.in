import { reducedMotion, onCleanup } from "./env";

/**
 * Reference M20 (Matter.js, as on the reference contact page): spice silhouettes drop from above, collide,
 * pile up and can be dragged. Bodies are approximated (circles / chamfered rectangles) and drive the
 * transforms of the real SVG elements, so the art stays crisp. Under reduced motion the CSS pile stays put.
 */
export default async function physics(root: HTMLElement) {
  const scene = root.querySelector<HTMLElement>("[data-physics]");
  if (!scene || reducedMotion()) return;
  const Matter = (await import("matter-js")).default;
  const { Engine, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter;

  const shapes = [...scene.querySelectorAll<HTMLElement>("[data-physics-body]")];
  const engine = Engine.create({ gravity: { y: 1 } });
  let W = scene.clientWidth, H = scene.clientHeight;
  const wallOpts = { isStatic: true, render: { visible: false } };
  const walls = [
    Bodies.rectangle(W / 2, H + 50, W * 3, 100, wallOpts),
    Bodies.rectangle(-50, H / 2, 100, H * 4, wallOpts),
    Bodies.rectangle(W + 50, H / 2, 100, H * 4, wallOpts),
  ];
  const bodies = shapes.map((el, i) => {
    const w = el.offsetWidth, h = el.offsetHeight;
    const x = W * (0.15 + ((i * 0.37) % 0.7));
    const y = -h - i * (H * 0.18);
    const round = el.dataset.physicsBody === "round";
    const b = round
      ? Bodies.circle(x, y, Math.min(w, h) / 2, { restitution: 0.25, friction: 0.4 })
      : Bodies.rectangle(x, y, w * 0.86, h * 0.86, { restitution: 0.2, friction: 0.5, chamfer: { radius: Math.min(w, h) * 0.3 } });
    Body.setAngle(b, (i % 2 ? 1 : -1) * (0.3 + (i % 3) * 0.2));
    return { el, b, w, h };
  });
  Composite.add(engine.world, [...walls, ...bodies.map((x) => x.b)]);

  const mouse = Mouse.create(scene);
  // let the page scroll with the wheel / touch: Matter's mouse grabs these by default
  const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener };
  m.element.removeEventListener("wheel", m.mousewheel);
  const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
  Composite.add(engine.world, mc);

  scene.classList.add("is-live");
  let raf = 0, visible = true, last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min(32, now - last); last = now;
    if (visible) {
      Engine.update(engine, dt);
      for (const { el, b, w, h } of bodies) el.style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; });
  io.observe(scene);
  const ro = new ResizeObserver(() => {
    W = scene.clientWidth; H = scene.clientHeight;
    Body.setPosition(walls[0]!, { x: W / 2, y: H + 50 });
    Body.setPosition(walls[2]!, { x: W + 50, y: H / 2 });
  });
  ro.observe(scene);
  onCleanup(() => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); Engine.clear(engine); Mouse.clearSourceEvents(mouse); });
}
