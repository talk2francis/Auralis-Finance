import { makeAsset } from "./common";

export async function getAssetState() {
  return makeAsset({ assetId: "mantle:mi4", symbol: "MI4", name: "Mantle Index Four", assetClass: "INDEX_RWA", address: "0x2222222222222222222222222222222222222222", price: 1.035, nominalApy: 5.6, tvlUsd: 18100000, supply: 17480000, issuerTag: "Mantle Index", liquidityDepthUsd: 2400000, pegDeviationBps: 55, contractAgeDays: 120, concentrationTopHolderPct: 28, proofOfReserve: true, mock: true, source: "mock // TODO(real-data): replace with verified MI4 asset source" });
}
