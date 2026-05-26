import type { AssetClass } from "@auralis/types";

export type ClassifiableAsset = { assetClass?: AssetClass; symbol: string; name?: string };

export function classifyAsset(asset: ClassifiableAsset): AssetClass {
  if (asset.assetClass) return asset.assetClass;
  const text = `${asset.symbol} ${asset.name ?? ""}`.toUpperCase();
  if (text.includes("USDY") || text.includes("TREASURY")) return "US_TREASURY_RWA";
  if (text.includes("STOCK") || text.includes("EQUITY")) return "TOKENIZED_EQUITY";
  if (text.includes("USDE")) return "SYNTH_DOLLAR";
  if (text.includes("METH") || text.includes("LST")) return "LST";
  if (text.includes("INDEX") || text.includes("MI4")) return "INDEX_RWA";
  if (text.includes("USDC") || text.includes("STABLE")) return "STABLECOIN";
  return "REGULATED_YIELD";
}
