# Auralis Business Model

Purpose: describe how Auralis can become a revenue-generating infrastructure layer for tokenized real-world assets.

Related docs: [Architecture](./ARCHITECTURE.md), [API](./API.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md), [Decisions](./DECISIONS.md), [Roadmap](./ROADMAP.md).

## Business thesis

Tokenized RWAs need more than issuance. They need ratings, compliance checks, monitoring, policy controls, and audit trails. Auralis turns those needs into infrastructure that Mantle apps, issuers, wallets, and treasuries can consume.

Auralis is revenue-first, not token-first. A future token may support discounts, staking, or curation, but the product does not depend on speculative token economics.

## Revenue line 1 — Intelligence API

Auralis sells ratings, methodology, eligibility, and proof-verification APIs to:

- RWA issuers that want third-party risk/compliance surfaces;
- wallets that want pre-trade eligibility checks;
- DeFi apps that want risk-aware routing;
- analytics dashboards that need normalized Mantle RWA data.

Pricing sketch:

| Tier | Customer | Price sketch |
|---|---|---:|
| Free | builders and judges | low-rate public ratings/methodology |
| Startup | small apps | $99–299/month |
| Growth | wallets/DeFi apps | $999+/month |
| Enterprise | issuers/institutions | custom SLA and compliance reporting |

## Revenue line 2 — Treasury tier

Treasuries, DAOs, funds, and protocols pay for portfolio policies, audit exports, multi-wallet reporting, compliance evidence, and advanced monitoring.

Pricing sketch: `0.10%–0.25%` annualized on monitored assets or flat SaaS starting around `$499/month` for small treasuries.

## Revenue line 3 — Attestation mint fee

`AuralisComplianceAttestor` already supports an optional mint fee. Auralis can charge a small fee when a wallet or issuer mints a reusable eligibility attestation. This is not custody; it is a payment for generating portable compliance proof.

## TAM

The initial market is Mantle's RWA/yield ecosystem: USDY, QCDT, mETH/cmETH, USDe, index products, and DeFi venues. The broader market is tokenized Treasuries, stable yield products, tokenized equities, and institutional on-chain treasury management.

The practical wedge is not “all RWAs.” It is “every Mantle RWA needs a risk and eligibility layer before serious capital trusts it.”

## GTM

1. **Public ratings explorer** — free, searchable, and verifiable ratings become top-of-funnel.
2. **Issuer partnerships** — offer methodology pages and attestation widgets for Mantle TaaS/RWA issuers.
3. **Wallet integrations** — pre-trade “can I hold this?” checks inside wallet/RWA flows.
4. **Treasury design partners** — DAOs and funds use the policy simulator and audit exports.
5. **Mantle ecosystem distribution** — position Auralis as infrastructure that improves trust in Mantle RWAs.

## Why now

Mantle has the issuance rails and assets. What is missing is a trust layer that is transparent, compliance-aware, AI-assisted, and on-chain verifiable. The scorecard rewards exactly that gap: deep AI × RWA integration, compliance awareness, Mantle-specific settlement, and a complete business loop.

## Tokenomics posture

Auralis does not need a token to work. If a token is introduced later, it should be tied to real utility: API fee discounts, attestation staking/slashing for approved attesters, and methodology-curation governance. Until then, revenue comes from API access, treasury SaaS, and attestation fees.
