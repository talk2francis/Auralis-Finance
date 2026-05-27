# Auralis Finance — Smart Contracts

Purpose: document the current Mantle mainnet contracts, addresses, proof functions, and verification status.

Related docs: [Architecture](./ARCHITECTURE.md), [Risk Methodology](./RISK_METHODOLOGY.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md), [Agent Design](./AGENT_DESIGN.md), [Security](./SECURITY.md), [Testing](./TESTING.md).

**Chain:** Mantle Mainnet · **chainId 5000** · Solidity `0.8.24` · OpenZeppelin v5 · EVM `cancun`

Auralis deploys **four** contracts. They are deliberately minimal: they store **proofs**
(hashes, verdicts, identities, guardrail records) and **never custody funds**. This is the
structural guarantee behind the project's safety claim — there is no contract path that can
move user capital autonomously.

---

## Deployment addresses

> Corrected mainnet deployment. The earlier deployment from commit `f4be00e` is abandoned.

| Contract | Address | Explorer | Sourcify |
|---|---|---|---|
| `AuralisAgentRegistry` | `0x2939Df04CAfcd310f764d928559f2BF9F284a2f4` | [Explorer](https://explorer.mantle.xyz/address/0x2939Df04CAfcd310f764d928559f2BF9F284a2f4) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0x2939Df04CAfcd310f764d928559f2BF9F284a2f4/) |
| `AuralisRatingRegistry` | `0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22` | [Explorer](https://explorer.mantle.xyz/address/0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22/) |
| `AuralisComplianceAttestor` | `0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34` | [Explorer](https://explorer.mantle.xyz/address/0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34/) |
| `AuralisPolicyGuard` | `0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E` | [Explorer](https://explorer.mantle.xyz/address/0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E/) |

---

## 1. `AuralisRatingRegistry`

The public ledger of Auralis Ratings + the on-chain AI-decision log.

**State**
- `latestRating(assetId) → Rating` — newest rating per asset.
- `ratingAt(assetId, i)` / `ratingHistoryLength(assetId)` — full rating history.
- `decisions(id) → Decision` — every logged AI decision.
- `approvedPublishers(addr)` — addresses whose ratings are flagged `official`.

**Write functions**
- `anchorRating(assetId, ratingHash, grade, riskScore, methodologyVersion, metadataURI)`
  — **permissionless**. Anyone can anchor a public rating; the `submitter` is recorded and
  ratings from an approved publisher are flagged `official`. Rating data is public and
  reproducible from the methodology, so trust comes from the **hash + methodology**, not
  the signer. Reverts on duplicate `ratingHash`, score > 100, or grade `NR`.
- `logDecision(decisionHash, actionType, riskScore, metadataURI)` — **user-signed**. Writes
  an AI-produced decision + risk score on-chain. **This is the "AI-powered function callable
  on-chain" that satisfies the Mantle Deployment Award.**

**Events:** `RatingAnchored`, `DecisionLogged`, `PublisherUpdated`.

**Grade enum:** `0 NR · 1 AAA · 2 AA · 3 A · 4 BBB · 5 BB · 6 B · 7 C`.

---

## 2. `AuralisComplianceAttestor`

Issues privacy-preserving, reusable compliance / eligibility attestations.

**Design principle:** only the **verdict + content-addressed `checkHash`** go on-chain. The
compliance check *inputs* (jurisdiction declaration, screening data) stay private off-chain.
The attestation is **consumable by any Mantle app** — e.g. an RWA issuer can gate a purchase
with a single `isEligible()` call. This is the "infrastructure" surface of Auralis.

**Write functions**
- `mintAttestation(subject, assetClassId, verdict, checkHash, jurisdictionTag, metadataURI, validitySeconds)`
  — `payable`. Callable by the **subject themselves** (self-attest) or an **approved
  attester** (the Auralis issuer service). Validity bounded to `[1 hour, 365 days]`.
  Optional `mintFee` is the only value the system handles.
- `revoke(id)` — subject, attester, or owner.

**Read functions (for integrators)**
- `isEligible(wallet, assetClassId) → bool`
- `getVerdict(wallet, assetClassId) → (Verdict, bool active)`

**Verdict enum:** `0 None · 1 Eligible · 2 Restricted · 3 Denied`.

> **Disclaimer baked into the product:** Auralis provides compliance *tooling and risk
> information*, not legal advice. Every compliance surface in the app states this.

---

## 3. `AuralisAgentRegistry`

Soulbound (non-transferable) ERC-721 identity for Auralis AI agents/operators.

- **ERC-8004 interoperability:** `erc8004Ref` cross-references the Mantle-issued ERC-8004
  agent id when available (per the hackathon Q&A, Mantle provides ERC-8004 ids — Auralis
  *consumes* that standard rather than reinventing it). If unavailable at deploy time, this
  registry stands alone as the canonical Auralis identity.
- **Soulbound:** `_update` allows mint and burn, reverts on transfer (`AURALIS: soulbound`).
- **Reputation is event-derived.** Ratings anchored, attestations minted, and decisions
  logged are counted **off-chain** by indexing the other two contracts' events (Goldsky /
  The Graph). This keeps `AuralisAgentRegistry` decoupled — no fragile cross-contract calls.

**Write:** `registerAgent`, `updateMetadata`, `setActive`, `setMinter`.

---

## 4. `AuralisPolicyGuard`

Per-user, on-chain portfolio guardrails for AI-proposed rebalances.

**Safety model — read this carefully.** The AI only ever *proposes* a rebalance. This
contract deterministically *enforces* the user's guardrails and **reverts on any breach**.
There is **no autonomous execution path**: `executeRebalance` is reachable only via a
user-signed transaction from the policy owner. The contract holds no funds and no keys.

**Write functions**
- `setPolicy(maxPerAssetBps, maxPerProtocolBps, maxSlippageBps, minConfidence, minLiquidityScore, cooldownSeconds, humanApprovalThreshold)`
  — each user sets and signs for their own policy.
- `setPaused(bool)` — emergency pause for the caller's policy.
- `executeRebalance(RebalanceParams)` — user-signed; reverts on guardrail breach (emitting
  `RebalanceBlocked` first), otherwise records the rebalance and emits `RebalanceExecuted`.

**Read:** `checkRebalance(user, params) → (ok, reason)` — pure; powers the live policy-preview
UI before the user signs.

**`RebalanceParams`:** `portfolioHash, topAssetBps, topProtocolBps, slippageBps, aiConfidence,
liquidityScore, notionalValue, metadataURI`.

> Fund routing to whitelisted Mantle venues (Aave-on-Mantle, Merchant Moe) is a deliberate
> **post-hackathon, audited** extension. The hackathon build proves the *decision and its
> guardrail compliance* on-chain — which is the hackathon's actual thesis.

---

## Deployment & verification

```bash
cd packages/contracts
npm install
npx hardhat compile
npx hardhat test                                   # full suite (see TESTING.md)
npx hardhat run scripts/deploy.ts --network mantleSepolia   # dry run
npx hardhat run scripts/deploy.ts --network mantle          # production
npx hardhat verify --network mantle <ADDRESS> <CONSTRUCTOR_ARGS>
```

Addresses are written to `deployments/<network>.json` and consumed by `apps/web` chain
config. Mantle Explorer / Blockscout API returned an HTML/JSON response during Hardhat verification, so the verified source fallback is Sourcify. All four contracts are `full_match` verified on Sourcify for chain `5000`; Explorer links remain included for transaction/address evidence.

**Key hygiene:** `DEPLOYER_PRIVATE_KEY` lives only in a local `.env`, is used once, and is
removed afterward. It is never in Vercel, never in the worker, never in CI. CI runs
`compile + test` only — it never deploys. See `docs/SECURITY.md`.
