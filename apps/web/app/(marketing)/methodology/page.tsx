import { Card, CardContent, CardHeader, CardTitle } from "@auralis/ui";

const dimensions = [
  ["Asset", "Underlying instrument quality, cash-flow clarity, redemption mechanics, and market fit."],
  ["Issuer", "Issuer transparency, operational history, reporting cadence, and legal wrapper quality."],
  ["Liquidity", "Available liquidity, venue depth, withdrawal constraints, and concentration."],
  ["Peg", "Price stability, redemption trust, and deviation history for dollar-like assets."],
  ["Oracle", "Price-source freshness, redundancy, manipulation resistance, and fallback behavior."],
  ["Contract", "Contract maturity, upgrade surface, audit posture, and admin-key risk."],
  ["Concentration", "Portfolio and ecosystem concentration risk across issuer, protocol, and asset class."],
];

export default function Methodology() {
  return <main className="mx-auto max-w-5xl px-4 py-16">
    <p className="text-sm font-medium text-[var(--teal)]">Transparent scoring</p>
    <h1 className="mt-2 font-display text-5xl">Auralis methodology</h1>
    <p className="mt-4 max-w-3xl text-[var(--text-secondary)]">Auralis combines deterministic risk scoring, jurisdiction-aware eligibility rules, and AI explanations. AI explains the decision; code computes the rating and policy result.</p>
    <section className="mt-8 grid gap-4 md:grid-cols-2">
      {dimensions.map(([title, body]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><p className="text-sm text-[var(--text-secondary)]">{body}</p></CardContent></Card>)}
    </section>
    <Card className="mt-8"><CardHeader><CardTitle>Compliance framework</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-[var(--text-secondary)]"><p>Wallet eligibility is evaluated from wallet risk, sanctions flags, jurisdiction declaration, and asset-class rules. Results are informational and not legal advice.</p><p>Attestations store verdict hashes and validity windows on Mantle while sensitive inputs stay off-chain.</p></CardContent></Card>
  </main>;
}
