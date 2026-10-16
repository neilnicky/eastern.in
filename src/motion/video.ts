import { onCleanup } from "./env";

/**
 * Click-to-load YouTube player (privacy-enhanced youtube-nocookie domain). Until clicked, the page holds a
 * local thumbnail and a real link to the video, so nothing third-party loads and it works without JS.
 */
export default function video(root: HTMLElement) {
  const ac = new AbortController();
  root.querySelectorAll<HTMLElement>("[data-video]").forEach((box) => {
    const id = box.dataset.video;
    const btn = box.querySelector<HTMLAnchorElement>("[data-video-play]");
    if (!id || !btn) return;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = box.dataset.videoTitle ?? "Video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.className = "video__frame";
      box.replaceChildren(iframe);
      iframe.focus();
    }, { signal: ac.signal });
  });
  onCleanup(() => ac.abort());
}
