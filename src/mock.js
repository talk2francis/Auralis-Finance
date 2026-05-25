/* ============================================================
   Auralis — Mock data + services
   All data lives here. Services return after realistic delays.
   ============================================================ */

const fakeHash = () => {
  let s = "0x";
  const hex = "0123456789abcdef";
  for (let i = 0; i < 64; i++) s += hex[Math.floor(Math.random() * 16)];
  return s;
};
const truncate = (hash, head = 6, tail = 4) =>
  hash ? `${hash.slice(0, head)}…${hash.slice(-tail)}` : "";

const explorerOf = (hash) => `https://explorer.mantle.xyz/tx/${hash}`;

// Deterministic seed used at module load — keeps data consistent across the app
const SEED_HASHES = Array.from({ length: 40 }, fakeHash);

// ------------------------------------------------------------
// Asset palettes — flat, consistent tinted-disc icons
// ------------------------------------------------------------
const ASSET_PALETTE = {
  USDY:    { bg: "#E8F1FB", fg: "#1F58A8", letters: "U" },
  QCDT:    { bg: "#EEEAF7", fg: "#5340A4", letters: "Q" },
  mETH:    { bg: "#E6F2F3", fg: "#0E7C8E", letters: "mE" },
  cmETH:   { bg: "#E9F5EC", fg: "#19794A", letters: "cm" },
  USDe:    { bg: "#F4EEE5", fg: "#8A5A1F", letters: "Ue" },
  MI4:     { bg: "#ECEFEA", fg: "#3F4F39", letters: "M4" },
  Aave:    { bg: "#F4E8EE", fg: "#A4356C", letters: "A" },
  MMOE:    { bg: "#FCF0E5", fg: "#B45A1A", letters: "MM" },
  USDC:    { bg: "#E8F0FB", fg: "#2775CA", letters: "US" },
};

