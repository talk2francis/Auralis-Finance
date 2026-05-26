import { z } from "zod";

export const PolicySchema = z.object({
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  maxPerAssetBps: z.number().int().min(0).max(10000),
  maxPerProtocolBps: z.number().int().min(0).max(10000),
  maxSlippageBps: z.number().int().min(0).max(1000),
  minConfidence: z.number().min(0).max(100),
  minLiquidityScore: z.number().min(0).max(100),
  cooldownSeconds: z.number().int().nonnegative(),
  humanApprovalThresholdUsd: z.number().nonnegative(),
  paused: z.boolean(),
  updatedAt: z.string().datetime(),
});
export type Policy = z.infer<typeof PolicySchema>;
