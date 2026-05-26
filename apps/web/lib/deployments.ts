import type { Address } from "viem";

export const mantleDeployment = {
  network: "mantle",
  chainId: 5000,
  deployedAt: "2026-05-26T19:43:41.209Z",
  deployer: "0x0C1Fc3B41717a068f836e1B737F3cB0251789783" as Address,
  owner: "0x0C1Fc3B41717a068f836e1B737F3cB0251789783" as Address,
  contracts: {
    agentRegistry: "0x2939Df04CAfcd310f764d928559f2BF9F284a2f4" as Address,
    ratingRegistry: "0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22" as Address,
    complianceAttestor: "0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34" as Address,
    policyGuard: "0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E" as Address,
  },
  transactions: {
    agentRegistry: "0x456026e84248b747797a489543fa3e6bee7d72f5a92e657a5ed1c16bae5d358f",
    ratingRegistry: "0x10d4e9fb30bd95fb7a9cf47d4a4d39ceabf79746799f7bf58c30632db2d4cc29",
    complianceAttestor: "0x8cc3636039fc1485c309e2f67e5962c8bc7aa135937d42b5473f08e3f069d91e",
    policyGuard: "0xcb49015d3ce2a6b5418d860cbf1b99dc7d7006f340f1a05c4a8f2f1ec038f2d3",
  },
  sourcify: {
    agentRegistry:
      "https://repo.sourcify.dev/contracts/full_match/5000/0x2939Df04CAfcd310f764d928559f2BF9F284a2f4/",
    ratingRegistry:
      "https://repo.sourcify.dev/contracts/full_match/5000/0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22/",
    complianceAttestor:
      "https://repo.sourcify.dev/contracts/full_match/5000/0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34/",
    policyGuard:
      "https://repo.sourcify.dev/contracts/full_match/5000/0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E/",
  },
} as const;

export type AuralisContractKey = keyof typeof mantleDeployment.contracts;

export function explorerAddressUrl(address: Address) {
  return `https://explorer.mantle.xyz/address/${address}`;
}

export function explorerTxUrl(txHash: string) {
  return `https://explorer.mantle.xyz/tx/${txHash}`;
}
