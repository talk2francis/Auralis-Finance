import { describe, expect, it } from "vitest";
import { WalletScreenSchema } from "@auralis/types";
import { getAllAssets, oracleFreshness, screenWallet, jurisdictionRules } from "../src";

const addr = "0x1111111111111111111111111111111111111111";

describe("adapters", () => {
  it("returns normalized asset states", async () => {
    const assets = await getAllAssets();
    expect(assets).toHaveLength(8);
    for (const asset of assets) {
      expect(asset.assetId).toMatch(/^mantle:/);
      expect(asset.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(asset.price).toBeGreaterThan(0);
      expect(asset.rawRiskSignals.issuerTag).toBeTruthy();
      expect(oracleFreshness(asset).freshnessScore).toBeGreaterThanOrEqual(0);
    }
  });

  it("screens wallets with schema-valid output", async () => {
    expect(WalletScreenSchema.parse(await screenWallet(addr)).wallet).toBe(addr);
    expect((await screenWallet("0x000000000000000000000000000000000000dEaD")).sanctionsHit).toBe(true);
  });

  it("exports jurisdiction constraints", () => {
    expect(jurisdictionRules.US_TREASURY_RWA.excludedJurisdictions).toContain("US");
  });
});
