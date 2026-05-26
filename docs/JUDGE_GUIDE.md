# Auralis Finance — Judge Guide

This is the shortest path through the demo.

## 5-minute path

1. Open `/` and read the one-line thesis: AI risk + compliance for Mantle RWAs.
2. Open `/ratings` to see the public Auralis Ratings explorer.
3. Open `/app/compliance` and walk through Wallet Scan → Eligibility Matrix → Compliance Report → Attestations.
4. Open `/app/simulator` and adjust a rebalance proposal; the UI previews policy outcomes before any signing.
5. Open `/app/decisions` and `/app/agent` to see the proof ledger and agent skill registry.

## On-chain evidence

Production contracts are deployed on **Mantle Mainnet (chainId 5000)**:

| Contract | Address | Verification |
|---|---|---|
| Agent Registry | `0x2939Df04CAfcd310f764d928559f2BF9F284a2f4` | Sourcify full match |
| Rating Registry | `0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22` | Sourcify full match |
| Compliance Attestor | `0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34` | Sourcify full match |
| Policy Guard | `0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E` | Sourcify full match |

Deployment metadata lives at `packages/contracts/deployments/mantle.json`.

## What satisfies the Mantle Deployment Award checklist

- Smart contracts deployed on Mantle Mainnet: yes.
- Source verification: yes, Sourcify full-match for all four contracts.
- AI-powered function callable on-chain: `AuralisRatingRegistry.logDecision(...)` records an AI decision hash, action type, risk score, and metadata URI.
- Frontend routes implemented: marketing, ratings, compliance, simulator, copilot, policies, decisions, agent.
- Open-source repo includes setup, architecture, docs, and deployment metadata.

## Safety model

Auralis never holds user funds and does not run autonomous signing loops. The AI proposes; deterministic code checks; the user signs. The deployer key is local-only and is not required by the app, Vercel, worker, or CI.

## Known limitation

Mantle Explorer / Blockscout API returned HTML instead of JSON for Hardhat verification. Source verification therefore uses Sourcify full-match. Explorer address and transaction links still provide on-chain evidence.
