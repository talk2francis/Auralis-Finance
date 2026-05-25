<div align="center">

# ✦ Auralis Finance

### The AI risk & compliance layer for tokenized real-world assets

*Auralis rates every RWA on Mantle, verifies whether your wallet is eligible to hold it,
and rebalances your portfolio under hard guardrails — writing every rating, verdict, and
decision to Mantle as permanent, verifiable proof.*

[![Built on Mantle](https://img.shields.io/badge/built%20on-Mantle%20Mainnet-0E9E8C?style=flat-square)](https://mantle.xyz)
[![Track](https://img.shields.io/badge/Turing%20Test%202026-AI%20%C3%97%20RWA-0B1220?style=flat-square)](https://devhub.mantle.xyz)
[![License: MIT](https://img.shields.io/badge/License-MIT-B08442?style=flat-square)](./LICENSE)
[![Non-custodial](https://img.shields.io/badge/non--custodial-verified-0F9D58?style=flat-square)](./docs/SECURITY.md)

**[Live App](#)** · **[Live Ratings](#)** · **[Demo Video](#)** · **[Judge Guide](./docs/JUDGE_GUIDE.md)** · **[Methodology](./docs/RISK_METHODOLOGY.md)** · **[X / Build Log](#)**

</div>

---

## The problem

Mantle has become an RWA distribution layer — Ondo's **USDY**, **QCDT**, **xStocks**, **MI4**,
**mETH/cmETH**. The issuance rails are solved. What is *not* solved:

- **No standardized risk rating** for on-chain RWAs. A wallet holding USDY, QCDT and sUSDe
  has no Moody's-equivalent, no unified score, no continuous monitoring.
- **No automated compliance layer.** Most RWAs carry real transfer restrictions and
  jurisdiction gates. Today a user cannot tell, *before they buy*, whether they may legally
  hold an asset. That hole blocks the institutional adoption Mantle is chasing.
- **No intelligent allocation** across RWAs that respects both risk *and* compliance.

The RWA promise — safe, real-world yield for anyone with a wallet — is blocked by **trust
asymmetry**. Auralis closes it.

## The solution — one AI agent, three pillars

| Pillar | What it does |
|---|---|
| **① Rate** — Asset Intelligence | An AI engine scores every Mantle RWA on a transparent 7-dimension methodology → an **Auralis Rating** (`AAA…C`) + risk-adjusted yield, with a plain-language rationale. |
| **② Verify** — Compliance & Eligibility | An AI agent screens your wallet and returns a per-asset **eligibility verdict** (may you hold USDY? QCDT? an xStock?), then mints a reusable, privacy-preserving **on-chain compliance attestation**. |
| **③ Manage** — Portfolio Agent | The agent proposes and simulates rebalances, enforces deterministic **policy guardrails**, executes only **user-signed** transactions, and logs every decision permanently on Mantle. |

**The loop:** `Observe → Rate → Verify → Simulate → Approve → Execute → Prove`

## Architecture

![Auralis Architecture](./docs/diagrams/AURALIS_ARCHITECTURE.svg)

A 7-layer system: Next.js client → Vercel API → a pure-function **Intelligence Core** →
data adapters → **Mantle Mainnet** contracts → Supabase/Upstash → a read-only refresh worker.
Full detail in **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**.

## Non-custodial by construction

> Auralis holds **no funds** and **no signing key**. Exactly one private key exists — the
> deployer key — used once, locally, then removed. Every on-chain write is a **user-signed**
> transaction. There is no autonomous execution path. The worst-case failure mode is
> 15-minute-stale data, never lost capital. See **[docs/SECURITY.md](./docs/SECURITY.md)**.

## Deployed on Mantle Mainnet (chainId 5000)

| Contract | Purpose | Address |
|---|---|---|
| `AuralisRatingRegistry` | Rating anchors + AI decision log | `0x…` |
| `AuralisComplianceAttestor` | Privacy-preserving compliance attestations | `0x…` |
| `AuralisAgentRegistry` | Soulbound agent identity (ERC-8004 compatible) | `0x…` |
| `AuralisPolicyGuard` | On-chain portfolio guardrails | `0x…` |

Contract reference: **[docs/CONTRACTS.md](./docs/CONTRACTS.md)**.

## Mantle ecosystem integrations

`Mantle Mainnet` · `Mantle RPC` · `Mantle Explorer` · `ERC-8004` · `Ondo USDY` · `QCDT` ·
`xStocks` · `MI4` · `mETH / cmETH` · `USDe / sUSDe` · `Aave on Mantle` · `Merchant Moe` ·
`Agni` · `Mantle TaaS` · `Nansen API` · `RedStone / Pyth oracles` — 14+ touchpoints.

## Quickstart

```bash
# prerequisites: Node 20 LTS, pnpm 9
git clone https://github.com/<org>/auralis.git && cd auralis
pnpm install
cp .env.example .env            # fill values — see docs/DEPLOYMENT.md

# contracts
pnpm -F @auralis/contracts compile
pnpm -F @auralis/contracts test
pnpm -F @auralis/contracts deploy:mantle      # manual, human-run only

# app (http://localhost:3000)
pnpm -F @auralis/web dev

# read-only refresh worker (VPS) — no keys
pnpm -F @auralis/worker dev
```

## Documentation

| Doc | Purpose |
|---|---|
| [JUDGE_GUIDE.md](./docs/JUDGE_GUIDE.md) | **Start here** — 5- and 15-minute walkthroughs, test wallet |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 7-layer system + sequence diagrams |
| [RISK_METHODOLOGY.md](./docs/RISK_METHODOLOGY.md) | The 7-dimension rating framework |
| [COMPLIANCE_FRAMEWORK.md](./docs/COMPLIANCE_FRAMEWORK.md) | Eligibility model + attestation design |
| [AGENT_DESIGN.md](./docs/AGENT_DESIGN.md) | Agent loop + the 12 Skills |
| [CONTRACTS.md](./docs/CONTRACTS.md) | Contract reference + addresses |
| [API.md](./docs/API.md) | REST surface for consuming Auralis as infrastructure |
| [SECURITY.md](./docs/SECURITY.md) | Non-custodial model + threat model |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Reproducible setup |
| [UI_SPEC.md](./docs/UI_SPEC.md) | Every page, component, and state |
| [TESTING.md](./docs/TESTING.md) | Test coverage map |
| [DECISIONS.md](./docs/DECISIONS.md) | Architecture decision log |
| [TUTORIAL.md](./docs/TUTORIAL.md) | Rate & compliance-check an asset in 10 minutes |
| [ROADMAP.md](./docs/ROADMAP.md) | Post-hackathon plan + business model |

## 中文简介

**Auralis Finance** 是面向 Mantle 链上代币化真实世界资产（RWA）的 **AI 风险与合规层**。
Mantle 已经构建了 RWA 的发行轨道（Ondo USDY、QCDT、xStocks、MI4、mETH 等），但缺失的是
**智能与信任层**：链上 RWA 没有统一的信用评级，没有自动化的合规资格判定，也没有兼顾风险
与合规约束的智能组合管理。Auralis 通过一个 AI 智能体同时解决这三点——它依据透明的七维方
法论为每个 RWA **评级**，为钱包**核验**每项资产的持有资格并在链上签发可复用的隐私保护合规
凭证，并在确定性护栏下**管理**组合。每一次评级、合规判定与决策都会作为永久可验证的证据写
入 Mantle 主网。Auralis 完全非托管：不托管任何资金、不持有任何签名密钥，所有链上写入均由
用户签名，不存在自动执行路径。

## License

MIT © 2026 Auralis Finance. Built for the Mantle Turing Test Hackathon 2026 · Track 03: AI × RWA.
