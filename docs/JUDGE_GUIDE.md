# Auralis Judge Guide

Purpose: give judges a reliable 5-minute and 15-minute path through the live Auralis demo.

Related docs: [Architecture](./ARCHITECTURE.md), [Risk Methodology](./RISK_METHODOLOGY.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md), [Contracts](./CONTRACTS.md), [Tutorial](./TUTORIAL.md).

Auralis is the AI risk and compliance layer for tokenized real-world assets on Mantle. The fastest way to judge it is the USDY closed loop: rate → verify → compliance-check → attest → simulate → guard → prove.

## Live app

Use the final submitted deployment URL. Local fallback:

```bash
pnpm -F @auralis/web dev
open http://localhost:3000
```

## Funded test wallet

Use the provided judge wallet in the final submission package.

- Address: `0x000000000000000000000000000000000000aAaA` for read-only/local demo flows.
- Gasless first action: the intended production path sponsors the first compliance/attestation action where paymaster support is configured.
- Safety note: Auralis never needs seed phrases or private keys. Connect with Privy/email or an injected wallet.

## 5-minute path — USDY closed loop

1. **Open the live app.** Confirm the thesis: Auralis rates, compliance-checks, and manages Mantle RWAs.
2. **Open `/ratings` or `/app/opportunities`.** Select **USDY** / Ondo US Dollar Yield.
3. **Read USDY's Auralis Rating.** Confirm grade, risk score, seven-dimension radar, nominal APY, and risk-adjusted APY.
4. **Verify this rating on Mantle.** Use the rating hash/proof UI where available; the underlying check is `AuralisRatingRegistry.verifyRating(assetId, ratingHash)`.
5. **Open `/app/compliance`.** Run a compliance scan for the test wallet and jurisdiction.
6. **Read the USDY eligibility verdict.** For `US`, USDY-style `US_TREASURY_RWA` should show `RESTRICTED`; non-US demo jurisdictions should show less restrictive output if risk signals are clear.
7. **Mint or inspect the attestation flow.** The human signs any attestation mint; Auralis does not sign for the user.
8. **Open `/app/decisions`.** View the decision proof and Mantle explorer link/hash evidence.

Expected result: the judge sees a real Mantle RWA, deterministic risk methodology, compliance automation, and on-chain proof surfaces without needing deep Web3 knowledge.

## 15-minute path

Add these steps after the 5-minute path:

1. **Simulate a rebalance** in `/app/simulator`; adjust target weights and inspect policy pass/block output.
2. **Set or inspect a policy** in `/app/policies`; confirm max asset, max protocol, slippage, confidence, liquidity, cooldown, and human-approval guardrails.
3. **Inspect the agent** in `/app/agent`; review the 12-skill model and agent identity/proof framing.
4. **Use Copilot** in `/app/copilot` or the global widget; ask it to explain USDY risk or compliance caveats. Confirm the answer is advisory and structured.
5. **Open `/app/integrations`.** Confirm Mantle RPC, connected services, system health, and security controls are driven by `/api/health`.
6. **Open public API endpoints** such as `/api/ratings`, `/api/v1/methodology`, and `/api/v1/ratings/usdy`.

## Mainnet contracts

| Contract | Address | Explorer |
|---|---|---|
| AuralisAgentRegistry | `0x2939Df04CAfcd310f764d928559f2BF9F284a2f4` | <https://explorer.mantle.xyz/address/0x2939Df04CAfcd310f764d928559f2BF9F284a2f4> |
| AuralisRatingRegistry | `0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22` | <https://explorer.mantle.xyz/address/0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22> |
| AuralisComplianceAttestor | `0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34` | <https://explorer.mantle.xyz/address/0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34> |
| AuralisPolicyGuard | `0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E` | <https://explorer.mantle.xyz/address/0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E> |

## Feature → scorecard dimension

| Feature | Scorecard lift |
|---|---|
| Deterministic seven-dimension rating | AI × RWA depth, technical completeness |
| AI explanations with provenance | Verifiable/auditable AI output |
| USDY closed loop | Execution/demo quality, real-world validity |
| Compliance scan + attestation | Compliance awareness, Mantle settlement |
| Policy-guarded simulation | Automated risk management |
| Mantle proof contracts | Mantle integration, technical depth |
| Public API | Business potential, ecosystem contribution |
| Non-custodial user-signed model | Security and trust |
| Integrations/settings/a11y polish | UI/UX and Web3-barrier reduction |

## Known limitations

- Some market/risk inputs are deterministic demo adapters until final production data-provider credits are connected.
- Sourcify is the source-verification fallback because Mantle Explorer/Blockscout API returned non-JSON during Hardhat verification.
- Gas sponsorship/paymaster support is the target UX path; if unavailable in the live deployment, the app remains user-signed and non-custodial.
- Auralis provides compliance tooling and risk information, not legal advice.
