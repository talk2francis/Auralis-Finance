import type { Policy } from "@auralis/types";

export type GuardrailProposal = {
  portfolioHash: string;
  topAssetBps: number;
  topProtocolBps: number;
  slippageBps: number;
  aiConfidence: number;
  liquidityScore: number;
  notionalValueUsd: number;
  humanApproved?: boolean;
  lastRebalanceAt?: string;
  now?: string;
};

export type PolicyFailure = { rule: string; reason: string; limit: number | string | boolean; actual: number | string | boolean };

export function checkRebalance(policy: Policy | undefined, proposal: GuardrailProposal): { ok: boolean; failures: PolicyFailure[] } {
  const failures: PolicyFailure[] = [];
  if (!policy) return { ok: false, failures: [{ rule: "policy.exists", reason: "no policy set", limit: "policy", actual: "missing" }] };
  if (policy.paused) failures.push({ rule: "policy.paused", reason: "policy paused", limit: false, actual: true });
  if (!proposal.portfolioHash || proposal.portfolioHash === "0x" || /^0x0+$/.test(proposal.portfolioHash)) failures.push({ rule: "portfolioHash", reason: "empty portfolio hash", limit: "non-zero", actual: proposal.portfolioHash });
  if (proposal.topAssetBps > 10000 || proposal.topProtocolBps > 10000) failures.push({ rule: "proposal.bps", reason: "bad proposal bps", limit: 10000, actual: Math.max(proposal.topAssetBps, proposal.topProtocolBps) });
  if (proposal.aiConfidence > 100 || proposal.liquidityScore > 100) failures.push({ rule: "proposal.range", reason: "bad proposal range", limit: 100, actual: Math.max(proposal.aiConfidence, proposal.liquidityScore) });
  if (proposal.topAssetBps > policy.maxPerAssetBps) failures.push({ rule: "maxPerAssetBps", reason: "max per-asset exceeded", limit: policy.maxPerAssetBps, actual: proposal.topAssetBps });
  if (proposal.topProtocolBps > policy.maxPerProtocolBps) failures.push({ rule: "maxPerProtocolBps", reason: "max per-protocol exceeded", limit: policy.maxPerProtocolBps, actual: proposal.topProtocolBps });
  if (proposal.slippageBps > policy.maxSlippageBps) failures.push({ rule: "maxSlippageBps", reason: "slippage limit exceeded", limit: policy.maxSlippageBps, actual: proposal.slippageBps });
  if (proposal.aiConfidence < policy.minConfidence) failures.push({ rule: "minConfidence", reason: "AI confidence too low", limit: policy.minConfidence, actual: proposal.aiConfidence });
  if (proposal.liquidityScore < policy.minLiquidityScore) failures.push({ rule: "minLiquidityScore", reason: "liquidity too low", limit: policy.minLiquidityScore, actual: proposal.liquidityScore });
  if (policy.humanApprovalThresholdUsd > 0 && proposal.notionalValueUsd > policy.humanApprovalThresholdUsd && !proposal.humanApproved) failures.push({ rule: "humanApprovalThreshold", reason: "human approval required", limit: policy.humanApprovalThresholdUsd, actual: proposal.notionalValueUsd });
  if (proposal.lastRebalanceAt) {
    const elapsed = (Date.parse(proposal.now ?? new Date().toISOString()) - Date.parse(proposal.lastRebalanceAt)) / 1000;
    if (elapsed < policy.cooldownSeconds) failures.push({ rule: "cooldownSeconds", reason: "rebalance cooldown active", limit: policy.cooldownSeconds, actual: Math.max(0, Math.floor(elapsed)) });
  }
  return { ok: failures.length === 0, failures };
}
