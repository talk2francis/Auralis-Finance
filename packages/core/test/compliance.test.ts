import { describe, expect, it } from "vitest";
import { recommendAttestations, runComplianceWorkflow, stableJson, verifyCheckHash } from "../src";

const clean = "0x1111111111111111111111111111111111111111";
const sanctioned = "0x000000000000000000000000000000000000dEaD";
const assets = [
  { symbol: "USDY", name: "Ondo USDY", assetClass: "US_TREASURY_RWA" as const },
  { symbol: "mETH", name: "Mantle Staked Ether", assetClass: "LST" as const },
];

describe("compliance engine", () => {
  it("marks a clean NG wallet eligible for USDY", () => {
    const report = runComplianceWorkflow(clean, "NG", assets);
    const usdy = report.results.find((r) => r.assetClass === "US_TREASURY_RWA");
    expect(usdy?.verdict).toBe("ELIGIBLE");
    expect(usdy?.reasons.join(" ")).toContain("sanctions clear");
  });

  it("restricts US persons for USDY with cited rule", () => {
    const report = runComplianceWorkflow(clean, "US", assets);
    const usdy = report.results.find((r) => r.assetClass === "US_TREASURY_RWA");
    expect(usdy?.verdict).toBe("RESTRICTED");
    expect(usdy?.reasons.join(" ")).toContain("US_TREASURY_RWA excludes US persons");
  });

  it("denies sanctioned wallets everywhere", () => {
    const report = runComplianceWorkflow(sanctioned, "NG", assets);
    expect(report.results.every((r) => r.verdict === "DENIED")).toBe(true);
  });

  it("has deterministic check hashes and recommendations", () => {
    const a = runComplianceWorkflow(clean, "NG", assets);
    const b = runComplianceWorkflow(clean, "NG", assets);
    expect(stableJson(a)).toEqual(stableJson(b));
    expect(a.reportHash).toEqual(b.reportHash);
    const { reportHash, ...json } = a;
    expect(verifyCheckHash(json, reportHash)).toBe(true);
    expect(recommendAttestations(a)).toHaveLength(2);
  });
});
