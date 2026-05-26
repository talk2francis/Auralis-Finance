import { makeAsset } from "./common";

export async function getAssetState() {
  return makeAsset({ assetId: "mantle:merchant-moe", symbol: "MMOE", name: "Merchant Moe Stable LP", assetClass: "STABLECOIN", address: "0x4444444444444444444444444444444444444444", price: 1.0, nominalApy: 6.8, tvlUsd: 24500000, supply: 24500000, issuerTag: "Merchant Moe", liquidityDepthUsd: 5100000, pegDeviationBps: 12, contractAgeDays: 320, concentrationTopHolderPct: 25, proofOfReserve: false, mock: true, source: "mock // TODO(real-data): wire Merchant Moe pool and incentive data" });
}
