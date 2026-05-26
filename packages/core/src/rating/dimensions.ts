export type RatingSignals = {
  assetClass: string;
  price: number;
  tvlUsd: number;
  nominalApy: number;
  rawRiskSignals: {
    attestationFreshnessTs: number;
    oracleFreshnessTs: number;
    issuerTag: string;
    liquidityDepthUsd: number;
    pegDeviationBps: number;
    contractAgeDays: number;
    concentrationTopHolderPct: number;
    proofOfReserve: boolean;
  };
};

const clamp = (n: number) => Math.round(Math.max(0, Math.min(100, n)));

/** Asset risk captures intrinsic asset-class complexity and yield-premium risk. */
export function assetRisk(a: RatingSignals) {
  const base = { US_TREASURY_RWA: 22, LST: 34, STABLECOIN: 26, SYNTH_DOLLAR: 48, REGULATED_YIELD: 52, TOKENIZED_EQUITY: 58, INDEX_RWA: 42 }[a.assetClass] ?? 50;
  return clamp(base + Math.max(0, a.nominalApy - 5) * 2);
}

/** Issuer risk rewards known issuers, proof discipline, and seasoned products. */
export function issuerRisk(a: RatingSignals) {
  const known = /ondo|mantle|aave|ethena/i.test(a.rawRiskSignals.issuerTag) ? -10 : 5;
  const proof = a.rawRiskSignals.proofOfReserve ? -8 : 10;
  return clamp(38 + known + proof - Math.min(12, a.rawRiskSignals.contractAgeDays / 90));
}

/** Liquidity risk falls as TVL and executable depth rise. */
export function liquidityRisk(a: RatingSignals) {
  const depth = a.rawRiskSignals.liquidityDepthUsd;
  const tvl = a.tvlUsd;
  return clamp(75 - Math.log10(Math.max(1, depth)) * 7 - Math.log10(Math.max(1, tvl)) * 2);
}

/** Peg risk converts stable/restaking deviation in bps into a bounded risk score. */
export function pegRisk(a: RatingSignals) {
  return clamp(12 + a.rawRiskSignals.pegDeviationBps * 0.65);
}

/** Oracle risk is low for fresh feeds and rises sharply after roughly one hour. */
export function oracleRisk(a: RatingSignals, now = Math.floor(Date.now() / 1000)) {
  const staleness = Math.max(0, now - a.rawRiskSignals.oracleFreshnessTs);
  return clamp(8 + staleness / 180);
}

/** Contract risk decays with age but bottoms out because upgrade/admin risk remains. */
export function contractRisk(a: RatingSignals) {
  return clamp(55 - Math.min(35, a.rawRiskSignals.contractAgeDays / 20));
}

/** Concentration risk tracks top-holder / venue concentration directly. */
export function concentrationRisk(a: RatingSignals) {
  return clamp(10 + a.rawRiskSignals.concentrationTopHolderPct * 1.2);
}
