# Auralis Deployment

Purpose: provide a reproducible setup for local development, contract deployment, Vercel web deployment, and keyless worker operation.

Related docs: [Architecture](./ARCHITECTURE.md), [Contracts](./CONTRACTS.md), [Security](./SECURITY.md), [Testing](./TESTING.md), [API](./API.md).

## Environments

Auralis has four deployment surfaces:

1. **Local development** — full monorepo with mocked/fallback data.
2. **Mantle contracts** — one-time local deploy and verification.
3. **Vercel web app** — `apps/web`, public app and API routes.
4. **Read-only worker** — `apps/worker`, scheduled refresh/indexing only, no private key.

## Environment variables

| Name | Required? | Lives in | Browser? | Purpose |
|---|---:|---|---:|---|
| `NEXT_PUBLIC_CHAIN_ID` | Yes | Vercel/web | Yes | Expected chain id, `5000` for Mantle mainnet |
| `NEXT_PUBLIC_MANTLE_RPC_URL` | Optional | Vercel/web | Yes | Browser-safe Mantle RPC override |
| `NEXT_PUBLIC_MANTLE_EXPLORER_URL` | Yes | Vercel/web | Yes | Mantle explorer URL |
| `MANTLE_RPC_URL` | Yes for deploy/API health | local/web server | No | Server-side RPC URL |
| `MANTLE_SEPOLIA_RPC_URL` | Optional | local only | No | Testnet dry-run RPC |
| `DEPLOYER_PRIVATE_KEY` | Deploy only | local `packages/contracts/.env` | Never | One-time contract deploy key |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Optional | Vercel/web | Yes | Privy onboarding |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Optional | Vercel/web | Yes | WalletConnect/RainbowKit |
| `NEXT_PUBLIC_AURALIS_RATING_REGISTRY` | Yes | Vercel/web | Yes | Rating registry address |
| `NEXT_PUBLIC_AURALIS_COMPLIANCE_ATTESTOR` | Yes | Vercel/web | Yes | Compliance attestor address |
| `NEXT_PUBLIC_AURALIS_AGENT_REGISTRY` | Yes | Vercel/web | Yes | Agent registry address |
| `NEXT_PUBLIC_AURALIS_POLICY_GUARD` | Yes | Vercel/web | Yes | Policy guard address |
| `ELFA_API_KEY` | Optional | Vercel server/worker | No | Primary AI provider |
| `OPENAI_API_KEY` | Optional | Vercel server/worker | No | AI fallback |
| `OPENAI_MODEL` | Optional | Vercel server/worker | No | AI fallback model |
| `SUPABASE_URL` | Optional | Vercel server/worker | No | Persistence URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Vercel server/worker | Never | Server persistence key |
| `UPSTASH_REDIS_REST_URL` | Optional | Vercel server/worker | No | Cache/rate-limit store |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Vercel server/worker | Never | Redis token |
| `NANSEN_API_KEY` | Optional | server/worker | Never | Wallet-risk enrichment |
| `DEFILLAMA_BASE_URL` | Optional | server/worker | No | Price/TVL feed |
| `COINGECKO_API_KEY` | Optional | server/worker | Never | Price fallback |
| `SENTRY_DSN` | Optional | Vercel/worker | No | Server monitoring |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional | Vercel/web | Yes | Browser monitoring |
| `NEXT_PUBLIC_APP_URL` | Yes production | Vercel/web | Yes | Canonical app URL |

Variables that must **never** reach browser, Vercel public env, CI logs, or screenshots: `DEPLOYER_PRIVATE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `ELFA_API_KEY`, `NANSEN_API_KEY`, `UPSTASH_REDIS_REST_TOKEN`, `COINGECKO_API_KEY`.

## Local development

```bash
pnpm install
pnpm -w build
pnpm -F @auralis/web dev
```

Useful checks:

```bash
pnpm -F @auralis/web build
pnpm -F @auralis/web exec tsc --noEmit
pnpm -F @auralis/contracts test
```

## Contract deployment and verification

Deployment is manual and local. Do not run it from CI.

```bash
cd packages/contracts
cp .env.example .env # if present, otherwise create .env locally
# Fill MANTLE_RPC_URL, DEPLOYER_PRIVATE_KEY, OWNER_ADDRESS if required.
pnpm exec hardhat compile
pnpm exec hardhat test
pnpm exec hardhat run scripts/deploy.ts --network mantleSepolia
pnpm exec hardhat run scripts/deploy.ts --network mantle
pnpm exec hardhat run scripts/verify.ts --network mantle
```

Current corrected Mantle mainnet addresses are in [Contracts](./CONTRACTS.md) and `packages/contracts/deployments/mantle.json`.

## Vercel web setup

- Project root: repository root.
- App root/package: `apps/web` via pnpm workspace.
- Build command: `pnpm -F @auralis/web build`.
- Install command: `pnpm install --frozen-lockfile`.
- Output: Next.js default.
- Required public variables: chain id, explorer URL, contract addresses, app URL.
- Optional server variables: Supabase, AI provider, Redis, Sentry.

Post-deploy smoke:

```bash
curl -fsS https://<app>/api/health
curl -I https://<app>/app/integrations
curl -I https://<app>/app/settings
```

## VPS/read-only worker setup

The worker is intentionally keyless. It can refresh data and write database rows, but cannot sign transactions.

Example systemd timer:

```ini
[Unit]
Description=Auralis read-only refresh

[Service]
WorkingDirectory=/srv/auralis
EnvironmentFile=/srv/auralis/apps/worker/.env
ExecStart=/usr/bin/pnpm -F @auralis/worker start
NoNewPrivileges=true
PrivateTmp=true
```

Timer interval should be 15 minutes or slower. No tight loops.

## Post-deploy checklist

- `/api/health` shows Mantle RPC chainId `5000`.
- `/app/integrations` renders connected service statuses.
- `/app/settings` jurisdiction change triggers compliance re-scan.
- Contract addresses match `packages/contracts/deployments/mantle.json`.
- Sentry is configured or explicitly marked not configured.
- No private key is present in Vercel, worker, or CI.
