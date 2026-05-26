import type { AssetClass } from "@auralis/types";
import type { AssetState, RawRiskSignals } from "../types";

const now = () => Math.floor(Date.now() / 1000);

export function makeAsset(input: {
  assetId: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  address: `0x${string}`;
  price: number;
  nominalApy: number;
  tvlUsd: number;
  supply: number;
  issuerTag: string;
  liquidityDepthUsd: number;
  pegDeviationBps?: number;
  contractAgeDays?: number;
  concentrationTopHolderPct?: number;
  proofOfReserve?: boolean;
  mock?: boolean;
  source?: string;
}): AssetState {
  const rawRiskSignals: RawRiskSignals = {
    attestationFreshnessTs: now() - 6 * 3600,
    oracleFreshnessTs: now() - 12 * 60,
    issuerTag: input.issuerTag,
    liquidityDepthUsd: input.liquidityDepthUsd,
    pegDeviationBps: input.pegDeviationBps ?? 8,
    contractAgeDays: input.contractAgeDays ?? 365,
    concentrationTopHolderPct: input.concentrationTopHolderPct ?? 18,
    proofOfReserve: input.proofOfReserve ?? true,
  };
  return { ...input, rawRiskSignals, mock: input.mock ?? true, source: input.source ?? "mock // TODO(real-data)" };
}
