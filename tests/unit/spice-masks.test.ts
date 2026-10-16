import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { spiceMaskCss } from "@/lib/spice-masks";
import { SPICES } from "@/lib/spices";
import { productCategories } from "@/content/product-categories";

describe("spice mask stylesheet", () => {
  const committed = fs.readFileSync(new URL("../../src/styles/spice-masks.css", import.meta.url), "utf8");

  it("is in sync with src/lib/spices.ts (run `pnpm spice-masks` after editing shapes)", () => {
    expect(committed).toBe(spiceMaskCss());
  });

  it("defines a mask for every spice a category uses", () => {
    for (const name of Object.keys(SPICES)) expect(committed).toContain(`--spice-${name}:`);
    for (const c of productCategories) expect(c.spices.length, c.slug).toBeLessThanOrEqual(3);
  });
});
