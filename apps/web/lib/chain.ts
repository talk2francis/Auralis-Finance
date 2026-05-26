import { defineChain } from "viem";

export const mantleChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 5000);
export const mantleExplorer = process.env.NEXT_PUBLIC_MANTLE_EXPLORER_URL ?? "https://explorer.mantle.xyz";
export const mantleRpcUrl = process.env.NEXT_PUBLIC_MANTLE_RPC_URL || process.env.MANTLE_RPC_URL || "https://rpc.mantle.xyz";

export const mantle = defineChain({
  id: 5000,
  name: "Mantle",
  nativeCurrency: { name: "Mantle", symbol: "MNT", decimals: 18 },
  rpcUrls: { default: { http: [mantleRpcUrl] }, public: { http: [mantleRpcUrl] } },
  blockExplorers: { default: { name: "Mantle Explorer", url: mantleExplorer } },
});
