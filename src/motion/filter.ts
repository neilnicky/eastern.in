import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onCleanup } from "./env";

/**
 * Client-side search + tag filter (products, recipes, store locator). All items are server-rendered, so
 * without JS everything is simply listed. Groups whose items are all hidden are hidden too.
 *   [data-filter]            root            [data-filter-input]   search box
 *   [data-filter-tag="x"]    toggle button   [data-filter-item]    item (data-filter-text, data-filter-tags)
 *   [data-filter-group]      group           [data-filter-status]  live region   [data-filter-empty]
 */
export default function filter(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-filter]").forEach((box) => {
    const input = box.querySelector<HTMLInputElement>("[data-filter-input]");
    const tags = [...box.querySelectorAll<HTMLButtonElement>("[data-filter-tag]")];
    const items = [...box.querySelectorAll<HTMLElement>("[data-filter-item]")];
    const groups = [...box.querySelectorAll<HTMLElement>("[data-filter-group]")];
    const status = box.querySelector<HTMLElement>("[data-filter-status]");
    const empty = box.querySelector<HTMLElement>("[data-filter-empty]");
    const ac = new AbortController();
    const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ഀ-ൿ ]+/g, " ").replace(/\s+/g, " ").trim();
    const index = items.map((el) => ({ el, text: norm(el.dataset.filterText ?? el.textContent ?? ""), tags: (el.dataset.filterTags ?? "").split(" ").filter(Boolean) }));

    const apply = () => {
      const q = norm(input?.value ?? "");
      const words = q ? q.split(" ") : [];
      const active = tags.find((t) => t.getAttribute("aria-pressed") === "true")?.dataset.filterTag ?? "all";
      let shown = 0;
      for (const it of index) {
        const ok = words.every((w) => it.text.includes(w)) && (active === "all" || it.tags.includes(active));
        it.el.hidden = !ok;
        if (ok) shown++;
      }
      for (const g of groups) g.hidden = ![...g.querySelectorAll<HTMLElement>("[data-filter-item]")].some((el) => !el.hidden);
      if (empty) empty.hidden = shown > 0;
      if (status) status.textContent = q || active !== "all" ? `${shown} ${shown === 1 ? "result" : "results"}` : "";
      box.classList.toggle("is-filtering", !!q || active !== "all");
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    input?.addEventListener("input", apply, { signal: ac.signal });
    input?.closest("form")?.addEventListener("submit", (e) => e.preventDefault(), { signal: ac.signal });
    tags.forEach((t) => t.addEventListener("click", () => {
      tags.forEach((o) => o.setAttribute("aria-pressed", String(o === t)));
      apply();
    }, { signal: ac.signal }));
    // deep link: ?q=… or #tag
    const q = new URLSearchParams(location.search).get("q");
    if (q && input) { input.value = q; }
    const hashTag = tags.find((t) => `#${t.dataset.filterTag}` === location.hash);
    if (hashTag) tags.forEach((o) => o.setAttribute("aria-pressed", String(o === hashTag)));
    // the module loads lazily: honour anything typed (or restored by the browser) before it attached
    if (q || hashTag || input?.value) apply();
    onCleanup(() => ac.abort());
  });
}
