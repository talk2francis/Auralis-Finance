# AURALIS FINANCE — Master Build Plan

**Version 1.0 · The Turing Test Hackathon 2026 · Track 03: AI × RWA**
**Prepared as: acting CTO + 5-person senior engineering pod**
**Date: 22 May 2026 · Submission deadline: 15 June 2026 · Demo Day: 2–3 July 2026**

---

## 0. How to read this document

This is the single source of truth for the build. It is deliberately exhaustive because you asked for depth, not a workflow skeleton. It is organised so any of the 5 engineers can open it and know exactly what to build, why, and how it ties to a prize.

Sections 1–6 are **strategy** (read once, internalise). Sections 7–17 are **build spec** (reference daily). Sections 18–21 are **execution** (your operating cadence). Nothing here is decorative — every feature traces back to a scoring line in the official rubric.

There are two companion files delivered with this plan:
- `AURALIS_ARCHITECTURE.svg` — the full system architecture diagram (drop straight into `docs/diagrams/`).
- This document — to live at the repo root as `docs/MASTER_BUILD_PLAN.md`.

A note on tone: I have **partially disagreed with GPT-5.5**. The GPT plan ("Sentinel RWA") is competent but it is the *expected* answer for this track — a yield dashboard with a risk score. Section 3 explains exactly what I kept, killed, and rebuilt. You asked for a project that is "way out of league." That requires reframing the product, not re-skinning it.

---

## 1. Executive summary — the 30-second pitch

> **Auralis is the AI risk and compliance layer for tokenized real-world assets.**
> Mantle has built the rails for RWAs — Ondo's USDY, QCDT, xStocks, MI4, mETH. What's missing is the *intelligence and trust layer*: there is no Moody's, no compliance desk, and no portfolio manager for on-chain RWAs. Auralis is all three, delivered as one AI agent. It rates every RWA on Mantle on a transparent framework, verifies whether a given wallet is *eligible* to hold each one, and manages a portfolio across them with hard policy guardrails — writing every rating, every compliance verdict, and every decision to Mantle as permanent, verifiable proof.

**One-line pitch (for the submission form):**
*Auralis is an AI agent that rates, compliance-checks, and rebalances tokenized real-world assets on Mantle — turning opaque RWA yield into a transparent, auditable, on-chain credit layer.*

**Why this wins Track 03:** the track brief is *"dynamic yield strategies and automated risk management for assets including USDY and mETH."* Most teams will deliver "dynamic yield." Almost none will deliver **automated *risk management* + compliance** as a first-class, on-chain, methodology-backed system. That is the differentiator the judges are explicitly told to weight (compliance awareness is named in the rubric — see §2).

---

## 2. Hackathon intelligence brief — every detail that matters

Everything below is decoded from the official DevHub site, the DoraHacks track page, the Q&A, and the press materials. Treat each line as a constraint or an opportunity.

### 2.1 Structure & dates
- **Phase II "AI Awakening"** is our phase. Window: **1 May → 15 June 2026** (submission deadline 15 June, 16:59). We have ~24 days.
- **Demo Day: 2–3 July 2026**, globally livestreamed. Day 1 = project showcases, Day 2 = ecosystem + awards.
- **Winners announced: 10 July 2026.**
- Critical implication: build to a *submittable* state by **12 June** (3-day buffer), then keep polishing to Demo Day. The demo on 2–3 July is a second, separate performance — the live demo matters as much as the repo.
- **Mentor Clinics every Friday, 12:00–13:00 UTC.** The **29 May session is "Previous Hackathon Winner Experience Sharing"** — one team member must attend and take notes. The **22 May session** is credit-sponsor AI insights. Book a mentor clinic slot (form on DevHub) — direct judge-adjacent face time is free signal.

### 2.2 Prize structure (Phase II)
| Prize | Amount | What it rewards |
|---|---|---|
| 🏆 Grand Champion | **$9,000** | "Top Overall Business Potential, Completion & Mantle Ecosystem Fit" — track-agnostic |
| 🎮 Track First Prize | **$8,500** × 6 | Best project per track — **this is our primary target** |
| 🗳️ Community Voting | **$8,500** × 2 | Highest engagement on X |
| 🖥️ Best UI/UX | **$3,000** | "Best UX & Smoothest Web2 Onboarding" |
| 🚀 Finalist & Deployment | **$1,000** × 20 | Top 20 finalists deployed on Mantle |

**Our realistic prize stack: Track First Prize ($8.5K) + Best UI/UX ($3K) + Top-20 Deployment ($1K) = $12.5K floor, with Grand Champion ($9K) as the genuine stretch.** Community Voting ($8.5K) is a function of X effort — we will run a real campaign (see §18).

### 2.3 The AI × RWA track — official judging criteria (decoded)
The track is **exclusively sponsored by Mantle Network itself**. DevHub literally labels it *"Mantle's moat."* This means: **Mantle-ecosystem depth is not optional — it is the thing the sponsor most wants to see.**

**Track First Prize scoring:**
- **General (60%):** Depth of AI × RWA integration · technical completeness · Mantle integration · **compliance awareness**.
- **Track-Specific (40%):** for Path B (our path) → **"Real-World Validity: clear asset category + well-defined target users + complete user experience."**

**Grand Champion scoring (track-agnostic):**
- Technical Depth 30% · Innovation 25% · Mantle Ecosystem Contribution 25% · Product Completeness 20%.

**Best UI/UX scoring:**
- Visual Design 30% · Interaction & Flow 30% · AI Interaction Design 25% · Accessibility / Web3-barrier-lowering 15%.

**20 Project Deployment Award — hard gates (no judge scoring, pure checklist):**
- ✅ Smart contract deployed on Mantle Mainnet or Testnet
- ✅ Contract **verified** on Mantle Explorer
- ✅ ≥1 AI-powered function callable on-chain
- ✅ Frontend demo publicly accessible (not localhost)
- ✅ Deployment address in the DoraHacks submission
- ✅ Demo video ≥ 2 minutes walking the core use case
- ✅ Open-source GitHub repo with README (setup, architecture, deployed addresses)

> **We will design Auralis so it satisfies the Deployment Award checklist by Day 15**, then spend the remaining time on the *scored* criteria. That award is free money — never leave it on the table.

### 2.4 Submission mechanics (exact)
1. Register on DoraHacks: `dorahacks.io/hackathon/mantleturingtesthackathon2026`.
2. Submit a **DoraHacks BUIDL** with: open-source repo + runnable demo link + one-line pitch + Mantle contract address(es).
3. **Post an X thread with `#MantleAIHackathon`** containing pitch + demo video + GitHub link + Mantle contract address. The X thread is *also* the Community Voting mechanism — it must be excellent.
4. The "Tell us in your submission" questions (answered in §6) must be addressed explicitly in the BUIDL writeup.

### 2.5 Credits — solve your budget anxiety immediately
You are worried about a $5 OpenAI balance. **You do not need to be.** Phase II offers **$110K of computing credits** (Nansen on-chain data API $7K, **Elfa AI inference $36K**, Surf AI $30K, Orbit AI $30K, AltLLM $7K). **Action item, Day 1:** every team applies via the Computing Credit form linked on DevHub. Realistically you will be granted enough inference credit to never touch the $5 OpenAI balance. Nansen credits are *directly* useful — Nansen is on-chain intelligence, exactly our data layer, and a Nansen Growth Lead (Hurcan Polat) is a judge.

### 2.6 Judges — who you are actually building for
The panel: **Mantle** (Joshua, Whisker Yu), **DoraHacks** (Jonathan Breton), **Byreal** (James, Stanley), **BGA** (Glenn Tan, Tiffany Wang), **Elfa.ai CEO** (Tristan Teo), **Virtuals COO** (KK), **Nansen Growth Lead** (Hurcan Polat), **Animoca Brands** (David Ching), **Mirana Ventures** (Issac), **Tencent Cloud** (Vizta Tsang), **Surf AI** (Ryan), **Allora Network** (Difeng Jiang), **Hashed** (Dan Park), **Caladan** (Arun Kumar), **HKU Professor** (Jack Poon).

