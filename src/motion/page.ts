// Runs page-level motion modules for whatever data-hooks the current page contains.
// Modules are imported lazily so pages only download what they use.
const modules: [selector: string, load: () => Promise<{ default: (root: HTMLElement) => void }>][] = [
  ["[data-reveal]", () => import("./reveal")],
  ["[data-expand]", () => import("./expand")],
  ["[data-parallax]", () => import("./parallax")],
  ["[data-gallery]", () => import("./gallery")],
  ["[data-tabbar]", () => import("./tabbar")],
  ["[data-marquee]", () => import("./marquee")],
  ["[data-pdp]", () => import("./pdp")],
  ["[data-stack]", () => import("./stack")],
  ["[data-physics]", () => import("./physics")],
  ["[data-filter]", () => import("./filter")],
  ["[data-video]", () => import("./video")],
  ["[data-converge]", () => import("./converge")],
];

export function initPage() {
  const main = document.querySelector<HTMLElement>("#main");
  if (!main) return;
  for (const [sel, load] of modules) {
    if (main.querySelector(sel) || main.matches(sel)) load().then((m) => m.default(main)).catch((e) => console.error(sel, e));
  }
}
