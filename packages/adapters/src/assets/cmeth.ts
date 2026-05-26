import { makeAsset } from "./common";

export async function getAssetState() {
  return makeAsset({ assetId: "mantle:cmeth", symbol: "cmETH", name: "Mantle Restaked Ether", assetClass: "LST", address: "0xE6829d9a7eE8d0f4A7e9F1C8B7F3b9dDD6f07eC9", price: 3868, nominalApy: 3.85, tvlUsd: 265000000, supply: 68498, issuerTag: "Mantle LSP", liquidityDepthUsd: 18000000, pegDeviationBps: 38, contractAgeDays: 420, concentrationTopHolderPct: 19, proofOfReserve: true, mock: true, source: "mock // TODO(real-data): confirm cmETH Mantle contract and live restaking risk feeds" });
}