Read that list carefully. It is **VC-heavy** (Mirana, Hashed, Animoca, Caladan = trading/market-making, BGA = impact). These people evaluate companies for a living. They reward: a real problem, a defensible moat, a clear user, a credible go-to-market — *and they punish toy demos.* The Grand Champion line says it outright: **"Business Potential."** Auralis must read like a seed-stage company, not a hackathon entry. The HKU professor and BGA presence means **methodology rigour and "blockchain for good" framing** (compliance lowers fraud, widens safe access to real-world yield) earn points.

### 2.7 ERC-8004 agent identity — confirmed from the Q&A
The hackathon Q&A (your screenshots) confirms: **"You do not need to deploy your own ERC-8004. Mantle will provide the ERC-8004 Agent ID linked to each agent."** Auralis therefore **consumes/registers under the Mantle-issued ERC-8004 identity** rather than reinventing it, and references that identity in the agent's reputation surface. We still ship our own lightweight registries (ratings, attestations, decisions) — those are *our* data, not the identity standard.

### 2.8 Deployment target
Q&A is mixed (one answer says mainnet-only, the Deployment Award says "Mainnet or Testnet"). **Decision: deploy to Mantle Mainnet (chainId 5000).** Reasons: (a) Grand Champion and the track sponsor reward real mainnet usage; (b) Mantle gas is negligible — your $10 budget covers dozens of deploys + demo txs; (c) "real, verifiable, on-chain" is the hackathon's entire thesis ("every key decision recorded permanently on Mantle"). Keep a testnet deployment as a fallback/CI target only.

---

## 3. Strategic verdict on the GPT-5.5 plan

You gave me two GPT artefacts. They are inconsistent with each other, and one is for the wrong track. Here is the honest review.

### 3.1 What GPT delivered
- **"Sentinel RWA" verdict doc** — an AI risk/yield copilot for Mantle RWA assets. This *is* the RWA-track product and it is the basis of the Auralis mockups (images 5–14).
- **"Auralis Finance — AI DevTools" PDF** — a full functional spec for a **contract-audit assistant**. That is **Track 05 (AI DevTools), not Track 03 (AI × RWA).** It is off-target for your stated goal.

### 3.2 Verdict on the DevTools PDF — **mostly discard, partially salvage**
Do not build the DevTools product. It competes in the wrong track and dilutes focus. **Salvage three things from it:**
1. The **on-chain proof registry pattern** (`AuditReportRegistry` → store hashes + metadata URI, emit searchable events, `Pausable`, approved-submitter modifier). We reuse this pattern for `AuralisRatingRegistry`.
2. The **soulbound `AgentIdentity`** contract pattern (non-transferable ERC-721, `_update` override) — useful as a fallback if the Mantle ERC-8004 registry is not available in time.
3. The **secret-hygiene / `.env.example` / "never auto-deploy to mainnet" discipline** in its Antigravity checklist. That discipline directly addresses your Xyndicate trauma — we keep it.

Everything else in the PDF (Slither, solc workers, audit pipeline) is for a different product. Ignore it.

### 3.3 Verdict on "Sentinel RWA" — **good bones, wrong ceiling. Keep ~50%, rebuild the rest.**

**Keep (GPT got these right):**
- Simulation-first → advisory-second → guarded-execution-last. Correct and safety-aligned.
- The deterministic **policy/guardrail engine** as the trust mechanism.
- Storing only **hashes** on-chain, full data off-chain.
- The cost-control instincts (cache RPC, cache AI, no cron loops). We harden these in §16.
- The page set is roughly right (dashboard, opportunities, simulator, policies, decisions).

**Kill or downgrade:**
- **The core framing is too small.** "Here is yield + a risk score + a simulator" is what *every competent team* in this track ships. GPT even admits the safer version is "just a yield dashboard." That caps you at *finalist*, not *winner*.
- "Sentinel RWA" the name — you already have the stronger brand **Auralis Finance** with mockups and (presumably) a domain. Keep Auralis.
- GPT's risk engine is a vague formula. A winning entry needs a **published, defensible rating methodology** (§9) — that is the difference between "a number" and "a credit rating."
- GPT treats compliance as one throwaway line. **Compliance is explicitly in the rubric and is our single biggest differentiator.** We promote it to a full pillar (§10).

**The rebuild (what GPT missed):**
GPT optimised for "safe and aligned with the brief." You asked for "out of league." The reframe: Auralis is not a *dashboard that shows risk* — it is an **AI underwriting and compliance institution** for on-chain RWAs. Same surfaces (dashboard, simulator), radically higher ceiling, because now there is (a) a real **methodology**, (b) a real **compliance/eligibility engine** nobody else builds, and (c) an **infrastructure angle** (other apps can consume Auralis ratings + attestations) that turns a hackathon demo into a credible company — which is exactly what the VC-heavy panel and the Grand Champion criterion reward.

---

## 4. The product — what Auralis is, the gap it fills, who it's for

### 4.1 The gap in the Mantle ecosystem (this is the "what hasn't been filled" answer)
Mantle has spent the last two quarters becoming an **RWA distribution layer**: Tokenization-as-a-Service (TaaS), Ondo USDY (~$29M tokenized on Mantle), QCDT (regulated yield product), xStocks (tokenized equities with Bybit), MI4 (institutional index, ~$173M AUM), mETH/cmETH (~$1.07B). The **issuance and rails are solved.**

What is **not** solved — the genuine, fillable gap:
1. **No standardized, machine-readable risk rating for on-chain RWAs.** A wallet holding USDY, QCDT, sUSDe and an xStock has no equivalent of a credit rating, no unified risk score, no continuous monitoring of issuer health, attestation freshness, or depeg risk.
2. **No automated compliance/eligibility layer.** Most RWAs carry real transfer restrictions and jurisdiction gates (USDY is restricted for US persons; many tokenized securities are Reg-S/Reg-D). Today a user has *no way to know, before they buy,* whether they may legally hold an asset. This is a fraud-and-liability hole that blocks institutional adoption — exactly the adoption Mantle is chasing.
3. **No intelligent allocation across RWAs** that respects both risk *and* compliance constraints with hard guardrails.

**Auralis fills all three.** It is the missing intelligence-and-trust layer that sits *on top of* Mantle's issuance rails — complementing TaaS, not competing with it. (Deliberately: we do not build a tokenization engine. Tokenization is the sponsor's own product; competing with it is a strategic error, and building it in 23 days is infeasible. We are the layer that makes their tokenized assets *trustworthy and usable.*)

### 4.2 What Auralis is — definition
**Auralis is an AI agent and intelligence platform that does three things for tokenized real-world assets on Mantle:**

1. **Rates them** — every RWA/yield asset gets an *Auralis Rating* (a transparent, methodology-backed grade, e.g. `AAA → C`, plus a 0–100 risk score and a risk-adjusted yield), with an AI-written plain-language explanation.
2. **Compliance-checks them** — for any connected wallet, Auralis screens the wallet and produces a per-asset **eligibility verdict** (may you hold USDY? QCDT? an xStock?) and a downloadable, on-chain-attested compliance report.
3. **Manages them** — given the ratings, the compliance constraints, and the user's risk profile, the Auralis agent recommends and simulates portfolio rebalances, enforces deterministic policy guardrails, and executes only user-signed transactions — logging every decision permanently on Mantle.

The loop: **Observe → Rate → Verify → Simulate → Approve → Execute → Prove.**

