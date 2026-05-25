# Auralis Finance — UI Specification

**Version 1.0 · companion to `MASTER_BUILD_PLAN.md`**
Scope: every route, every component, every state. This is the contract between design (E4)
and frontend (E3). If a screen is not specified here, it does not ship.

**Standard:** built to the `frontend-design` skill conventions. Library: **shadcn/ui** (Radix)
themed with Auralis tokens. Charts: **Recharts** (+ a custom radar). Motion: **Framer Motion**.
No dead buttons. No localStorage-dependent shared-demo flows. Every route reachable from nav.

---

# PART A — DESIGN SYSTEM

## A.1 Design principles
1. **Institutional, not crypto-neon.** The benchmark cohort is Ondo Finance, Superstate,
   Maple, Securitize, Centrifuge — crossed with Linear / Mercury / Stripe. Calm, exact,
   confident. A judge should mistake Auralis for a funded fintech.
2. **The number is the hero.** This is a risk product. Big, precise figures; restrained
   chrome around them.
3. **Every claim is provable.** Wherever Auralis asserts a rating, a verdict, or a decision,
   there is a visible path to its proof (methodology link, Explorer link, hash).
4. **Honest AI.** AI surfaces always show confidence + the deterministic inputs reasoned
   over, and carry a quiet "advisory, not financial/legal advice" line.

## A.2 Color tokens
```
--ink            #0B1220   near-black navy — text, dark surfaces, headers
--ink-soft       #16203A   raised dark surfaces (cards on dark)
--paper          #FBFBF9   warm off-white — app background
--surface        #FFFFFF   cards
--surface-muted  #F4F5F3   inset panels, table headers
--border         #E4E6E2   hairline borders
--text-primary   #0B1220
--text-secondary #5B6472
--text-tertiary  #8C97A8
--teal           #0E9E8C   PRIMARY accent — CTAs, active nav, links
--teal-wash      #EAF6F4   teal-tinted backgrounds
--emerald        #0F9D58   positive · "Eligible" · gains
--amber          #D9870B   caution · "Restricted" · warnings
--rose           #D64550   negative · "Denied" · losses · blocked
--brass          #B08442   RESERVED — only the Auralis Rating seal
```
Dark mode (post-Day-1 nice-to-have): `--paper`→`#0B1220`, `--surface`→`#16203A`, borders
lighten; `--teal` stays. Ship a `prefers-color-scheme` + manual toggle.

## A.3 Typography
- **Display / big numbers:** a refined serif — *Newsreader* or *Source Serif 4*. Used for
  hero headlines and large KPI figures. This single choice separates Auralis from every
  Inter-only crypto app and signals "rating institution."
- **UI / body:** *Inter* (or *Geist*). All interface text, tables, labels.
- **Mono:** *Geist Mono* / *IBM Plex Mono* — addresses, hashes, tx data, code.
- Scale: display 48/36/28 · headings 22/18/16 · body 15/14 · caption 13/12. Line-height
  1.5 body, 1.15 display. Tabular-nums on every figure.

## A.4 Layout & spacing
- 8px spacing grid. Card radius 14px, inner elements 9–10px, pills 999px.
- App: fixed 248px left sidebar + fluid content, max content width 1280px, 24–32px gutters.
- Shadow: single soft token `0 3px 6px rgba(11,18,32,.08)`. No heavy shadows.
- Marketing: 1200px max, generous vertical rhythm (96–128px section padding).

## A.5 The signature components (build to a high finish)
| Component | Spec |
|---|---|
| **`<RatingSeal>`** | Circular seal, brass ring, grade letters (`AAA`…`C`) in serif. Sizes sm/md/lg. Appears in tables, asset pages, the public explorer. The brand-carrying element. |
| **`<RiskRadar>`** | 7-axis radar (the 7 risk dimensions). Animated draw-on. The methodology made visible — screenshots well for the X campaign. |
| **`<EligibilityChip>`** | Pill: Eligible (emerald) / Restricted (amber) / Denied (rose) / Not Checked (grey). |
| **`<EligibilityMatrix>`** | Asset × jurisdiction grid of `<EligibilityChip>` with reason on hover/expand. |
| **`<ProofCard>`** | Receipt-style: hash (mono, truncated, copy), action, timestamp, verified ✓, Explorer link. |
| **`<AllocationDonut>`** | Recharts donut; supports a Framer-Motion morph between before/after states. |
| **`<KpiStat>`** | Label + serif value + delta chip (▲/▼ + %) + optional info tooltip + sparkline slot. |
| **`<ConfidenceMeter>`** | Segmented 0–100 bar with High/Medium/Low label — on every AI output. |
| **`<TxButton>`** | Wraps any on-chain action: idle → wallet-prompt → pending(spinner) → success(toast+Explorer) → error(reason). One component, used everywhere money/state changes. |
| **`<AssetIcon>`** | Normalized token marks (USDY, mETH, cmETH, USDe, MI4, QCDT, Aave, Merchant Moe…). |

