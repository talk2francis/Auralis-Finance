# Auralis Finance — Documentation Index & Content Briefs

This file is the **writing brief** for the full `docs/` set. Each entry says what the
document must contain so any team member can author it. The goal stated in the build plan:
documentation that reads like a company's, not a hackathon's — measurably stronger than
Apogee's. Two documents (`RISK_METHODOLOGY.md`, `COMPLIANCE_FRAMEWORK.md`) have no Apogee
equivalent and are the credibility centrepieces.

**Owner key:** E1 Tech Lead · E2 Backend/AI · E3 Frontend · E4 Design · E5 Integrations/DevRel.

| # | File | Owner | Status |
|---|---|---|---|
| 1 | `README.md` *(repo root)* | E5 | ✅ drafted |
| 2 | `CONTRACTS.md` | E1 | ✅ drafted |
| 3 | `UI_SPEC.md` | E4 | ✅ drafted |
| 4 | `ARCHITECTURE.md` | E1 | ✅ drafted |
| 5 | `RISK_METHODOLOGY.md` | E2 | ✅ drafted ⭐ |
| 6 | `COMPLIANCE_FRAMEWORK.md` | E2 | ✅ drafted ⭐ |
| 7 | `AGENT_DESIGN.md` | E2 | ✅ drafted |
| 8 | `API.md` | E5 | ✅ drafted |
| 9 | `SECURITY.md` | E1 | ✅ drafted |
| 10 | `DEPLOYMENT.md` | E1 | ✅ drafted |
| 11 | `JUDGE_GUIDE.md` | E5 | ✅ drafted ⭐ |
| 12 | `TESTING.md` | E1 | ✅ drafted |
| 13 | `DECISIONS.md` | E1 | ✅ drafted |
| 14 | `TUTORIAL.md` | E5 | ✅ drafted |
| 15 | `ROADMAP.md` | E5 | ✅ drafted |
| 16 | `video-script.md` | E4/E5 | ✅ drafted |
| 17 | `SUBMISSION_CHECKLIST.md` | E5 | ✅ drafted |
| 18 | `PITCH.md` | E5 | ✅ drafted |

---

### 4 · `ARCHITECTURE.md`
The 7-layer system in prose; embed `diagrams/AURALIS_ARCHITECTURE.svg`. Sequence diagrams
for the three golden paths: (a) compliance scan → attestation mint, (b) simulate → guarded
rebalance → decision log, (c) rating refresh (worker). Component responsibilities table.
The "AI explains, deterministic code decides" principle. Why Vercel-only + read-only VPS
worker (cross-reference `SECURITY.md`).

### 5 · `RISK_METHODOLOGY.md` ⭐ (credibility centrepiece)
The published Auralis rating methodology. Must contain: the 7 dimensions with precise
definitions; the input signals per dimension; each sub-formula; the dimension weights; the
composite `RiskScore` formula; the `RiskScore → Grade` band table (`AAA…C`); the
risk-adjusted-yield formula; the methodology versioning scheme (`v1.0` = integer `100`
on-chain); worked examples for USDY, mETH, USDe; explicit limitations. This document is what
makes Auralis read as a rating institution. Mirror a plain-language version at `/methodology`.

### 6 · `COMPLIANCE_FRAMEWORK.md` ⭐ (credibility centrepiece)
The eligibility model. Must contain: the asset-class taxonomy (US_TREASURY_RWA,
TOKENIZED_EQUITY, REGULATED_YIELD, SYNTH_DOLLAR, LST…); the screening inputs (public
sanction/OFAC-style lists, on-chain risk-exposure heuristics via Nansen) and what is
deliberately *not* collected (no government IDs — this is on-chain compliance, not identity
KYC); the jurisdiction model; the verdict logic (Eligible / Restricted / Denied) with cited
reasoning; the attestation design (what goes on-chain = verdict + hash only; what stays
private); validity + revocation; the EAS-compatibility note. **Prominent disclaimer:** Auralis
provides compliance tooling and risk information, not legal advice.

