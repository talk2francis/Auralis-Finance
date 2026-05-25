# Auralis Finance — Scorecard Alignment & Plan Amendment

**Version 1.1 · supersedes the prize assumptions in `MASTER_BUILD_PLAN.md` §2.3**
**Trigger: the leaked official "Unified Judging Scorecard — AI & RWA Track."**

This document does three things: (1) decodes exactly how Auralis is scored, (2) audits the
current plan against every line item, (3) specifies the **concrete additions** needed to push
Auralis from "Good (70–89)" into "Excellent (90–100)." Read this before the prompt phase —
the prompts will bake every addition here into the build.

---

## 1. What the scorecard actually says

The judges score **100 points**, split **50 / 50**:

### Part A — Mantle General (50 pts · scored by *all* judges, every track)
| Dimension | Pts | What moves the needle |
|---|---|---|
| Technical | 15 | Architecture, security, code quality, **feature completeness**, runs **end-to-end on Mantle** |
| Ecosystem fit | 10 | Mantle stack + asset integration (DeFi/CeFi), ecosystem complementarity |
| Business potential | 10 | **PMF, tokenomics, viability, GTM** |
| Innovation | 10 | Originality, differentiated advantage, real pain point — *not a fork* |
| User experience | 5 | UI/UX, onboarding friction, **AA / gasless** integration |

### Part B — AI × RWA Track-Specific (50 pts · scored by *Mantle* judges)
| Dimension | Pts | What moves the needle |
|---|---|---|
| AI × RWA integration depth | 15 | AI must drive **tokenization logic, pricing, compliance, or portfolio decisions** — not a chatbot wrapper. **AI output must be verifiable/auditable.** |
| Mantle network integration | 10 | Mantle as a **core settlement/execution layer**, not just a deploy target; must be *meaningfully different from any other chain* |
| Compliance awareness | 10 | KYC/AML, accredited-investor rules, jurisdiction requirements. **Bonus: AI that automates compliance.** |
| Track-specific (Path A or B) | 10 | Path B → asset class clearly defined + legally coherent; users well-specified with genuine demand; **complete end-to-end UX without deep Web3 knowledge** |
| Execution & demo quality | 5 | Working MVP on Mantle; **live demo shows a real asset managed on-chain**; open repo + setup + deployed address |

### The grade bands — our literal target
**Excellent (90–100)** requires, verbatim:
- *"Breakthrough technical depth; seamless Mantle integration; production-ready with a clear and complete business logic loop."*
- *"AI is deeply embedded in the RWA workflow with verifiable outputs; Mantle is used as a strategic layer, not just deployment; compliance posture is thoughtful and realistic; end-to-end demo shows a real asset live on-chain."*

Every word of that is now a build requirement. The amendments below close each gap.

---

## 2. The big strategic reads from the scorecard

**Read 1 — The plan's direction is correct. This is a relief.** The scorecard rewards exactly
what Auralis was already designed for: AI driving *compliance checks and portfolio decisions*
(named explicitly), compliance awareness as a full 10-pt dimension, verifiable AI output.
Auralis is not a chatbot wrapper — it is the *un-forkable* answer. No pivot needed.

**Read 2 — "Business potential" is 10 hard points and we were treating it as a doc.** PMF,
**tokenomics**, viability, GTM. The scorecard literally lists *tokenomics*. We do **not** need
a token to win — but we must have a crisp, credible **business & monetization model** and a
**GTM**, surfaced *in the product and the pitch*, not buried in a roadmap file. Amendment in §3.

**Read 3 — "AI output must be verifiable or auditable" is repeated twice.** This is the single
most-emphasized phrase in Part B. Auralis already anchors rating hashes and decision hashes
on-chain — but we must make verifiability a **visible, demoable feature**, not an
implementation detail. Amendment in §3 (the "Verify" button + reproducibility).

**Read 4 — "Mantle as a core settlement/execution layer… meaningfully different from any
other chain."** A judge must not be able to say "this could run on any EVM." We must lean on
Mantle-*specific* facts: the Mantle RWA asset stack (USDY/QCDT/MI4/mETH) as the *subject*,
Mantle's low-gas environment as the *enabler of on-chain proofs at scale*, ERC-8004, TaaS.
Amendment in §3.

**Read 5 — "AA / gasless integration" is named under UX.** Account Abstraction / gasless is
explicitly rewarded. The plan already added Privy embedded wallets — we now **upgrade** that
to a true **ERC-4337 Account Abstraction** posture with **gas sponsorship** for the
compliance-scan and first-attestation flows. Amendment in §3.