## A.6 Universal component states
Every data component implements all five. This is non-negotiable — it is how we avoid the
"incomplete product" trap.
1. **Loading** — skeleton shimmer matching final layout (never a spinner-on-blank).
2. **Empty** — illustration + one sentence + a primary action.
3. **Error** — inline, human-readable, with Retry; never a raw stack trace.
4. **Populated** — the normal state.
5. **Stale** — subtle "updated 14m ago" caption when data is older than the refresh window.

## A.7 Motion
- Page/route transitions 180–220ms ease-out; number count-ups 600ms; chart draw-on 700ms.
- Donut morph on simulate. Optimistic UI on every action. `prefers-reduced-motion` fully honored.
- Hover-reveal detail on data points (match the DevHub track-card polish).

---

# PART B — GLOBAL COMPONENTS (present on every app route)

## B.1 App shell
- **Left sidebar (248px):** Auralis wordmark + network pill ("Mantle Mainnet", emerald dot);
  nav groups — *Overview* (Dashboard), *Discover* (Opportunities, Ratings), *Act* (Simulator,
  Copilot), *Govern* (Compliance, Policies, Decisions), *System* (Agent, Integrations,
  Settings). Active item: teal text + teal left-bar. Bottom: "Need help?" → Docs.
- **Top bar:** ⌘K search field (asset/protocol/page/skill), portfolio selector dropdown,
  wallet pill (`0x8a7F…9c3D`, copy, ENS/MNS if resolvable), avatar menu (settings, theme,
  disconnect).
- States: wallet-disconnected → entire app gates to the `/app` onboarding; wrong-network →
  full-width amber bar "Switch to Mantle Mainnet" with a one-click switch.

## B.2 Auralis Copilot chat widget (bottom-right, every app page)
- Collapsed: 56px teal floating button (spark icon). Expanded: 380×560 panel.
- Context-aware: knows the current route + selected asset ("Why is USDY rated A?" answers
  from the live rating). Streams responses (SSE). Structured replies (summary → detail).
- Footer: `<ConfidenceMeter>` + "Advisory only — verify decisions." Quick-action chips
  ("Explain my risk score", "Run a compliance scan", "What changed today?").
- It is the mini-form of `/app/copilot`; both share the AI Reasoning Service.

## B.3 Command palette (⌘K / Ctrl-K)
Fuzzy jump to any route, any asset (→ asset detail), any skill (→ run it), any decision.
Recent + suggested. A premium-feel detail judges notice immediately.

## B.4 Toast / transaction system
Every on-chain action drives one `<TxButton>` → toast lifecycle: *Awaiting signature →
Pending (with tx hash) → Confirmed (Explorer link) / Failed (reason)*. Toasts stack
bottom-center, auto-dismiss success after 6s, persist errors until dismissed.

## B.5 Onboarding — "Welcome to Auralis" (route `/app`, first visit)
A 5-step guided flow with **Back / Next / Skip**, progress dots, a live "Your configuration"
right-rail mirror (image 8 is the baseline). Completion persisted server-side per wallet.
- **Step 1 — Connect wallet.** RainbowKit (MetaMask, WalletConnect, Coinbase, Rabby) **+
  Privy embedded wallet** ("Continue with email" → custodial-free embedded wallet) — this is
  the literal answer to Best-UI/UX "smoothest Web2 onboarding."
- **Step 2 — Verify network.** Mantle Mainnet, chainId 5000 — auto-prompt switch, green
  "Verified" when correct.
- **Step 3 — Choose mode.** Three cards: *Simulation* (no funds move) / *Advisory* (you
  execute) / *Guarded Execution* (within your guardrails). Radio-select.
- **Step 4 — Risk profile.** Segmented Conservative→Aggressive; max-drawdown + liquidity
  preference selects.