// ------------------------------------------------------------
// 8 assets
// ------------------------------------------------------------
const ASSETS = [
  {
    id: "USDY", symbol: "USDY", name: "Ondo US Dollar Yield",
    assetClass: "US Treasury RWA", grade: "A", riskScore: 28,
    band: "Low",
    dims: { Asset: 88, Issuer: 90, Liquidity: 72, Peg: 86, Oracle: 80, "Smart-contract": 84, Concentration: 70 },
    nominalApy: 5.18, riskAdjustedApy: 4.92, tvlUsd: 482_300_000, price: 1.0741,
    trend30d: 1.4,
    yieldComposition: [
      { label: "Short-dated T-Bills", pct: 78, color: "#0E9E8C" },
      { label: "Overnight repos", pct: 17, color: "#1F58A8" },
      { label: "Cash & equivalents", pct: 5, color: "#8C97A8" },
    ],
    description: "Tokenized exposure to short-duration US Treasury bills, structured for non-US qualified investors.",
    usedBy: [
      { name: "Mantle Treasury", value: 92_400_000, pct: 19.2 },
      { name: "Aave Reserves (Mantle)", value: 41_700_000, pct: 8.6 },
      { name: "Merchant Moe Stable Pool", value: 18_900_000, pct: 3.9 },
    ],
    rationale: "Backed by short-duration US Treasury exposure with a regulated issuer. Liquidity is good on primary; secondary depth on Mantle is moderate. Peg behaviour over 90 days has remained inside ±5bps.",
    ratingHash: SEED_HASHES[0],
  },
  {
    id: "QCDT", symbol: "QCDT", name: "Qualified Credit Token",
    assetClass: "Regulated Yield", grade: "A", riskScore: 34,
    band: "Low",
    dims: { Asset: 80, Issuer: 84, Liquidity: 60, Peg: 78, Oracle: 76, "Smart-contract": 80, Concentration: 64 },
    nominalApy: 8.32, riskAdjustedApy: 7.60, tvlUsd: 184_900_000, price: 1.0218,
    trend30d: 0.9,
    yieldComposition: [
      { label: "Investment-grade credit", pct: 64, color: "#0E9E8C" },
      { label: "Treasury collateral", pct: 26, color: "#1F58A8" },
      { label: "Cash buffer", pct: 10, color: "#8C97A8" },
    ],
    description: "Permissioned exposure to a diversified portfolio of qualified short-duration credit.",
    usedBy: [
      { name: "Mantle Treasury", value: 28_100_000, pct: 15.2 },
      { name: "Auralis Conservative Tier", value: 11_400_000, pct: 6.2 },
    ],
    rationale: "Qualified credit exposure with a strong issuer and conservative collateral mix. Secondary liquidity is limited — modeled hold time should reflect that.",
    ratingHash: SEED_HASHES[1],
  },
  {
    id: "mETH", symbol: "mETH", name: "Mantle Staked ETH",
    assetClass: "Liquid Staking", grade: "AA", riskScore: 22,
    band: "Low",
    dims: { Asset: 92, Issuer: 88, Liquidity: 86, Peg: 90, Oracle: 84, "Smart-contract": 88, Concentration: 72 },
    nominalApy: 3.94, riskAdjustedApy: 3.81, tvlUsd: 1_204_000_000, price: 3284.10,
    trend30d: 2.6,
    yieldComposition: [
      { label: "Consensus rewards", pct: 71, color: "#0E9E8C" },
      { label: "Execution tips", pct: 23, color: "#1F58A8" },
      { label: "MEV", pct: 6, color: "#D9870B" },
    ],
    description: "Mantle's native liquid-staking token. Accrues ETH staking yield with deep DeFi integrations.",
    usedBy: [
      { name: "Aave on Mantle", value: 218_400_000, pct: 18.1 },
      { name: "Merchant Moe", value: 142_900_000, pct: 11.9 },
      { name: "Mantle Treasury", value: 88_200_000, pct: 7.3 },
    ],
    rationale: "Mature LST with a strong validator set and deep on-chain liquidity. Peg has held tightly through volatility. Concentration risk is the primary watch-item.",
    ratingHash: SEED_HASHES[2],
  },
  {
    id: "cmETH", symbol: "cmETH", name: "Mantle Restaked ETH",
    assetClass: "Liquid Restaking", grade: "A", riskScore: 38,
    band: "Medium",
    dims: { Asset: 80, Issuer: 82, Liquidity: 70, Peg: 76, Oracle: 78, "Smart-contract": 70, Concentration: 64 },
    nominalApy: 5.41, riskAdjustedApy: 4.86, tvlUsd: 426_700_000, price: 3312.40,
    trend30d: 1.8,
    yieldComposition: [
      { label: "Base staking", pct: 58, color: "#0E9E8C" },
      { label: "Restaking points", pct: 32, color: "#1F58A8" },
      { label: "MEV", pct: 10, color: "#D9870B" },
    ],
    description: "Restaked mETH — additional yield in exchange for restaking-protocol slashing exposure.",
    usedBy: [
      { name: "Aave on Mantle", value: 64_100_000, pct: 15.0 },
      { name: "Pendle YT", value: 41_200_000, pct: 9.7 },
    ],
    rationale: "Captures additional yield versus mETH at the cost of slashing surface area. Smart-contract risk weighted higher pending more audit cycles.",
    ratingHash: SEED_HASHES[3],
  },
  {
    id: "USDe", symbol: "USDe", name: "Ethena Synthetic Dollar",
    assetClass: "Synthetic Dollar", grade: "BBB", riskScore: 51,
    band: "Medium",
    dims: { Asset: 64, Issuer: 70, Liquidity: 78, Peg: 60, Oracle: 70, "Smart-contract": 72, Concentration: 56 },
    nominalApy: 11.84, riskAdjustedApy: 8.21, tvlUsd: 3_120_000_000, price: 0.9986,
    trend30d: -0.4,
    yieldComposition: [
      { label: "Funding rate", pct: 74, color: "#0E9E8C" },
      { label: "Staking yield", pct: 18, color: "#1F58A8" },
      { label: "Cash reserves", pct: 8, color: "#8C97A8" },
    ],
    description: "Delta-neutral synthetic dollar — long staked ETH + short perpetual futures.",
    usedBy: [
      { name: "Merchant Moe", value: 92_800_000, pct: 3.0 },
      { name: "Mantle Treasury", value: 31_400_000, pct: 1.0 },
    ],
    rationale: "Yield is attractive and underpinned by funding-rate carry. The construction's peg depends on perpetual-futures market access; modeled stress scenarios should be the basis for sizing.",
    ratingHash: SEED_HASHES[4],
  },
  {
    id: "MI4", symbol: "MI4", name: "Mantle Index Four",
    assetClass: "Index RWA", grade: "A", riskScore: 36,
    band: "Medium",
    dims: { Asset: 78, Issuer: 80, Liquidity: 64, Peg: 78, Oracle: 76, "Smart-contract": 78, Concentration: 60 },
    nominalApy: 7.20, riskAdjustedApy: 6.42, tvlUsd: 118_200_000, price: 102.84,
    trend30d: 0.6,
    yieldComposition: [
      { label: "RWA basket", pct: 50, color: "#0E9E8C" },
      { label: "LST basket", pct: 35, color: "#1F58A8" },
      { label: "Stables", pct: 15, color: "#8C97A8" },
    ],
    description: "A managed four-asset index providing diversified Mantle ecosystem exposure.",
    usedBy: [
      { name: "Auralis Balanced Tier", value: 18_700_000, pct: 15.8 },
    ],
    rationale: "Index construction smooths single-asset risk. Composition rebalance cadence is monthly; concentration risk depends on underlying weightings.",
    ratingHash: SEED_HASHES[5],
  },
  {
    id: "Aave", symbol: "Aave", name: "Aave on Mantle",
    assetClass: "Lending", grade: "AA", riskScore: 26,
    band: "Low",
    dims: { Asset: 88, Issuer: 90, Liquidity: 82, Peg: 84, Oracle: 86, "Smart-contract": 86, Concentration: 76 },
    nominalApy: 4.20, riskAdjustedApy: 4.04, tvlUsd: 612_100_000, price: 1.0000,
    trend30d: 0.8,
    yieldComposition: [
      { label: "Supply APR", pct: 86, color: "#0E9E8C" },
      { label: "Incentives", pct: 14, color: "#1F58A8" },
    ],
    description: "Aave V3 markets deployed on Mantle. Supply / borrow against curated collateral.",
    usedBy: [
      { name: "Mantle Treasury", value: 84_400_000, pct: 13.8 },
    ],
    rationale: "Mature lending protocol with battle-tested risk parameters and a conservative listing process on Mantle.",
    ratingHash: SEED_HASHES[6],
  },
  {
    id: "MMOE", symbol: "MMOE", name: "Merchant Moe LP",
    assetClass: "Liquidity Pool", grade: "BB", riskScore: 58,
    band: "Medium",
    dims: { Asset: 58, Issuer: 64, Liquidity: 72, Peg: 56, Oracle: 60, "Smart-contract": 60, Concentration: 50 },
    nominalApy: 14.62, riskAdjustedApy: 9.34, tvlUsd: 142_400_000, price: 1.4280,
    trend30d: -1.2,
    yieldComposition: [
      { label: "Swap fees", pct: 62, color: "#0E9E8C" },
      { label: "MOE incentives", pct: 38, color: "#1F58A8" },
    ],
    description: "Concentrated-liquidity LP positions on Merchant Moe's stable + ETH pairs.",
    usedBy: [],
    rationale: "Attractive yield is incentive-driven and subject to emissions changes. Impermanent loss is the primary watch-item; sizing should reflect expected hold time.",
    ratingHash: SEED_HASHES[7],
  },
];

