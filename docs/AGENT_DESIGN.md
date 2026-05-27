# Auralis Agent Design

Purpose: describe the Auralis agent loop, skill system, model routing, anti-hallucination contract, and auditability model.

Related docs: [Architecture](./ARCHITECTURE.md), [Risk Methodology](./RISK_METHODOLOGY.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md), [Contracts](./CONTRACTS.md), [Security](./SECURITY.md).

Auralis is not a chatbot wrapped around a dashboard. It is an agentic workflow where deterministic systems decide and AI explains, prioritizes, and proposes within strict schemas.

## The 8-step agent loop

1. **Observe** — read Mantle asset signals, wallet state, policy state, and existing proofs.
2. **Normalize** — convert raw inputs into canonical vectors: asset risk signals, wallet screen, portfolio, and policy.
3. **Rate** — compute deterministic seven-dimension ratings and rating hashes.
4. **Screen** — classify assets and run compliance eligibility checks for the declared jurisdiction.
5. **Explain** — ask the AI layer to produce plain-language rationales from the completed deterministic vectors.
6. **Propose** — draft a rebalance, attestation, or policy action without executing it.
7. **Guard** — run hard policy checks and present pass/block reasons.
8. **Prove** — the user signs any chain write; Mantle stores hashes, attestations, decisions, and guardrail records.

## Skill table

| Skill | Inputs | Outputs | On-chain? |
|---|---|---|---:|
| `rate.asset` | asset signal vector | grade, score, dimension scores, rating hash | Optional anchor |
| `rate.portfolio` | positions + ratings | blended risk, concentration warning | No |
| `explain.rating` | deterministic rating | rationale, counterfactual, provenance | No |
| `compliance.screen` | wallet + jurisdiction | sanctions/risk screen | No |
| `compliance.classify` | asset metadata | asset class | No |
| `compliance.evaluate` | wallet screen + asset class | eligible/restricted/denied verdict | No |
| `attestation.recommend` | compliance report | suggested attestations | No |
| `attestation.mint` | user-signed attestation params | Mantle attestation id/event | Yes, user-signed |
| `policy.check` | proposed rebalance + policy | pass/block reason | Read-only chain or local |
| `policy.set` | user policy params | Mantle policy config | Yes, user-signed |
| `rebalance.propose` | portfolio + ratings + policy | advisory proposal | No |
| `decision.log` | decision hash + metadata | Mantle DecisionLogged proof | Yes, user-signed |

## Anti-hallucination contract

The AI layer never produces the authoritative score, grade, verdict, hash, or policy decision. Those values come from deterministic code and contracts.

The AI receives:

- the already-computed rating or compliance result;
- the methodology version;
- the input vector;
- the route/context where the explanation is requested.

The AI returns only schema-validated text fields such as `rationale`, `counterfactual`, `summary`, `actions`, `outcome`, `reasoningFactors`, and `caveats`. Invalid output is rejected by Zod. If no model key is configured, Auralis uses deterministic offline templates.

## Model routing

Current routing lives in `packages/core/src/ai`:

1. **Cache first** — cache key is `task:inputHash`.
2. **Elfa AI primary** — when `ELFA_API_KEY` is configured.
3. **OpenAI fallback** — when `OPENAI_API_KEY` is configured.
4. **Offline/template fallback** — always available for demo reliability and cost control.

Every response has provenance:

- `modelId`;
- `methodologyVersion`;
- deterministic `inputVector`;
- `promptHash`;
- `responseHash`;
- `cached` flag;
- `generatedAt`.

## Auditability

Auditability is a product feature, not an implementation detail.

For ratings, Auralis computes `ratingHash = keccak256(stableJson(scoredRating))`. The displayed rating can be recomputed and compared with `AuralisRatingRegistry.verifyRating(assetId, ratingHash)` on Mantle. This is the basis of the “Verify this rating” experience.

For compliance, Auralis computes `reportHash = keccak256(stableJson(report))`. The on-chain attestation stores the verdict and `checkHash`, while sensitive inputs remain off-chain. A user can later prove that a displayed report matches the attestation without publishing private data.

For decisions, Auralis computes a `decisionHash` from the proposal or action record and logs it through `AuralisRatingRegistry.logDecision`. The app can show the hash, transaction, and explorer link so a judge can verify the AI-assisted decision on Mantle.

For AI explanations, provenance hashes prove which input vector and response were used. The explanation is auditable even though it is not authoritative.

## Failure modes and safe degradation

| Failure | Degradation |
|---|---|
| AI provider unavailable | Use offline template explanation; deterministic result still shown |
| Nansen unavailable | Use deterministic wallet-risk fallback; mark enrichment not configured in `/api/health` |
| RPC slow/unavailable | Keep local result visible; proof verification becomes stale/degraded |
| Compliance scan fails | Show error state and no attestation recommendation |
| Policy check blocks action | Display block reason; no execution path continues |
| User rejects wallet signature | No chain write occurs; local proposal remains advisory |

## Non-custodial guarantee

The agent cannot sign transactions, hold funds, or bypass policy guardrails. Chain writes are performed by users or explicit deployer/operator actions. The worker is read-only and keyless. The contracts store proofs and guardrails, not capital.
