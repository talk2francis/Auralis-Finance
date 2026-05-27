# Auralis Roadmap

Purpose: track post-hackathon work that is valuable but deliberately deferred from the delivered core loop.

Related docs: [DOCS_INDEX](./DOCS_INDEX.md), [CONTRACTS](./CONTRACTS.md), [JUDGE_GUIDE](./JUDGE_GUIDE.md).

## Deferred from Phase 3.2 stretch scope

These items were intentionally moved out of Step 3.2 so the integrations, settings, health, and Sentry work could be completed and verified without widening the critical path.

| Item | Status | Why deferred | Next implementation step |
|---|---|---|---|
| EAS-compatible attestation schema | Deferred | The current Mantle mainnet contract already stores Auralis compliance attestations directly; EAS compatibility should be added as a standards bridge, not rushed into the judging path. | Publish an EAS schema draft mirroring `ComplianceAttestor` fields: subject, assetClassId, verdict, checkHash, jurisdictionTag, metadataURI, validitySeconds. |
| Allora forecast on asset detail | Deferred | Asset detail pages already show deterministic ratings and methodology-backed signals. Forecasting needs a calibrated external model feed and confidence display. | Add an Allora adapter behind `/api/forecast/:assetId`, then surface it as advisory-only context on `/app/opportunities/[assetId]`. |
| Safe multisig policy support | Deferred | Current policy flows are single-wallet/user-signed. Safe support needs explicit multisig transaction building and simulation. | Add Safe app detection, policy proposal creation, and Safe transaction handoff for `setPolicy` / guarded execution. |

## Near-term post-submission roadmap

1. Publish the full documentation set and methodology pages.
2. Add production monitoring dashboards for `/api/health`, Sentry issue volume, and compliance scan latency.
3. Expand Mantle RWA coverage as new issuer assets launch.
4. Convert Auralis ratings and compliance attestations into a paid infrastructure API for Mantle apps, issuers, and treasuries.