// ------------------------------------------------------------
// 30-day price/score series — deterministic per asset
// ------------------------------------------------------------
const seedSeries = (base, vol = 0.012, len = 30) => {
  let v = base;
  const out = [];
  for (let i = 0; i < len; i++) {
    v = v * (1 + (Math.sin(i * 1.3 + base) * 0.4 + (Math.random() - 0.5)) * vol);
    out.push({ d: i, v: Math.max(0.0001, v) });
  }
  // ensure end value drifts toward base*(1+trend)
  return out;
};
ASSETS.forEach(a => {
  a.priceSeries = seedSeries(a.price, 0.01);
  a.scoreSeries = seedSeries(100 - a.riskScore, 0.005);
});

// ------------------------------------------------------------
// Portfolio
// ------------------------------------------------------------
const PORTFOLIO = {
  totalUsd: 18_421_840,
  blendedApy: 9.18,
  riskScore: 42,
  availableLiquidity: 1_784_220,
  delta30d: 6.27,
  apyDelta: 0.73,
  positions: [
    { symbol: "USDC", name: "USD Coin", source: "Cash", value: 1_784_220, weight: 9.7, apy: 0.0, grade: "AAA", band: "Low" },
    { symbol: "mETH", name: "Mantle Staked ETH", source: "Liquid Staking", value: 5_842_100, weight: 31.7, apy: 3.94, grade: "AA", band: "Low" },
    { symbol: "USDY", name: "Ondo US Dollar Yield", source: "RWA", source: "RWA · Treasury", value: 3_968_400, weight: 21.5, apy: 5.18, grade: "A", band: "Low" },
    { symbol: "USDe", name: "Ethena Synthetic Dollar", source: "Synthetic Dollar", value: 2_184_900, weight: 11.9, apy: 11.84, grade: "BBB", band: "Medium" },
    { symbol: "Aave", name: "Aave on Mantle", source: "Lending", value: 3_412_700, weight: 18.5, apy: 4.20, grade: "AA", band: "Low" },
    { symbol: "MMOE", name: "Merchant Moe LP", source: "Liquidity Pool", value: 1_229_520, weight: 6.7, apy: 14.62, grade: "BB", band: "Medium" },
  ],
  performance: seedSeries(100, 0.008).map((p, i) => ({ d: i, v: p.v * (1 + i * 0.002) })),
  allocation: [
    { label: "DeFi", pct: 52.4, value: 9_656_988, color: "#0E9E8C" },
    { label: "RWA", pct: 33.2, value: 6_116_011, color: "#1F58A8" },
    { label: "Stablecoins", pct: 14.4, value: 2_652_265, color: "#8C97A8" },
  ],
};

