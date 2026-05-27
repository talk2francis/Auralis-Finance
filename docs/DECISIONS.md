# Auralis Decisions

Purpose: record the major architecture decisions that shape Auralis and their consequences.

Related docs: [Architecture](./ARCHITECTURE.md), [Security](./SECURITY.md), [Contracts](./CONTRACTS.md), [Business Model](./BUSINESS_MODEL.md), [Roadmap](./ROADMAP.md).

## ADR-001 — Path B over Path A

**Context:** The Mantle AI × RWA track rewards real-world validity, defined users, compliance awareness, and Mantle ecosystem fit.

**Decision:** Build Path B: an AI risk, compliance, and portfolio layer for tokenized RWAs, not a tokenization factory.

**Consequences:** Auralis complements Mantle TaaS instead of competing with it. The core demo centers on existing Mantle assets such as USDY and mETH.

## ADR-002 — Intelligence layer, not tokenizer

**Context:** Token issuance is already a Mantle strength. The gap is trust, risk, compliance, and decision proofing after issuance.

**Decision:** Auralis rates, compliance-checks, and manages tokenized assets rather than creating them.

**Consequences:** The system can be useful to issuers, wallets, treasuries, and DeFi apps without taking custody or underwriting issuance.

## ADR-003 — Vercel-only web + read-only worker

**Context:** The project must avoid runaway deployment/signing loops and remain cheap to operate.

**Decision:** The public app runs on Vercel. The worker is read-only, scheduled at safe intervals, and has no private key.

**Consequences:** Worst-case worker failure is stale data. It cannot spend gas or move funds.

## ADR-004 — User-signed everything

**Context:** A previous runaway automation pattern showed that server-side signing in always-on infrastructure is unacceptable.

**Decision:** Auralis never signs for users. Policy changes, attestations, decisions, and rebalances are wallet-signed.

**Consequences:** UX must make signing clear, but the safety boundary is strong and easy to explain to judges.

## ADR-005 — Deterministic engine + AI as explainer

**Context:** The scorecard rewards AI, but verifiable/auditable output is required.

**Decision:** Deterministic engines compute ratings, verdicts, hashes, and guardrail decisions. AI explains those outputs and proposes next actions under schemas.

**Consequences:** AI failures degrade to templates and cannot corrupt scores or compliance verdicts.

## ADR-006 — Consume Mantle ERC-8004 instead of replacing it

**Context:** Hackathon Q&A indicates Mantle provides ERC-8004 agent identity.

**Decision:** Auralis stores an `erc8004Ref` and remains interoperable rather than deploying a competing identity standard.

**Consequences:** The local `AuralisAgentRegistry` is a project identity/reputation surface while Mantle identity remains the ecosystem anchor.

## ADR-007 — 75/100 breadth scope

**Context:** A complete RWA institution could include issuance, KYC, trading, custody, indexes, reporting, APIs, and governance.

**Decision:** Scope to the highest-scoring closed loop: rate → verify → compliance-check → attest → simulate → guard → log proof.

**Consequences:** Tokenization, Safe multisig policy support, Allora forecasts, and EAS bridging are roadmap items, not blockers.

## ADR-008 — Mantle as trust settlement, not just deploy target

**Context:** The scorecard asks whether Mantle is meaningfully used.

**Decision:** Mantle stores every important proof and is the native asset context for the product.

**Consequences:** Auralis would be less credible on a generic L2 because the target RWA stack, low-cost proof density, and hackathon agent identity are Mantle-specific.