### 7 · `AGENT_DESIGN.md`
The 8-step agent loop. The 12 Skills (table: name, inputs, outputs, on-chain?). The
anti-hallucination contract: AI receives the finished deterministic vector and produces only
explanations/proposals under a Zod schema — never the score itself. Model routing (Elfa AI
primary, OpenAI fallback, Redis cache by input hash). Failure modes and how the agent
degrades safely.

### 8 · `API.md`
The public REST surface that lets other Mantle apps consume Auralis as infrastructure:
`GET /v1/ratings`, `GET /v1/ratings/:assetId`, `GET /v1/eligibility?wallet=&assetClass=`,
`GET /v1/methodology`. Request/response schemas (Zod-derived), rate limits, auth, caching
headers, example calls. Note the on-chain reads available directly via `isEligible()` /
`verifyRating()`.

### 9 · `SECURITY.md`
The non-custodial model. The five anti-runaway rules (verbatim from the build plan §16). The
one-key-once rule. Threat model: what an attacker could and could not do (answer: cannot move
funds — there are none under contract custody; cannot trigger autonomous execution — none
exists). Secret hygiene. Responsible-disclosure contact. The honest-AI + legal-disclaimer
posture.

### 10 · `DEPLOYMENT.md`
Reproducible setup. Every environment variable (name, required?, description, where it lives
— and which must NEVER reach the browser/Vercel). Local dev. Contract deploy + Mantle Explorer
verification steps. Vercel setup for `apps/web`. VPS setup for `apps/worker` (systemd timer,
no keys). Post-deploy checklist.

### 11 · `JUDGE_GUIDE.md` ⭐
The judges' fast path. A **5-minute** route (open app → see ratings → run a compliance scan →
see the eligibility verdict → view a decision proof on Explorer) and a **15-minute** route
(adds: simulate a rebalance, set a policy, mint an attestation, inspect the agent + skills).
A funded **test wallet** (address + how to use it). The deployed contract addresses + Explorer
links. A mapping of features → judging criteria. An **honest "known limitations"** section —
judges trust teams that disclose.

### 12 · `TESTING.md`
Coverage map: contract unit tests (per function, happy + revert paths), Intelligence-Core unit
tests (rating engine determinism, policy engine), API integration tests, E2E flows. How to run
each. CI policy: CI runs `lint + typecheck + test` only — **never deploys**.

### 13 · `DECISIONS.md`
Architecture Decision Records. One ADR per significant choice, each: context · decision ·
consequences. Minimum ADRs: Path B over Path A; Auralis as intelligence layer (not a
tokenizer); Vercel-only + read-only worker (no Railway); user-signed everything (no server
key); deterministic rating engine with AI-as-explainer; consuming Mantle ERC-8004 vs minting
our own; 75/100 breadth scoping (tokenization excluded).

### 14 · `TUTORIAL.md`
"Rate and compliance-check an asset in 10 minutes." A hands-on walkthrough: connect (incl.
the Privy email path), run a compliance scan, read an Auralis Rating and its radar, simulate
a small rebalance, log the decision on-chain, and verify the proof on Mantle Explorer.

### 15 · `ROADMAP.md`
Post-hackathon. The business model (Auralis ratings + compliance attestations as a paid
infrastructure API for issuers and apps; a premium tier for treasuries). Near-term:
Chainlink Proof-of-Reserve-backed ratings, EAS schema publication, Safe-multisig policies,
AI-assisted RWA tokenization advisory, more chains. The "managed by code" thesis. This is the
document the VC-heavy judge panel reads for "business potential."

### 16 · `video-script.md`
The ≥2-minute demo video script + storyboard. Beat sheet: the problem (15s) → the 3 pillars
(20s) → live: a rating + its radar (20s) → live: a compliance scan + eligibility verdict
(25s) → live: simulate → guarded execution → decision proof on Explorer (30s) → the
non-custodial guarantee + the vision (20s). Notes on screen-capture, captions, and pacing.

---

**Documentation standard:** every doc has a one-line purpose at the top, uses the Auralis
voice (precise, calm, no hype), links its siblings, and is kept in sync with the code. The
README and `JUDGE_GUIDE.md` are the two documents every judge will open first — they get the
final polish pass before submission.