- **Step 5 — First compliance scan.** One-tap "Run my first scan" → lands the differentiator
  inside 90 seconds, then routes to Dashboard.
- Skip at any step → Dashboard with a persistent "Finish setup" nudge.

---

# PART C — MARKETING SITE (public, no wallet)

Shared: sticky transparent→solid-on-scroll header (wordmark, nav: Product · Ratings ·
Security · Docs · Company, network pill, **"Open App"** teal CTA); footer (4 link columns +
newsletter input + X/Discord/GitHub/Mirror). Built mobile-first.

## C.1 `/` — Landing
**Purpose:** a first-time visitor understands what Auralis is in 10 seconds.
**Sections (top→bottom):**
1. **Hero** — serif headline *"Risk intelligence for real-world yield."* Sub: *"Auralis is the
   AI agent that rates, compliance-checks, and rebalances tokenized real-world assets on
   Mantle."* CTAs: **Open App** (teal) · **View live ratings** (ghost). Right: a real,
   subtly-animated product frame (the dashboard) — not a static PNG.
2. **Trust strip** — "Built on Mantle · Non-custodial · Every decision on-chain" + Mantle
   logo lockup.
3. **Live stats band** — RWAs rated · Decisions logged · Compliance checks run · Avg. risk
   score (pulls real numbers from the API; degrades to sensible defaults).
4. **The 3 pillars** — three cards: *Rate* (Asset Intelligence), *Verify* (Compliance &
   Eligibility), *Manage* (Portfolio Agent). Each: icon, 2-line copy, "Learn more".
5. **How it works** — the 7-step loop *Observe → Rate → Verify → Simulate → Approve →
   Execute → Prove* as a horizontal stepper with scroll-triggered reveals.
6. **Supported assets** — logo row: USDY, QCDT, xStocks, MI4, mETH, cmETH, USDe, Aave,
   Merchant Moe.
7. **The methodology teaser** — "Not a black box" — links to `/methodology`, shows a
   miniature `<RiskRadar>`.
8. **Final CTA band** — *"The next trillion dollars won't be managed by banks."* → Open App.
**States:** stats band has loading/stale states; everything else is static.
**Prize hook:** first-impression for every judge; the public surface for the X campaign.

## C.2 `/product`
Scrollytelling deep-dive on the three pillars — each pillar a full section with an animated
mini-demo (a rating computing, a compliance matrix filling, a simulator morphing). Ends with
the architecture SVG and a "Read the docs" CTA.

## C.3 `/ratings` — Public Auralis Ratings Explorer ⭐
**Purpose:** the viral, no-wallet-needed surface. "We rated every RWA on Mantle — check
yours." Drives Community Voting and SEO; proves the infrastructure angle.
**Layout:** filter bar (asset class, grade, risk band, search) → a sortable ratings table:
`<AssetIcon>` + name · `<RatingSeal>` · risk score · risk-adjusted APY · TVL · 30d trend
sparkline · methodology version · "Details". A "Last updated" stale indicator.
**Subpage `/ratings/[assetId]`** — public rating detail: the `<RiskRadar>`, all 7 dimension
scores with one-line rationales, rating history chart, the AI plain-language summary, "what
would change this rating," and **on-chain proof** (rating hash + Explorer link). A "Connect
wallet to check *your* eligibility" CTA bridges to the app.
**States:** full five-state matrix on the table; empty = "Ratings are being computed."

## C.4 `/methodology`
The published, readable rating + compliance methodology — the "rating agency" credibility
page. The 7 dimensions, weighting, grade bands, versioning, and the compliance model, in
plain language. Mirrors `docs/RISK_METHODOLOGY.md`. No other team will have this.

## C.5 `/security`
The trust page. Non-custodial model; "exactly one key, used once"; the five anti-runaway
rules; guardrails; audit status; responsible-disclosure contact; the "informational, not
legal/financial advice" disclaimers. Judges *will* open this.

## C.6 `/docs`
Documentation hub — cards linking every doc in §17 of the build plan (Architecture, Risk
Methodology, Compliance Framework, Agent Design, Contracts, API, Security, Deployment, Judge
Guide, Tutorial, Roadmap). A prominent **"Judge Guide"** card at top.

## C.7 `/faq`
Accordion: *What is Auralis? · Is it custodial? (no) · Is this financial or legal advice?
(no) · Which assets are supported? · What does it cost? · How do compliance attestations
work? · What is the Auralis Rating? · Roadmap?* Each answer 2–4 sentences.