// ------------------------------------------------------------
// Compliance
// ------------------------------------------------------------
const COMPLIANCE = {
  walletScreen: {
    summary: "Wallet cleared. One minor exposure flag.",
    runAt: "2 minutes ago",
    checks: [
      { label: "OFAC sanctions list", verdict: "pass" },
      { label: "EU consolidated list", verdict: "pass" },
      { label: "Known mixer interactions (24-mo)", verdict: "pass" },
      { label: "High-risk counterparty exposure", verdict: "warn", detail: "Indirect exposure to one BB-rated LP via a 3rd-degree counterparty. Severity: minor." },
      { label: "Address age & velocity", verdict: "pass" },
    ],
  },
  jurisdiction: "NG",
  matrix: [
    { assetId: "USDY", verdict: "RESTRICTED", reasons: ["Issuer terms exclude US persons", "Available to NG via private placement only"], confidence: 88 },
    { assetId: "QCDT", verdict: "DENIED", reasons: ["Permissioned issuance — not licensed for NG retail"], confidence: 92 },
    { assetId: "mETH", verdict: "ELIGIBLE", reasons: ["No issuer-jurisdiction restrictions"], confidence: 96 },
    { assetId: "cmETH", verdict: "ELIGIBLE", reasons: ["No issuer-jurisdiction restrictions"], confidence: 94 },
    { assetId: "USDe", verdict: "ELIGIBLE", reasons: ["No issuer-jurisdiction restrictions for NG residents"], confidence: 84 },
    { assetId: "MI4", verdict: "RESTRICTED", reasons: ["Constituent USDY restricted in NG", "Holdable only via index wrapper"], confidence: 80 },
    { assetId: "Aave", verdict: "ELIGIBLE", reasons: ["Permissionless protocol"], confidence: 96 },
    { assetId: "MMOE", verdict: "ELIGIBLE", reasons: ["Permissionless protocol"], confidence: 92 },
  ],
  attestations: [
    { id: "att-001", assetClass: "Treasury RWA", verdict: "Eligible", validUntil: "2026-08-12", hash: SEED_HASHES[10] },
    { id: "att-002", assetClass: "Liquid Staking", verdict: "Eligible", validUntil: "2026-08-12", hash: SEED_HASHES[11] },
  ],
};

