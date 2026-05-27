# Auralis Testing

Purpose: map the test coverage across contracts, core engines, APIs, UI flows, and CI policy.

Related docs: [Security](./SECURITY.md), [Contracts](./CONTRACTS.md), [Deployment](./DEPLOYMENT.md), [Architecture](./ARCHITECTURE.md), [API](./API.md).

## Test strategy

Auralis tests the layers that carry authority first: contracts, deterministic engines, API validation, and user-signed flows. AI text is treated as advisory and schema-validated, not trusted as ground truth.

## Contract tests

Location: `packages/contracts/test/auralis.test.ts`.

Run:

```bash
cd packages/contracts
pnpm exec hardhat test
pnpm exec hardhat coverage
```

Current coverage summary:

```text
11 passing
All files: statements 98.11%, branches 89.29%, functions 100%, lines 98.5%
AuralisAgentRegistry.sol: lines 100%, functions 100%
AuralisComplianceAttestor.sol: lines 100%, functions 100%
AuralisPolicyGuard.sol: lines 95.35%, functions 100%
AuralisRatingRegistry.sol: lines 100%, functions 100%
```

Covered contract behavior:

- permissionless ratings cannot overwrite latest official rating;
- duplicate ratings rejected;
- invalid grades/scores rejected;
- decision logging validates risk/action data;
- duplicate compliance check hashes rejected;
- attestation fees, expiry, revoke, withdraw, pause, and auth rules;
- soulbound agent identity and minter controls;
- policy setting and every guardrail branch;
- blocked rebalances have non-reverting event path;
- human approval threshold enforced.

## Core engine tests

Core behavior is currently exercised through app/API and contract-integrated checks. Required deterministic assertions for future unit expansion:

- rating dimensions clamp to `[0, 100]`;
- methodology weights sum to `1.00`;
- grade bands match `AAA…C` table;
- `riskAdjustedApy` penalizes high scores convexly;
- `stableJson` hash is reproducible;
- compliance verdicts match sanctions, risk exposure, jurisdiction, and asset class rules;
- policy guard checks return pass/block without relying on AI output.

## API integration checks

Local smoke commands:

```bash
pnpm -F @auralis/web build
pnpm -F @auralis/web dev
curl -fsS http://localhost:3000/api/health
curl -fsS http://localhost:3000/api/ratings
curl -fsS http://localhost:3000/api/v1/methodology
curl -fsS -X POST http://localhost:3000/api/compliance/scan \
  -H 'content-type: application/json' \
  --data '{"wallet":"0x000000000000000000000000000000000000aAaA","jurisdiction":"US"}'
```

Latest Step 3.2 smoke evidence:

```text
/api/health: Mantle Mainnet chainId 5000, Mantle RPC operational, logger operational
US jurisdiction compliance scan: 6 eligible, 2 restricted, 0 denied, 8 verdicts total
/app/integrations: 200
/app/settings: 200
```

## E2E flows to verify before submission

- onboarding with wallet/Privy path;
- USDY rating detail and “Verify this rating”;
- compliance scan and attestation recommendation;
- jurisdiction change → re-scan prompt;
- simulator proposal → policy check;
- user-signed policy set;
- decision log and proof verification;
- copilot structured answer;
- integrations health page;
- settings reset and danger-zone behavior.

## Accessibility and responsive checks

Prompt 3.1 gate requires axe with zero serious/critical findings and route checks at 360, 768, and 1280 px. Keep the report with the QA artifacts and rerun after any layout-heavy change.

## CI policy

CI may run:

```bash
pnpm -w build
pnpm -w typecheck
pnpm -w test
```

CI must never deploy contracts, never run mainnet scripts, never hold `DEPLOYER_PRIVATE_KEY`, and never write to Mantle. Deployment is a manual local action only.
