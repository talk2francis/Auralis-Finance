import type { Policy } from "@auralis/types";

const wallet = "0x0000000000000000000000000000000000000000";
const updatedAt = "1970-01-01T00:00:00.000Z";

export const defaultPolicyTemplates: Record<"Conservative" | "Balanced" | "Institutional", Policy> = {
  Conservative: { wallet, maxPerAssetBps: 2000, maxPerProtocolBps: 2500, maxSlippageBps: 30, minConfidence: 82, minLiquidityScore: 75, cooldownSeconds: 86400, humanApprovalThresholdUsd: 5000, paused: false, updatedAt },
  Balanced: { wallet, maxPerAssetBps: 3000, maxPerProtocolBps: 3500, maxSlippageBps: 60, minConfidence: 72, minLiquidityScore: 60, cooldownSeconds: 3600, humanApprovalThresholdUsd: 25000, paused: false, updatedAt },
  Institutional: { wallet, maxPerAssetBps: 1500, maxPerProtocolBps: 2000, maxSlippageBps: 20, minConfidence: 90, minLiquidityScore: 85, cooldownSeconds: 604800, humanApprovalThresholdUsd: 1, paused: false, updatedAt },
};
