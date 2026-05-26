import { z } from "zod";
import { AssetClassSchema } from "./assets";

export const VerdictSchema = z.enum(["ELIGIBLE", "RESTRICTED", "DENIED", "NOT_CHECKED"]);
export type Verdict = z.infer<typeof VerdictSchema>;

export const WalletScreenSchema = z.object({
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  jurisdiction: z.string().min(2).max(8),
  sanctionsHit: z.boolean(),
  riskExposureScore: z.number().min(0).max(100),
  lastScreenedAt: z.string().datetime(),
});
export type WalletScreen = z.infer<typeof WalletScreenSchema>;

export const EligibilityResultSchema = z.object({
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  assetClass: AssetClassSchema,
  verdict: VerdictSchema,
  reasons: z.array(z.string()),
  confidence: z.number().min(0).max(100),
  validUntil: z.string().datetime().optional(),
});
export type EligibilityResult = z.infer<typeof EligibilityResultSchema>;

export const ComplianceReportSchema = z.object({
  reportId: z.string().min(1),
  walletScreen: WalletScreenSchema,
  results: z.array(EligibilityResultSchema),
  reportHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  methodologyVersion: z.number().int().positive(),
  generatedAt: z.string().datetime(),
  disclaimer: z.string().min(1),
});
export type ComplianceReport = z.infer<typeof ComplianceReportSchema>;

export const AttestationSchema = z.object({
  id: z.string().min(1),
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  assetClass: AssetClassSchema,
  verdict: VerdictSchema,
  checkHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  jurisdictionTag: z.string().min(1),
  metadataUri: z.string().min(1),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/).optional(),
  issuedAt: z.string().datetime(),
  validUntil: z.string().datetime(),
  revoked: z.boolean(),
});
export type Attestation = z.infer<typeof AttestationSchema>;
