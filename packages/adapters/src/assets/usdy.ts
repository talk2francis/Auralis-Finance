import { makeAsset } from "./common";

export async function getAssetState() {
  return makeAsset({
    assetId: "mantle:usdy",
    symbol: "USDY",
    name: "Ondo US Dollar Yield",
    assetClass: "US_TREASURY_RWA",
    // TODO(real-data): confirm canonical Mantle USDY address before production use.
    address: "0x5Be26527E817998a7206475496f1cA078FC0C9cf",
    price: 1.006,
    nominalApy: 4.85,
    tvlUsd: 42800000,
    supply: 42500000,
    issuerTag: "Ondo Finance",
    liquidityDepthUsd: 6200000,
    pegDeviationBps: 6,
    contractAgeDays: 640,
    concentrationTopHolderPct: 16,
    proofOfReserve: true,
    mock: true,
  });
}
