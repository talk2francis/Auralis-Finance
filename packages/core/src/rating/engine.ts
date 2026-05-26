import { keccak256, stringToHex } from "viem";
import type { AssetRating, Grade, Position } from "@auralis/types";
import { assetRisk, concentrationRisk, contractRisk, issuerRisk, liquidityRisk, oracleRisk, pegRisk, type RatingSignals } from "./dimensions";
import { METHODOLOGY } from "./methodology";

export type RateableAsset = RatingSignals & {
  assetId: string;
  symbol: string;
  name: string;
  assetClass: AssetRating["assetClass"];
  price: number;
  nominalApy: number;
  tvlUsd: number;
};

export type DeterministicAssetRating = Omit<AssetRating, "rationale" | "counterfactual">;

export function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${stableJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

/** Lower score is safer. Bands intentionally mirror rating-agency intuition. */
export function gradeBand(riskScore: number): Grade {
  if (riskScore <= 15) return "AAA";
  if (riskScore <= 25) return "AA";
  if (riskScore <= 35) return "A";
  if (riskScore <= 50) return "BBB";
  if (riskScore <= 65) return "BB";
  if (riskScore <= 80) return "B";
  return "C";
}

/** Risk-adjusted APY applies a convex penalty; risky yield is discounted harder. */
export function riskAdjustedApy(nominalApy: number, riskScore: number) {
  const penalty = Math.pow(riskScore / 100, 1.35);
  return Number((nominalApy * (1 - penalty)).toFixed(4));
}

export function rateAsset(asset: RateableAsset, now = Math.floor(Date.now() / 1000)): DeterministicAssetRating {
  const dimensionScores = {
    assetRisk: assetRisk(asset),
    issuerRisk: issuerRisk(asset),
    liquidityRisk: liquidityRisk(asset),
    pegRisk: pegRisk(asset),
    oracleRisk: oracleRisk(asset, now),
    contractRisk: contractRisk(asset),
    concentrationRisk: concentrationRisk(asset),
  };
  const riskScore = Number(Object.entries(METHODOLOGY.weights).reduce((sum, [key, weight]) => sum + dimensionScores[key as keyof typeof dimensionScores] * weight, 0).toFixed(2));
  const scored = {
    assetId: asset.assetId,
    symbol: asset.symbol,
    name: asset.name,
    assetClass: asset.assetClass,
    grade: gradeBand(riskScore),
    riskScore,
    dimensionScores,
    nominalApy: asset.nominalApy,
    riskAdjustedApy: riskAdjustedApy(asset.nominalApy, riskScore),
    tvlUsd: asset.tvlUsd,
    methodologyVersion: METHODOLOGY.version,
    updatedAt: new Date(now * 1000).toISOString(),
  };
  return { ...scored, ratingHash: keccak256(stringToHex(stableJson(scored))) };
}

export function ratePortfolio(positions: Position[]) {
  const total = positions.reduce((s, p) => s + p.valueUsd, 0);
  const blendedRiskScore = total === 0 ? 0 : positions.reduce((s, p) => s + p.riskScore * (p.valueUsd / total), 0);
  const largest = positions.reduce((max, p) => Math.max(max, p.weightBps), 0);
  return { blendedRiskScore: Number(blendedRiskScore.toFixed(2)), largestWeightBps: largest, concentrationWarning: largest > 3000 };
}

export function verifyRatingHash(ratingJson: unknown, hash: string) {
  return keccak256(stringToHex(stableJson(ratingJson))) === hash;
}
