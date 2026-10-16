// Writes src/styles/spice-masks.css (see src/lib/spice-masks.ts). Run: pnpm spice-masks
import fs from "node:fs";
import { spiceMaskCss } from "../src/lib/spice-masks";

const out = new URL("../src/styles/spice-masks.css", import.meta.url);
fs.writeFileSync(out, spiceMaskCss());
console.log("spice masks written:", out.pathname);