// ------------------------------------------------------------
// Decisions (audit trail)
// ------------------------------------------------------------
const DECISION_TEMPLATES = [
  { action: "Rebalance proposed", sub: "Increase mETH +2.5%", assets: ["mETH", "USDC"], confidence: 86, policy: "Pass", outcome: "Executed" },
  { action: "Eligibility re-checked", sub: "USDY · jurisdiction NG", assets: ["USDY"], confidence: 88, policy: "Pass", outcome: "Approved" },
  { action: "Rating refresh", sub: "USDe → BBB (unchanged)", assets: ["USDe"], confidence: 79, policy: "Pass", outcome: "Approved" },
  { action: "Attestation minted", sub: "Treasury RWA eligible", assets: ["USDY"], confidence: 92, policy: "Pass", outcome: "Executed" },
  { action: "Rebalance proposed", sub: "Reduce MMOE -4.0%", assets: ["MMOE", "USDY"], confidence: 71, policy: "Warn", outcome: "Simulated" },
  { action: "Policy check failed", sub: "Per-asset cap exceeded", assets: ["mETH"], confidence: 64, policy: "Fail", outcome: "Rejected" },
  { action: "Depeg watch triggered", sub: "USDe -25bps", assets: ["USDe"], confidence: 81, policy: "Pass", outcome: "Approved" },
  { action: "Rebalance proposed", sub: "Add Aave +3.0%", assets: ["Aave", "USDC"], confidence: 88, policy: "Pass", outcome: "Executed" },
  { action: "Compliance scan", sub: "Wallet 0x8a7F…9c3D", assets: [], confidence: 96, policy: "Pass", outcome: "Approved" },
  { action: "Rating refresh", sub: "mETH risk score 22 (-1)", assets: ["mETH"], confidence: 90, policy: "Pass", outcome: "Approved" },
  { action: "Rebalance proposed", sub: "Trim USDe -2.0%", assets: ["USDe", "USDY"], confidence: 76, policy: "Warn", outcome: "Simulated" },
  { action: "Attestation minted", sub: "Liquid Staking eligible", assets: ["mETH"], confidence: 94, policy: "Pass", outcome: "Executed" },
];
const minutesAgo = (m) => {
  const d = new Date(Date.now() - m * 60000);
  return d.toISOString();
};
const DECISIONS = DECISION_TEMPLATES.map((t, i) => ({
  id: `dec-${(i + 1).toString().padStart(3, "0")}`,
  ...t,
  txHash: SEED_HASHES[20 + i],
  timestamp: minutesAgo(8 + i * 47),
  timeLabel: i === 0 ? "8 min ago" : i === 1 ? "55 min ago" : i < 5 ? `${i * 0.8 + 1}h ago` : i < 9 ? `${i * 0.6 + 2}h ago` : `${1 + Math.floor(i / 5)}d ago`,
  reasoning: "AI weighed the proposed change against the active guardrails and the asset's current risk profile. The simulation forecast a small risk-adjusted-yield improvement with no policy violation.",
  policyChecks: [
    { rule: "Max allocation per asset (25%)", value: "Pass · 23.5%" },
    { rule: "Max allocation per protocol (30%)", value: "Pass · 21.2%" },
    { rule: "Minimum liquidity score (70)", value: "Pass · 86" },
    { rule: "Slippage limit (0.50%)", value: "Pass · 0.18%" },
    { rule: "Minimum AI confidence (75%)", value: t.confidence >= 75 ? `Pass · ${t.confidence}%` : `Warn · ${t.confidence}%` },
  ],
  simulation: { apyDelta: 0.42, pnl30: 24_800, var95: 184_200 },
}));