**Read 6 — "live demo shows a real asset being represented or managed on-chain" (5 pts +
the Excellent band).** The demo must show a *real* Mantle RWA (USDY is the obvious choice)
being *managed* — rated, compliance-checked, and rebalanced — with the result *on Mantle*.
The demo script must be built around USDY specifically. Amendment in §3.

**Read 7 — "production-ready" and "feature completeness" appear in both Technical and the
Excellent band.** This is the Apogee lesson, now a scored line. No dead buttons, no stub
pages, end-to-end flows. The §F implementation checklist in `UI_SPEC.md` is now a *scoring*
checklist.

**Read 8 — only 5 pts for UX here, vs a separate $3K Best UI/UX prize.** Important nuance:
UX is *underweighted in the track score* but is its own prize. So: UX must be **excellent**
(to win the $3K) but must **never be built at the expense of** the 15-pt Technical or 15-pt
AI-depth dimensions. Priority order is now explicit — §4.

---

## 3. Plan amendments — the concrete additions to reach "Excellent"

Each amendment is tagged with the scorecard dimension(s) it lifts and is **[core]** (must
build) unless marked otherwise. All of these go into the prompt phase.

### A. Business & monetization model — surfaced, not buried · **[core]**
*Lifts: Business potential (10).*
- Add a marketing route **`/business`** (or a strong section in `/company`) stating the model
  plainly: **Auralis Intelligence API** — ratings + compliance attestations sold as a metered
  infrastructure API to RWA issuers, wallets, and DeFi apps on Mantle; a **premium treasury
  tier** for DAOs/funds (advanced policies, multi-portfolio, audit exports); the optional
  on-chain **attestation mint fee** as a native, already-built revenue primitive.
- Write `docs/BUSINESS_MODEL.md` (split out of `ROADMAP.md`): TAM (Mantle's RWA TVL
  trajectory + the broader tokenized-Treasury market), the three revenue lines, pricing
  sketch, GTM (issuer partnerships via Mantle TaaS, the public `/ratings` explorer as the
  top-of-funnel, design-partner DAOs), and an honest "why now."
- On **tokenomics**: state explicitly and confidently that Auralis is **revenue-first, not
  token-first** — monetization works on day one without a token; a future `$AURA` (fee
  discounts, attestation staking, rating-curation governance) is a *roadmap option*, not a
  crutch. A panel of VCs respects a real revenue model over a speculative token. Put this
  one paragraph in `BUSINESS_MODEL.md` and the pitch.
- Surface a one-line business framing on the landing page and in the X thread.

### B. Verifiable AI — make auditability a visible feature · **[core]**
*Lifts: AI × RWA integration depth (15), Innovation (10), Technical (15).*
The scorecard says "verifiable or auditable" twice. Build the verifiability *into the UI*:
- On every **asset rating detail** page and the public `/ratings/[assetId]` page, add a
  **"Verify this rating"** affordance: it recomputes the rating hash from the canonical
  off-chain JSON in the browser and checks it against `AuralisRatingRegistry.verifyRating()`
  on Mantle — showing a green "✓ Matches on-chain record" or a red mismatch. **Anyone can
  audit any rating, live.**
- Same pattern on `/app/decisions`: a **"Verify proof"** action on each decision that
  re-hashes the decision record and confirms it against the on-chain `DecisionLogged` entry.
- Every AI output ships with an **"AI Provenance" expander**: the exact deterministic input
  vector the model received, the model + methodology version, the prompt hash, and the
  cached response hash. This is the literal answer to "is the AI output auditable."
- `docs/AGENT_DESIGN.md` adds an "Auditability" section describing this end to end.

### C. Account Abstraction + gas sponsorship · **[core]**
*Lifts: User experience (5), Track-specific Path-B "without deep Web3 knowledge" (10).*
- Upgrade the Privy integration to a true **ERC-4337 smart-account** posture: a new user gets
  a smart account, not just an EOA.
- Add a **paymaster / gas-sponsorship** path so the **first compliance scan** and the **first
  attestation mint** are **gasless** for the user — Auralis sponsors them. Mantle's low-gas
  environment makes this cheap enough to fit the budget (still well under $10; sponsor only
  the first action per wallet, rate-limited). This is the concrete "gasless integration" the
  scorecard names.
- The onboarding flow advertises it: "No seed phrase. No gas for your first check."

