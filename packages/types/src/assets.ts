import { z } from "zod";

export const AssetClassSchema = z.enum([
  "US_TREASURY_RWA",
  "TOKENIZED_EQUITY",
  "REGULATED_YIELD",
  "SYNTH_DOLLAR",
  "LST",
  "INDEX_RWA",
  "STABLECOIN",
]);
export type AssetClass = z.infer<typeof AssetClassSchema>;

export const GradeSchema = z.enum(["AAA", "AA", "A", "BBB", "BB", "B", "C"]);
export type Grade = z.infer<typeof GradeSchema>;

export const RiskDimensionKeySchema = z.enum([
  "assetRisk",
  "issuerRisk",
  "liquidityRisk",
  "pegRisk",
  "oracleRisk",
  "contractRisk",
  "concentrationRisk",
]);
export type RiskDimensionKey = z.infer<typeof RiskDimensionKeySchema>;

export const DimensionScoresSchema = z.record(RiskDimensionKeySchema, z.number().min(0).max(100));
export type DimensionScores = z.infer<typeof DimensionScoresSchema>;

export const AssetRatingSchema = z.object({
  assetId: z.string().min(1),
  symbol: z.string().min(1),
  name: z.string().min(1),
  assetClass: AssetClassSchema,
  grade: GradeSchema,
  riskScore: z.number().min(0).max(100),
  dimensionScores: DimensionScoresSchema,
  nominalApy: z.number(),
  riskAdjustedApy: z.number(),
  tvlUsd: z.number().nonnegative(),
  methodologyVersion: z.number().int().positive(),
  rationale: z.string().min(1),
  counterfactual: z.string().min(1),
  ratingHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  updatedAt: z.string().datetime(),
});
export type AssetRating = z.infer<typeof AssetRatingSchema>;
