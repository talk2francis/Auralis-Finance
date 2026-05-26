import type { RiskDimensionKey } from "@auralis/types";

export const METHODOLOGY = {
  version: 100,
  weights: {
    assetRisk: 0.16,
    issuerRisk: 0.18,
    liquidityRisk: 0.16,
    pegRisk: 0.14,
    oracleRisk: 0.12,
    contractRisk: 0.12,
    concentrationRisk: 0.12,
  } satisfies Record<RiskDimensionKey, number>,
} as const;