### 4.3 Who it's for — well-defined user niches (the rubric demands this)
- **Niche 1 — The on-chain RWA allocator / treasury (primary).** DAOs, crypto funds, and sophisticated individuals holding $50K–$50M across mETH/USDY/USDe/MI4 who need risk discipline and an audit trail. They are the user in the mockups ($18.42M portfolio).
- **Niche 2 — The cautious yield seeker (mass-market, "lower the barrier").** A Web2-native user who wants real-world yield (Treasuries via USDY) but is paralysed by not knowing what is safe or whether they're even allowed to hold it. Auralis's onboarding + ratings + compliance verdict make RWA investing legible to them. This niche is how we win the "lower the barrier to real-asset investing" Path-B criterion.
- **Niche 3 — Compliance & risk officers / integrators (infrastructure).** Other Mantle apps and issuers who want to *consume* Auralis ratings and compliance attestations via API / on-chain registry. This is the business-potential / Grand Champion story.

### 4.4 The real-world utility (the "problem it solves in society" answer)
The RWA narrative's central promise is bringing safe, real-world yield (US Treasuries, regulated credit) to anyone with a wallet. The thing blocking that promise is **trust asymmetry**: ordinary users cannot assess RWA risk and cannot tell if they're compliant, so either they avoid RWAs entirely, or they get hurt. Auralis closes the asymmetry. It is, plainly, *consumer protection and institutional-grade due diligence, automated by AI, and made verifiable by the chain.* That framing lands with BGA ("Blockchain for Good"), the HKU academic, and every VC on the panel.

---

## 5. The three pillars, sub-track mapping, and path choice

### 5.1 Sub-track directions — your selection, resolved
You asked to span 2–3 of: AI-driven tokenization · intelligent RWA portfolio agent · automated KYC/compliance · RWA yield aggregator. Building all four is the "too broad" failure mode. Here is the calibrated **75/100-breadth** answer — **three, composed into one loop:**

| Pillar | Sub-track direction it satisfies | Role in the product |
|---|---|---|
| **Pillar 1 — Asset Intelligence & Rating** | RWA **yield aggregator** (+ pricing) | Ingests & rates every Mantle RWA; the comparison/discovery surface |
| **Pillar 2 — Compliance & Eligibility Agent** | Automated **KYC / compliance review** | Screens wallets, issues eligibility verdicts + on-chain attestations — **the differentiator** |
| **Pillar 3 — Portfolio Agent & Guarded Execution** | Intelligent **RWA portfolio management agent** | Recommends, simulates, and executes rebalances under policy guardrails |

**AI-driven tokenization is deliberately excluded from the build** (covered as a roadmap item only — §20/§ROADMAP). Rationale stated in §4.1: it competes with the sponsor's TaaS, and is infeasible in the timeframe. Excluding it is a feature, not a gap — it keeps you at 75/100 breadth instead of 100/100 chaos.

### 5.2 Path choice — **Path B: [AI-Driven] RWA Application**
The track offers Path A (Human-Driven RWA *Infrastructure* — tokenization/pricing/compliance tooling) and Path B (AI-Driven RWA *Application* — end-user products that lower the barrier).

**We submit under Path B.** Reasoning, explicitly:
- Path A's *track-specific* 40% criterion is **"completeness of asset tokenization flow"** — we deliberately do not build a tokenization flow, so we would score poorly on Path A's specific axis.
- Path B's track-specific 40% is **"clear asset category + well-defined target users + complete user experience"** — that is *exactly* our strength (defined asset categories in §6, three defined niches in §4.3, a premium complete UX in §13–14).
- "AI-Driven" fits: the Auralis *agent* is the actor — it rates, screens, and proposes. The human approves. That is the [AI-Driven] framing.
- **But** we still architect the rating + compliance layer as **consumable infrastructure** (public API + on-chain registries). This means we get Path-A-grade "infrastructure" credibility *without* being scored on Path A's tokenization axis. Best of both — and it directly strengthens the Grand Champion "business potential" case.

---

## 6. "Tell us in your submission" — the exact answers

The DoraHacks RWA track asks three questions. Bake these verbatim into the BUIDL writeup and the X thread.

**Q1. What type of real-world asset are you bringing on-chain?**
> Auralis works with the real-world assets already tokenized on Mantle — **tokenized U.S. Treasury and credit instruments** (Ondo's USDY, QCDT's regulated yield product), **tokenized equities** (xStocks), and the **institutional index** MI4 — alongside yield-bearing crypto-RWA assets mETH/cmETH and synthetic-dollar yield (USDe/sUSDe). What Auralis *newly brings on-chain* is the missing layer for these assets: **machine-readable, verifiable risk ratings and compliance/eligibility attestations** — i.e. the credit-rating and due-diligence data that real-world finance depends on, published permanently on Mantle.

**Q2. How does AI play a role?**
> AI is the reasoning core in three places. (1) **Rating** — an LLM transforms deterministic, auditable risk signals (collateral attestation freshness, issuer/counterparty exposure, liquidity depth, depeg deviation, oracle staleness, smart-contract surface) into a graded rating with a plain-language rationale. (2) **Compliance** — an AI agent interprets each asset's transfer restrictions and jurisdiction rules against a wallet's screened profile and produces an eligibility verdict with cited reasons. (3) **Portfolio** — the Auralis agent proposes risk- and compliance-constrained rebalances, explains its reasoning, and is gated by a deterministic policy engine before any execution. AI never holds keys and never auto-executes — it advises; deterministic code enforces; the human signs.

**Q3. How is it realized on Mantle?**
> Auralis deploys on **Mantle Mainnet (chainId 5000)**. Smart contracts — `AuralisRatingRegistry`, `AuralisComplianceAttestor`, `AuralisAgentRegistry`, `AuralisPolicyGuard` — store rating hashes, compliance attestations, agent identity/reputation, and decision logs as permanent, explorer-verifiable records. The agent registers under Mantle's **ERC-8004** agent-identity standard. Auralis reads live state from Mantle RPC across the Mantle RWA stack (USDY, QCDT, mETH/cmETH, USDe, MI4, Aave-on-Mantle, Merchant Moe, Agni) and links every proof to **Mantle Explorer**. The on-chain rating + attestation registries are public, so any Mantle app can consume Auralis as infrastructure.

---

*(Build specification continues in Part 2: architecture, contracts, methodology, pages, design, stack, cost-safety, docs, and the 23-day plan.)*

---

# PART 2 — BUILD SPECIFICATION

## 7. System architecture

The full diagram is in `AURALIS_ARCHITECTURE.svg`. In words, Auralis is a **7-layer system**:

```
┌─ LAYER 1 · CLIENT ────────────────────────────────────────────────┐
│  Marketing site + App (Next.js 15 App Router on Vercel)            │
│  wagmi 2 + viem 2 + RainbowKit · TanStack Query · Framer Motion    │
└────────────────────────────────────────────────────────────────────┘
            │ user-signed tx only          │ HTTPS / SSE
┌─ LAYER 2 · API & ORCHESTRATION ───────────────────────────────────┐
│  Next.js Route Handlers (Vercel serverless)                        │
│  SIWE auth · Zod-validated I/O · job orchestration · rate limits   │
└────────────────────────────────────────────────────────────────────┘
            │
┌─ LAYER 3 · INTELLIGENCE CORE ─────────────────────────────────────┐
│  Rating Engine · Compliance Engine · Portfolio Agent · Policy      │
│  Engine · AI Reasoning Service (schema-constrained, deterministic- │
│  fed). All pure functions over normalized data.                    │
└────────────────────────────────────────────────────────────────────┘
            │
┌─ LAYER 4 · DATA ADAPTERS (normalizers) ───────────────────────────┐
│  Mantle asset adapters (USDY/QCDT/mETH/cmETH/USDe/MI4/Aave/Moe)    │
│  Price+TVL adapter (DefiLlama/CoinGecko) · Sanctions/jurisdiction  │
│  list adapter · Oracle-freshness adapter                           │
└────────────────────────────────────────────────────────────────────┘
            │
┌─ LAYER 5 · MANTLE ON-CHAIN ───────────────────────────────────────┐
│  Mantle Mainnet (chainId 5000) · RatingRegistry · Compliance-      │
│  Attestor · AgentRegistry (ERC-8004) · PolicyGuard · Explorer      │
└────────────────────────────────────────────────────────────────────┘
            │
┌─ LAYER 6 · STORAGE & CACHE ───────────────────────────────────────┐
│  Supabase Postgres (jobs, ratings, attestations, portfolios)       │
│  Upstash Redis (RPC cache, AI-response cache, rate-limit, dedupe)  │
└────────────────────────────────────────────────────────────────────┘
            │
┌─ LAYER 7 · LIGHT WORKER (your VPS — NO keys, READ-ONLY) ──────────┐
│  Single scheduled refresh job: pulls asset state every 15 min,     │
│  recomputes ratings, writes to Postgres. Never signs. Never loops. │
└────────────────────────────────────────────────────────────────────┘
```

