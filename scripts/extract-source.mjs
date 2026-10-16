// Extracts Eastern's existing content from the local crawl snapshot (.source-cache/, git-ignored)
// into src/content/data/*.json. Run once per re-crawl: `node scripts/extract-source.mjs`.
// Text is copied verbatim; only whitespace is normalised. Every record keeps its source URL.
import fs from "node:fs";
import * as cheerio from "cheerio";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = ROOT + ".source-cache/eastern-data/";
const ASSETS = ROOT + ".source-cache/eastern-assets/";
const OUT = ROOT + "src/content/data/";
fs.mkdirSync(OUT, { recursive: true });

const pages = fs.readdirSync(SRC + "pages").map((f) => JSON.parse(fs.readFileSync(SRC + "pages/" + f, "utf8")));
const byPath = new Map(pages.map((p) => [p.url.replace("https://eastern.in", ""), p]));
const load = (path) => {
  const p = byPath.get(path);
  if (!p) throw new Error("not crawled: " + path);
  return cheerio.load(fs.readFileSync(SRC + "html/" + p.key + ".html", "utf8"));
};
const clean = (s) => (s ?? "").replace(/ /g, " ").replace(/[ \t\r\f\v]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
const oneLine = (s) => clean(s).replace(/\n+/g, " ");
const decodePath = (u) => decodeURIComponent(new URL(u, "https://eastern.in").pathname).replace(/^\//, "");
const localExists = (u) => { try { return fs.existsSync(ASSETS + decodePath(u)); } catch { return false; } };
// Prefer the full-size original over a WordPress "-300x184" derivative when it was downloaded.
const fullSize = (u) => {
  if (!u) return null;
  const abs = new URL(u, "https://eastern.in").href.replace(/^http:/, "https:");
  const orig = abs.replace(/-\d+x\d+(\.\w+)$/, "$1");
  const scaled = abs.replace(/-\d+x\d+(\.\w+)$/, "-scaled$1");
  for (const c of [scaled, orig, abs]) if (localExists(c)) return decodePath(c);
  return null;
};
const pathsOf = (prefix) => [...byPath.keys()].filter((k) => k.startsWith(prefix) && k !== prefix && !/\/page\/\d+\/$/.test(k)).sort();
const write = (name, data) => {
  fs.writeFileSync(OUT + name + ".json", JSON.stringify(data, null, 1) + "\n");
  console.log(name.padEnd(22), Array.isArray(data) ? data.length : Object.keys(data).length);
};

/** Convert a CMS body into ordered blocks. Social embeds become a link to the original post. */
function blocks($, root) {
  const out = [];
  const seenText = new Set();
  const pushText = (type, text) => { text = clean(text); if (!text || seenText.has(text)) return; seenText.add(text); out.push({ type, text }); };
  root.find("script,style,noscript,svg,.portfolio-item-share,#calendar,#venue,#link").remove();
  root.find(".fb-post, .fb-video").each((_, el) => {
    const href = $(el).attr("data-href");
    if (href) out.push({ type: "original", href, network: "facebook" });
    $(el).remove();
  });
  root.find("blockquote.instagram-media").each((_, el) => { out.push({ type: "original", href: $(el).attr("data-instgrm-permalink")?.split("?")[0], network: "instagram" }); $(el).remove(); });
  root.find("blockquote.twitter-tweet").each((_, el) => { out.push({ type: "original", href: $(el).find("a").last().attr("href"), network: "x" }); $(el).remove(); });
  root.find("iframe").each((_, el) => {
    const src = $(el).attr("src") || "";
    const fb = src.match(/[?&]href=([^&]+)/);
    if (/facebook\.com\/plugins/.test(src) && fb) out.push({ type: "original", href: decodeURIComponent(fb[1]), network: "facebook" });
    else if (/youtube/.test(src)) out.push({ type: "video", href: src });
    $(el).remove();
  });
  const walk = (node) => {
    node.contents().each((_, el) => {
      if (el.type === "text") { if (clean($(el).text())) pushText("p", $(el).text()); return; }
      if (el.type !== "tag") return;
      const t = el.tagName.toLowerCase();
      const $el = $(el);
      if (/^h[1-6]$/.test(t)) return pushText("h", $el.text());
      if (t === "p") {
        $el.find("img").each((_, im) => { const s = fullSize($(im).attr("src")); if (s && !/store-icon|spotify|apple|youtube|music/i.test(s)) out.push({ type: "img", src: s, alt: $(im).attr("alt") || "" }); });
        const links = $el.find("a[href]").map((_, a) => ({ text: oneLine($(a).text()), href: $(a).attr("href") })).get().filter((l) => l.href && !/^#/.test(l.href));
        const text = $el.text();
        if (clean(text)) pushText("p", text);
        for (const l of links) if (!/eastern\.in\/?$/.test(l.href)) out.push({ type: "link", ...l });
        return;
      }
      if (t === "ul" || t === "ol") {
        const items = $el.children("li").map((_, li) => clean($(li).text())).get().filter(Boolean);
        if (items.length) out.push({ type: t, items });
        return;
      }
      if (t === "img") { const s = fullSize($el.attr("src")); if (s) out.push({ type: "img", src: s, alt: $el.attr("alt") || "" }); return; }
      if (t === "a" && $el.attr("data-lightbox") !== undefined) { const s = fullSize($el.attr("href")) || fullSize($el.find("img").attr("src")); if (s) out.push({ type: "img", src: s, alt: $el.find("img").attr("alt") || "" }); return; }
      if (t === "a" && $el.attr("href") && clean($el.text())) { out.push({ type: "link", text: oneLine($el.text()), href: $el.attr("href") }); return; }
      if (t === "br" || t === "hr") return;
      walk($el);
    });
  };
  walk(root);
  // de-duplicate images; drop "Posted by … on <date>" Facebook caption residue
  const seenImg = new Set();
  return out.filter((b) => {
    if (b.type === "img") { if (seenImg.has(b.src)) return false; seenImg.add(b.src); }
    if (b.type === "p" && /^Posted by .+ on /.test(b.text)) return false;
    if (b.type === "link" && /^Posted by|^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),? /.test(b.text)) return false;
    if (b.type === "link" && /facebook\.com\/eastern\.in\/?$/.test(b.href)) return false;
    return true;
  });
}

/** Single-post template used by timeline, videos, blog-post, dealers, sliders, recipes. */
function itemPost(path) {
  const $ = load(path);
  const title = oneLine($("h1.page-title").first().text());
  const date = oneLine($(".itemDateCreated").first().text()) || null;
  const body = $(".itemView .itemBody").first();
  return { path, title, date, blocks: blocks($, body) };
}

// ---------- products
const prodRaw = JSON.parse(fs.readFileSync(ROOT + "docs/source/products.json", "utf8")).filter((p) => !/\/page\//.test(p.url));
const cats = JSON.parse(fs.readFileSync(ROOT + "docs/source/categories.json", "utf8"));
const best = Object.fromEntries(JSON.parse(fs.readFileSync(ROOT + "docs/source/product-image-best.json", "utf8")).map((b) => [b.slug, b.best]));
const catOf = {};
cats.forEach((c) => c.products.forEach((u, j) => { catOf[u] = { slug: c.slug, order: j }; }));
const products = prodRaw.map((p) => ({
  slug: p.slug,
  name: p.name,
  category: catOf[p.url].slug,
  categoryOrder: catOf[p.url].order,
  pack: p.description ?? undefined,
  image: best[p.slug].local,
  imageSize: [best[p.slug].w, best[p.slug].h],
  buyUrl: p.buy[0]?.href ?? undefined,
  sourceUrl: "https://eastern.in" + p.url,
}));
write("products", products);

// ---------- video recipes (detail pages are empty; video + thumb come from the /recipes/ listing)
{
  const $ = load("/recipes/");
  const cards = [];
  $("#content h3, .hg_section h3").each((_, h) => {
    const box = $(h).closest(".col-sm-4, .col-md-4, .col-sm-6, .col-md-3");
    if (!box.length) return;
    cards.push({ title: oneLine($(h).text()), href: box.find("a[href*='youtu']").attr("href"), thumb: box.find("img").attr("src"), detail: box.find("a[href*='/recipes/']").attr("href") });
  });
  const rest = JSON.parse(fs.readFileSync(ROOT + "docs/source/recipes-rest.json", "utf8"));
  const out = rest.map((r) => {
    const card = cards.find((c) => c.title.toLowerCase() === r.title.toLowerCase());
    const post = itemPost("/recipes/" + r.slug + "/");
    const yt = card?.href?.match(/[?&]v=([\w-]{11})/)?.[1];
    if (!yt) throw new Error("no video for " + r.slug);
    return { slug: r.slug, title: r.title, date: r.date.slice(0, 10), youtubeId: yt, thumb: fullSize(card.thumb), sourceUrl: "https://eastern.in/recipes/" + r.slug + "/", listingOrder: cards.indexOf(card), detailDate: post.date };
  });
  write("video-recipes", out);
}

// ---------- videos (TVCs)
{
  const $ = load("/videos/");
  const cards = [];
  $("#content h3, .hg_section h3, #content h6").each((_, h) => {
    const box = $(h).closest(".col-sm-4, .col-md-4, .col-sm-6, .col-md-3");
    if (!box.length || cards.find((c) => c.box === box[0])) return;
    cards.push({ box: box[0], title: oneLine(box.find("h3").first().text()), href: box.find("a[href*='youtu'], a[href*='facebook']").attr("href"), thumb: box.find("img").attr("src"), detail: box.find("a[href*='/videos/']").attr("href") });
  });
  const out = pathsOf("/videos/").map((path) => {
    const post = itemPost(path);
    const card = cards.find((c) => c.detail && decodeURIComponent(new URL(c.detail, "https://eastern.in").pathname) === decodeURIComponent(path)) || cards.find((c) => c.title && c.title === post.title);
    const yt = card?.href?.match(/[?&]v=([\w-]{11})/)?.[1];
    return {
      slug: decodeURIComponent(path.split("/")[2]),
      path,
      title: post.title,
      date: post.date,
      youtubeId: yt ?? undefined,
      facebookVideo: !yt && card?.href ? card.href : undefined,
      thumb: fullSize(card?.thumb) ?? post.blocks.find((b) => b.type === "img")?.src ?? null,
      blocks: post.blocks.filter((b) => b.type !== "img"),
      listingOrder: card ? cards.indexOf(card) : 99,
      sourceUrl: "https://eastern.in" + path,
    };
  });
  write("videos", out);
}

// ---------- timeline archive, blog posts
write("timeline-posts", pathsOf("/timeline/").map((path) => ({ slug: path.split("/")[2], ...itemPost(path), sourceUrl: "https://eastern.in" + path })));
write("blog-posts", pathsOf("/blog-post/").filter((p) => p !== "/blog-post/test/").map((path) => ({ slug: path.split("/")[2], ...itemPost(path), sourceUrl: "https://eastern.in" + path })));

// ---------- events (own template: body + Event Date / Location / Link rows)
{
  const out = pathsOf("/events/").map((path) => {
    const $ = load(path);
    const title = oneLine($("h2.page-title").first().text() || $("h1").not(".site-logo").first().text());
    const meta = {};
    $(".sub2").each((_, s) => {
      const k = oneLine($(s).find("h4").text());
      const p = $(s).find("p");
      const text = clean(cheerio.load(`<i>${(p.html() || "").replace(/<br\s*\/?>/g, "\n")}</i>`)("i").text());
      meta[k] = { text, href: p.find("a").attr("href") || undefined };
    });
    const body = $(".itemView .itemBody").first();
    const evDate = meta["Event Date"]?.text?.replace(/\n.*$/, "") || null;
    return { slug: path.split("/")[2], path, title, eventDate: evDate, eventTime: meta["Event Date"]?.text?.split("\n")[1] || null, location: meta["Event Location"]?.text || null, link: meta["Event Link"]?.href && !/eastern\.in\/events\//.test(meta["Event Link"].href) ? meta["Event Link"].href : null, blocks: blocks($, body), sourceUrl: "https://eastern.in" + path };
  });
  write("events", out);
}

// ---------- contests (portfolio template)
{
  const out = pathsOf("/contests/").map((path) => {
    const $ = load(path);
    const item = $(".hg-portfolio-item").first();
    const title = oneLine(item.find("h1").first().text());
    const desc = item.find(".portfolio-item-desc").first();
    const details = item.find(".portfolio-item-otherdetails").first();
    const imgs = item.find(".portfolio-item-right img, .portfolio-item-right a").map((_, el) => fullSize($(el).attr("href") || $(el).attr("src"))).get().filter(Boolean);
    const status = oneLine(item.find(".col-md-4 > p").first().text()) || null; // e.g. "Contest Over"
    const termsSection = $("section.hg_section").filter((_, sec) => /^Terms\s*&\s*Conditions/i.test(oneLine($(sec).find("h4").first().text()))).first();
    const terms = termsSection.find("li").map((_, li) => clean($(li).text())).get().filter(Boolean);
    void details;
    return { slug: decodeURIComponent(path.split("/")[2]), path, title, status, blocks: blocks($, desc), terms, images: [...new Set(imgs)], sourceUrl: "https://eastern.in" + path };
  });
  write("contests", out);
}

// ---------- dealers + store locator markers
{
  const loc = JSON.parse(fs.readFileSync(ROOT + "docs/source/store-locations.json", "utf8"));
  const out = pathsOf("/dealers/").map((path) => {
    const post = itemPost(path);
    const $ = load(path);
    const entries = [];
    $(".itemView .itemBody").first().find("p").each((_, p) => { const t = clean($(p).text()); if (t) entries.push(t); });
    return { slug: path.split("/")[2], path, title: post.title, date: post.date, entries, sourceUrl: "https://eastern.in" + path };
  });
  // Markers and posts are 1:1 by title in most cases; keep both and link by normalised title.
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const decode = (s) => cheerio.load(`<i>${s}</i>`)("i").text();
  const markers = loc.map(([name, lat, lng, html]) => ({ name: decode(name).trim(), lat: Number(String(lat).trim()), lng: Number(String(lng).trim()), address: clean(decode(String(html).replace(/<br\s*\/?>/g, "\n").replace(/<\/p>/g, "\n").replace(/<[^>]+>/g, " "))).replace(/\n?Get directions$/i, "") }));
  // Markers and posts are 1:1, but names repeat (several "Patel Brothers") and US posts have empty
  // bodies whose slug carries the town. Score every pair on shared words (title + slug + body vs
  // marker name + address, name match weighted) and assign best-first so each marker is used once.
  const words = (s) => new Set((norm(s).match(/[a-z0-9]{3,}/g) || []).filter((w) => !["united", "states", "india", "the", "and", "store", "stores"].includes(w)));
  const pairs = [];
  out.forEach((d, di) => {
    // substring test: slugs often run words together ("united-statesdanburyconneticutindian-market")
    const dstr = norm(d.title + " " + d.slug + " " + d.entries.join(" ")).replace(/ /g, "");
    markers.forEach((m, mi) => {
      const mw = words(m.address);
      let s = [...mw].filter((w) => dstr.includes(w)).length / Math.max(1, mw.size);
      if (norm(m.name) === norm(d.title)) s += 1;
      pairs.push({ di, mi, s });
    });
  });
  pairs.sort((a, b) => b.s - a.s);
  const usedD = new Set();
  for (const { di, mi, s } of pairs) {
    if (usedD.has(di) || markers[mi].used || s <= 0) continue;
    const d = out[di], m = markers[mi];
    d.lat = m.lat; d.lng = m.lng; d.markerName = m.name; d.markerAddress = m.address; d.matchScore = Number(s.toFixed(2));
    m.used = true; usedD.add(di);
  }
  write("dealers", out);
  const unmatched = markers.filter((m) => !m.used);
  if (unmatched.length) throw new Error("unmatched store markers: " + unmatched.map((m) => m.name).join(", "));
}

// ---------- long-form pages (legal, innovation, CSR) as blocks
for (const path of ["/privacy/", "/csr-policy/", "/lucky-draw-terms-conditions/", "/innovationcenter/", "/scheme-of-amalgamation/", "/contact/"]) {
  const $ = load(path);
  const body = $("section.hg_section").not(".kl-bottommask").filter((_, s) => clean($(s).text()).length > 0).first();
  write("page" + path.replace(/\/$/, "").replace(/\//g, "-"), { path, title: oneLine($(".subheader-maintitle").first().text()), blocks: blocks($, body), sourceUrl: "https://eastern.in" + path });
}
