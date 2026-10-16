// Page copy for Eastern's editorial pages. Every string is verbatim from eastern.in unless marked
// "UI label" (navigation/control wording added by the redesign, not a business claim).
import privacyData from "./data/page-privacy.json";
import csrData from "./data/page-csr-policy.json";
import luckyData from "./data/page-lucky-draw-terms-conditions.json";
import type { Block } from "./types";

/** Homepage. Source: https://eastern.in/ (visible content only; hidden blocks are listed in the inventory §6). */
export const home = {
  badgeText: "Perfect taste partner · Since 1983 · ", // from the homepage badge image "Perfect taste partner since 1983"
  scrollHint: "Scroll to discover", // UI label
  campaigns: {
    title: "Campaigns", // UI label (the original hero slider had no heading)
    // `product`: the catalogue product the banner advertises (null when it is not in the catalogue).
    slides: [
      { image: "wp-content/uploads/2025/05/Web-banner-1.jpg", alt: "Add a perfect, Creamy Touch to every dish — Eastern Coconut Milk Powder", product: null },
      { image: "wp-content/uploads/2025/05/web-banner-2.jpg", alt: "Your Perfect Sambar Starts with Eastern — Thani Nadan Sambar Powder and Sambar Powder", product: "sambar-powder" },
      { image: "wp-content/uploads/2025/04/Web-banner-3.jpg", alt: "The Secret to irresistible Chicken Curry — Eastern Chicken Masala", product: "chicken-masala" },
      { image: "wp-content/uploads/2025/03/Web-banner-4.jpg", alt: "From pack to Palada in 5 minutes — Eastern 5 Minute Madhuram Sadya Palada Payasam Mix", product: "palada-payasam" },
      { image: "wp-content/uploads/2025/02/Web-banner-5.jpg", alt: "Bring Home the Essence of Authentic Spices — Eastern Kashmiri Chilli, Chilli, Coriander and Turmeric Powder", product: "kashmiri-chilli" },
    ] as { image: string; alt: string; product: string | null }[],
    note: "Suggested servings. Images shown are for illustration purpose only", // printed on every banner
  },
  recipes: { title: "Recipes", cta: "View All" },
  /** "40 +" / "Years of Trust" and "30+" / "Awards" are text; the other two are badge images on the original. */
  stats: [
    { value: "40 +", label: "Years of Trust" },
    { value: "Since 1983", label: "Perfect taste partner" },
    { value: "No added flavours" },
    { value: "30+", label: "Awards" },
  ] as { value: string; label?: string }[],
  worldwide: {
    title: "We're worldwide",
    text: "Spreading the aroma of our spices across the world, Eastern has a presence over 22+ countries and counting!",
    cta: "Find a store", // UI label; the original linked the world map to /store-locator/
  },
  campaignReel: { title: "Recent Campaigns", href: "https://www.instagram.com/reel/DE4vPVLoGmE/?hl=en", image: "wp-content/uploads/2025/02/instapng.png", cta: "Watch on Instagram" },
  newProducts: { title: "New Products" },
  cookbook: {
    title: "Life is the combination of Magic and Food",
    text: "We try to Create wonders with spices that makes new Masterpiece Recipes bring magic in all its Flavours. You have to get the right ingredient and have to get the right mixture for highest quality recipes.",
    cta: "See Our Cook Book",
    image: "wp-content/uploads/2023/01/cook-img.png",
  },
};

/** /we-at-eastern/ — transcribed from wp-content/uploads/2023/01/Vision-Mission-Values.jpg. */
export const about = {
  title: "We at Eastern",
  heroImage: "wp-content/uploads/2025/05/web-banner-2.jpg",
  heroAlt: "Your Perfect Sambar Starts with Eastern — Eastern Thani Nadan Sambar Powder and Sambar Powder beside a brass uruli of sambar",
  vision: { label: "Vision", text: "Your Friend in everyday life" },
  mission: { label: "Mission", text: "Improving everyday life with sustainable and enjoyable local brands" },
  values: { label: "Values", text: "Brave, Trustworthy, Inspiring", items: ["Brave", "Trustworthy", "Inspiring"] },
  programme: "Unify to Transform — Building our future", // printed on the same image
  sourceImage: "wp-content/uploads/2023/01/Vision-Mission-Values.jpg",
  orkla: {
    // Orkla India "About us" (orklaindia.com/about-us/), read 2026-10-15.
    lines: ["1983 — Inception of Eastern", "2021 — MTR acquired a 67.8% stake in Eastern Condiments", "2023 — Orkla completes MTR-Eastern merger and reorganizes Indian operations under Orkla India"],
    href: "https://www.orklaindia.com/about-us/",
  },
};