// ------------------------------------------------------------
// Policy
// ------------------------------------------------------------
const POLICY = {
  guardrails: [
    { id: "maxAsset", label: "Max allocation per asset", value: 25, unit: "%", min: 5, max: 50, icon: "Layers", enabled: true,
      help: "Caps any single asset's share of the portfolio." },
    { id: "maxProtocol", label: "Max allocation per protocol", value: 30, unit: "%", min: 5, max: 60, icon: "Boxes", enabled: true,
      help: "Caps exposure to any single protocol or issuer." },
    { id: "minLiquidity", label: "Minimum liquidity score", value: 70, unit: "/100", min: 0, max: 100, icon: "Waves", enabled: true,
      help: "Refuse to allocate to anything below this liquidity rating." },
    { id: "slippage", label: "Slippage limit", value: 0.5, unit: "%", min: 0.1, max: 2, step: 0.1, icon: "TrendingDown", enabled: true,
      help: "Maximum acceptable execution slippage on rebalance trades." },
    { id: "minConfidence", label: "Minimum AI confidence", value: 75, unit: "%", min: 0, max: 100, icon: "Sparkles", enabled: true,
      help: "Block recommendations the AI is not confident about." },
    { id: "cooldown", label: "Rebalance cooldown", value: 24, unit: "h", min: 1, max: 168, icon: "Clock", enabled: true,
      help: "Minimum time between executed rebalances." },
    { id: "humanApproval", label: "Human approval threshold", value: 250000, unit: "$", min: 0, max: 5000000, step: 25000, icon: "ShieldCheck", enabled: true,
      help: "Trades above this value always require human approval." },
  ],
  templates: [
    { id: "conservative", name: "Conservative", headline: "Capital preservation first",
      values: { maxAsset: 15, maxProtocol: 20, minLiquidity: 85, slippage: 0.25, minConfidence: 85, cooldown: 48, humanApproval: 100000 } },
    { id: "balanced", name: "Balanced", headline: "Risk-aware growth",
      values: { maxAsset: 25, maxProtocol: 30, minLiquidity: 70, slippage: 0.5, minConfidence: 75, cooldown: 24, humanApproval: 250000 } },
    { id: "institutional", name: "Institutional", headline: "For sized mandates",
      values: { maxAsset: 20, maxProtocol: 25, minLiquidity: 80, slippage: 0.3, minConfidence: 80, cooldown: 24, humanApproval: 1000000 } },
  ],
  blocked: [
    { rule: "Max allocation per protocol", attempt: "Add Aave +6.0%", time: "1h ago" },
    { rule: "Minimum AI confidence", attempt: "Long-tail LP entry", time: "1d ago" },
    { rule: "Slippage limit", attempt: "Exit USDe -5%", time: "3d ago" },
  ],
};

