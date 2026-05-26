import { describe, expect, it } from "vitest";
import {
  AIProvenanceSchema,
  AssetRatingSchema,
  AttestationSchema,
  ComplianceReportSchema,
  DecisionSchema,
  EligibilityResultSchema,
  PolicySchema,
  PortfolioSchema,
  RebalanceProposalSchema,
  WalletScreenSchema,
} from "../src";

const now = "2026-05-26T09:00:00.000Z";
const hash = `0x${"a".repeat(64)}`;
const wallet = "0x1111111111111111111111111111111111111111";

const position = {
  assetId: "mantle:usdy",
  symbol: "USDY",
  name: "Ondo USDY",
  balance: 100,
  valueUsd: 100,
  weightBps: 5000,
  apy: 4.5,
  grade: "A",
  riskScore: 28,
};

const rating = {
  assetId: "mantle:usdy",
  symbol: "USDY",
  name: "Ondo USDY",
  assetClass: "US_TREASURY_RWA",
  grade: "A",
  riskScore: 28,
  dimensionScores: {
    assetRisk: 20,
    issuerRisk: 30,
    liquidityRisk: 25,
    pegRisk: 22,
    oracleRisk: 18,
    contractRisk: 31,
    concentrationRisk: 35,
  },
  nominalApy: 4.8,
  riskAdjustedApy: 3.9,
  tvlUsd: 1000000,
  methodologyVersion: 100,
  rationale: "Treasury-backed yield with transparent controls.",
  counterfactual: "Would downgrade if liquidity or proof freshness weakens.",
  ratingHash: hash,
  updatedAt: now,
};

const walletScreen = {
  wallet,
  jurisdiction: "NG",
  sanctionsHit: false,
  riskExposureScore: 12,
  lastScreenedAt: now,
};

const eligibility = {
  wallet,
  assetClass: "US_TREASURY_RWA",
  verdict: "ELIGIBLE",
  reasons: ["No sanctions hit", "Risk exposure below threshold"],
  confidence: 92,
  validUntil: "2026-06-26T09:00:00.000Z",
};

describe("shared schemas", () => {
  it("parses valid fixtures", () => {
    expect(AssetRatingSchema.parse(rating).symbol).to.equal("USDY");
    expect(WalletScreenSchema.parse(walletScreen).wallet).to.equal(wallet);
    expect(EligibilityResultSchema.parse(eligibility).verdict).to.equal("ELIGIBLE");
    expect(
      ComplianceReportSchema.parse({
        reportId: "report-1",
        walletScreen,
        results: [eligibility],
        reportHash: hash,
        methodologyVersion: 100,
        generatedAt: now,
        disclaimer: "Compliance tooling only, not legal advice.",
      }).results,
    ).to.have.length(1);
    expect(
      AttestationSchema.parse({
        id: "1",
        wallet,
        assetClass: "US_TREASURY_RWA",
        verdict: "ELIGIBLE",
        checkHash: hash,
        jurisdictionTag: "NG",
        metadataUri: "ipfs://report",
        txHash: hash,
        issuedAt: now,
        validUntil: "2026-06-26T09:00:00.000Z",
        revoked: false,
      }).revoked,
    ).to.equal(false);
    expect(PortfolioSchema.parse({ wallet, totalValueUsd: 200, blendedApy: 4, blendedRiskScore: 30, positions: [position], updatedAt: now }).positions).to.have.length(1);
    expect(RebalanceProposalSchema.parse({ proposalId: "p1", wallet, portfolioHash: hash, fromPositions: [position], toPositions: [position], expectedApyDelta: 0.5, expectedRiskDelta: -2, estimatedSlippageBps: 20, aiConfidence: 87, rationale: "Improve risk-adjusted yield.", createdAt: now }).aiConfidence).to.equal(87);
    expect(DecisionSchema.parse({ decisionId: "d1", wallet, actionType: "rebalance", decisionHash: hash, riskScore: 35, policyResult: "PASS", txHash: hash, metadataUri: "ipfs://decision", createdAt: now }).policyResult).to.equal("PASS");
    expect(PolicySchema.parse({ wallet, maxPerAssetBps: 2500, maxPerProtocolBps: 3000, maxSlippageBps: 50, minConfidence: 70, minLiquidityScore: 60, cooldownSeconds: 3600, humanApprovalThresholdUsd: 10000, paused: false, updatedAt: now }).paused).to.equal(false);
    expect(AIProvenanceSchema.parse({ modelId: "elfa/rwa", methodologyVersion: 100, inputVector: { score: 28 }, promptHash: hash, responseHash: hash, cached: false, generatedAt: now }).cached).to.equal(false);
  });

  it("rejects invalid fixtures", () => {
    expect(() => AssetRatingSchema.parse({ ...rating, grade: "D" })).to.throw();
    expect(() => WalletScreenSchema.parse({ ...walletScreen, wallet: "not-wallet" })).to.throw();
    expect(() => EligibilityResultSchema.parse({ ...eligibility, confidence: 101 })).to.throw();
    expect(() => PolicySchema.parse({ wallet, maxPerAssetBps: 10001 })).to.throw();
    expect(() => AIProvenanceSchema.parse({ modelId: "x", methodologyVersion: 0, inputVector: {}, promptHash: "bad", responseHash: hash, cached: false, generatedAt: now })).to.throw();
  });
});
