# Auralis Demo Day Runbook

Purpose: provide the timed live-demo flow, fallback plan, and presenter notes for Demo Day.

Related docs: [Judge Guide](./JUDGE_GUIDE.md), [Video Script](./video-script.md), [Submission Checklist](./SUBMISSION_CHECKLIST.md), [Security](./SECURITY.md), [Contracts](./CONTRACTS.md).

## Primary demo URL

Use `https://auralisfinance.xyz` once DNS is live.

Fallbacks:

1. Vercel deployment URL.
2. Uploaded demo video.
3. Local app on `localhost:3000` with the same committed code and Mantle mainnet addresses.

## Timed live demo — 4 minutes

### 0:00–0:30 — Problem and thesis

Screen: landing page.

Say:

> Tokenized RWAs need more than yield. Users need to know the risk, whether their wallet is eligible, and whether the decision can be verified later. Auralis is the AI risk and compliance layer for Mantle RWAs.

### 0:30–1:15 — Public ratings explorer

Screen: `/ratings`, then USDY detail.

Show:

- USDY rating grade.
- Risk score.
- Seven-dimension methodology.
- Rating hash / proof framing.

Say:

> AI explains the result, but deterministic code computes the score. The rating hash can be verified against Mantle.

### 1:15–2:10 — Compliance scan

Screen: `/app/compliance`.

Show:

- Wallet jurisdiction.
- USDY/Treasury RWA eligibility logic.
- Eligible / Restricted / Denied matrix.
- Report hash and attestation framing.

Say:

> Auralis turns compliance into a structured workflow: scan, verdict, report hash, and optional user-signed attestation. Sensitive inputs stay off-chain.

### 2:10–2:55 — Simulator and policy guard

Screen: `/app/simulator`.

Show:

- Target allocation sliders.
- Policy preview.
- A blocked or passed policy row.
- Human approval requirement.

Say:

> The agent proposes. The policy engine checks. The user signs. There is no server wallet and no autonomous execution.

### 2:55–3:35 — Decision proof and agent

Screen: `/app/decisions`, then `/app/agent`.

Show:

- Decision/proof ledger.
- Agent identity / skills.
- Mantle proof contract addresses if needed.

Say:

> Every important decision can produce a proof trail on Mantle: what the agent proposed, what policy allowed, and what the user approved.

### 3:35–4:00 — Close

Screen: `/docs` or `/methodology`.

Say:

> Auralis is not a tokenizer and not a custodial bot. It is risk, compliance, and proof infrastructure for the Mantle RWA ecosystem.

## Backup if RPC is slow

1. Do not refresh repeatedly.
2. Switch to `/ratings`, `/methodology`, and `/docs` first — these should be fast/static.
3. Use the recorded demo video for the live transaction moment.
4. Open Mantle Explorer directly for contract evidence.
5. Explain honestly: “RPC is slow, so I’m using the recorded proof path and Explorer links.”

## Backup if wallet signing fails

1. Do not fake a transaction.
2. Show the deterministic scan/simulation output.
3. Show the contract addresses and previous deployment receipts.
4. Use the recorded video for the signing moment.
5. State: “The app remains user-signed; if the wallet provider is unavailable, no server fallback signs on behalf of the user.”

## Presenter split

If one presenter:

- Francis: full story and demo.

If two presenters:

- Presenter 1: problem, ratings, compliance.
- Presenter 2: simulator, proof, architecture/business model.

## Final checklist before going live

- `https://auralisfinance.xyz` loads.
- `/ratings/usdy` loads.
- `/app/compliance` loads.
- `/app/simulator` loads.
- `/app/decisions` loads.
- Mantle contract links open.
- Demo video is open in a backup browser tab.
- Wallet is connected and on Mantle mainnet.
- No private keys or seed phrases are visible.
