# Tutorial — Rate and compliance-check an asset in 10 minutes

Purpose: walk a new user through rating, verifying, compliance-checking, and simulating a Mantle RWA with Auralis.

Related docs: [Judge Guide](./JUDGE_GUIDE.md), [Risk Methodology](./RISK_METHODOLOGY.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md), [Contracts](./CONTRACTS.md), [API](./API.md).

This tutorial uses USDY because it is a real Mantle RWA and the clearest closed-loop demo asset.

## 1. Open Auralis

Open the live app URL from the submission. Local fallback:

```bash
pnpm -F @auralis/web dev
open http://localhost:3000
```

## 2. Connect

Use Privy/email if enabled, or connect an injected wallet. Auralis does not ask for seed phrases or private keys.

For judge/demo flows, use the documented test wallet. The first compliance/attestation action is designed to be gasless where sponsorship is configured; otherwise your wallet will show the exact Mantle transaction before signing.

## 3. Find USDY

Go to `/ratings` or `/app/opportunities`, then open USDY / Ondo US Dollar Yield.

Read:

- Auralis grade;
- risk score;
- radar dimensions;
- nominal APY;
- risk-adjusted APY;
- methodology version;
- rating hash.

## 4. Verify the rating

Use the “Verify this rating” UI if present. The check recomputes the rating hash and compares it to Mantle through `AuralisRatingRegistry.verifyRating(assetId, ratingHash)`.

If using API-only verification, inspect:

```bash
curl https://<app>/api/v1/ratings/usdy
```

Then compare the returned `ratingHash` with the on-chain proof surface.

## 5. Run a compliance scan

Open `/app/compliance`.

Enter or confirm:

- wallet address;
- jurisdiction declaration.

Run the scan. Auralis screens the wallet, classifies USDY as `US_TREASURY_RWA`, applies jurisdiction rules, and produces an eligibility verdict.

For `US`, USDY-style Treasury RWAs should be restricted unless issuer whitelist conditions exist. For other jurisdictions, the verdict depends on sanctions and wallet-risk signals.

## 6. Review the report

Read the generated report:

- verdict;
- reasons;
- confidence;
- report hash;
- disclaimer.

The disclaimer matters: Auralis provides compliance tooling and risk information, not legal advice.

## 7. Mint or inspect the attestation

If the live deployment enables attestation minting, sign the wallet prompt. Auralis does not sign for you.

The attestation stores:

- subject wallet;
- asset class;
- verdict;
- check hash;
- jurisdiction tag;
- metadata URI;
- validity window.

## 8. Simulate a rebalance

Open `/app/simulator`.

Adjust target allocation and inspect:

- expected APY delta;
- expected risk delta;
- policy check result;
- AI explanation;
- caveats.

No rebalance executes automatically. The simulator is advisory until the user signs a transaction.

## 9. Inspect the decision proof

Open `/app/decisions`.

Find the latest decision record and confirm:

- decision hash;
- action type;
- risk score;
- policy result;
- Mantle proof/explorer link where available.

## 10. Ask Copilot

Open `/app/copilot` or the bottom-right Copilot widget. Ask:

> Explain why USDY may be restricted for my jurisdiction.

The answer should be structured: summary, actions, outcome, reasoning factors, caveats. It should remain advisory.

## What you just completed

You completed the Auralis loop:

```text
Rate USDY → verify rating → compliance-check wallet → review verdict →
attest eligibility → simulate rebalance → inspect decision proof
```

That is the core product: AI-assisted RWA risk and compliance, with deterministic decisions and Mantle proof.