## C.8 `/company` (light)
Mission, the "managed by code" thesis, the team (5 cards), contact, a roadmap teaser, and a
"we're building in public" link to the X account.

---

*(UI spec continues in Part 2: the full app — every route, subpage, mini-subpage, and state.)*

---

# PART D — THE APP (wallet-gated)

Per-page format: **Purpose · Layout · Components & states · Interactions · Data · Prize hook.**
Every page inherits the §B global shell, Copilot widget, command palette, and toasts.

## D.1 `/app/dashboard` — Portfolio Dashboard
**Purpose:** the at-a-glance command center; a judge understands the user's position in 10s.
**Layout:** KPI row (4) → [Allocation donut | Performance chart | AI recommendation] →
[Positions table (8 cols) | Recent decisions feed]. Baseline: image 9.
**Components & states:**
- 4× `<KpiStat>` — Total portfolio value · Blended APY · **Auralis Risk Score** (with band
  chip) · Available liquidity. Each with 30d delta. *Loading:* skeleton bars.
- `<AllocationDonut>` — DeFi / RWA / Stablecoins with $ + %. *Empty:* "No positions yet —
  connect assets or explore Opportunities."
- Performance chart (Recharts area, 7D/30D/90D toggle). *Stale:* "updated 14m ago."
- **AI recommendation card** — title, 2-line rationale, `<ConfidenceMeter>`, "Review in
  Simulator" / "Ask Copilot". *Empty:* "No recommendation — your portfolio is balanced."
- Positions table — `<AssetIcon>`+asset · source · value(+% of portfolio) · APY ·
  `<RatingSeal>` (sm) · risk chip · row action (View / ⋯). Row → asset detail.
- Recent decisions feed — last 4 decisions with status chips; "View all" → `/app/decisions`.
- System status widget — "All systems operational" (green) / degraded states.
**Interactions:** every KPI info-icon → tooltip; donut segment hover → highlight table rows;
recommendation CTA → Simulator pre-loaded.
**Data:** portfolio API (positions, valuation), ratings API, decisions API, refresh worker.
**Prize hook:** Product Completeness; the "complete UX" Path-B criterion.

## D.2 `/app/opportunities` — Yield Aggregator
**Purpose:** discover & compare every RWA/yield opportunity on Mantle (the "aggregator" pillar).
**Layout:** filter bar → opportunities table → [yield-trends chart | "Suggested for you" rail].
Baseline: image 7.
**Components & states:**
- Filter bar — asset class · protocol · risk · liquidity · search. Filters reflect in URL
  query for shareability.
- Opportunities table — `<AssetIcon>`+name+subtype · APY (+Δ) · TVL · risk chip ·
  `<RatingSeal>` · **fit tag** (Strong fit / Good fit / Watch — computed vs the user's risk
  profile) · "View". Sortable every column. *Loading:* 6 skeleton rows. *Empty:* "No
  opportunities match these filters — reset."
- Yield-trends multi-line chart (30D, per-asset toggle legend).
- "Suggested for this portfolio" rail — 3 cards with fit reason + APY.
**Interactions:** "View" → asset detail; "Add to simulator" quick action from ⋯ menu.
**Data:** asset adapters, price/TVL adapter, rating engine, user risk profile.
**Prize hook:** Mantle ecosystem depth (every asset surfaced); "clear asset category."

