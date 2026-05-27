# Auralis Compliance Framework

Purpose: define how Auralis screens wallets, classifies Mantle assets, produces eligibility verdicts, and preserves privacy.

Related docs: [Risk Methodology](./RISK_METHODOLOGY.md), [Architecture](./ARCHITECTURE.md), [Agent Design](./AGENT_DESIGN.md), [Contracts](./CONTRACTS.md), [Security](./SECURITY.md).

Auralis provides compliance tooling and risk information, not legal advice. The framework is built to help wallets, treasuries, issuers, and Mantle apps understand eligibility before interacting with tokenized real-world assets.

## Compliance posture

Auralis is intentionally **non-custodial** and **privacy-minimizing**:

- It does not collect passports, government IDs, tax IDs, bank statements, or biometric data.
- It does not custody funds or make autonomous trades.
- It screens public wallet information, jurisdiction declarations, asset class rules, sanctions snapshots, and on-chain risk-exposure heuristics.
- It stores only verdicts and hashes on-chain; detailed report inputs stay off-chain.

This is on-chain compliance tooling, not full identity KYC.

## Asset-class taxonomy

| Asset class | Examples | Compliance concern |
|---|---|---|
| `US_TREASURY_RWA` | USDY | Non-US-person rules, issuer whitelist status, securities/product restrictions |
| `TOKENIZED_EQUITY` | xStocks-style assets | Reg-S / accredited-investor requirements, jurisdiction gates |
| `REGULATED_YIELD` | QCDT-style products | regulated product access, sanctions screening, suitability |
| `SYNTH_DOLLAR` | USDe | sanctions clear, peg-risk acknowledgement, protocol-risk disclosure |
| `LST` | mETH, cmETH | protocol blocking/sanctions, not generally securities-gated in this model |
| `INDEX_RWA` | MI4-style basket | inherits strictest constituent restrictions |
| `STABLECOIN` | venue stablecoin balances | sanctions clear, acceptable on-chain exposure |

## Screening inputs

Auralis uses the minimum inputs needed to produce a useful eligibility verdict:

1. **Wallet address** — public address being screened.
2. **Jurisdiction declaration** — short tag such as `NG`, `US`, `EU`, `GB`, `SG`, `AE`, `REG_S`, or `ACCREDITED`.
3. **Sanctions signal** — currently a bundled snapshot in the repo; production can swap in OFAC-style and vendor feeds.
4. **On-chain risk exposure score** — a deterministic heuristic today; Nansen enrichment is planned and already represented in `/api/health`.
5. **Asset class** — derived from the asset adapter/classifier.
6. **Methodology version** — currently `100`.

## What is deliberately not collected

Auralis does **not** collect:

- government ID documents;
- social security / tax numbers;
- bank-account details;
- residential address proofs;
- raw exchange-account records;
- private keys or seed phrases.

If an issuer or regulated partner needs full KYC, they can use Auralis as a pre-check and attestation layer, not as the identity provider of record.

## Verdict vocabulary

Auralis produces three active verdicts:

- **Eligible** — the wallet passes the current rule set for the asset class.
- **Restricted** — the wallet may require issuer whitelist, accredited/Reg-S status, manual review, or a different jurisdiction path.
- **Denied** — the wallet fails a hard rule such as sanctions hit or very high risk exposure.

`NOT_CHECKED` is reserved for UI state, not final reports.

## Verdict logic

The current deterministic rules in `packages/core/src/compliance/eligibility.ts` are:

1. If the wallet appears on the sanctions snapshot, verdict is `DENIED` with 98% confidence.
2. If on-chain risk exposure score is `>= 85`, verdict is `DENIED` with 90% confidence.
3. If asset class is `US_TREASURY_RWA` and jurisdiction is `US`, verdict is `RESTRICTED` because USDY-style products may exclude US persons unless issuer whitelist conditions apply.
4. If asset class is `TOKENIZED_EQUITY` and jurisdiction is not `REG_S` or `ACCREDITED`, verdict is `RESTRICTED` because tokenized equities can require accredited-investor or offshore status.
5. If asset class is `INDEX_RWA` and jurisdiction is `US`, verdict is `RESTRICTED` because the index inherits the strictest constituent rule.
6. If risk exposure score is `>= 60`, verdict is `RESTRICTED` pending manual review.
7. Otherwise verdict is `ELIGIBLE` with a class-specific explanation.

## KYC / AML / accredited-investor / jurisdiction vocabulary

Auralis does not claim to perform full KYC. It models the compliance constraints that matter for a pre-trade on-chain workflow:

- **KYC** — represented as a future integration hook or issuer whitelist; Auralis records whether the asset class requires identity-backed access.
- **AML** — represented by sanctions snapshot and wallet-risk exposure signals.
- **Accredited investor** — represented by the `ACCREDITED` jurisdiction/status tag for tokenized-equity flows.
- **Reg-S / offshore eligibility** — represented by the `REG_S` tag.
- **Jurisdiction-specific restrictions** — represented by country/region tags such as `US`, `EU`, `GB`, `SG`, `AE`, and `NG`.

## Compliance agent workflow

The Compliance Agent automates the workflow as a proposal:

```text
screen wallet → classify assets → match jurisdiction rules → produce verdicts →
draft report → recommend attestations → wait for human signature
```

The human signs any attestation mint. The agent cannot mint without a user/approved-attester transaction and cannot move funds.

## Attestation design

On-chain attestation fields live in `AuralisComplianceAttestor`:

- `subject` — wallet being attested;
- `assetClassId` — class such as `US_TREASURY_RWA` encoded as bytes32;
- `verdict` — Eligible, Restricted, or Denied;
- `checkHash` — hash of the off-chain compliance report;
- `jurisdictionTag` — encoded declaration/status tag;
- `metadataURI` — pointer to report metadata if published;
- `validitySeconds` — bounded between one hour and 365 days.

The detailed report is hashed as `keccak256(stableJson(report))`. This allows a user or issuer to prove that a displayed report matches the chain record without publishing private inputs.

## Validity and revocation

Attestations are time-bounded. A subject, attester, or owner can revoke where allowed by the contract. The UI should treat expired or revoked attestations as unusable and prompt a fresh scan.

## EAS compatibility

EAS-compatible schema work is deferred to [Roadmap](./ROADMAP.md). The planned schema mirrors the Mantle contract fields so Auralis attestations can be bridged into broader Ethereum attestation tooling without changing the core product loop.

## Disclaimer

Auralis provides compliance tooling and risk information, not legal advice. Users, issuers, and integrators remain responsible for their own legal analysis, KYC program, AML obligations, jurisdictional restrictions, and investor-status verification.
