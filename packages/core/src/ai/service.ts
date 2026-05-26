import { z } from "zod";
import { keccak256, stringToHex } from "viem";
import type { AIProvenance, AssetRating, EligibilityResult, Policy, Portfolio, RebalanceProposal } from "@auralis/types";
import { stableJson } from "../rating/engine";
import { callJsonModel } from "./router";

const cache = new Map<string, unknown>();
const hash = (v: unknown) => keccak256(stringToHex(stableJson(v)));

export const RatingExplanationSchema = z.object({ rationale: z.string().min(1), counterfactual: z.string().min(1) });
export const CopilotSchema = z.object({ summary: z.string(), actions: z.array(z.string()).default([]), outcome: z.string(), reasoningFactors: z.array(z.string()).default([]), caveats: z.array(z.string()).default([]) });

async function structured<T>(key: string, input: unknown, schema: z.ZodType<T>, fallback: T): Promise<{ result: T; provenance: AIProvenance }> {
  const inputHash = hash(input);
  const cacheKey = `${key}:${inputHash}`;
  const cached = cache.get(cacheKey) as T | undefined;
  if (cached) return { result: cached, provenance: prov("cache", input, inputHash, hash(cached), true) };
  let result = fallback;
  let modelId = "offline/template";
  if (process.env.ELFA_API_KEY || process.env.OPENAI_API_KEY) {
    const response = await callJsonModel(JSON.stringify({ task: key, input }));
    modelId = response.modelId;
    result = schema.parse(JSON.parse(response.text));
  }
  const parsed = schema.parse(result);
  cache.set(cacheKey, parsed);
  return { result: parsed, provenance: prov(modelId, input, inputHash, hash(parsed), false) };
}

function prov(modelId: string, input: unknown, promptHash: `0x${string}`, responseHash: `0x${string}`, cached: boolean): AIProvenance {
  return { modelId, methodologyVersion: 100, inputVector: input as Record<string, unknown>, promptHash, responseHash, cached, generatedAt: "1970-01-01T00:00:00.000Z" };
}

// AI never produces a score, grade, or verdict — deterministic engines decide.
export function parseRatingExplanation(value: unknown) { return RatingExplanationSchema.parse(value); }

export function explainRating(assetRating: AssetRating | Omit<AssetRating, "rationale" | "counterfactual">) {
  return structured("explainRating", assetRating, RatingExplanationSchema, { rationale: `${assetRating.symbol} is rated ${assetRating.grade} from deterministic Auralis methodology v${assetRating.methodologyVersion}.`, counterfactual: "Rating would weaken if liquidity, peg stability, or proof freshness deteriorates." });
}

export function explainEligibility(result: EligibilityResult) {
  return structured("explainEligibility", result, z.object({ summary: z.string(), reasons: z.array(z.string()) }), { summary: `${result.verdict}: ${result.reasons.join(" ")}`, reasons: result.reasons });
}

export function proposeRebalance(portfolio: Portfolio, ratings: AssetRating[], policy: Policy) {
  const proposal: RebalanceProposal = { proposalId: `proposal:${portfolio.wallet}`, wallet: portfolio.wallet, portfolioHash: hash({ portfolio, ratings, policy }), fromPositions: portfolio.positions, toPositions: portfolio.positions, expectedApyDelta: 0, expectedRiskDelta: 0, estimatedSlippageBps: 0, aiConfidence: 75, rationale: "Current portfolio is within policy; no autonomous execution is proposed.", createdAt: "1970-01-01T00:00:00.000Z" };
  return structured("proposeRebalance", { portfolio, ratings, policy }, z.object({ proposal: z.custom<RebalanceProposal>(), reasoning: z.string() }), { proposal, reasoning: proposal.rationale });
}

export function copilotAnswer(question: string, context: Record<string, unknown>) {
  return structured("copilotAnswer", { question, context }, CopilotSchema, { summary: "Auralis can explain ratings, compliance results, and policy-safe actions from deterministic inputs.", actions: [], outcome: "answered-offline", reasoningFactors: Object.keys(context), caveats: ["This is informational, not legal or financial advice."] });
}
