import { makeAsset } from "./common";

export async function getAssetState() {
  return makeAsset({ assetId: "mantle:aave-usdc", symbol: "aUSDC", name: "Aave Mantle USDC Supply", assetClass: "STABLECOIN", address: "0x3333333333333333333333333333333333333333", price: 1.0, nominalApy: 4.1, tvlUsd: 112000000, supply: 112000000, issuerTag: "Aave", liquidityDepthUsd: 22000000, pegDeviationBps: 4, contractAgeDays: 700, concentrationTopHolderPct: 9, proofOfReserve: true, mock: true, source: "mock // TODO(real-data): wire Aave Mantle reserve data" });
}
