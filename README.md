# Auralis Finance

**AI Risk & Compliance for Tokenized RWA on Mantle Network.**

Auralis is the AI agent that rates, compliance-checks, and rebalances tokenized real-world assets on Mantle — every decision proven on-chain.

This repo currently contains the **frontend only**. Backend (rating engine, compliance pipeline, on-chain anchoring on Mantle, copilot inference, etc.) is being built next.

---

## Stack

- **Vite** + **React 18** (JSX, no TypeScript yet)
- **Plain CSS** (single `src/styles.css`, design tokens + theming)
- **Google Fonts** — Newsreader, Inter, Geist Mono
- Hash-based router (no `react-router` dependency)
- All data is currently mocked in `src/mock.js` (`window.Auralis.Services.*`)

The UI was designed in Claude Design and exported as a Babel-in-browser prototype. It has been converted to a real Vite app so it can be developed and shipped normally.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build      # production bundle into dist/
npm run preview    # serve the built bundle
```

## Project layout

```
.
├── index.html              # Vite entry HTML
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx            # ReactDOM mount; imports mock.js + styles + App
│   ├── App.jsx             # All UI (routing + marketing + app shell + pages)
│   ├── mock.js             # Mock data & services on window.Auralis
│   └── styles.css          # Design tokens + all component styles
└── LICENSE
```

`App.jsx` is a single concatenated module containing every component (icons, shared components, topographic background, app shell, marketing pages, app pages, router). This mirrors the original prototype's single-scope design — refactoring into per-feature files can happen incrementally as the backend lands.

## Routes

**Marketing**: `/`, `/product`, `/methodology`, `/ratings`, `/ratings/:id`, `/security`, `/business`, `/docs`, `/faq`, `/company`

**App** (gated on a mock "connect wallet"): `/app` (onboarding), `/app/dashboard`, `/app/opportunities`, `/app/opportunities/:id`, `/app/compliance`, `/app/simulator`, `/app/copilot`, `/app/policies`, `/app/decisions`, `/app/agent`, `/app/integrations`, `/app/settings`

Routes are hash-based — e.g. `#/app/dashboard`.

## What's mocked vs. what needs a real backend

Everything in `src/mock.js` (`window.Auralis.Services`) returns hardcoded data with simulated delay:

- `getRatings`, `getRating(id)` — RWA rating data
- `getPortfolio` — current positions
- `runComplianceScan` — wallet/asset screening (KYT, sanctions, jurisdiction)
- `askCopilot(q)` — AI copilot replies
- `getDecisions` — agent decision log with txHashes
- `anchorRating`, `mintAttestation`, `logDecision`, `savePolicy` — return fake Mantle tx hashes via `https://explorer.mantle.xyz/tx/...`

These are the integration points the backend will replace.

## Origin

UI designed in [Claude Design](https://claude.ai/design) from a 32-prompt spec, exported as a handoff bundle, and converted to a Vite + React app for this repo.