### 7.1 Request flow (the golden path)
```
User → connects wallet (RainbowKit) → SIWE message sign (no gas)
     → App reads ratings + portfolio from API (cached)
     → User runs Compliance Scan → API → Compliance Engine → verdict
     → User mints Compliance Attestation → USER-SIGNED tx → Mantle
     → User opens Simulator → Portfolio Agent proposes → Policy Engine checks
     → User approves → USER-SIGNED rebalance tx via PolicyGuard → Mantle
     → Decision hash logged → USER-SIGNED tx → RatingRegistry/DecisionLog
     → Decisions page renders proof + Mantle Explorer link
```
**There is exactly one server-held key in the entire system, used exactly once: the deployer key for contract deployment.** After deployment it is removed from every environment. See §16.

### 7.2 Why this topology (design rationale — put this in `docs/DECISIONS.md`)
- **Vercel-only app + VPS read-only worker** → eliminates Railway, the source of your Xyndicate runaway. The VPS worker has no private key and cannot sign anything; the worst-case failure is stale data, not drained funds or 4,000 commits.
- **Intelligence Core as pure functions** → fully unit-testable, deterministic, demoable offline. Judges can read the rating logic and verify it.
- **User-signed everything** → zero custody, zero auto-execution. This is both a safety property and a *marketing* property for a compliance product.

---

## 8. Smart contracts

Four contracts. Solidity `0.8.24`, OpenZeppelin, deployed to Mantle Mainnet, verified on Mantle Explorer. Kept intentionally minimal — they store **proofs**, never **funds**.

