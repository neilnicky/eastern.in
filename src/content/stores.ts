import dealerData from "./data/dealers.json";

/**
 * Store locator. Source: the 108 `dealers` posts plus the 108 map markers embedded in the original
 * /store-locator/ page (name, lat, lng, address). Address lines are verbatim; only "Get directions"
 * (a map-widget label) is dropped. Region is derived from the address, with explicit overrides below for
 * Kerala towns whose address does not name the state.
 */
export type StoreKind = "store" | "network" | "office";
export interface Store {
  slug: string;
  path: string;
  name: string;
  kind: StoreKind;
  country: "India" | "United States";
  region: string;
  lines: string[];
  /** Full distributor list for district / state "range" posts (verbatim entries). */
  entries: string[];
  lat: number;
  lng: number;
  sourceUrl: string;
}

interface Dealer {
  slug: string;
  path: string;
  title: string;
  date: string | null;
  entries: string[];
  lat: number;
  lng: number;
  markerName: string;
  markerAddress: string;
  sourceUrl: string;
}

const US_STATES: Record<string, string> = {
  IL: "Illinois", NJ: "New Jersey", CA: "California", CT: "Connecticut", GA: "Georgia", MA: "Massachusetts", WI: "Wisconsin", TX: "Texas", PA: "Pennsylvania", FL: "Florida", NY: "New York",
};
const keralaTowns = /Kerala|Mannuthy|Kothamangalam|Valayamkulam|Choorakkattukara|Kollam|Calicut|Kannur|Kasaragod|Cherkala|Karuvatta|Pathanamthitta|Punalur|Mannar|Pandhalam|Perumbavoor|Kalady/i;
const regionOverride: Record<string, string> = {
  puducherry: "Puducherry",
  "eastern-condiments-bengaluru": "Karnataka",
  "eastern-condiments-kolkata": "West Bengal",
  "lucknow-office": "Uttar Pradesh",
  "pune-office": "Maharashtra",
  "rasayani-office": "Maharashtra",
};

function regionOf(d: Dealer): { country: Store["country"]; region: string } {
  const text = `${d.markerAddress}\n${d.entries.join("\n")}\n${d.slug}`;
  if (/United States|USA|\b(IL|NJ|CA|CT|GA|MA|WI|TX|PA|FL|NY)\s?\d{5}|Illinois|New Jersey|united-states|america-/i.test(text)) {
    const code = Object.keys(US_STATES).find((k) => new RegExp(`\\b${k}\\s?\\d{5}|\\b${k}\\b`).test(d.markerAddress)) ?? Object.entries(US_STATES).find(([, n]) => new RegExp(n.replace(" ", "\\s?"), "i").test(text))?.[0];
    // the source spells Illinois "Illinos" / "Illiniois" in places
    const fallback = /Illin(o|io)i?s/i.test(text) ? "Illinois" : null;
    return { country: "United States", region: code ? US_STATES[code]! : fallback ?? "United States" };
  }
  if (regionOverride[d.slug]) return { country: "India", region: regionOverride[d.slug]! };
  if (/Uttar Pradesh|uttar/i.test(text)) return { country: "India", region: "Uttar Pradesh" };
  if (keralaTowns.test(text)) return { country: "India", region: "Kerala" };
  return { country: "India", region: "India" };
}

const cleanLines = (s: string) => s.split("\n").map((l) => l.trim()).filter((l) => l && !/^get directions$/i.test(l));

export const stores: Store[] = (dealerData as Dealer[]).map((d) => {
  const lines = cleanLines(d.markerAddress);
  const phoneCount = (d.entries.join(" ").match(/\b\d{10}\b/g) ?? []).length;
  const kind: StoreKind = /^eastern-condiments-|-office$/.test(d.slug) ? "office" : phoneCount > 2 || d.entries.length > 3 ? "network" : "store";
  const name = (d.title || d.markerName || lines[0] || d.slug).replace(/\s+–\s+/g, " – ");
  return {
    slug: d.slug,
    path: d.path,
    name,
    kind,
    ...regionOf(d),
    lines: kind === "network" ? [] : lines.filter((l, i) => !(i === 0 && l === name)),
    entries: kind === "network" ? d.entries.flatMap(cleanLines) : [],
    lat: d.lat,
    lng: d.lng,
    sourceUrl: d.sourceUrl,
  };
});

export const mapsLink = (s: Pick<Store, "lat" | "lng" | "name">) => `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`;

/** Phone numbers in a line → tel: links (Indian 10-digit, landline 10-digit and +1 US numbers). */
export const phonesIn = (line: string) => [...line.matchAll(/(\+1[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}|\(\d{3}\)\s?\d{3}-\d{4}|\b\d{10}\b|\b0\d{10}\b)/g)].map((m) => m[0]);

export const storeRegions = () => {
  const m = new Map<string, Store[]>();
  for (const s of stores) {
    const k = `${s.country} · ${s.region}`;
    m.set(k, [...(m.get(k) ?? []), s]);
  }
  return [...m.entries()].sort(([a], [b]) => (a.startsWith("India") === b.startsWith("India") ? a.localeCompare(b) : a.startsWith("India") ? -1 : 1));
};
