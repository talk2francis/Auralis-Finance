import { createPublicClient, http, type Address } from "viem";
import { mantle } from "./chain";

export const addresses = {
  ratingRegistry: process.env.NEXT_PUBLIC_AURALIS_RATING_REGISTRY as Address | undefined,
  complianceAttestor: process.env.NEXT_PUBLIC_AURALIS_COMPLIANCE_ATTESTOR as Address | undefined,
  agentRegistry: process.env.NEXT_PUBLIC_AURALIS_AGENT_REGISTRY as Address | undefined,
  policyGuard: process.env.NEXT_PUBLIC_AURALIS_POLICY_GUARD as Address | undefined,
};

export const publicClient = createPublicClient({ chain: mantle, transport: http() });

export const ratingRegistryAbi = [
  { type: "function", name: "verifyRating", stateMutability: "view", inputs: [{ name: "assetId", type: "bytes32" }, { name: "ratingHash", type: "bytes32" }], outputs: [{ type: "bool" }] },
  { type: "function", name: "anchorRating", stateMutability: "nonpayable", inputs: [{ name: "assetId", type: "bytes32" }, { name: "ratingHash", type: "bytes32" }, { name: "grade", type: "uint8" }, { name: "riskScore", type: "uint8" }, { name: "methodologyVersion", type: "uint16" }, { name: "metadataURI", type: "string" }], outputs: [{ type: "bool" }] },
] as const;

export const complianceAttestorAbi = [
  { type: "function", name: "isEligible", stateMutability: "view", inputs: [{ name: "wallet", type: "address" }, { name: "assetClassId", type: "bytes32" }], outputs: [{ type: "bool" }] },
] as const;

export const policyGuardAbi = [
  { type: "function", name: "checkRebalance", stateMutability: "view", inputs: [{ name: "user", type: "address" }, { name: "p", type: "tuple", components: [] }], outputs: [{ type: "bool" }, { type: "string" }] },
] as const;
