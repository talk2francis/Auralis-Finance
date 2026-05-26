import { describe, expect, it } from "vitest";
import { checkRebalance, defaultPolicyTemplates, type GuardrailProposal } from "../src";

const policy = { ...defaultPolicyTemplates.Balanced, wallet: "0x1111111111111111111111111111111111111111", updatedAt: "2026-01-01T00:00:00.000Z" };
const base: GuardrailProposal = { portfolioHash: `0x${"a".repeat(64)}`, topAssetBps: 2200, topProtocolBps: 2800, slippageBps: 30, aiConfidence: 82, liquidityScore: 78, notionalValueUsd: 1000 };

describe("policy engine", () => {
  it("passes a compliant proposal", () => expect(checkRebalance(policy, base).ok).toBe(true));
  it("fails no policy", () => expect(checkRebalance(undefined, base).failures[0].rule).toBe("policy.exists"));
  it("fails paused", () => expect(checkRebalance({ ...policy, paused: true }, base).failures[0].reason).toBe("policy paused"));
  it("fails per asset", () => expect(checkRebalance(policy, { ...base, topAssetBps: 4000 }).failures.some(f => f.rule === "maxPerAssetBps")).toBe(true));
  it("fails per protocol", () => expect(checkRebalance(policy, { ...base, topProtocolBps: 4000 }).failures.some(f => f.rule === "maxPerProtocolBps")).toBe(true));
  it("fails slippage", () => expect(checkRebalance(policy, { ...base, slippageBps: 70 }).failures.some(f => f.rule === "maxSlippageBps")).toBe(true));
  it("fails confidence", () => expect(checkRebalance(policy, { ...base, aiConfidence: 60 }).failures.some(f => f.rule === "minConfidence")).toBe(true));
  it("fails liquidity", () => expect(checkRebalance(policy, { ...base, liquidityScore: 50 }).failures.some(f => f.rule === "minLiquidityScore")).toBe(true));
  it("fails human threshold", () => expect(checkRebalance(policy, { ...base, notionalValueUsd: 30000 }).failures.some(f => f.rule === "humanApprovalThreshold")).toBe(true));
  it("fails cooldown", () => expect(checkRebalance(policy, { ...base, lastRebalanceAt: "2026-01-01T00:00:00.000Z", now: "2026-01-01T00:30:00.000Z" }).failures.some(f => f.rule === "cooldownSeconds")).toBe(true));
});