### D. Mantle-specificity — make it un-portable · **[core]**
*Lifts: Mantle network integration (10), Ecosystem fit (10).*
- Add a short, explicit section to `README.md` and `ARCHITECTURE.md`: **"Why Mantle, and why
  this could not run on a generic L2."** Concrete points: the *subject assets* (USDY, QCDT,
  MI4, mETH/cmETH) are Mantle-native or Mantle-anchored RWAs; Mantle's **TaaS** is the
  issuance layer Auralis sits atop; **ERC-8004** agent identity is a Mantle hackathon
  primitive; Mantle's **sub-cent gas** is what makes anchoring *every* rating + decision
  on-chain economically viable (on mainnet Ethereum this product is unaffordable).
- Treat Mantle as the **settlement layer for trust**: ratings, attestations, decisions, and
  guardrail records all *settle* on Mantle. Phrase it exactly that way in the pitch.
- Integration count stays high (14+), but each is described in terms of *why Mantle* — depth
  over breadth in the narrative.

### E. The "complete business logic loop" — close it visibly · **[core]**
*Lifts: the Excellent band ("clear and complete business logic loop"), Technical (15).*
- The product must demonstrate one **closed loop** end-to-end in the demo:
  `Observe a real USDY position → Rate it → Verify the rating on-chain → Compliance-check the
  wallet → mint an attestation → simulate a rebalance → guarded execution → log the decision
  → verify the decision proof on Explorer.` Every step is a real screen with a real result.
- The `JUDGE_GUIDE.md` 5-minute path **is** this loop. The demo video **is** this loop. The
  loop is named on the landing page's "How it works."

### F. Compliance — push from "aware" to "automated" · **[core]**
*Lifts: Compliance awareness (10) — including its explicit bonus.*
The scorecard gives a **bonus for AI that automates compliance workflows.** Auralis already
has the Compliance Engine; make the *automation* explicit:
- The Compliance Agent runs the full workflow autonomously *as a proposal*: screen → classify
  asset → match jurisdiction rules → produce verdicts → draft the report → recommend which
  attestations to mint. The human only signs the mint.
- `COMPLIANCE_FRAMEWORK.md` must explicitly name the constraint vocabulary the scorecard
  uses: **KYC/AML**, **accredited-investor rules**, **jurisdiction-specific requirements** —
  and show how Auralis reasons about each per asset class (e.g. USDY → non-US-person rule;
  tokenized equities → accredited/Reg-S logic; QCDT → regulated-product constraints).
- Keep the honest disclaimer (tooling, not legal advice) — the scorecard rewards a *realistic*
  posture, and overclaiming would read as naïve to the regulated-finance judges.

