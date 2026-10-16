import eventData from "./data/events.json";
import contestData from "./data/contests.json";
import blogData from "./data/blog-posts.json";
import videoData from "./data/videos.json";
import type { Block } from "./types";

export interface EventPost {
  slug: string;
  path: string;
  title: string;
  eventDate: string | null;
  eventTime: string | null;
  location: string | null;
  link: string | null;
  blocks: Block[];
  sourceUrl: string;
}
export interface ContestPost {
  slug: string;
  path: string;
  title: string;
  status: string | null;
  blocks: Block[];
  terms: string[];
  images: string[];
  sourceUrl: string;
}
export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  date: string | null;
  blocks: Block[];
  sourceUrl: string;
}
export interface Video {
  slug: string;
  path: string;
  title: string;
  date: string | null;
  youtubeId?: string;
  facebookVideo?: string;
  thumb: string | null;
  blocks: Block[];
  listingOrder: number;
  sourceUrl: string;
}

const parseDate = (s: string | null) => (s ? Date.parse(s.replace(/^\w+day,\s*/, "")) || 0 : 0);

export const events: EventPost[] = (eventData as EventPost[])
  .map((e) => ({ ...e, location: e.location && e.location !== "." ? e.location : null }))
  .sort((a, b) => parseDate(b.eventDate) - parseDate(a.eventDate));

/** Contests in the order of the original /contests/ index (newest first). */
const contestOrder = [
  "gold-dhamaka", "eastern-40-year-celebration-offer", "grihalakshmi", "guess-the-new-product-contest", "stop-the-gif", "eastern-malayala-pachakam-ramzan-food-fest",
  "kiss-the-planet-contest", "oru-kalakkan-selfie-contest-ഒരുകലക്കൻസെൽഫി", "guess-the-new-product", "guessthedish-contest", "guess-our-product-contest-sweepstakes",
  "celebrateunsungheroes-onam-contest", "gujarati-range-guess-new-product-3", "gujarati-range-guess-new-product-2", "guess-new-product-gujarati-1", "ormayile-onam",
  "punjabi-range-guess-new-product-6", "stay-natural", "punjabi-range-guess-new-product-5", "punjabi-range-guess-new-product-4", "punjabi-range-guess-new-product-3",
  "punjabi-range-guess-new-product-2", "punjabi-range-guess-new-product-1", "spice-quest-question-4", "spicequest-question-3", "taste-love-contest", "spice-quest-question-2",
  "spice-quest-question-1", "hot-with-summer", "summer-drink-contest", "holi-recipe-contest", "stop-gif-contest-feb-2017", "can-guess-idiom-contest", "republic-with-eastern",
  "spot-the-odd-one-out-contest", "my-lunch-box-contest", "ponnona-selfie", "ilovedad-fathers-day", "know-your-spice", "momnme",
];
export const contests: ContestPost[] = (contestData as ContestPost[]).sort((a, b) => {
  const ia = contestOrder.indexOf(a.slug), ib = contestOrder.indexOf(b.slug);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
});

export const blogPosts: BlogPost[] = (blogData as BlogPost[])
  .map((p) => ({ ...p, blocks: p.blocks.filter((b) => !(b.type === "p" && b.text === p.title)) }))
  .sort((a, b) => parseDate(b.date) - parseDate(a.date));

export const videos: Video[] = (videoData as Video[]).sort((a, b) => a.listingOrder - b.listingOrder);
export const videoUrl = (v: Video) => v.path;
