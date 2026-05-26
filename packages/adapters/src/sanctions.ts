import type { AssetClass, WalletScreen } from "@auralis/types";
import snapshot from "./data/ofac-snapshot.json";
import type { JurisdictionConstraint } from "./types";

const sanctioned = new Set(snapshot.addresses.map((a) => a.toLowerCase()));

export const jurisdictionRules: Record<AssetClass, JurisdictionConstraint> = {
  US_TREASURY_RWA: { rule: "US_TREASURY_RWA excludes US persons unless issuer whitelist exists", excludedJurisdictions: ["US"], disclaimer: "Compliance tooling, not legal advice." },
  TOKENIZED_EQUITY: { rule: "TOKENIZED_EQUITY requires accredited/Reg-S eligibility", requiredStatus: ["ACCREDITED", "REG_S"], disclaimer: "Compliance tooling, not legal advice." },
  REGULATED_YIELD: { rule: "REGULATED_YIELD requires low AML risk and non-sanctioned wallet", disclaimer: "Compliance tooling, not legal advice." },
  SYNTH_DOLLAR: { rule: "SYNTH_DOLLAR requires peg-risk disclosure acknowledgement", disclaimer: "Compliance tooling, not legal advice." },
  LST: { rule: "LST generally available unless wallet is sanctioned or protocol-blocked", disclaimer: "Compliance tooling, not legal advice." },
  INDEX_RWA: { rule: "INDEX_RWA inherits the strictest constituent eligibility rule", disclaimer: "Compliance tooling, not legal advice." },
  STABLECOIN: { rule: "STABLECOIN requires sanctions clear and acceptable on-chain risk exposure", disclaimer: "Compliance tooling, not legal advice." },
};

export async function screenWallet(address: string): Promise<WalletScreen> {
  const lower = address.toLowerCase();
  const sanctionsHit = sanctioned.has(lower);
  // TODO(real-data): wire Nansen / live risk exposure in Phase 2.
  const riskExposureScore = sanctionsHit ? 100 : lower.endsWith("bad") ? 75 : 12;
  return {
    wallet: address,
    jurisdiction: "UNK",
    sanctionsHit,
    riskExposureScore,
    lastScreenedAt: new Date().toISOString(),
  };
}
