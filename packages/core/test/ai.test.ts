import { describe, expect, it } from "vitest";
import { copilotAnswer, explainRating, parseRatingExplanation } from "../src";

const rating = {
  assetId: "mantle:usdy",
  symbol: "USDY",
  name: "Ondo USDY",
  assetClass: "US_TREASURY_RWA" as const,
  grade: "A" as const,
  riskScore: 28,
  dimensionScores: { assetRisk: 20, issuerRisk: 30, liquidityRisk: 25, pegRisk: 22, oracleRisk: 18, contractRisk: 31, concentrationRisk: 35 },
  nominalApy: 4.8,
  riskAdjustedApy: 3.9,
  tvlUsd: 1000000,
  methodologyVersion: 100,
  ratingHash: `0x${"a".repeat(64)}`,
  updatedAt: "1970-01-01T00:00:00.000Z",
};

describe("AI reasoning service", () => {
  it("rejects malformed model output", () => expect(() => parseRatingExplanation({ rationale: "ok" })).toThrow());
  it("offline fallback works with no key", async () => {
    const oldElfa = process.env.ELFA_API_KEY;
    const oldOpenai = process.env.OPENAI_API_KEY;
    delete process.env.ELFA_API_KEY;
    delete process.env.OPENAI_API_KEY;
    const out = await explainRating(rating);
    expect(out.result.rationale).toContain("USDY");
    process.env.ELFA_API_KEY = oldElfa;
    process.env.OPENAI_API_KEY = oldOpenai;
  });
  it("cache hit returns identical result", async () => {
    delete process.env.ELFA_API_KEY;
    delete process.env.OPENAI_API_KEY;
    const a = await copilotAnswer("What changed?", { rating });
    const b = await copilotAnswer("What changed?", { rating });
    expect(a.result).toEqual(b.result);
    expect(b.provenance.cached).toBe(true);
  });
});
