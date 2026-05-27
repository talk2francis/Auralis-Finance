# Auralis Finance

Auralis Finance is the AI risk and compliance layer for tokenized real-world assets on Mantle. It rates RWA/yield assets, checks wallet eligibility, simulates policy-safe portfolio decisions, and records proofs on-chain.

## Live thesis

Most RWA apps show yield. Auralis adds the missing trust layer:

- **Ratings:** deterministic seven-dimension Auralis Ratings with AI-written explanations.
- **Compliance:** wallet screening, eligibility verdicts, exportable reports, and reusable attestations.
- **Guardrails:** AI proposes; deterministic policy checks enforce; users sign every transaction.
- **Proofs:** ratings, compliance attestations, decisions, and policy outcomes are committed to Mantle.

Auralis provides risk information and compliance tooling, **not financial or legal advice**.

## Deployed contracts

Corrected production deployment on **Mantle Mainnet · chainId 5000**.

| Contract | Address | Explorer | Sourcify |
|---|---|---|---|
| `AuralisAgentRegistry` | `0x2939Df04CAfcd310f764d928559f2BF9F284a2f4` | [Explorer](https://explorer.mantle.xyz/address/0x2939Df04CAfcd310f764d928559f2BF9F284a2f4) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0x2939Df04CAfcd310f764d928559f2BF9F284a2f4/) |
| `AuralisRatingRegistry` | `0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22` | [Explorer](https://explorer.mantle.xyz/address/0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0xF59c877C83E6519A606810b4d8DA52Ccf34d5A22/) |
| `AuralisComplianceAttestor` | `0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34` | [Explorer](https://explorer.mantle.xyz/address/0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0xe4eE2b0984FF9F604bF03d0521808037Ea5d3b34/) |
| `AuralisPolicyGuard` | `0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E` | [Explorer](https://explorer.mantle.xyz/address/0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E) | [Full match](https://repo.sourcify.dev/contracts/full_match/5000/0xFaD41c7d7e777853CF7aC04641Df0D88B27A7b0E/) |

Deployment metadata is committed in `packages/contracts/deployments/mantle.json`. The earlier deployment from `f4be00e` is abandoned and must not be used.

## Demo routes

- `/` — marketing landing page
- `/ratings` — public ratings explorer
- `/ratings/[assetId]` — public rating detail with methodology and proof framing
- `/methodology` — readable public methodology
- `/faq` — non-custodial, AI, chain, and business FAQ
- `/docs` — judge/developer documentation hub
- `/app/dashboard` — portfolio risk dashboard
- `/app/compliance` — wallet scan, eligibility matrix, reports, attestations
- `/app/simulator` — before/after rebalance simulation and policy preview
- `/app/copilot` — structured AI assistant surface
- `/app/policies` — guardrail templates and policy editor
- `/app/decisions` — decision/proof ledger
- `/app/agent` — agent identity and 12-skill registry

## Quickstart

```bash
pnpm install
pnpm -w exec turbo run build typecheck test
pnpm -F @auralis/web dev
```

Open `http://localhost:3000` or the port printed by Next.js.

## Repository map

```text
apps/web             Next.js 15 marketing + app
packages/contracts   Hardhat contracts, deployments, verification scripts
packages/core        deterministic rating/compliance/policy engines
packages/adapters    normalized Mantle/RWA data adapters
packages/types       shared Zod schemas
packages/ui          shared Auralis UI primitives/components
docs                 product, contract, scorecard, and judge docs
```

## Documentation

- [Judge Guide](docs/JUDGE_GUIDE.md) — 5-minute and 15-minute judging paths
- [Tutorial](docs/TUTORIAL.md) — USDY closed-loop walkthrough
- [Architecture](docs/ARCHITECTURE.md) — system layers and flows
- [Risk Methodology](docs/RISK_METHODOLOGY.md) — seven-dimension rating model
- [Compliance Framework](docs/COMPLIANCE_FRAMEWORK.md) — eligibility and attestation model
- [Security](docs/SECURITY.md) — non-custodial model and audit notes
- [Submission Checklist](docs/SUBMISSION_CHECKLIST.md) — final package checklist
- [Pitch](docs/PITCH.md) — concise product story

## Verification gates

Recent gates after the corrected mainnet deploy and Phase 3 polish:

```text
pnpm -F @auralis/web build      # passed; Sentry/OTEL warning only
18 route smoke checks           # 200 on local dev server
4 API smoke checks              # 200 on local dev server
US compliance scan              # 8 verdicts, 2 restricted, 0 denied
Simulator API                   # proposal true; policy blocked imbalanced weights
Decision API                    # generated deterministic decision hash
pnpm exec hardhat test          # 11 passing
pnpm exec hardhat coverage      # high coverage
Slither                         # 23 contracts, 12 reviewed findings
Sourcify metadata HTTP 200      # all four mainnet contracts
```

## 中文摘要

Auralis Finance 是 Mantle 上代币化真实世界资产的 AI 风险与合规层。它为 RWA 资产生成可解释评级，检查钱包资格，模拟受策略保护的投资组合操作，并把评级、合规证明和决策哈希写入 Mantle 主网，形成可验证的链上证明。