/** /innovationcenter/ — verbatim. Capability labels are printed on the original icons 1.png–3.png. */
export const innovation = {
  title: "Innovation Center",
  heroImage: "wp-content/uploads/2017/01/adimali-factory-eastern.jpg",
  heroAlt: "Eastern's factory at Adimali, Kerala",
  banner: "wp-content/uploads/2017/09/banner-mic-easter.png",
  aboutTitle: "About us",
  paragraphs: [
    "M.E.Meeran Innovation Center is a Flagship unit of Eastern Condiments Pvt. Ltd which was formed in the remembrance of Eastern Group Founder Chairman M.E.Meeran. Keeping in mind the changing consumer outlook and the amazing advancement in technology, we have set out to establish an innovation center for conducting testing and research of food products.",
    "M.E.Meeran Innovation Center is an independent and indispensable laboratory for testing & development of food products. It is a NABL accredited laboratory which is also open for external customers. The foundation of this establishment lies in the core values such as commitment to high quality & remarkable relationship with customers. Our objective is to support food industry with analytical test results and R&D solutions that are globally accepted. We strive to provide timely, accurate, reliable, reproducible and traceable test results meeting customer requirements by adopting standard test methods and using sophisticated testing equipments.",
  ],
  awardsTitle: "Awards & Recognition",
  awards: ["ISO/IEC 17025:2017 NABL Accredited.", "ISO 14001:2015 (Environment Management System) UKAS Certified.", "M.E MEERAN INNOVATION CENTER has published 3 Research Papers."],
  capabilities: [
    { label: "Product Development", icon: "wp-content/uploads/2017/10/1.png", text: "Develops food products based on the present market trends. Incorporates the latest technologies and novel ingredients to produce products that satisfy the consumers needs." },
    { label: "Research", icon: "wp-content/uploads/2017/10/2.png", text: "It conducts studies on research based projects." },
    { label: "Food Testing", icon: "wp-content/uploads/2017/10/3.png", text: "It is the most vital part of the innovation center. It carries out the chemical analysis of food products as well as the estimation of sensory parameters and shelf life of food products. It conducts studies on research based projects." },
  ],
  contact: "For more information contact us at",
  papersTitle: "Published Research Papers",
  papers: [
    { label: "Research Paper #1", href: "https://l.eastern.in/2z0VxXZ" },
    { label: "Research Paper #2", href: "https://l.eastern.in/2gvEcLk" },
  ],
};

/** /contact/ — details live in siteConfig; this is the page framing. */
export const contact = {
  title: "Contact",
  lead: "Eastern", // the original page's only heading above the offices
};

/** /scheme-of-amalgamation/ — labels verbatim, files served from their original paths under /wp-content/uploads/. */
export const amalgamation = {
  title: "Scheme of Amalgamation",
  groups: [
    { label: "NCLT Convened Meeting Notice Along with Explanatory statement", files: [
      { label: "Unsecured Creditors", href: "/wp-content/uploads/2022/07/1.a.-Notice-and-Explantory-Statement-Unsecured-Creditors.pdf", bytes: 778392 },
      { label: "secured Creditors", href: "/wp-content/uploads/2022/07/1.b.-Notice-and-Explantory-Statement-Secured-Creditors.pdf", bytes: 694766 },
    ] },
    { label: "Scheme of Amalgamation", files: [{ label: "Scheme of Amalgamation", href: "/wp-content/uploads/2022/07/2.-Scheme-of-amalagamation.pdf", bytes: 1716021 }] },
    { label: "NCLT Order", files: [{ label: "NCLT Order", href: "/wp-content/uploads/2022/07/3.-NCLT-Order-Creditors-meeting.pdf", bytes: 7942063 }] },
    { label: "Valuation Report", files: [{ label: "Valuation Report", href: "/wp-content/uploads/2022/07/4.-Valuation-Certificate.pdf", bytes: 1026985 }] },
    { label: "Report of the Board", files: [{ label: "Report of the Board", href: "/wp-content/uploads/2022/07/5.-ECPL-Board-report.pdf", bytes: 251593 }] },
    { label: "Supplementary accounting Statement", files: [{ label: "Supplementary accounting Statement", href: "/wp-content/uploads/2022/07/6.-Supplementary-Accounting-statement-ECPL.pdf", bytes: 689975 }] },
    { label: "Proxy form", files: [
      { label: "Unsecured Creditors", href: "/wp-content/uploads/2022/07/7.a.-Proxy-Form-Unsecured-Creditors-new.pdf", bytes: 334059 },
      { label: "secured Creditors", href: "/wp-content/uploads/2022/07/7.b.-Proxy-Form-secured-Creditors.pdf", bytes: 259587 },
    ] },
    { label: "Attendance Slip", files: [
      { label: "Unsecured Creditors", href: "/wp-content/uploads/2022/07/8.a.-Attendance-Slip-Unsecured-Creditors.pdf", bytes: 243609 },
      { label: "secured Creditors", href: "/wp-content/uploads/2022/07/8.b.-Attendance-Slip-secured-Creditors.pdf", bytes: 242998 },
    ] },
    { label: "General Instructions for E-Meeting", files: [
      { label: "Unsecured Creditors", href: "/wp-content/uploads/2022/07/9.a.-Ecpl-Instruction-Kit-Unsecured.pdf", bytes: 334008 },
      { label: "secured Creditors", href: "/wp-content/uploads/2022/07/9.b.-Ecpl-Instruction-Kit-secured.pdf", bytes: 333147 },
    ] },
    { label: "Newspaper Advertisement – NCLT Convened Meeting", files: [
      { label: "ECPL Financial Express", href: "/wp-content/uploads/2022/07/ECPL-Financial-Express-scan.pdf", bytes: 189325 },
      { label: "MTR Udayavani", href: "/wp-content/uploads/2022/07/MTR-Udayavani-Scan.pdf", bytes: 177895 },
    ] },
    { label: "Final Hearing Notice", files: [{ label: "Final Hearing Notice", href: "/wp-content/uploads/2022/12/final-hearing-notice.zip", bytes: 5806995 }] },
    { label: "Merger Order", files: [{ label: "Merger Order", href: "/wp-content/uploads/2023/09/MergerOrder.pdf", bytes: 949309 }] },
  ],
};

export const downloadFiles = amalgamation.groups.flatMap((g) => g.files.map((f) => f.href));

export interface LegalPage {
  path: string;
  title: string;
  blocks: Block[];
  sourceUrl: string;
}
export const legalPages: LegalPage[] = [
  { ...(privacyData as LegalPage), title: "Privacy Policy" },
  { ...(csrData as LegalPage), title: "Corporate Social Responsibility" },
  { ...(luckyData as LegalPage), title: "Lucky Draw- Terms & Conditions" },
];
