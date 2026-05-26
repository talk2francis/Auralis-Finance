import type { AssetClass, WalletScreen } from "@auralis/types";

export type RawRiskSignals = {
  attestationFreshnessTs: number;
  oracleFreshnessTs: number;
  issuerTag: string;
  liquidityDepthUsd: number;
  pegDeviationBps: number;
  contractAgeDays: number;
  concentrationTopHolderPct: number;
  proofOfReserve: boolean;
};

export type AssetState = {
  assetId: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  address: `0x${string}`;
  price: number;
  nominalApy: number;
  tvlUsd: number;
  supply: number;
  rawRiskSignals: RawRiskSignals;
  mock: boolean;
  source: string;
};

export type PriceQuote = {
  symbol: string;
  priceUsd: number;
  stale: boolean;
  source: "defillama" | "coingecko" | "last-good" | "mock";
  updatedAt: string;
};

export type JurisdictionConstraint = {
  rule: string;
  excludedJurisdictions?: string[];
  requiredStatus?: string[];
  disclaimer: string;
};

export type ScreenWallet = (address: string) => Promise<WalletScreen>;
