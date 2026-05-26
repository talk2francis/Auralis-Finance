const labels = ["Asset", "Issuer", "Liquidity", "Peg", "Oracle", "Contract", "Concentration"];
export function RiskRadar({ values, size = 180 }: { values: number[]; size?: number }) {
  const c = size / 2;
  const r = size * 0.38;
  const points = values.slice(0, 7).map((v, i) => {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 7;
    const rr = r * (Math.max(0, Math.min(100, v)) / 100);
    return `${c + Math.cos(a) * rr},${c + Math.sin(a) * rr}`;
  }).join(" ");
  return <svg width={size} height={size} role="img" aria-label="Risk radar"><circle cx={c} cy={c} r={r} fill="none" stroke="var(--border)" /><polygon points={points} fill="rgba(14,158,140,.18)" stroke="var(--teal)" /><g>{labels.map((l, i) => { const a = -Math.PI / 2 + (i * Math.PI * 2) / 7; return <text key={l} x={c + Math.cos(a) * (r + 18)} y={c + Math.sin(a) * (r + 18)} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{l}</text>; })}</g></svg>;
}
