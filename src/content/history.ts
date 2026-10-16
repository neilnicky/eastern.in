import postData from "./data/timeline-posts.json";
import type { Block } from "./types";

/**
 * Milestones transcribed verbatim from the /timeline/ infographic
 * (wp-content/uploads/2025/02/history_timeline_eastern.png). Wording, capitalisation and order as printed.
 * `image` is the matching archive photo where one exists on eastern.in; no image is invented.
 */
export const milestones: { year: string; lines: string[]; image?: string }[] = [
  { year: "1983", lines: ["Establishes full fledged spice factory and coffee powder manufacturing facility in Adimali"], image: "wp-content/uploads/2016/09/Eastern-Trading-Company.jpg" },
  { year: "1985", lines: ["Launches range of Blended Spices"] },
  { year: "1989", lines: ["Get incorporated as Eastern Condiments Pvt Ltd"] },
  { year: "1994", lines: ["Eastern goes International"] },
  { year: "2004", lines: ["Launches range of rice products"] },
  { year: "2010", lines: ["Kothamangalam factory inaugurated"] },
  { year: "2016", lines: ["Launches range of ready to cook products"] },
  { year: "2020", lines: ["Merges with MTR Foods, a wholly-owned subsidiary of Orkla", "Wins Spices Board award for India’s largest spice exporter for the 23rd consecutive time"] },
  { year: "2022", lines: ["Launches Vermicelli & Macaroni"] },
  { year: "2023", lines: ["Launches Hyperlocal Innovations for Kerala Chicken Porichathu & Assal Kayam Sambar", "Inauguration of the M.E. Meeran Innovation Center"] },
  { year: "2024", lines: ["Unveiling the New Logo"] },
];

export const historyIntro = { title: "Our Company's Timeline", subtitle: "From Past To Future", infographic: "wp-content/uploads/2025/02/history_timeline_eastern.png" };

export interface HistoryStory {
  slug: string;
  path: string;
  title: string;
  date: string | null;
  blocks: Block[];
  sourceUrl: string;
}

/**
 * The 23 legacy `timeline` posts. Their order on the sitemap is chronological; their post dates are
 * CMS publish dates, not milestone years, so no year is shown for them.
 */
const sitemapOrder = [
  "the-beginning-of-the-road", "established-eastern-coffee-and-curry-powder", "introduction-of-blended-spices", "becoming-the-largest-distributors",
  "eastern-condiments-pvt-ltd-incorporated", "quality-testing-labs", "expansion-of-trade", "eastern-retreads", "sunidra-mattress", "takes-over-mohanlal-taste-buds",
  "cold-storage-unit-at-teni", "wind-energy", "new-factory-in-adimali", "eastern-aqua-mineral", "tie-up-with-mccormick", "eastern-newton-school", "eastern-rak-factory",
  "adimali-lab", "rice-products", "head-quarters-in-cochin", "top-two-star-exporters-southern-region-gold-award", "successfully-cleared-the-tpm-certification-assessment",
  "largest-spice-exporter-award-for-the-18th-time-in-a-row",
];
export const historyStories: HistoryStory[] = (postData as HistoryStory[])
  .map((p) => ({ ...p, blocks: p.blocks.filter((b) => !(b.type === "p" && (b.text === p.title || b.text === p.date))) }))
  .sort((a, b) => sitemapOrder.indexOf(a.slug) - sitemapOrder.indexOf(b.slug));
