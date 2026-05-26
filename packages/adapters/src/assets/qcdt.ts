import { makeAsset } from "./common";

export async function getAssetState() {
  return makeAsset({ assetId: "mantle:qcdt", symbol: "QCDT", name: "QCDT Private Credit", assetClass: "REGULATED_YIELD", address: "0x1111111111111111111111111111111111111111", price: 1.0, nominalApy: 7.2, tvlUsd: 9600000, supply: 9600000, issuerTag: "QCDT Issuer", liquidityDepthUsd: 1200000, pegDeviationBps: 18, contractAgeDays: 180, concentrationTopHolderPct: 31, proofOfReserve: false, mock: true, source: "mock // TODO(real-data): replace with verified Mantle QCDT contract + issuer feeds" });
}