### G. A real RWA in the live demo — anchor on USDY · **[core]**
*Lifts: Execution & demo quality (5), the Excellent band.*
- The demo, the test wallet in `JUDGE_GUIDE.md`, and the video all center on **USDY** — a
  *real* Mantle RWA (Ondo's tokenized Treasury note, live on Mantle). The judge sees a real
  asset rated, compliance-gated, and managed, with proof on Mantle Explorer.
- Document the exact USDY contract address used, on Mantle, in `JUDGE_GUIDE.md`.

### H. Pitch deck as a deliverable · **[core]**
*Lifts: Business potential (10), and Demo Day itself.*
- Add `docs/PITCH_DECK.pdf` (10–12 slides): problem → the trust-asymmetry gap → Auralis (3
  pillars) → the closed loop → live proof → Mantle-specificity → business model + GTM →
  traction plan → team → ask. Demo Day (Jul 2–3) is a *scored* live performance; the deck is
  not optional.

### I. Tighten security posture for the "security" sub-criterion · **[core]**
*Lifts: Technical (15) — "security" is named.*
- `SECURITY.md` already covers the non-custodial model. Add: a brief **self-audit** section
  (Slither run output on the 4 contracts, reentrancy/access-control review notes), and the
  contract test coverage numbers. "Security" being in the 15-pt Technical line means a
  visible, honest security write-up earns points cheaply.

### J. Demo-quality insurance · **[core]**
*Lifts: Execution & demo quality (5).*
- A funded, documented **test wallet**; a recorded **backup demo video**; a public,
  always-on URL; a one-command local setup verified on a clean machine. The scorecard
  rewards "working prototype + clear setup + deployed address" — leave none of it to chance.

---

## 4. Revised priority order (build sequence, scorecard-weighted)

Total scored weight by area, descending — build in this order, never sacrifice an upstream
item for a downstream one:

1. **AI × RWA depth + verifiable AI (15)** — the Intelligence Core, the rating/compliance
   engines, on-chain anchoring, the live "Verify" feature.
2. **Technical / completeness / security (15)** — end-to-end flows, the 4 contracts, no dead
   buttons, the self-audit.
3. **Mantle integration + Ecosystem fit (10 + 10 = 20)** — the RWA asset stack, ERC-8004,
   the "why Mantle" narrative, settlement framing.
4. **Compliance awareness (10)** — the automated compliance workflow + framework doc.
5. **Business potential (10)** — the business model, `/business` page, deck, GTM.
6. **Innovation (10)** — carried by B + E + F above (the verifiable, closed-loop, compliance
   automation *is* the innovation).
7. **Path-B real-world validity (10)** — defined assets, defined users, complete UX.
8. **Execution & demo quality (5)** — the USDY-anchored demo, test wallet, backup video.
9. **User experience (5 in-track) + the separate $3K UI/UX prize** — excellent UX, but
   scheduled *after* 1–4 so it never starves the heavyweight dimensions.

> Note vs `MASTER_BUILD_PLAN.md`: the 23-day phase plan stays valid. This reorders *emphasis
> within* phases — Phase 1–2 now explicitly front-load amendments A–G and I; Phase 3 picks up
> H and the UX polish. The Day-15 Deployment-Award gate is unchanged.

---

## 5. Scorecard self-audit — where Auralis stands now, and the target

| Dimension | Pts | Plan as-is | After amendments | Gap to close |
|---|---|---|---|---|
| Technical | 15 | Strong (4 contracts, pure core) | **13–14** | Self-audit (I), feature-completeness discipline (E) |
| Ecosystem fit | 10 | Strong (14+ integrations) | **9–10** | "Why Mantle" narrative (D) |
| Business potential | 10 | Weak (a roadmap line) | **8–9** | Business model + `/business` + deck (A, H) |
| Innovation | 10 | Strong (compliance + rating layer) | **9** | Verifiable-AI feature makes it visible (B) |
| User experience | 5 | Strong | **5** | AA/gasless (C) secures the full 5 |
| AI × RWA depth | 15 | Strong | **13–14** | Verifiable-AI UI + provenance (B) |
| Mantle integration | 10 | Strong | **9** | Settlement-layer framing (D) |
| Compliance awareness | 10 | Strong (a full pillar) | **9–10** | Automation made explicit + KYC/AML/accredited vocabulary (F) |
| Track-specific Path B | 10 | Strong | **9** | "Without deep Web3 knowledge" → AA/gasless onboarding (C) |
| Execution & demo | 5 | Mid (not yet built) | **5** | USDY-anchored demo + test wallet + backup video (G, J) |
| **Total** | **100** | **~70–75 (Good)** | **~89–93 (Excellent)** | Amendments A–J |

The honest read: the plan as-is lands in upper-"Good." The ten amendments are precisely
what crosses into "Excellent." None of them is large — most are *making something already
in the architecture visible, named, and demoable.* That is the cheapest possible path from
70s to 90s, and it is fully achievable in 23 days.

---

## 6. What does NOT change

- The product thesis, the 3 pillars, Path B, the 4 contracts, the architecture, the
  non-custodial model, the anti-runaway rules, the 75/100 breadth scope, the 23-day phasing.
- Tokenization is still excluded from the build (still competes with Mantle TaaS; the
  scorecard's Path-A tokenization criterion is *not* our path).
- We still do **not** ship a token. §3.A makes the revenue-first case explicit so the
  "tokenomics" word in the scorecard is answered without one.

---

## 7. New / updated documents this triggers
- **New:** `docs/BUSINESS_MODEL.md`, `docs/PITCH_DECK.pdf`, marketing route `/business`.
- **Updated:** `ARCHITECTURE.md` (+"Why Mantle"), `AGENT_DESIGN.md` (+Auditability),
  `COMPLIANCE_FRAMEWORK.md` (+KYC/AML/accredited vocabulary + automation), `SECURITY.md`
  (+self-audit), `JUDGE_GUIDE.md` (+the closed-loop path on USDY + test wallet),
  `UI_SPEC.md` (+"Verify" affordances on ratings/decisions, +`/business` route, +AA/gasless
  onboarding), `README.md` (+"Why Mantle" + business one-liner).

All of the above is now folded into the upcoming **stepwise build prompts**.

*End of Scorecard Alignment v1.1.*
