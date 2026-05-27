# Auralis Security

Purpose: document the non-custodial model, anti-runaway rules, threat model, secret hygiene, and contract self-audit evidence.

Related docs: [Architecture](./ARCHITECTURE.md), [Contracts](./CONTRACTS.md), [Deployment](./DEPLOYMENT.md), [Testing](./TESTING.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md).

## Non-custodial model

Auralis stores proofs, not funds. The contracts record rating hashes, compliance attestations, agent identity metadata, policy settings, and decision records. They do not custody user assets, route swaps, or hold a server-controlled treasury for user balances.

All execution that affects a user's wallet is user-signed. The AI proposes; deterministic code checks; the wallet signs; Mantle records the proof.

## The five hard rules

Verbatim from the build plan §16:

1. **No private key in any always-on or scheduled process.** The worker has no key. Vercel functions have no signing key. Only the local deploy step touches the deployer key, once.
2. **No autonomous on-chain execution.** There is no code path that signs a transaction without a human clicking and their wallet prompting. `executeRebalance` is reachable only via a user-signed tx.
3. **No auto-deploy loops.** CI runs lint/typecheck/test only — CI never deploys contracts and never deploys to mainnet. Mainnet deploy is a manual, local, human-run command.
4. **No tight-interval crons.** The single worker job runs every 15 minutes, is idempotent, has a hard per-run cap, and only reads + writes Postgres. If it fails, it fails safe (stale data).
5. **Every external call is cached and rate-limited.** RPC reads cached in Redis; AI responses cached by input hash; per-user and per-IP rate limits on every API route.

## One-key-once rule

`DEPLOYER_PRIVATE_KEY` is used only for local, explicit contract deployment. It must never be set in Vercel, the worker, CI, `.env.example`, docs, screenshots, logs, or committed files. After deployment, addresses are written to `packages/contracts/deployments/mantle.json` and public `NEXT_PUBLIC_*` address variables.

## Threat model

| Threat | Impact | Mitigation |
|---|---|---|
| AI hallucination | Bad explanation or proposal | AI cannot set scores/verdicts; Zod schemas; deterministic engines own authority |
| API spam | Cost or availability degradation | Per-IP/wallet rate limits, caching, no signing keys |
| RPC outage | Stale verification | Health degradation; local deterministic result remains visible |
| Compromised Vercel env | Could affect UI/API responses | No private key in Vercel; cannot move funds |
| Compromised worker | Stale or incorrect refresh data | Worker is read-only and keyless |
| Malicious attestation input | Incorrect self-attestation | On-chain subject/attester checks, duplicate hash rejection, revocation, bounded validity |
| Contract bug | Proof integrity issue | Minimal contracts, tests, coverage, Slither review, no custody |

## Secret hygiene

Never commit `.env` files. Use `.env.example` with blanks/placeholders only. Browser-safe variables are prefixed `NEXT_PUBLIC_` and must never contain private keys, service-role keys, AI keys, database passwords, or deployer secrets.

Server-only secrets: `SUPABASE_SERVICE_ROLE_KEY`, `ELFA_API_KEY`, `OPENAI_API_KEY`, `NANSEN_API_KEY`, `SENTRY_DSN`.

Deploy-only secret: `DEPLOYER_PRIVATE_KEY`.

## Contract self-audit

### Coverage

Latest run:

```text
cd packages/contracts && pnpm exec hardhat coverage
11 passing
All files: statements 98.11%, branches 89.29%, functions 100%, lines 98.5%
```

### Slither summary

Latest run used an isolated virtualenv:

```text
/tmp/slither-venv/bin/slither . --exclude-dependencies
Analyzed 23 contracts with 101 detectors, 12 result(s) found
```

Findings reviewed:

- `incorrect-equality` on `isEligible` and `verifyRating`: expected equality checks for exact verdict/hash matching; accepted.
- `shadowing-local` on `registerAgent(..., name, ...)`: cosmetic local parameter shadowing ERC721 `name()`; low severity.
- `reentrancy-benign` / `reentrancy-events` on `_safeMint` before metadata/profile writes: no funds at risk; register path should still be reordered in a future hardening pass.
- `timestamp` on attestation validity/cooldown checks: expected use of `block.timestamp` for expiry and cooldown windows.
- `pragma` differences from OpenZeppelin dependencies: expected dependency range variation.
- `low-level-calls` on owner `withdraw`: expected ETH transfer pattern; guarded by `onlyOwner` and no user funds are held except optional mint fees.

No finding indicates user-fund custody or autonomous execution risk.

## Responsible disclosure

Open a private GitHub security advisory or contact the maintainer listed in the repository profile. Include affected contract/API, reproduction steps, impact, and suggested remediation. Do not publicly disclose exploitable details before a fix window.