// ------------------------------------------------------------
// Agent
// ------------------------------------------------------------
const AGENT = {
  name: "Auralis Agent",
  tokenId: "0x000…00a7",
  spec: "ERC-8004",
  registered: "2026-03-14",
  active: true,
  reputation: { ratings: 2418, attestations: 184, decisions: 12842 },
  skills: [
    { name: "rate.asset", desc: "Compute the 7-dimension rating for a single asset.", lastRun: "4 min ago", chain: "on-chain" },
    { name: "rate.portfolio", desc: "Compute the blended portfolio risk score.", lastRun: "12 min ago", chain: "on-chain" },
    { name: "screen.wallet", desc: "Run sanctions and risk heuristics on a wallet.", lastRun: "2 min ago", chain: "off-chain" },
    { name: "check.eligibility", desc: "Resolve asset eligibility for a jurisdiction.", lastRun: "2 min ago", chain: "off-chain" },
    { name: "attest.compliance", desc: "Mint a compliance attestation on Mantle.", lastRun: "6h ago", chain: "on-chain" },
    { name: "simulate.rebalance", desc: "Simulate the impact of a proposed rebalance.", lastRun: "55 min ago", chain: "off-chain" },
    { name: "explain.risk", desc: "Produce a plain-language risk explanation.", lastRun: "1h ago", chain: "off-chain" },
    { name: "monitor.depeg", desc: "Watch for peg deviations on stable-class assets.", lastRun: "Just now", chain: "off-chain" },
    { name: "monitor.attestation", desc: "Track expiring attestations and re-mint.", lastRun: "8h ago", chain: "on-chain" },
    { name: "propose.allocation", desc: "Suggest an allocation within guardrails.", lastRun: "55 min ago", chain: "off-chain" },
    { name: "log.decision", desc: "Anchor a decision record on-chain.", lastRun: "8 min ago", chain: "on-chain" },
    { name: "report.compliance", desc: "Build a portable compliance report.", lastRun: "1d ago", chain: "off-chain" },
  ],
  activity: [
    { what: "Rating anchored — USDY", time: "8 min ago", hash: SEED_HASHES[30] },
    { what: "Attestation minted — Liquid Staking", time: "55 min ago", hash: SEED_HASHES[31] },
    { what: "Decision logged — Rebalance", time: "1h ago", hash: SEED_HASHES[32] },
    { what: "Rating refresh — mETH", time: "2h ago", hash: SEED_HASHES[33] },
    { what: "Compliance scan", time: "2h ago", hash: SEED_HASHES[34] },
  ],
};

// ------------------------------------------------------------
// Copilot canned response
// ------------------------------------------------------------
const COPILOT_REPLY = {
  summary: "Your portfolio is within all guardrails. There is a small risk-adjusted-yield opportunity by rotating part of the USDe position into supervised RWA credit. The proposed move keeps you under every limit and improves the blended risk score by 4 points.",
  actions: [
    { title: "Trim USDe by 4.0%", note: "From 11.9% → 7.9%", delta: "+0.12% APY" },
    { title: "Add USDY by 3.0%", note: "From 21.5% → 24.5%", delta: "+0.08% APY" },
    { title: "Add Aave by 1.0%", note: "From 18.5% → 19.5%", delta: "+0.04% APY" },
  ],
  outcome: [
    { label: "Blended APY", from: "9.18%", to: "9.42%" },
    { label: "Risk score", from: "42", to: "38" },
    { label: "Risk-adj. yield", from: "7.84%", to: "8.05%" },
  ],
  reasoning: [
    "USDe funding-rate yield has compressed 130bps over the last 14 days.",
    "USDY peg behaviour is well inside ±5bps over 90 days.",
    "Per-asset and per-protocol guardrails would not be breached.",
    "Estimated slippage 0.18% sits below your 0.50% limit.",
  ],
  caveats: "Advisory only. Verify before executing.",
  confidence: 86,
};

// ------------------------------------------------------------
// Integrations
// ------------------------------------------------------------
const INTEGRATIONS = [
  { name: "Mantle RPC", category: "Network", status: "Connected", desc: "Primary execution endpoint" },
  { name: "Wallet", category: "Identity", status: "Connected", desc: "EIP-1193 provider" },
  { name: "USDY · Ondo", category: "Asset", status: "Connected", desc: "Treasury RWA feed" },
  { name: "QCDT", category: "Asset", status: "Connected", desc: "Qualified credit feed" },
  { name: "mETH", category: "Asset", status: "Connected", desc: "Liquid staking feed" },
  { name: "cmETH", category: "Asset", status: "Connected", desc: "Restaked LST feed" },
  { name: "USDe · Ethena", category: "Asset", status: "Connected", desc: "Synthetic dollar feed" },
  { name: "Aave on Mantle", category: "Protocol", status: "Connected", desc: "Lending market" },
  { name: "Merchant Moe", category: "Protocol", status: "Connected", desc: "DEX & LP" },
  { name: "Price feeds", category: "Oracle", status: "Connected", desc: "Pyth + Chainlink" },
  { name: "On-chain logger", category: "Registry", status: "Connected", desc: "Decision anchoring" },
];

