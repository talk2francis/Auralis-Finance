import type { AssetState } from "./types";

export function oracleFreshness(asset: AssetState) {
  const now = Math.floor(Date.now() / 1000);
  const stalenessSeconds = Math.max(0, now - asset.rawRiskSignals.oracleFreshnessTs);
  const freshnessScore = Math.max(0, Math.min(100, 100 - stalenessSeconds / 900));
  return { assetId: asset.assetId, stalenessSeconds, freshnessScore };
}
