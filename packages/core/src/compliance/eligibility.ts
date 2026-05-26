// Auralis provides compliance tooling and risk information, not legal advice.
import type { AssetClass, EligibilityResult, WalletScreen } from "@auralis/types";

export const complianceRules: Record<AssetClass, string> = {
  US_TREASURY_RWA: "US_TREASURY_RWA excludes US persons unless issuer whitelist exists",
  TOKENIZED_EQUITY: "TOKENIZED_EQUITY requires accredited-investor or Reg-S eligibility",
  REGULATED_YIELD: "REGULATED_YIELD requires sanctions clear and low on-chain risk exposure",
  SYNTH_DOLLAR: "SYNTH_DOLLAR requires peg-risk acknowledgement and sanctions clear",
  LST: "LST generally available unless wallet is sanctioned or protocol-blocked",
  INDEX_RWA: "INDEX_RWA inherits the strictest constituent eligibility rule",
  STABLECOIN: "STABLECOIN requires sanctions clear and acceptable on-chain exposure",
};

export function evaluateEligibility(assetClass: AssetClass, walletScreen: WalletScreen, jurisdiction: string): EligibilityResult {
  const reasons: string[] = [];
  const j = jurisdiction.toUpperCase();
  if (walletScreen.sanctionsHit) {
    return { wallet: walletScreen.wallet, assetClass, verdict: "DENIED", reasons: ["DENIED: wallet appears on the bundled sanctions snapshot"], confidence: 98 };
  }
  if (walletScreen.riskExposureScore >= 85) {
    return { wallet: walletScreen.wallet, assetClass, verdict: "DENIED", reasons: ["DENIED: on-chain risk exposure score exceeds 85"], confidence: 90 };
  }
  if (assetClass === "US_TREASURY_RWA" && j === "US") {
    reasons.push(`RESTRICTED: ${complianceRules.US_TREASURY_RWA}`);
    return { wallet: walletScreen.wallet, assetClass, verdict: "RESTRICTED", reasons, confidence: 88 };
  }
  if (assetClass === "TOKENIZED_EQUITY" && !["REG_S", "ACCREDITED"].includes(j)) {
    reasons.push(`RESTRICTED: ${complianceRules.TOKENIZED_EQUITY}`);
    return { wallet: walletScreen.wallet, assetClass, verdict: "RESTRICTED", reasons, confidence: 84 };
  }
  if (assetClass === "INDEX_RWA" && j === "US") {
    reasons.push(`RESTRICTED: ${complianceRules.INDEX_RWA}`);
    return { wallet: walletScreen.wallet, assetClass, verdict: "RESTRICTED", reasons, confidence: 82 };
  }
  if (walletScreen.riskExposureScore >= 60) {
    reasons.push("RESTRICTED: on-chain risk exposure score requires manual review");
    return { wallet: walletScreen.wallet, assetClass, verdict: "RESTRICTED", reasons, confidence: 78 };
  }
  reasons.push(`ELIGIBLE: sanctions clear; ${complianceRules[assetClass]}`);
  return { wallet: walletScreen.wallet, assetClass, verdict: "ELIGIBLE", reasons, confidence: 92, validUntil: "1970-01-31T00:00:00.000Z" };
}
