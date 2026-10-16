import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onCleanup } from "./env";
import { lenis } from "./main";

/** Reference M16: the floating tab bar marks the section in view; its links are ordinary anchors. */
export default function tabbar(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-tabbar]").forEach((bar) => {
    const links = [...bar.querySelectorAll<HTMLAnchorElement>("a[href^='#']")];
    const ac = new AbortController();
    const setActive = (id: string) => links.forEach((a) => {
      const on = a.hash === `#${id}`;
      a.classList.toggle("is-active", on);
      if (on) { a.setAttribute("aria-current", "true"); bar.scrollTo({ left: a.offsetLeft - bar.clientWidth / 2 + a.offsetWidth / 2, behavior: "smooth" }); }
      else a.removeAttribute("aria-current");
    });
    links.forEach((a) => {
      const target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!target) return;
      ScrollTrigger.create({ trigger: target, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActive(target.id) });
      a.addEventListener("click", (e) => {
        if (!lenis) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -40, duration: 1.2 });
        history.replaceState(null, "", a.hash);
      }, { signal: ac.signal });
    });
    // show only once the first section is reached
    ScrollTrigger.create({ trigger: (bar.dataset.tabbarFrom ? document.getElementById(bar.dataset.tabbarFrom.replace(/^#/, "")) : null) ?? bar.parentElement, start: "top 70%", end: "bottom 30%", onToggle: (s) => bar.classList.toggle("is-visible", s.isActive) });
    onCleanup(() => ac.abort());
  });
}