// ============================================================
// Mock services — async wrappers with realistic delays
// ============================================================
const delay = (min = 400, max = 900) =>
  new Promise(r => setTimeout(r, min + Math.random() * (max - min)));

// dev flag — force success on retry
let FORCE_SUCCESS = false;
const maybeFail = (rate = 1 / 14) => !FORCE_SUCCESS && Math.random() < rate;

const Services = {
  async getRatings() {
    await delay(500, 800);
    if (maybeFail()) throw new Error("Failed to load ratings");
    return ASSETS;
  },
  async getRating(id) {
    await delay(400, 700);
    const a = ASSETS.find(x => x.id === id);
    if (!a) throw new Error("Not found");
    return a;
  },
  async getPortfolio() {
    await delay(500, 800);
    if (maybeFail()) throw new Error("Failed to load portfolio");
    return PORTFOLIO;
  },
  async runComplianceScan(progressCb) {
    const steps = ["Resolving wallet…", "Running sanctions screen…", "Heuristic exposure check…", "Counterparty graph…", "Compiling report…"];
    for (let i = 0; i < steps.length; i++) {
      progressCb && progressCb({ pct: ((i + 1) / steps.length) * 100, step: steps[i] });
      await delay(220, 360);
    }
    return COMPLIANCE.walletScreen;
  },
  async getEligibility() {
    await delay(300, 500);
    return COMPLIANCE.matrix;
  },
  async mintAttestation({ assetClass, verdict }) {
    await delay(1500, 1800);
    if (maybeFail(1 / 20)) throw new Error("User rejected signature");
    const hash = fakeHash();
    return { txHash: hash, explorerUrl: explorerOf(hash) };
  },
  async simulateRebalance(targets) {
    await delay(600, 900);
    return {
      blendedApy: 9.42,
      riskScore: 38,
      apyDelta: 0.24,
      riskDelta: -4,
      liquidityImpact: -180_000,
      estCostUsd: 1240,
      route: [
        { step: "Rebalance stablecoins", status: "ready" },
        { step: "Trim USDe via Merchant Moe", status: "ready" },
        { step: "Mint USDY via primary", status: "ready" },
        { step: "Settle and anchor decision", status: "ready" },
      ],
    };
  },
  async askCopilot(question, onToken) {
    // stream summary tokens, then resolve full payload
    const summary = COPILOT_REPLY.summary;
    const tokens = summary.split(/(\s+)/);
    for (const t of tokens) {
      onToken && onToken(t);
      await new Promise(r => setTimeout(r, 18 + Math.random() * 28));
    }
    return COPILOT_REPLY;
  },
  async getDecisions() {
    await delay(400, 700);
    return DECISIONS;
  },
  async logDecision() {
    await delay(1500, 1800);
    const hash = fakeHash();
    return { txHash: hash, explorerUrl: explorerOf(hash) };
  },
  async savePolicy() {
    await delay(1500, 1800);
    if (maybeFail(1 / 20)) throw new Error("User rejected signature");
    const hash = fakeHash();
    return { txHash: hash, explorerUrl: explorerOf(hash) };
  },
  async anchorRating() {
    await delay(1500, 1800);
    if (maybeFail(1 / 20)) throw new Error("User rejected signature");
    const hash = fakeHash();
    return { txHash: hash, explorerUrl: explorerOf(hash) };
  },
  async verifyHash(input, hash) {
    await delay(500, 800);
    return { match: true, recomputed: hash };
  },
  async getAgent() {
    await delay(400, 600);
    return AGENT;
  },
  async getIntegrations() {
    await delay(400, 600);
    return INTEGRATIONS;
  },
};

// Expose to window
window.Auralis = {
  ASSETS, PORTFOLIO, COMPLIANCE, DECISIONS, POLICY, AGENT, COPILOT_REPLY, INTEGRATIONS,
  ASSET_PALETTE, Services, truncate, explorerOf, fakeHash,
  setForceSuccess: (v) => { FORCE_SUCCESS = v; },
};