### 8.1 `AuralisRatingRegistry.sol`
Public, permissionless-read registry of Auralis Ratings + decision logs.
- **Stores:** `assetId` → latest `{ratingGrade, riskScore (0–100), ratingHash, methodologyVersion, metadataURI, timestamp}`.
- **Key functions:** `anchorRating(...)` (anchors a content-addressed rating hash; callable by approved publisher *or* permissionlessly by any wallet wanting to pin a public rating), `logDecision(bytes32 decisionHash, string actionType, uint8 riskScore)` (user-signed; this is the on-chain decision log), `getRating(assetId)`.
- **Events:** `RatingAnchored`, `DecisionLogged` — both indexed for the Decisions/Proofs page.
- **AI-on-chain hook (Deployment Award requirement):** `logDecision` writes an AI-produced result (the agent's decision + risk score) on-chain. ✅ satisfies "AI-powered function callable on-chain."
- Pattern reused from the salvaged DevTools `AuditReportRegistry`: `Ownable`, `Pausable`, `reportHashUsed` dedupe mapping.

### 8.2 `AuralisComplianceAttestor.sol`
Issues privacy-preserving, reusable compliance attestations.
- **Stores:** `attestationId` → `{wallet, assetClassId, verdict (Eligible/Restricted/Denied), checkHash, jurisdictionTag, validUntil, timestamp}`.
- **Key functions:** `mintAttestation(...)` (**user-signed** — the wallet attests its own check result; the check *inputs* stay off-chain, only the hash + verdict go on-chain → privacy-preserving), `isEligible(wallet, assetClassId)` (cheap read for other apps to consume), `revoke(attestationId)`.
- **Events:** `AttestationMinted`, `AttestationRevoked`.
- Optional tiny mint fee (a few cents of MNT) — this is the "real payment" surface you wanted, kept trivial and optional.

### 8.3 `AuralisAgentRegistry.sol`
Agent identity + reputation. **Consumes Mantle's ERC-8004** where available; this contract is the thin Auralis-side reputation ledger.
- **Stores:** agent `tokenId` (or ERC-8004 ref) → `{ratingsIssued, attestationsMinted, decisionsLogged, reputationScore}`.
- Increments are driven by registry events. Surfaces the agent's on-chain track record on the `/app/agent` page.
- If Mantle's ERC-8004 registry is unavailable at build time, this contract falls back to the salvaged soulbound `AgentIdentity` pattern (non-transferable ERC-721, `_update` override reverting transfers).

### 8.4 `AuralisPolicyGuard.sol`
The on-chain enforcement of portfolio guardrails — the contract that makes "guarded execution" real and safe.
- **Stores:** per-wallet policy `{maxPerAsset, maxPerProtocol, maxSlippageBps, minConfidence, cooldownSeconds, humanApprovalThreshold, paused}`.
- **Key function:** `executeRebalance(RebalanceParams)` — a user-signed call that **reverts** if any guardrail is violated (exposure cap exceeded, cooldown active, slippage too high). The AI *proposes* the params; the *contract* refuses bad ones.
- **Events:** `PolicyUpdated`, `RebalanceExecuted`, `RebalanceBlocked`.
- For the hackathon, rebalances route to whitelisted Mantle targets (Aave-on-Mantle, Merchant Moe) at small/demo size, or run in simulation mode. **No autonomous execution path exists** — `executeRebalance` can only be entered by a user-signed transaction.

> **Total estimated gas to deploy all four + verify + demo txs: well under $10 on Mantle.**

---

## 9. The Rating Engine — methodology (this is the "credit agency" moat)

A number is not a rating. A *methodology* is. We publish `docs/RISK_METHODOLOGY.md` as a real document so Auralis reads like a rating agency. The engine is **deterministic** — AI explains it, AI does not invent it.

### 9.1 The seven risk dimensions
Each Mantle RWA asset is scored 0–100 (lower = safer) on seven dimensions, each with a documented sub-formula:

| # | Dimension | Example signals |
|---|---|---|
| 1 | **Asset / instrument risk** | Treasury-backed (USDY) vs synthetic-dollar (USDe) vs LST (mETH) vs equity (xStock) — base risk class |
| 2 | **Issuer / counterparty risk** | Issuer concentration, attestation/audit recency, regulated vs unregulated |
| 3 | **Liquidity risk** | On-chain depth (Merchant Moe/Agni pools), exit time, redemption mechanics |
| 4 | **Peg / valuation risk** | Deviation of price from NAV/peg over trailing window; volatility |
| 5 | **Oracle / data risk** | Staleness of the price/attestation feed; number of independent sources |
| 6 | **Smart-contract risk** | Audit status, contract age, upgradeability, TVL-at-risk surface |
| 7 | **Concentration risk (portfolio-level)** | Over-exposure to one asset/issuer/protocol within the user's portfolio |

### 9.2 Composite score & grade
```
RiskScore = Σ (weightᵢ × dimensionScoreᵢ)        // weights documented & versioned
RiskAdjustedYield = nominalAPY − riskPenalty(RiskScore)
AuralisRating = gradeBand(RiskScore)              // AAA / AA / A / BBB / BB / B / C
```
The **methodology version** (`v1.0`) is written into every on-chain rating, so a rating is always reproducible and auditable. This versioning is what separates "a hackathon score" from "infrastructure."

### 9.3 Where AI sits
The AI Reasoning Service receives the **finished deterministic vector** (the 7 scores + signals) and produces: the plain-language rationale, the "what would change this rating" counterfactual, and the human-readable risk summary. It is **schema-constrained** (Zod) and **never** asked to produce the score itself. This is the anti-hallucination contract and it is the defensible design — say it explicitly to judges.

---

## 10. The Compliance & Eligibility Engine — the differentiator

This is the pillar no competitor will build well. Treat it as the centrepiece of the demo.

### 10.1 What it does
1. **Wallet screening** — screens the connected wallet against public sanction/OFAC-style lists and on-chain risk heuristics (exposure to flagged addresses). *Uses public list data; we do not collect government IDs — this is on-chain compliance, not identity KYC, which keeps it feasible, privacy-respecting, and honest.*
2. **Per-asset eligibility** — interprets each RWA's real transfer restrictions and jurisdiction gates (USDY → restricted for US persons; tokenized securities → Reg-S/Reg-D style gates; QCDT → regulated-product constraints) against a self-declared jurisdiction + the screen result, and returns a verdict: **Eligible / Restricted / Denied**, each with cited reasons.
3. **Compliance report** — a clean, exportable report (per-asset verdicts, screen summary, timestamp, methodology version).
4. **On-chain attestation** — the user mints a privacy-preserving attestation via `AuralisComplianceAttestor` (only the verdict + hash go on-chain; inputs stay private). This attestation is **reusable** — other Mantle apps can check `isEligible(wallet, assetClass)` before letting a user buy a gated RWA.

### 10.2 Why it scores
- **"Compliance awareness"** is named verbatim in the Track 60% rubric. Most teams will write one sentence about it. We ship a working engine + a published `docs/COMPLIANCE_FRAMEWORK.md`.
- It is genuine **RWA infrastructure** — the reusable attestation is the part that makes Auralis a company, not a demo (Grand Champion: "business potential").
- It is **"blockchain for good"** — it protects ordinary users from holding assets they're not allowed to, and gives issuers a compliance primitive. That framing is aimed straight at the BGA judges and the HKU academic.

> ⚠️ **Honesty guardrail:** Auralis provides *compliance tooling and risk information*, not legal advice. Every compliance surface carries a clear, visible disclaimer ("Auralis is not a law firm; verdicts are informational"). This is both ethically correct and credibility-preserving in front of a panel that includes regulated-finance people.

---

## 11. The AI Agent design & Skills

### 11.1 Agent loop
```
1 Observe   pull normalized asset + portfolio + wallet state
2 Rate      deterministic Rating Engine → 7-vector + grade
3 Verify    Compliance Engine → per-asset eligibility verdicts
4 Reason    AI Reasoning Service → explanations + rebalance proposal
5 Guard     Policy Engine (off-chain) + PolicyGuard (on-chain) check
6 Approve   human reviews in Simulator; nothing executes without this
7 Execute   user-signed tx only
8 Prove     decision hash + result logged on Mantle; Explorer link
```

### 11.2 Agent Skills (the "many skills" surface you wanted)
Auralis's agent is presented as a registry of discrete, inspectable **Skills**, each callable, each producing a typed output and (where on-chain) a receipt. This gives the "skill count + integration count" richness past hackathons rewarded, and ties to the ERC-8004 reputation idea.

| Skill | Function | On-chain? |
|---|---|---|
| `rate.asset` | Produce an Auralis Rating for an asset | anchors hash |
| `rate.portfolio` | Blended portfolio risk score | — |
| `screen.wallet` | Sanctions / on-chain risk screen | — |
| `check.eligibility` | Per-asset compliance verdict | — |
| `attest.compliance` | Mint reusable compliance attestation | user-signed tx |
| `simulate.rebalance` | Model a rebalance, before/after | — |
| `explain.risk` | Plain-language risk rationale | — |
| `monitor.depeg` | Watch peg deviation, alert | — |
| `monitor.attestation` | Watch issuer attestation freshness | — |
| `propose.allocation` | Risk+compliance-constrained allocation | — |
| `log.decision` | Write decision proof to Mantle | user-signed tx |
| `report.compliance` | Generate exportable compliance report | — |

12 skills, all real, all demoable. The Skills registry is a page (`/app/agent`).

### 11.3 Model routing
Primary: Elfa AI inference credits (apply Day 1). Fallback: OpenAI ($5 balance, schema-constrained, cached aggressively so it is barely touched). Every AI response is cached in Redis keyed by input hash → repeated demo runs cost nothing and are deterministic.

---

## 12. Mantle ecosystem integration map

Mantle Ecosystem Contribution is **25% of Grand Champion** and inside the **60%** of the track score. Maximise legitimate surface area:

| Integration | How Auralis uses it |
|---|---|
| **Mantle Mainnet (chainId 5000)** | All 4 contracts deployed + verified |
| **Mantle RPC** | Live read of asset state, balances, events |
| **Mantle Explorer** | Every proof links out to explorer |
| **ERC-8004** (Mantle-issued) | Auralis agent identity + reputation |
| **Ondo USDY** | Rated; compliance-gated; portfolio asset |
| **QCDT** (regulated yield) | Rated; compliance-gated — strong compliance story |
| **xStocks** (tokenized equities) | Rated; the clearest "tokenized security" compliance case |
| **MI4** (institutional index) | Rated as a diversified RWA holding |
| **mETH / cmETH** | Rated (LST/restaked yield); portfolio assets |
| **USDe / sUSDe** (Ethena) | Rated (synthetic-dollar yield) |
| **Aave on Mantle** | Yield source + a whitelisted rebalance target |
| **Merchant Moe / Agni** | Liquidity-depth data for the liquidity-risk dimension |
| **Mantle TaaS** | Referenced as the issuance layer Auralis sits on top of |
| **Nansen API** (credit sponsor) | On-chain intelligence signals for screening/rating |

That is **14+ ecosystem touchpoints** — depth the Mantle judges (who sponsor this exact track) will notice immediately.

---

## 13. Full information architecture — every page, subpage, mini-subpage

Two surfaces: the **marketing site** (public, no wallet) and the **app** (wallet-gated). Total: **9 marketing routes, 11 app routes**, plus global components. Every button specified here must work before submission — no dead ends (your Apogee lesson).

### 13.1 Marketing site (public)
| Route | Contents | Notes |
|---|---|---|
| `/` | Hero ("Risk intelligence for real-world yield"), live stats strip, 3-pillar feature blocks, "Observe→Prove" how-it-works, supported assets row, footer | Image 10 is the baseline — we elevate it (§14) |
| `/product` | Deep dive on the 3 pillars with motion/scrollytelling | |
| `/ratings` | **Public Auralis Ratings explorer** — browse every rated Mantle RWA, no wallet needed | SEO + Community-Voting magnet; proves the "infrastructure" angle |
| `/ratings/[assetId]` | Public rating detail: 7-dimension breakdown, history, methodology link | |
| `/security` | Non-custodial model, "one key used once," guardrails, disclaimers | Trust page — judges will look |
| `/docs` | Documentation hub (links to all docs in §17) | |
| `/methodology` | Public, readable version of the rating + compliance methodology | The "rating agency" credibility surface |
| `/faq` | FAQ accordion (what is Auralis, is it custodial, is this legal/financial advice, supported assets, fees, roadmap) | |
| `/company` *(light)* | Mission, the "next trillion dollars" thesis, contact, roadmap teaser | |

### 13.2 The app (wallet-gated) — routes & their subpages

**`/app` — Welcome & Onboarding**
The "Welcome to Auralis" experience you described: a 5-step guided mini-flow with **Back / Next / Skip**, persisted so it shows once.
- Step 1 — Connect wallet (RainbowKit: MetaMask, WalletConnect, Coinbase, Rabby).
- Step 2 — Verify network (Mantle Mainnet, chainId 5000) — auto-prompt to switch.
- Step 3 — Choose mode: **Simulation / Advisory / Guarded Execution** (image 8).
- Step 4 — Set risk profile (Conservative→Aggressive; max drawdown; liquidity preference).
- Step 5 — Run your first Compliance Scan (lands the differentiator in the first 90 seconds).
- A right-rail "Your configuration" card mirrors selections live (image 8).

**`/app/dashboard` — Portfolio Dashboard** (image 9)
- Top KPI row: Total value · Blended APY · **Auralis Risk Score** · Available liquidity.
- Allocation donut (DeFi / RWA / Stablecoins) · 30-day performance chart.
- **AI recommendation card** (one-click → Copilot or Simulator).
- Positions table (asset, source, value, APY, **rating badge**, risk, action).
- Recent decisions feed (links to `/app/decisions`).
- System status widget.

**`/app/opportunities` — Yield Aggregator** (image 7)
- Filter bar: asset class · protocol · risk · liquidity · search.
- Opportunities table: asset, APY (+Δ), TVL, risk, **Auralis Rating**, "fit" tag, action.
- Yield-trends multi-line chart.
- "Suggested for this portfolio" right rail.
- Subpage **`/app/opportunities/[assetId]`** — Asset Strategy detail (image 6): current APY, allocation, liquidity, **Auralis Rating seal**, 30-day performance, yield composition donut, **7-dimension risk breakdown**, "where it's used," AI view card, actions (Add to simulator / Set exposure cap / View on explorer / **Run eligibility check**).

**`/app/compliance` — Compliance & Eligibility Agent** *(new — the centrepiece)*
- **Mini-subpage: Wallet Scan** — run/refresh the screen; screen summary; risk flags.
- **Mini-subpage: Eligibility Matrix** — every RWA × your jurisdiction → Eligible/Restricted/Denied with cited reasons.
- **Mini-subpage: Compliance Report** — exportable report; "Mint attestation" CTA.
- **Mini-subpage: Attestations** — history of minted attestations with Mantle Explorer links + validity.
- Visible "informational, not legal advice" disclaimer on every view.

**`/app/simulator` — Rebalance Simulator** (image 5)
- Scenario tabs: Base case / Stress case / Conservative.
- Current vs Proposed portfolio (donuts + blended APY delta).
- Rebalance adjustments table with target sliders.
- Impact summary rail: APY change · risk-score change · liquidity impact · est. tx cost.
- Route preview (steps) · "Review approval" CTA → guarded execution flow.

**`/app/copilot` — AI Copilot** (image 14)
- Conversational agent: executive summary, recommended actions (each with +APY estimate), expected outcome (APY / risk / risk-adjusted-yield deltas), reasoning factors, policy-check summary, risk alerts.
- "Open simulator" / "Save rule" actions.
- "Not financial advice" disclaimer inline.

**`/app/policies` — Policy Guardrails** (image 13)
- Guardrail editor: max-per-asset, max-per-protocol, min-liquidity, slippage, min-AI-confidence, rebalance cooldown, human-approval threshold (each a toggle + slider).
- Policy-health card · recent blocked actions · policy-check preview.
- **Subpage: Templates** — preset guardrail packs (Conservative / Balanced / Institutional).
- Editing here writes to `AuralisPolicyGuard` (user-signed).

**`/app/decisions` — Decisions & On-chain Proofs** (image 12)
- Filterable decision ledger: action, assets, AI confidence, policy result, **tx hash**, time, outcome.
- Right rail "Decision details": inputs, AI reasoning summary, policy checks, simulation result, **on-chain log details + Explorer link**.
- This page *is* the "every decision recorded on Mantle" thesis made visible.

**`/app/agent` — Agent Identity & Skills** *(new)*
- ERC-8004 agent identity card + reputation (ratings issued / attestations / decisions logged).
- **Skills registry** (the 12 skills, §11.2) — each inspectable, with last-run + receipt.
- On-chain activity feed.

**`/app/integrations` — Integrations & Settings** (image 11)
- Connected services grid (Mantle RPC, wallet, USDY, QCDT, mETH, Aave, price feeds, on-chain logger) with status.
- Environment card (network, chainId, RPC, explorer).
- System health · security controls (non-custodial confirmation) · refresh-interval config.

**`/app/settings` — Account Settings**
- Risk profile, notifications, jurisdiction declaration, mode, theme, danger zone.

### 13.3 Global components (on every app page)
- **Auralis Copilot chat widget** — bottom-right, collapsible; the agent answers questions in context ("why is USDY rated A?"). The mini-version of `/app/copilot`.
- **Top bar** — search (asset/protocol/opportunity), portfolio selector, wallet pill, network indicator.
- **Command palette** (⌘K) — jump to any asset, page, or skill. A premium-feel detail judges notice.
- **Toast system** — every tx: pending → confirmed → Explorer link.
- **Skeleton loaders** — progressive data render, never a blank screen.

---

## 14. Design system & UX direction — "premium" defined concretely

You said "premium" must mean *top-tech-software* quality, benchmarked against the AI×RWA leaders. The mockups (images 5–14) are a **solid B+** baseline — clean, light, data-dense. To reach the A+ that wins the $3K Best UI/UX and impresses "at first glance," apply the following. The design DNA we are targeting is the institutional-fintech / RWA cohort — Ondo Finance, Superstate, Maple, Securitize, Centrifuge — crossed with the best modern product UIs (Linear, Mercury, Ramp, Stripe). Calm, exact, confident; not crypto-neon, not generic-AI-gradient.

### 14.1 Brand & palette — evolve away from default blue
The mockups use a generic SaaS blue. Evolve it so Auralis looks proprietary:
- **Ink** `#0B1220` (near-black navy) — text, headers, primary surfaces.
- **Paper** `#FBFBF9` (warm off-white) — app background; warmth signals "finance," not "crypto."
- **Auralis Teal** `#0E9E8C` — signature primary accent (CTAs, active states). Distinct from the default-AI blue everyone ships.
- **Signal colors** — Emerald `#0F9D58` (positive/eligible), Amber `#D9870B` (caution/restricted), Rose `#D64550` (negative/denied).
- **Rating seal accents** — a restrained brass/gold reserved *only* for the Auralis Rating badge, so a rating reads like a seal of credibility.
- Optional dark mode (`#0B1220` surfaces) — nice-to-have, not Day-1.

### 14.2 Typography
- **Display / big numbers:** a refined serif (e.g. *Newsreader* or *Source Serif*) for hero headlines and large KPI figures — this is the "credit-rating institution" cue and instantly separates Auralis from every Inter-only crypto app.
- **UI / body:** a precise grotesk (*Inter* or *Geist*) for all interface text.
- **Mono:** *Geist Mono* / *IBM Plex Mono* for addresses, hashes, tx data.

### 14.3 The signature components (build these to a high finish)
- **Auralis Rating Badge** — a circular/seal component (`AAA`…`C`) with the brass accent; appears in tables, asset pages, the public explorer. This single component carries the brand.
- **7-Dimension Risk Radar** — a radar/spider chart for the rating breakdown. Memorable, screenshots well, communicates the methodology instantly.
- **Eligibility Matrix** — a crisp asset×jurisdiction grid with Eligible/Restricted/Denied chips.
- **Decision Proof Card** — a receipt-style component with the hash, the Explorer link, and a verified checkmark.
- **Before/After portfolio donuts** with an animated morph transition (Framer Motion) in the Simulator.

### 14.4 Motion & interaction (this is 30% of the UI/UX score — "Interaction & Flow")
- Page transitions and number count-ups via Framer Motion — subtle, fast (150–250ms), never bouncy.
- Chart draw-on animations; donut morphs on simulate.
- Optimistic UI on every action; skeletons everywhere; toasts on every tx.
- ⌘K command palette; full keyboard nav.
- Hover-reveal detail on data points (the DevHub site does this on track cards — match that polish).

### 14.5 AI Interaction Design (25% of the UI/UX score)
- AI output is **structured, not a wall of chat** — executive summary → actions → expected outcome → reasoning → caveats (image 14 has the right skeleton; refine it).
- Every AI surface shows a **confidence indicator** and the **deterministic inputs** it reasoned over (transparency).
- Streaming responses (SSE) so the agent feels alive.
- Persistent, visible "AI is advisory; verify decisions; not financial advice" — honesty is part of good AI UX and the panel will respect it.

### 14.6 Accessibility / Web2-onboarding (15% of the UI/UX score)
- The 5-step welcome flow (§13.2) *is* the Web2-onboarding answer — name it as such in the submission.
- WCAG-AA contrast, full keyboard support, focus rings, `prefers-reduced-motion` respected, semantic HTML, alt text.
- Plain-language everywhere; jargon gets a tooltip. A first-time user must understand "what Auralis does" within 10 seconds on `/` and within the welcome flow in-app.

### 14.7 Frontend execution standard
Build the marketing site and app against the `frontend-design` skill conventions. Component library: **shadcn/ui** (Radix primitives) themed with the Auralis tokens. Charts: **Recharts** (or visx for the radar). No dead buttons, no `localStorage`-dependent flows in shared demos, every route reachable from nav.

---

## 15. Tech stack & repository structure

### 15.1 Stack (lean, $0-leaning, proven)
- **Frontend/App:** Next.js 15 (App Router), TypeScript strict, Tailwind + shadcn/ui, Framer Motion, Recharts.
- **Web3:** wagmi 2 + viem 2 + RainbowKit; ethers only server-side if needed.
- **API:** Next.js Route Handlers (Vercel serverless) — no separate API server.
- **Intelligence Core:** TypeScript pure modules; Zod schemas throughout.
- **AI:** Elfa AI credits (primary) / OpenAI (fallback), schema-constrained, Redis-cached.
- **Contracts:** Solidity 0.8.24, Hardhat (TS) + OpenZeppelin.
- **DB:** Supabase Postgres (free tier). **Cache/rate-limit:** Upstash Redis (free tier).
- **Worker:** one read-only Node process on your VPS (cron via systemd timer, 15-min interval, no keys).
- **Hosting:** Vercel (app). **No Railway. No Render.** (Xyndicate lesson.)
- **Monitoring:** Sentry (free) + Vercel logs.

### 15.2 Repo structure (monorepo, pnpm + Turborepo)
```
auralis/
├─ apps/
│  ├─ web/                 Next.js 15 — marketing + app
│  └─ worker/              read-only refresh worker (VPS, no keys)
├─ packages/
│  ├─ contracts/           Hardhat: 4 contracts, tests, deploy scripts
│  ├─ core/                Intelligence Core: rating, compliance, policy, agent
│  ├─ adapters/            Mantle asset + price + sanctions adapters
│  ├─ ui/                  shared shadcn-based component library + tokens
│  └─ types/               shared Zod schemas + TS types
├─ docs/                   the full documentation set (§17)
│  └─ diagrams/            AURALIS_ARCHITECTURE.svg + sequence diagrams
├─ .env.example            every var, placeholder values, committed
├─ .github/workflows/      lint · typecheck · test · contract tests (CI only)
└─ README.md               the showcase README (§17)
```

### 15.3 Environment & secret hygiene (non-negotiable)
- `.env` / `.env.local` / `.env.production` gitignored; `.env.example` committed with placeholders.
- `DEPLOYER_PRIVATE_KEY` exists in **one** local `.env` for the deploy step, then is deleted from every environment. It is **never** in Vercel, never in the worker, never in the browser bundle.
- An `AGENTS.md` at repo root instructs any AI coding agent: never commit secrets, never deploy to mainnet without explicit human approval, never introduce a signing key into a scheduled job.

---

## 16. Cost plan & the anti-runaway safety architecture

You lost real money on Xyndicate: ~4,000 commits and drained funds because automated transaction signing was routed through Vercel/Railway in a loop. This section exists so that cannot recur. **Read it twice.**

### 16.1 The five hard rules
1. **No private key in any always-on or scheduled process.** The worker has no key. Vercel functions have no signing key. Only the local deploy step touches the deployer key, once.
2. **No autonomous on-chain execution.** There is no code path that signs a transaction without a human clicking and their wallet prompting. `executeRebalance` is reachable only via a user-signed tx.
3. **No auto-deploy loops.** CI runs lint/typecheck/test only — CI never deploys contracts and never deploys to mainnet. Mainnet deploy is a manual, local, human-run command.
4. **No tight-interval crons.** The single worker job runs every 15 minutes, is idempotent, has a hard per-run cap, and only reads + writes Postgres. If it fails, it fails safe (stale data).
5. **Every external call is cached and rate-limited.** RPC reads cached in Redis; AI responses cached by input hash; per-user and per-IP rate limits on every API route.

### 16.2 Budget — projected actual spend
| Item | Plan | Cost |
|---|---|---|
| Vercel | Hobby/free | $0 |
| Supabase | Free tier | $0 |
| Upstash Redis | Free tier | $0 |
| Mantle RPC | Public + free backup | $0 |
| VPS | Already owned | $0 |
| AI inference | Elfa/Surf credits (applied Day 1) | $0 |
| OpenAI | Fallback only, cached | ≤ $5 |
| Mantle gas | 4 contracts + verify + demo txs | ≤ $10 |
| Domain | `auralis.finance` / `.xyz` | ~$3–12 |
| **Total** | | **~$15–30** — under your $50 ceiling with headroom |

The reason the budget is safe is structural: **there is nothing in the architecture that can spend money in a loop.** The worst-case failure mode is "data is 15 minutes stale," not "funds gone."

---

## 17. Documentation plan — engineered to beat Apogee 20×

Apogee's docs were strong (README, JUDGE_GUIDE, REVIEWER, DEPLOYMENT, ARCHITECTURE, API, TUTORIAL, DECISIONS, video-script, bilingual). To go "100% better," Auralis ships a documentation set that reads like a company's, not a hackathon's — and crucially adds the two documents Apogee never had an equivalent of: a **published methodology** and a **compliance framework**. Those make Auralis look like an institution.

### 17.1 The documentation set (all in `docs/`, linked from README)
| Doc | Purpose |
|---|---|
| `README.md` | Showcase front door — pitch, problem, solution, architecture SVG, integrations table, quickstart, deployed addresses, links. Bilingual EN + 中文 summary (Apogee did this; judges include CN-ecosystem partners). |
| `ARCHITECTURE.md` | The 7-layer system + sequence diagrams + the SVG |
| `RISK_METHODOLOGY.md` | **The 7-dimension rating framework, formulas, weights, versioning** — the credibility centrepiece |
| `COMPLIANCE_FRAMEWORK.md` | The eligibility model, jurisdiction logic, attestation design, disclaimers |
| `AGENT_DESIGN.md` | The agent loop, the 12 Skills, model routing, anti-hallucination contract |
| `CONTRACTS.md` | All 4 contracts: purpose, functions, events, addresses, verification links |
| `API.md` | REST surface for consuming Auralis ratings/attestations as infrastructure |
| `SECURITY.md` | Non-custodial model, the one-key-once rule, the five hard rules, threat model |
| `DEPLOYMENT.md` | Reproducible setup: env vars, deploy steps, Vercel + VPS-worker setup |
| `JUDGE_GUIDE.md` | The judges' fast path — 5-minute and 15-minute walkthroughs, test wallet, what to click, deployed addresses, known limitations (honest) |
| `TESTING.md` | Unit/integration/contract test coverage map |
| `DECISIONS.md` | ADR log — every significant architecture decision + rationale |
| `TUTORIAL.md` | "Rate and compliance-check an asset in 10 minutes" |
| `ROADMAP.md` | Post-hackathon: tokenization intelligence, more chains, issuer API, the business plan |
| `video-script.md` | The ≥2-min demo video script + storyboard |
| `CONTRIBUTING.md` + `AGENTS.md` + `LICENSE` (MIT) | Open-source hygiene |

### 17.2 Why this wins
- **Product Completeness (20% Grand Champion)** and the Deployment Award both gate on documentation quality. A `JUDGE_GUIDE.md` that hands a tired judge a 5-minute path is worth real points.
- `RISK_METHODOLOGY.md` + `COMPLIANCE_FRAMEWORK.md` are the documents that make the panel believe Auralis is a company. No other team will have them.
- The README must be visually rich (architecture SVG, badges, integration table, deployed-address table) — first impression for every judge who opens GitHub.

---

## 18. The 23-day execution plan & 5-person team

### 18.1 The pod (5 senior engineers)
| Role | Owns |
|---|---|
| **E1 — Tech Lead / Protocol** | The 4 contracts, deployment, Mantle integration, repo architecture, `AGENTS.md`, final QA gate |
| **E2 — Backend / AI Engineer** | Intelligence Core: Rating Engine, Compliance Engine, Policy Engine, AI Reasoning service, worker |
| **E3 — Frontend Lead** | App architecture, wagmi/viem wiring, state, data viz, all `/app` routes |
| **E4 — Product Designer / Frontend** | Design system, marketing site, motion, Best-UI/UX ownership, onboarding flow |
| **E5 — Full-stack / Integrations & DevRel** | Data adapters, Supabase/Upstash, docs, demo video, X campaign, mentor clinics |

### 18.2 Five phases over 23 days (start 23 May → submit 12 June, 3-day buffer to 15 June)

**Phase 0 — Foundations · Days 1–3 (23–25 May)**
- Day 1 (all): apply for computing credits; register the BUIDL on DoraHacks; secure domain; repo scaffold (monorepo, CI, `.env.example`, `AGENTS.md`); design tokens locked.
- E1: contracts skeleton + Hardhat + deploy to Mantle *testnet*.
- E2: adapters return mocked-then-real normalized data; Rating Engine v0.
- E3/E4: app shell, nav, design system, marketing `/` first paint.
- Exit: app runs locally, contracts on testnet, ratings compute for ≥3 assets.

**Phase 1 — Core pillars · Days 4–9 (26–31 May)**
- Rating Engine complete (7 dimensions, all Mantle assets); `/app/dashboard`, `/app/opportunities`, `/app/opportunities/[assetId]`, public `/ratings`.
- Compliance Engine v1 + `/app/compliance` (all 4 mini-subpages).
- Simulator v1.
- **29 May: E5 attends "Previous Hackathon Winner Experience Sharing" clinic** — feed lessons back.
- Exit: a user can connect, see rated assets, run a compliance scan, simulate a rebalance.

**Phase 2 — Agent, on-chain, mainnet · Days 10–15 (1–6 Jun)**
- Copilot, Policies, Decisions, Agent/Skills pages.
- Wire all 4 contracts; **deploy to Mantle Mainnet + verify on Explorer**.
- User-signed flows: SIWE, mint attestation, log decision, guarded rebalance.
- **Exit = the 20-Project Deployment Award checklist is fully satisfied.** This is the hard milestone.

**Phase 3 — Polish & docs · Days 16–19 (7–10 Jun)**
- Marketing site complete; 5-step onboarding; Copilot chat widget; FAQ; command palette; motion pass.
- All 16 docs written; README finalised; architecture SVG embedded.
- Full QA: every route, every button, every tx on mainnet, mobile responsive.

**Phase 4 — Submission · Days 20–23 (11–14 Jun)**
- Record + edit the ≥2-min demo video (script from `video-script.md`).
- Write + publish the X thread (`#MantleAIHackathon`) — kick off Community Voting campaign.
- Finalise DoraHacks BUIDL with the §6 answers, addresses, links.
- Submit by **12 Jun**; days 22–23 are pure buffer + bug-fix.

**Phase 5 — Demo Day prep · 15 Jun → 2 Jul**
- Rehearse the live demo; tighten the weakest surface; community-voting push; mentor clinics; harden anything judges flagged.

### 18.3 Community Voting campaign (the other $8.5K)
E5 owns an X presence from Day 4: build-in-public thread, the public `/ratings` explorer as the shareable hook ("we rated every RWA on Mantle — check yours"), short clips of the Risk Radar and Compliance Matrix, tag `@0xMantle` and credit sponsors. Engagement is the metric — make the *public ratings explorer* the viral surface.

---

## 19. Prize-by-prize scorecard — how each is won

| Prize | The criterion | How Auralis wins it |
|---|---|---|
| **Track First Prize $8.5K** | AI×RWA depth, technical completeness, Mantle integration, **compliance awareness**, real-world validity, defined users | Three composed pillars; 14+ Mantle integrations; a *working* compliance engine + published framework (almost no one else will have this); three defined niches; a complete UX |
| **Grand Champion $9K** | Technical Depth 30 · Innovation 25 · Mantle Eco 25 · Completeness 20 + **business potential** | Methodology-backed rating engine (depth); the rating+compliance *infrastructure* angle (innovation + business potential); 14+ integrations on the sponsor's own track; a genuinely complete, documented product |
| **Best UI/UX $3K** | Visual 30 · Interaction 30 · AI-UX 25 · Accessibility 15 | §14 in full: serif-led institutional design, signature components, Framer-Motion interaction, structured/transparent AI surfaces, the 5-step Web2 onboarding |
| **Top-20 Deployment $1K** | Hard checklist | Satisfied by end of Phase 2 (Day 15): mainnet + verified + AI-function-on-chain + public demo + addresses + video + README |
| **Community Voting $8.5K** | X engagement | The build-in-public campaign + the public `/ratings` explorer as the shareable hook |

---

## 20. Risk register — what could go wrong, and the mitigation

| Risk | Mitigation |
|---|---|
| Scope creep past 75/100 breadth | Tokenization explicitly excluded; 3 pillars locked; stretch items (dark mode, more chains, issuer API) are clearly post-hackathon in `ROADMAP.md` |
| Live RWA data is thin/unreliable | Adapters degrade gracefully to cached + documented reference data; never block a demo on a flaky API |
| Mantle ERC-8004 registry not ready in time | `AuralisAgentRegistry` falls back to the soulbound `AgentIdentity` pattern (salvaged from the DevTools PDF) |
| AI cost overrun | Elfa/Surf credits applied Day 1; OpenAI fallback only; every AI call cached by input hash |
| A repeat of the Xyndicate runaway | §16 five hard rules; no key in any process but the one-time local deploy; no autonomous execution exists |
| Demo-day failure (live) | Everything works on a public URL; a recorded backup video exists; a funded test wallet is documented in `JUDGE_GUIDE.md` |
| "Just another yield dashboard" perception | The compliance pillar + published methodology + infrastructure framing are foregrounded in the first 90 seconds of every demo and the X thread |
| Incomplete product (the Apogee gap) | Phase 2 hard-gates on a *complete, deployed* product by Day 15; Phases 3–4 are polish only — completeness is bought first, polish second |

---

## 21. Immediate next actions — this week

1. **All:** apply for the Phase II computing-credit grants (Elfa/Surf/Nansen) — today.
2. **All:** register the Auralis BUIDL on DoraHacks; reserve the domain.
3. **E1:** scaffold the monorepo, CI, `.env.example`, `AGENTS.md`; stand up contracts on Mantle testnet.
4. **E4:** lock the design tokens (palette §14.1, type §14.2) and ship the marketing `/` first paint.
5. **E2:** finalize the 7-dimension Rating Engine spec in `RISK_METHODOLOGY.md`.
6. **E5:** open the X account; start the build-in-public thread; book a mentor-clinic slot.
7. **Everyone:** read §16 (anti-runaway rules) and confirm understanding in writing.

---

## Appendix A — what changed vs the GPT plan (quick reference)
- **Reframed** from "yield dashboard with a risk score" → "AI risk + compliance + allocation layer for RWAs."
- **Promoted** compliance from one line to a full pillar with its own engine, contract, framework doc, and UI section.
- **Added** a published rating methodology (7 dimensions, versioned, on-chain) — the rating-agency moat.
- **Added** the infrastructure angle (public ratings explorer, consumable API + on-chain registries) — the business-potential story.
- **Discarded** the off-track DevTools product; salvaged only its registry/identity/secret-hygiene patterns.
- **Hardened** the cost/safety model into five hard rules that make a Xyndicate-style runaway structurally impossible.
- **Specified** every page, subpage, and mini-subpage; every prize mapped to features; a 23-day phased plan with a 5-person pod.

*End of Master Build Plan v1.0. Companion file: `AURALIS_ARCHITECTURE.svg`.*
