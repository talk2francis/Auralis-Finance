# Auralis Risk Methodology

Purpose: publish the deterministic seven-dimension rating methodology used to score Mantle RWA and yield assets.

Related docs: [Architecture](./ARCHITECTURE.md), [Compliance Framework](./COMPLIANCE_FRAMEWORK.md), [Agent Design](./AGENT_DESIGN.md), [Contracts](./CONTRACTS.md), [Testing](./TESTING.md).

Auralis Ratings are deterministic. AI may explain a rating, but it does not choose the score, grade, or risk-adjusted yield. The current methodology version is **v1.0**, encoded on-chain as integer **`100`**.

## Output definitions

- **RiskScore** — a number from `0` to `100`; lower is safer.
- **Grade** — agency-style band from `AAA` to `C` derived only from RiskScore.
- **DimensionScores** — seven normalized inputs from `0` to `100`; lower is safer.
- **RiskAdjustedAPY** — nominal APY after applying a convex penalty for risk.
- **RatingHash** — `keccak256(stableJson(ratingWithoutExplanation))`, anchored or verified on Mantle.

## Seven dimensions and weights

| Dimension | Weight | Definition | Main input signals |
|---|---:|---|---|
| `assetRisk` | 16% | Intrinsic complexity of the asset class and yield premium | asset class, nominal APY |
| `issuerRisk` | 18% | Issuer quality, proof discipline, and product seasonality | issuer tag, proof-of-reserve flag, contract age |
| `liquidityRisk` | 16% | Ability to exit without severe price impact | liquidity depth, TVL |
| `pegRisk` | 14% | Deviation from expected peg or exchange-rate reference | peg deviation in basis points |
| `oracleRisk` | 12% | Freshness of data used for pricing/risk | oracle freshness timestamp |
| `contractRisk` | 12% | Contract age and residual upgrade/admin risk | contract age in days |
| `concentrationRisk` | 12% | Holder, venue, or protocol concentration | top-holder concentration percentage |

Weights sum to `1.00`. The composite formula is:

```text
RiskScore = round2(
  assetRisk * 0.16 +
  issuerRisk * 0.18 +
  liquidityRisk * 0.16 +
  pegRisk * 0.14 +
  oracleRisk * 0.12 +
  contractRisk * 0.12 +
  concentrationRisk * 0.12
)
```

## Sub-formulas

All sub-scores are clamped to `[0, 100]` and rounded to the nearest integer.

### Asset risk

```text
baseByClass = {
  US_TREASURY_RWA: 22,
  STABLECOIN: 26,
  LST: 34,
  INDEX_RWA: 42,
  SYNTH_DOLLAR: 48,
  REGULATED_YIELD: 52,
  TOKENIZED_EQUITY: 58
}
assetRisk = clamp(baseByClass[assetClass] + max(0, nominalApy - 5) * 2)
```

### Issuer risk

```text
knownIssuerAdjustment = issuerTag matches /ondo|mantle|aave|ethena/i ? -10 : +5
proofAdjustment = proofOfReserve ? -8 : +10
ageBenefit = min(12, contractAgeDays / 90)
issuerRisk = clamp(38 + knownIssuerAdjustment + proofAdjustment - ageBenefit)
```

### Liquidity risk

```text
liquidityRisk = clamp(75 - log10(max(1, liquidityDepthUsd)) * 7 - log10(max(1, tvlUsd)) * 2)
```

### Peg risk

```text
pegRisk = clamp(12 + pegDeviationBps * 0.65)
```

### Oracle risk

```text
stalenessSeconds = max(0, now - oracleFreshnessTs)
oracleRisk = clamp(8 + stalenessSeconds / 180)
```

### Contract risk

```text
contractRisk = clamp(55 - min(35, contractAgeDays / 20))
```

### Concentration risk

```text
concentrationRisk = clamp(10 + concentrationTopHolderPct * 1.2)
```

## Grade bands

| RiskScore | Grade | Interpretation |
|---:|---|---|
| `0–15` | `AAA` | Minimal measured risk under v1.0 |
| `>15–25` | `AA` | Very low measured risk |
| `>25–35` | `A` | Low-to-moderate measured risk |
| `>35–50` | `BBB` | Moderate risk; suitable for balanced profiles |
| `>50–65` | `BB` | Elevated risk; active monitoring required |
| `>65–80` | `B` | High risk; restrictive policies recommended |
| `>80–100` | `C` | Severe risk; generally unsuitable |

## Risk-adjusted yield curve

Auralis discounts yield with a convex penalty so high-risk yield is punished more than linearly:

```text
riskPenalty = (RiskScore / 100) ^ 1.35
RiskAdjustedAPY = round4(nominalAPY * (1 - riskPenalty))
```

This means a 5% APY asset at risk score 20 keeps most of its yield, while a 12% APY asset at risk score 75 loses a much larger share. The curve is intentionally conservative because Auralis is a risk layer, not a yield leaderboard.

## Worked examples

The examples below use the adapter signals currently checked into the repository. Some feeds are marked mock while the product awaits final production data vendors; the methodology itself is deterministic and already versioned.

### USDY — Ondo US Dollar Yield

- Asset class: `US_TREASURY_RWA`
- Nominal APY: `4.85%`
- TVL: `$42.8M`
- Liquidity depth: `$6.2M`
- Peg deviation: `6 bps`
- Contract age: `640 days`
- Concentration: `16%`
- Proof of reserve: `true`

Expected interpretation: low asset risk, strong issuer/proof adjustments, moderate concentration. USDY is the demo anchor because it is a real Mantle RWA and makes the rating + compliance loop visible.

### mETH — Mantle Staked Ether

- Asset class: `LST`
- Nominal APY: `3.15%`
- TVL: `$712M`
- Liquidity depth: `$39M`
- Peg deviation: `22 bps`
- Contract age: `820 days`
- Concentration: `11%`
- Proof of reserve: `true`

Expected interpretation: strong liquidity and issuer context, but LST exchange-rate and smart-contract risk keep it from being treated like a cash-equivalent instrument.

### USDe — Ethena USDe

- Asset class: `SYNTH_DOLLAR`
- Nominal APY: `8.4%`
- TVL: `$58M`
- Liquidity depth: `$8.9M`
- Peg deviation: `10 bps`
- Contract age: `560 days`
- Concentration: `22%`
- Proof of reserve: `false`

Expected interpretation: higher asset and issuer risk than USDY because synthetic-dollar construction, elevated yield, proof assumptions, and concentration carry more model risk.

## Versioning

Methodology versions are integer encoded: `100 = v1.0`, `110 = v1.1`, etc. A material formula, weight, or grade-band change increments the version and produces new rating hashes. Historical hashes remain verifiable because the methodology version is included in the rated object and on-chain registry entry.

## Limitations

Auralis is not a credit-rating agency, broker, investment adviser, or law firm. It provides transparent risk tooling for Mantle assets. Scores depend on available inputs and can be wrong if feeds are stale, manipulated, incomplete, or misclassified. Human operators and integrators should use Auralis as a decision-support layer, not as a replacement for legal, financial, or operational review.
