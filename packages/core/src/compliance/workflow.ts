// Auralis provides compliance tooling and risk information, not legal advice.
import { keccak256, stringToHex } from "viem";
import type { Attestation, ComplianceReport, WalletScreen } from "@auralis/types";
import { stableJson } from "../rating/engine";
import { classifyAsset, type ClassifiableAsset } from "./classify";
import { evaluateEligibility } from "./eligibility";

const sanctioned = new Set(["0x000000000000000000000000000000000000dead", "0x9999999999999999999999999999999999999999"]);

export function screenForCompliance(wallet: string, jurisdiction: string): WalletScreen {
  const lower = wallet.toLowerCase();
  const sanctionsHit = sanctioned.has(lower);
  return { wallet, jurisdiction, sanctionsHit, riskExposureScore: sanctionsHit ? 100 : lower.endsWith("bad") ? 75 : 12, lastScreenedAt: new Date(0).toISOString() };
}

export function runComplianceWorkflow(wallet: string, jurisdiction: string, assets: ClassifiableAsset[]): ComplianceReport {
  const walletScreen = screenForCompliance(wallet, jurisdiction);
  const results = assets.map((asset) => evaluateEligibility(classifyAsset(asset), walletScreen, jurisdiction));
  const base = {
    reportId: `report:${wallet.toLowerCase()}:${jurisdiction.toUpperCase()}`,
    walletScreen,
    results,
    methodologyVersion: 100,
    generatedAt: new Date(0).toISOString(),
    disclaimer: "Auralis provides compliance tooling and risk information, not legal advice.",
  };
  return { ...base, reportHash: keccak256(stringToHex(stableJson(base))) };
}

export function recommendAttestations(report: ComplianceReport): Attestation[] {
  return report.results.filter((r) => r.verdict !== "NOT_CHECKED").map((r, i) => ({
    id: `${report.reportId}:${i}`,
    wallet: r.wallet,
    assetClass: r.assetClass,
    verdict: r.verdict,
    checkHash: report.reportHash,
    jurisdictionTag: report.walletScreen.jurisdiction,
    metadataUri: `ipfs://pending/${report.reportHash.slice(2)}`,
    issuedAt: report.generatedAt,
    validUntil: r.validUntil ?? "1970-01-08T00:00:00.000Z",
    revoked: false,
  }));
}

export function verifyCheckHash(reportJson: unknown, hash: string) {
  return keccak256(stringToHex(stableJson(reportJson))) === hash;
}
