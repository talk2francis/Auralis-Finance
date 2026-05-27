# Auralis Pitch

Purpose: provide the final concise story for submission copy, demo narration, and judge Q&A.

Related docs: [Business Model](./BUSINESS_MODEL.md), [Judge Guide](./JUDGE_GUIDE.md), [Architecture](./ARCHITECTURE.md), [Risk Methodology](./RISK_METHODOLOGY.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md).

## One-liner

Auralis is the AI risk and compliance layer for tokenized real-world assets on Mantle.

## Problem

RWAs are moving on-chain, but users, wallets, treasuries, and DeFi apps still struggle to answer three practical questions before touching an asset:

1. What is the risk?
2. May this wallet hold it?
3. Can the decision be verified later?

Most RWA products stop at yield display or token issuance. Auralis adds the missing trust layer after issuance.

## Solution

Auralis rates Mantle RWAs, checks wallet eligibility, simulates policy-safe portfolio decisions, and records proofs on Mantle.

The design principle is simple: AI explains; deterministic code decides; users sign; Mantle verifies.

## Demo path

The demo uses USDY as the closed-loop asset:

```text
Open USDY → read Auralis Rating → verify rating hash → run compliance scan →
review eligibility verdict → mint/inspect attestation → simulate rebalance →
inspect decision proof
```

## Why Mantle

Mantle is the settlement layer for Auralis proofs. The product benefits from Mantle's low-cost mainnet execution and RWA ecosystem while adding ratings, compliance context, policy controls, and proof surfaces that other Mantle apps can consume.

## Differentiation

- Not a tokenizer: Auralis complements issuance by solving post-issuance risk and compliance.
- Not a black-box AI bot: deterministic engines compute scores and policies; AI writes explanations and proposals.
- Not custodial: no user funds are held; no server key signs user actions.
- Not just a dashboard: Auralis exposes public APIs and on-chain proofs for ecosystem reuse.

## Business model

1. Intelligence API subscriptions for ratings, eligibility, and methodology data.
2. Treasury tier for monitoring, audit exports, and configurable policies.
3. Attestation mint fees for reusable compliance proof.

## Ask / next milestone

Use Auralis as a public risk and compliance infrastructure layer for Mantle RWAs. The immediate post-hackathon milestone is to connect production data-provider credits, publish the EAS-compatible attestation schema, and onboard design partners among wallets, issuers, and treasury users.
