// Business details, verbatim from eastern.in (contact page, header info card, footer). See
// docs/eastern-existing-site-inventory.md §1 and §2 (/contact/) for sources and the I6 conflict note.

export const siteConfig = {
  name: "Eastern",
  legalName: "Eastern Condiments",
  url: "https://eastern.in",
  /** <title> suffix pattern used by the original site: "Eastern Condiments | <Page>". */
  titleTemplate: (page?: string) => (page ? `${page} | Eastern Condiments` : "Eastern Condiments | India's No.1 Spice Exporter"),
  /** Original sitewide meta description, verbatim. */
  description: "Eastern Condiments - India's No.1 Spice Exporter",
  ownership: "Eastern is a brand of Orkla India Limited.",
  offices: [
    {
      label: "Registered Office",
      name: "Orkla India Limited (formerly known as ‘Orkla India Private Limited’ and ‘MTR Foods Private Limited’)",
      lines: ["No.1.2nd & 3rd Floor,", "100 Feet Inner Ring Road, Ejipura,", "Ashwini Layout, Vivek Nagar,", "Bangalore – 560047"],
      phone: "1800 425 5122",
      email: "feedback@orklaindia.com",
    },
    {
      label: "Regional Office",
      name: "Eastern Division",
      lines: ["No. 34/137 A ,", "NH Bypass, Edapally (P.O),", "Kochi, India 682024"],
      phone: "1800 425 5122",
      email: "feedback@eastern.in",
      /** From the original header info card ("Open in Google Maps"). */
      map: "https://goo.gl/QV4SpG",
    },
  ],
  media: { text: "For Media enquiries, please write to us at", email: "mediacell@orklaindia.com" },
  /** Header info card details (differ from the contact page; both preserved, see inventory I6). */
  kochiDesk: { phone: "0484 300 1100 Ext: 300 1234", email: "socialise@eastern.in" },
  innovationEmail: "info.mic@eastern.in",
  social: [
    { label: "Instagram", handle: "@eastern_in", href: "https://www.instagram.com/eastern_in/" },
    { label: "Facebook", handle: "eastern.in", href: "https://facebook.com/eastern.in" },
    { label: "X (Twitter)", handle: "@eastern_in", href: "https://twitter.com/eastern_in" },
    { label: "LinkedIn", handle: "Orkla India", href: "https://www.linkedin.com/company/orkla-india/" },
  ],
  /** Online retailers from the store locator (same short-link targets as the original). */
  retailers: [
    { label: "Amazon", href: "https://l.eastern.in/ShopatAmazon" },
    { label: "urDoorStep", href: "https://l.eastern.in/2HIiWx2" },
    { label: "bigbasket", href: "https://l.eastern.in/2LKd6xK" },
  ],
  orkla: {
    about: "https://www.orklaindia.com/about-us/",
    csr: "https://www.orklaindia.com/sustainability/csr/",
  },
  /**
   * Analytics integration point. The original site loaded GTM-MC3T83F, GA UA-54659473-1 and ad pixels
   * unconditionally. They are off until Eastern confirms a consent policy; set `gtmId` to enable.
   */
  analytics: { gtmId: null as string | null, originalGtmId: "GTM-MC3T83F" },
} as const;

export type SiteConfig = typeof siteConfig;
