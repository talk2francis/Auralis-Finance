import { describe, expect, it } from "vitest";
import { rateAsset, verifyRatingHash, stableJson } from "../src";

const now = 1_779_791_534;
const base = {
  name: "Ondo USDY",
  price: 1,
  nominalApy: 4.8,
  tvlUsd: 42_800_000,
  rawRiskSignals: {
    attestationFreshnessTs: now - 3600,
    oracleFreshnessTs: now - 600,
    issuerTag: "Ondo Finance",
    liquidityDepthUsd: 6_200_000,
    pegDeviationBps: 6,
    contractAgeDays: 640,
    concentrationTopHolderPct: 16,
    proofOfReserve: true,
  },
};

describe("rating engine", () => {
  it("is deterministic and hash-verifiable", () => {
    const input = { ...base, assetId: "mantle:usdy", symbol: "USDY", assetClass: "US_TREASURY_RWA" as const };
    const a = rateAsset(input, now);
    const b = rateAsset(input, now);
    expect(stableJson(a)).toEqual(stableJson(b));
    expect(a.ratingHash).toEqual(b.ratingHash);
    const { ratingHash, ...json } = a;
    expect(verifyRatingHash(json, ratingHash)).toBe(true);
  });

  it("scores worked examples into expected grade bands", () => {
    expect(rateAsset({ ...base, assetId: "mantle:usdy", symbol: "USDY", assetClass: "US_TREASURY_RWA" }, now).grade).toMatch(/AA|A/);
    expect(rateAsset({ ...base, assetId: "mantle:meth", symbol: "mETH", name: "mETH", assetClass: "LST", nominalApy: 3.1, tvlUsd: 712_000_000, rawRiskSignals: { ...base.rawRiskSignals, issuerTag: "Mantle LSP", liquidityDepthUsd: 39_000_000, pegDeviationBps: 22, concentrationTopHolderPct: 11 } }, now).grade).toMatch(/AA|A/);
    expect(rateAsset({ ...base, assetId: "mantle:usde", symbol: "USDe", name: "USDe", assetClass: "SYNTH_DOLLAR", nominalApy: 8.4, tvlUsd: 58_000_000, rawRiskSignals: { ...base.rawRiskSignals, issuerTag: "Ethena", liquidityDepthUsd: 8_900_000, pegDeviationBps: 10, proofOfReserve: false, concentrationTopHolderPct: 22 } }, now).grade).toMatch(/A|BBB|BB/);
  });
});
