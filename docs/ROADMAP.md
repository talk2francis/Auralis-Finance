# Auralis Roadmap

Purpose: track the post-hackathon path, deferred stretch items, and the business expansion plan.

Related docs: [Business Model](./BUSINESS_MODEL.md), [Architecture](./ARCHITECTURE.md), [API](./API.md), [Security](./SECURITY.md), [Decisions](./DECISIONS.md).

## Deferred from Phase 3.2 stretch scope

These items were intentionally moved out of Step 3.2 so the integrations, settings, health, and Sentry work could be completed and verified without widening the critical path.

| Item | Status | Why deferred | Next implementation step |
|---|---|---|---|
| EAS-compatible attestation schema | Deferred | The current Mantle mainnet contract already stores Auralis compliance attestations directly; EAS compatibility should be added as a standards bridge, not rushed into the judging path. | Publish an EAS schema draft mirroring `ComplianceAttestor` fields: subject, assetClassId, verdict, checkHash, jurisdictionTag, metadataURI, validitySeconds. |
| Allora forecast on asset detail | Deferred | Asset detail pages already show deterministic ratings and methodology-backed signals. Forecasting needs a calibrated external model feed and confidence display. | Add an Allora adapter behind `/api/forecast/:assetId`, then surface it as advisory-only context on `/app/opportunities/[assetId]`. |
| Safe multisig policy support | Deferred | Current policy flows are single-wallet/user-signed. Safe support needs explicit multisig transaction building and simulation. | Add Safe app detection, policy proposal creation, and Safe transaction handoff for `setPolicy` / guarded execution. |

## Phase 4 — submission hardening

- Complete live deployment QA on the final URL.
- Record the USDY closed-loop demo video.
- Add final README, pitch deck, license, and contribution docs.
- Confirm no secrets in history and no ignored env file is committed.
- Publish the DoraHacks BUIDL and X thread.

## First 30 days post-hackathon

1. Replace remaining mock/placeholder risk feeds with production data providers.
2. Add Nansen-backed wallet risk enrichment where credits are available.
3. Publish the EAS-compatible attestation schema.
4. Add API keys, usage dashboards, and metered billing for the Intelligence API.
5. Add issuer-facing pages for methodology review and attestation status.

## 90-day product roadmap

- Expand coverage to additional Mantle RWAs and yield venues.
- Add Safe multisig policy proposals for treasury users.
- Add downloadable audit exports for compliance reports and decision proofs.
- Ship configurable organization policies: max asset class, max issuer, minimum grade, jurisdiction restrictions.
- Add notification channels for rating downgrade, attestation expiry, and policy drift.

## Business roadmap

Auralis monetizes through three lines described in [Business Model](./BUSINESS_MODEL.md):

1. Intelligence API for ratings and eligibility.
2. Treasury tier for multi-wallet monitoring and audit exports.
3. Attestation mint fee for reusable compliance proof.

The GTM sequence is public ratings explorer → issuer partnerships → wallet integrations → treasury design partners.

## Future token option

Auralis is revenue-first, not token-first. A future `$AURA` could support fee discounts, approved-attester staking, and methodology curation, but only after real API and attestation demand exists.

## Long-term vision

Auralis becomes the risk and compliance layer for tokenized real-world assets: not a custodian, not a broker, and not a token issuer, but the proof layer that helps users and apps answer three questions before touching an RWA: What is it? May this wallet hold it? What did the agent decide, and can I verify it?
