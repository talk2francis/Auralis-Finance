# Auralis API

Purpose: document the public infrastructure API for consuming Auralis ratings, eligibility reports, methodology data, simulations, and proof helpers.

Related docs: [Architecture](./ARCHITECTURE.md), [Risk Methodology](./RISK_METHODOLOGY.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md), [Contracts](./CONTRACTS.md), [Deployment](./DEPLOYMENT.md).

Base URL is the deployed web origin. Local development uses `http://localhost:3000` or the configured Next.js port.

## API policy

- Responses are JSON.
- Public rating and methodology endpoints are unauthenticated.
- Mutating/proposal endpoints validate payloads with Zod and are rate-limited per IP/wallet.
- CORS is enabled for public `/api/v1/*` infrastructure reads.
- Chain writes are not performed by the API. Users sign through wallet UI.

## Rate limits

Current implementation: `90` requests per `60` seconds per IP/wallet key through `assertRateLimit`. Production may tighten this for unauthenticated public API keys.

## Public infrastructure endpoints

### `GET /api/v1/ratings`

Returns all current Auralis ratings.

Equivalent internal route: `GET /api/ratings`.

```bash
curl https://<app>/api/ratings
```

Response shape:

```json
[
  {
    "assetId": "mantle:usdy",
    "symbol": "USDY",
    "grade": "A",
    "riskScore": 28.4,
    "dimensionScores": {},
    "nominalApy": 4.85,
    "riskAdjustedApy": 4.16,
    "methodologyVersion": 100,
    "ratingHash": "0x..."
  }
]
```

### `GET /api/v1/ratings/:id`

Returns one rating plus AI explanation/provenance where available. `:id` can be an asset id or symbol.

```bash
curl https://<app>/api/v1/ratings/usdy
```

Errors: `404 { "error": "not_found" }`.

### `POST /api/v1/eligibility`

Runs a compliance scan for a wallet and declared jurisdiction. Alias of `POST /api/compliance/scan`.

Request:

```json
{ "wallet": "0x000000000000000000000000000000000000aAaA", "jurisdiction": "US" }
```

Response includes `walletScreen`, `results[]`, `methodologyVersion`, `disclaimer`, and `reportHash`.

### `GET /api/v1/methodology`

Returns current methodology version and weights.

```json
{ "version": 100, "weights": { "assetRisk": 0.16 } }
```

## App API endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | `GET` | Real status for Mantle RPC, assets, wallet config, logger, Nansen, Sentry, DB |
| `/api/ratings` | `GET` | All deterministic ratings |
| `/api/ratings/:assetId` | `GET` | Single deterministic rating |
| `/api/verify/rating` | `POST` | Recompute `keccak256(stableJson(ratingJson))` and compare to rating hash |
| `/api/compliance/scan` | `POST` | Wallet + jurisdiction compliance report |
| `/api/compliance/:wallet` | `GET` | Wallet compliance lookup/demo data |
| `/api/portfolio/:wallet` | `GET` | Demo portfolio derived from ratings |
| `/api/simulate` | `POST` | Rebalance proposal + policy check + AI provenance |
| `/api/decisions` | `POST` | Create a local decision proof payload and optional persistence row |
| `/api/decisions/:wallet` | `GET` | Wallet decision history/demo decisions |
| `/api/copilot` | `POST` | Structured copilot response; supports SSE streaming |

## Direct on-chain reads

Integrators do not need the Auralis API for final proof checks.

### Verify a rating

Contract: `AuralisRatingRegistry` on Mantle mainnet.

```solidity
function verifyRating(bytes32 assetId, bytes32 ratingHash) external view returns (bool)
```

Use this to confirm that a displayed rating hash matches the latest on-chain record for the asset.

### Check eligibility

Contract: `AuralisComplianceAttestor`.

```solidity
function isEligible(address wallet, bytes32 assetClassId) external view returns (bool)
function getVerdict(address wallet, bytes32 assetClassId) external view returns (Verdict verdict, bool active)
```

Use this to gate downstream RWA flows without exposing private scan inputs.

## Caching

Ratings are cached for 15 minutes. AI explanations are cached by deterministic input hash. Production deployments should add CDN cache headers for public methodology and ratings endpoints while keeping wallet-specific scans uncached.

## CORS

`/api/v1/*` routes are intended for public infrastructure access. They should return permissive CORS headers in production so wallets, issuers, and Mantle apps can consume Auralis as a ratings/compliance layer.