### D.2.1 `/app/opportunities/[assetId]` — Asset Strategy detail
**Purpose:** the full dossier on one RWA. Baseline: image 6 (the USDY page) — elevated.
**Layout:** header (asset icon, name, chain pill, type pill) → KPI row (4: APY · current
allocation · available liquidity · risk score) → [30d performance + yield-composition donut]
[`<RiskRadar>` + 7-dimension breakdown] → [Where it's used | AI view card | Actions].
**Components & states:**
- `<RatingSeal>` (lg) beside the asset name + methodology-version caption.
- `<RiskRadar>` — the 7 dimensions, animated. Below it, 7 rows: dimension · score bar ·
  one-line rationale (from AI Reasoning Service).
- Yield-composition donut (e.g. USDY: T-Bills / repos / cash).
- "Where it's used" — protocols holding this asset (Aave, Morpho, Pendle) with $ + %.
- **AI view card** — verdict ("Hold exposure"), `<ConfidenceMeter>`, 2-line rationale,
  "Review recommendation".
- Actions: Add to simulator · Set exposure cap · **Run eligibility check** (→ `/app/compliance`
  pre-scoped to this asset) · View on Mantle Explorer · **Anchor rating on-chain** (`<TxButton>`
  → `AuralisRatingRegistry.anchorRating`).
**Data:** single-asset adapter, rating engine, compliance engine (for the eligibility CTA).
**Prize hook:** Technical Depth (the methodology made visible); a real on-chain write.

## D.3 `/app/compliance` — Compliance & Eligibility Agent ⭐ (the centrepiece)
**Purpose:** the differentiator — screen the wallet, verdict every asset, attest on-chain.
**Layout:** a 4-tab page (tabs are the mini-subpages). Persistent disclaimer banner:
"Auralis provides compliance tooling and risk information, not legal advice."
**Tab 1 — Wallet Scan**
- Big "Run scan" / "Re-scan" `<TxButton>`-style action (off-chain, no gas).
- Result: screen summary card (sanctions/OFAC-style list check, on-chain risk-exposure
  heuristics), risk-flag list (each flag expandable with detail + severity).
- *States:* not-yet-scanned (empty CTA) · scanning (progress) · clean (emerald) · flags (amber/rose).
**Tab 2 — Eligibility Matrix**
- `<EligibilityMatrix>` — rows = RWAs (USDY, QCDT, xStocks, MI4…), columns or filter =
  jurisdiction (from the user's self-declaration in Settings). Each cell `<EligibilityChip>`.
- Click a cell → side panel: verdict, the **cited reasons** (e.g. "USDY — Restricted: issuer
  terms exclude US persons; your declared jurisdiction is NG → Eligible"), confidence.
**Tab 3 — Compliance Report**
- A clean, exportable report: per-asset verdicts, screen summary, jurisdiction, timestamp,
  methodology version. "Export PDF" + "Mint attestation" CTA.
**Tab 4 — Attestations**
- History of minted attestations: asset class · verdict · valid-until · `<ProofCard>` with
  Explorer link · Revoke action.
- "Mint new attestation" → modal: pick asset class, confirm verdict, set validity →
  `<TxButton>` → `AuralisComplianceAttestor.mintAttestation` (user-signed; optional tiny fee).
**Interactions:** scan feeds the matrix; matrix feeds the report; report mints attestations.
**Data:** compliance engine, sanctions/jurisdiction adapter, Nansen API (on-chain risk),
`AuralisComplianceAttestor`.
**Prize hook:** "compliance awareness" (named in the rubric); infrastructure/business angle;
"blockchain for good" framing for the BGA judges.

## D.4 `/app/simulator` — Rebalance Simulator
**Purpose:** model a rebalance safely before any execution. Baseline: image 5.
**Layout:** scenario tabs (Base / Stress / Conservative) → [Current portfolio | → |
Proposed portfolio] → [Rebalance adjustments table | Impact summary rail] → Route preview →
"Review approval".
**Components & states:**
- Two `<AllocationDonut>`s with an animated **morph** between current and proposed.
- Adjustments table — asset · current % · target % · change chip · **target slider** + numeric
  input. Live "Allocation total = 100%" validator (rose if ≠ 100).
- Impact summary rail — APY change · risk-score change (with "lower/higher risk" chip) ·
  liquidity impact · estimated tx cost. All count-up animated.
- Route preview — ordered steps (Done/Pending chips) + estimated duration.
- **"Review approval"** → the guarded-execution flow: a confirm sheet showing exact assets,
  amounts, chain ID, gas estimate, **the live `AuralisPolicyGuard.checkRebalance` result**
  (pass/fail per guardrail) → if all pass, a `<TxButton>` → `executeRebalance`.
**States:** *Empty:* "Add assets to simulate." *Blocked:* policy-fail rows shown in rose with
the reason; the execute button is disabled with an explanation.
**Data:** portfolio API, rating engine, policy engine + `AuralisPolicyGuard.checkRebalance`.
**Prize hook:** Innovation + safety story; a real, guardrail-checked on-chain write.

## D.5 `/app/copilot` — AI Copilot
**Purpose:** conversational portfolio guidance; the full-page agent. Baseline: image 14.
**Layout:** chat thread (left ~65%) + insight rail (right): recommended allocation donut,
reasoning factors, policy-check summary, risk alert.
**Components & states:**
- Structured agent replies — *Executive summary → Recommended actions (each w/ +APY) →
  Expected outcome (APY / risk / risk-adjusted-yield deltas) → Reasoning factors → Caveats.*
- `<ConfidenceMeter>` on every response; streaming (SSE) with a typing indicator.
- Composer with quick-prompt chips; "Open simulator" + "Save rule" actions on a reply.
- Persistent "AI responses may be inaccurate — verify decisions. Not financial advice."
**Data:** AI Reasoning Service (Elfa AI / OpenAI, schema-constrained, Redis-cached), rating
+ compliance + policy engines as deterministic context.
**Prize hook:** AI Interaction Design (25% of Best UI/UX).

## D.6 `/app/policies` — Policy Guardrails
**Purpose:** set the deterministic guardrails the agent must obey. Baseline: image 13.
**Layout:** two tabs — *Guardrails* | *Templates* — + a right rail (policy health, recent
blocked actions, policy-check preview).
**Components & states:**
- Guardrail editor — 7 rules, each a card: icon · name · info tooltip · numeric input + slider
  · enable toggle. Rules: max per asset, max per protocol, min liquidity score, slippage
  limit, min AI confidence, rebalance cooldown, human-approval threshold.
- "Save guardrails" → `<TxButton>` → `AuralisPolicyGuard.setPolicy` (user-signed).
- Policy-health card (Healthy / Attention) · recent blocked actions list (each with reason +
  timestamp) · policy-check preview (a sample recommendation run against current rules,
  pass/warn per line).
- **Templates tab** — preset packs: Conservative · Balanced · Institutional. "Apply" loads
  values into the editor (then user saves).
**Data:** `AuralisPolicyGuard`, decisions API (for blocked actions).
**Prize hook:** the trust mechanism; Technical Depth.

## D.7 `/app/decisions` — Decisions & On-chain Proofs
**Purpose:** the audit trail — "every decision recorded on Mantle" made visible. Baseline: image 12.
**Layout:** filter bar + status tiles (All / Simulated / Approved / Executed / Rejected) →
decisions table → slide-in "Decision details" panel.
**Components & states:**
- Status tiles with counts (clickable filters).
- Table — action+subtitle · assets (`<AssetIcon>` stack) · `<ConfidenceMeter>` (compact) ·
  policy result chip · tx hash (mono, Explorer link) · time · outcome chip. Paginated.
- Detail panel — Inputs (trigger, strategy, current/target allocation, notional) · AI
  reasoning summary (+ "view full reasoning") · Policy checks (each ✓/✗ with the limit) ·
  Simulation result (expected APY uplift, 30d PnL, VaR) · **On-chain log details**
  (`<ProofCard>`: tx hash, block, gas, Explorer link).
**Interactions:** row → detail panel; "View on explorer" everywhere; export CSV.
**Data:** decisions API (Supabase) + Goldsky/The-Graph index of `DecisionLogged` events.
**Prize hook:** the hackathon's core thesis ("every decision permanently on Mantle").

## D.8 `/app/agent` — Agent Identity & Skills
**Purpose:** the agent's on-chain identity, reputation, and capability surface.
**Layout:** identity card → reputation stats → Skills registry grid → on-chain activity feed.
**Components & states:**
- Identity card — `AuralisAgentRegistry` soulbound NFT (name, token id, **ERC-8004 ref** if
  present), metadata, "active" toggle, agent card link.
- Reputation stats — ratings anchored · attestations minted · decisions logged (event-derived).
- **Skills registry** — 12 skill cards (the §11.2 list): name, description, last-run, input
  schema, an inline "run" affordance for safe read-only skills, a receipt link for on-chain ones.
- On-chain activity feed — chronological registry events with Explorer links.
**Data:** `AuralisAgentRegistry`, event index, skills catalog.
**Prize hook:** the "many skills + many integrations" richness; ERC-8004 ecosystem fit.

## D.9 `/app/integrations` — Integrations & Settings
**Purpose:** show the connected ecosystem; configure environment. Baseline: image 11.
**Layout:** integrations grid → [notifications | refresh intervals | execution mode] →
[environment card | system health | security controls] → API-keys/model-routing panel.
**Components & states:**
- Integration cards — Mantle RPC, Wallet, USDY, QCDT, mETH/cmETH, USDe, Aave, Merchant Moe,
  Price feeds (RedStone/Pyth), On-chain logger, Nansen — each with a status chip
  (Connected / Configure).
- Environment card — network, chainId 5000, RPC endpoint, Explorer URL.
- System health list — all subsystems Operational/degraded.
- Security controls — "Non-custodial: confirmed", "No server signing key", guardrails enabled.
- Refresh intervals — market data / strategies selects (min 1 / 15 min — never lower; ties
  to the anti-runaway rules).
**Data:** adapter health checks, env config.
**Prize hook:** Mantle ecosystem contribution made legible.

## D.10 `/app/settings` — Account Settings
Sections: Profile (display name, ENS/MNS) · **Jurisdiction declaration** (feeds the
compliance engine) · Risk profile · Notifications (email/in-app) · Mode (Simulation/Advisory/
Guarded) · Appearance (theme) · Danger zone (disconnect, clear local prefs). Each section a
card with its own Save. Jurisdiction change → prompts a compliance re-scan.

---

# PART E — INTEGRATIONS ADDENDUM (CTO additions worth taking)

Beyond the build-plan core, these are integrations I would greenlight. Each is tagged
**[core]** (build now) or **[stretch]** (post-MVP / if time) and mapped to why it earns points.

| Integration | Tag | Why it's worth it |
|---|---|---|
| **Privy** embedded wallets ("Continue with email") | **[core]** | Directly wins the Best-UI/UX "smoothest Web2 onboarding" line and the Path-B "lower the barrier" criterion. A non-crypto user reaches a funded experience without a seed phrase. |
| **RedStone** + **Pyth** oracles on Mantle | **[core]** | Powers the price/peg + oracle-freshness risk dimensions with *real* feeds. RedStone is widely used across Mantle RWAs — concrete ecosystem depth. |
| **Chainlink Proof of Reserve** | **[stretch]** | The single best signal for the "asset/issuer risk" dimension — verifies RWA collateral backing. Elevates the rating from heuristic to evidence-based. |
| **EAS (Ethereum Attestation Service)** schema compatibility | **[stretch]** | Make `AuralisComplianceAttestor` emit an EAS-compatible schema so attestations are portable beyond Auralis — strengthens the "infrastructure / business potential" story. |
| **IPFS** (web3.storage / Pinata) for `metadataURI` | **[core]** | Every rating report, compliance report, and decision record is content-addressed and permanent — makes "every claim is provable" literally true. |
| **Goldsky** or **The Graph** subgraph | **[core]** | Indexes `RatingAnchored` / `DecisionLogged` / `AttestationMinted` for fast Decisions + Agent pages and event-derived reputation. Free tier covers the hackathon. |
| **Nansen API** (credit-sponsor, judge-affiliated) | **[core]** | On-chain risk-exposure signals for wallet screening + rating. A Nansen Growth Lead is a judge; using their API well is direct signal. |
| **Allora Network** (judge-affiliated) | **[stretch]** | A decentralized-AI inference feed for yield/risk *forecasting* on the asset detail page. Allora's judge is on the panel; a tasteful integration reads as ecosystem awareness. |
| **Safe (Gnosis Safe)** support for the institutional niche | **[stretch / roadmap]** | Multisig-owned policies — credible for the DAO-treasury user. Flag in `ROADMAP.md` if not built. |
| **Sentry** | **[core]** | Error visibility across app + worker; cheap insurance for a clean Demo Day. |

**Scope discipline:** `[core]` items are inside the 23-day plan. `[stretch]` items are
explicitly optional — if a phase is at risk, they are cut first and moved to `ROADMAP.md`.
This keeps the project at the intended 75/100 breadth.

---

# PART F — IMPLEMENTATION CHECKLIST (definition of "done" per page)

A page is **done** only when:
- [ ] All five universal states (§A.6) implemented.
- [ ] Every button performs a real action or is intentionally disabled with a tooltip.
- [ ] All on-chain actions use `<TxButton>` with the full toast lifecycle.
- [ ] Responsive at 360 / 768 / 1280 px.
- [ ] Keyboard-navigable; focus rings visible; WCAG-AA contrast.
- [ ] `prefers-reduced-motion` honored.
- [ ] Reachable from nav and from the ⌘K palette.
- [ ] No console errors; no `localStorage`-dependent shared-demo flow.
- [ ] Loading data degrades gracefully (skeleton → stale → error-with-retry).

*End of UI Specification v1.0.*
