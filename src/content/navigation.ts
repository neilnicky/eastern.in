import { productCategories, categoryUrl } from "./product-categories";
import { siteConfig } from "./site-config";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Full-screen menu, primary staircase (reference pattern: four to five huge links). */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/" },
  { label: "Recipes", href: "/recipes/" },
  { label: "About", href: "/we-at-eastern/" },
  { label: "Contact", href: "/contact/" },
];

/** Menu secondary groups. Every destination from the original header, footer and side rail is here or in the footer. */
export const secondaryNav: { label: string; links: NavLink[] }[] = [
  {
    label: "Company",
    links: [
      { label: "We at Eastern", href: "/we-at-eastern/" },
      { label: "History", href: "/timeline/" },
      { label: "Innovation Center", href: "/innovationcenter/" },
      { label: "Events", href: "/events/" },
      { label: "Contests", href: "/contests/" },
      { label: "Orkla India", href: siteConfig.orkla.about, external: true },
    ],
  },
  {
    label: "Explore",
    links: [
      { label: "Cook Book", href: "/cook_book/" },
      { label: "TVCs", href: "/videos/" },
      { label: "Store Locator", href: "/store-locator/" },
      { label: "Blogs", href: "/blogs/" },
      { label: "Offers", href: "/lucky-draw-terms-conditions/" },
    ],
  },
];

export const categoryNav: NavLink[] = productCategories.map((c) => ({ label: c.title, href: categoryUrl(c.slug) }));

export const footerColumns: { label: string; links: NavLink[] }[] = [
  { label: "Products", links: categoryNav },
  {
    label: "About Eastern",
    links: [
      { label: "We at Eastern", href: "/we-at-eastern/" },
      { label: "History", href: "/timeline/" },
      { label: "Innovation Center", href: "/innovationcenter/" },
      { label: "Events", href: "/events/" },
      { label: "Contests", href: "/contests/" },
      { label: "TVCs", href: "/videos/" },
      { label: "Blogs", href: "/blogs/" },
      { label: "Corporate Social Responsibility", href: "/csr-policy/" },
      { label: "Orkla India CSR", href: siteConfig.orkla.csr, external: true },
    ],
  },
  {
    label: "Cook Book",
    links: [
      { label: "Recipes", href: "/recipes/" },
      { label: "Vegetarian", href: "/vegetarian/" },
      { label: "Non-Vegetarian", href: "/non-vegetarian/" },
      { label: "Sweets", href: "/sweets/" },
    ],
  },
  {
    label: "Help",
    links: [
      { label: "Contact", href: "/contact/" },
      { label: "Store Locator", href: "/store-locator/" },
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Offer Terms & Conditions", href: "/lucky-draw-terms-conditions/" },
      { label: "Scheme of Amalgamation", href: "/scheme-of-amalgamation/" },
    ],
  },
];
