import { z } from "zod";
import { GradeSchema } from "./assets";

export const PositionSchema = z.object({
  assetId: z.string().min(1),
  symbol: z.string().min(1),
  name: z.string().min(1),
  balance: z.number().nonnegative(),
  valueUsd: z.number().nonnegative(),
  weightBps: z.number().int().min(0).max(10000),
  apy: z.number(),
  grade: GradeSchema,
  riskScore: z.number().min(0).max(100),
});
export type Position = z.infer<typeof PositionSchema>;

export const PortfolioSchema = z.object({
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  totalValueUsd: z.number().nonnegative(),
  blendedApy: z.number(),
  blendedRiskScore: z.number().min(0).max(100),
  positions: z.array(PositionSchema),
  updatedAt: z.string().datetime(),
});
export type Portfolio = z.infer<typeof PortfolioSchema>;

export const RebalanceProposalSchema = z.object({
  proposalId: z.string().min(1),
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  portfolioHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  fromPositions: z.array(PositionSchema),
  toPositions: z.array(PositionSchema),
  expectedApyDelta: z.number(),
  expectedRiskDelta: z.number(),
  estimatedSlippageBps: z.number().int().min(0).max(10000),
  aiConfidence: z.number().min(0).max(100),
  rationale: z.string().min(1),
  createdAt: z.string().datetime(),
});
export type RebalanceProposal = z.infer<typeof RebalanceProposalSchema>;

export const DecisionSchema = z.object({
  decisionId: z.string().min(1),
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  actionType: z.string().min(1),
  decisionHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  riskScore: z.number().min(0).max(100),
  policyResult: z.enum(["PASS", "WARN", "FAIL"]),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/).optional(),
  metadataUri: z.string().min(1),
  createdAt: z.string().datetime(),
});
export type Decision = z.infer<typeof DecisionSchema>;
