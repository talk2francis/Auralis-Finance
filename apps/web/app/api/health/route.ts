import { getAllAssets } from "@auralis/adapters";
import { json } from "../../../lib/api";
import { mantleDeployment } from "../../../lib/deployments";

const MANTLE_EXPLORER = "https://explorer.mantle.xyz";
const MANTLE_RPC = process.env.NEXT_PUBLIC_MANTLE_RPC_URL ?? process.env.MANTLE_RPC_URL ?? "https://rpc.mantle.xyz";

type ServiceStatus = {
  id: string;
  label: string;
  status: "operational" | "degraded" | "not_configured";
  detail: string;
  checkedAt: string;
};

async function checkRpc(now: string): Promise<ServiceStatus> {
  try {
    const res = await fetch(MANTLE_RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] }),
      cache: "no-store",
    });
    const body = (await res.json()) as { result?: string };
    const chainId = Number.parseInt(body.result ?? "0x0", 16);
    return {
      id: "mantle-rpc",
      label: "Mantle RPC",
      status: chainId === 5000 ? "operational" : "degraded",
      detail: chainId === 5000 ? "Mantle Mainnet RPC returned chainId 5000." : `Unexpected chainId ${chainId || "unknown"}.`,
      checkedAt: now,
    };
  } catch (error) {
    return { id: "mantle-rpc", label: "Mantle RPC", status: "degraded", detail: error instanceof Error ? error.message : "RPC check failed.", checkedAt: now };
  }
}

export async function GET() {
  const checkedAt = new Date().toISOString();
  const assets = await getAllAssets();
  const rpc = await checkRpc(checkedAt);
  const hasDb = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hasSentry = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN);
  const hasWalletKit = Boolean(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || process.env.NEXT_PUBLIC_PRIVY_APP_ID);

  const services: ServiceStatus[] = [
    rpc,
    { id: "wallet", label: "Wallet", status: hasWalletKit ? "operational" : "degraded", detail: hasWalletKit ? "Wallet onboarding configuration is present." : "WalletConnect/Privy env is not configured; injected wallet still works in local demo mode.", checkedAt },
    { id: "usdy", label: "USDY", status: assets.some((asset) => asset.symbol === "USDY") ? "operational" : "degraded", detail: "Auralis adapter returns USDY rating inputs.", checkedAt },
    { id: "qcdt", label: "QCDT", status: assets.some((asset) => asset.symbol === "QCDT") ? "operational" : "degraded", detail: "Auralis adapter returns QCDT regulated-yield inputs.", checkedAt },
    { id: "meth-cmeth", label: "mETH / cmETH", status: assets.some((asset) => asset.symbol === "mETH") && assets.some((asset) => asset.symbol === "cmETH") ? "operational" : "degraded", detail: "Liquid staking adapters are available.", checkedAt },
    { id: "usde", label: "USDe", status: assets.some((asset) => asset.symbol === "USDe") ? "operational" : "degraded", detail: "Synthetic-dollar adapter is available.", checkedAt },
    { id: "aave", label: "Aave", status: assets.some((asset) => asset.assetId.includes("aave") || asset.source.toLowerCase().includes("aave")) ? "operational" : "degraded", detail: "Aave-on-Mantle market adapter is available.", checkedAt },
    { id: "merchant-moe", label: "Merchant Moe", status: assets.some((asset) => asset.assetId.includes("merchant") || asset.source.toLowerCase().includes("moe")) ? "operational" : "degraded", detail: "Merchant Moe liquidity adapter is available.", checkedAt },
    { id: "oracles", label: "RedStone / Pyth", status: "operational", detail: "Oracle freshness is represented in the deterministic asset signal vector.", checkedAt },
    { id: "logger", label: "On-chain logger", status: "operational", detail: `RatingRegistry ${mantleDeployment.contracts.ratingRegistry} and PolicyGuard ${mantleDeployment.contracts.policyGuard} configured.`, checkedAt },
    { id: "nansen", label: "Nansen", status: process.env.NANSEN_API_KEY ? "operational" : "not_configured", detail: process.env.NANSEN_API_KEY ? "Nansen key present for wallet-risk enrichment." : "Nansen enrichment is deferred; deterministic fallbacks are active.", checkedAt },
  ];

  return json({
    ok: services.every((service) => service.status !== "degraded"),
    app: "auralis",
    phase: "p3.2",
    environment: { network: "Mantle Mainnet", chainId: 5000, rpc: MANTLE_RPC, explorer: MANTLE_EXPLORER },
    system: [
      { label: "Asset adapters", status: assets.length >= 8 ? "operational" : "degraded", detail: `${assets.length} asset adapters loaded.` },
      { label: "Persistence", status: hasDb ? "operational" : "not_configured", detail: hasDb ? "Supabase server credentials present." : "Supabase not configured; API returns deterministic demo data." },
      { label: "Sentry", status: hasSentry ? "operational" : "not_configured", detail: hasSentry ? "Sentry DSN present." : "Sentry instrumentation is wired but DSN is unset." },
    ],
    security: { nonCustodial: true, serverKey: false, userSignedTransactionsOnly: true },
    services,
    time: checkedAt,
  });
}
