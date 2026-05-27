import { Card, CardContent } from "@auralis/ui";

const faqs = [
  ["Is Auralis custodial?", "No. Auralis stores proofs and metadata, not funds. Users sign every transaction from their own wallet."],
  ["Is this legal or financial advice?", "No. Auralis provides risk and compliance tooling for informed review. It is not legal, tax, investment, or financial advice."],
  ["What chain is used?", "Mantle mainnet, chainId 5000, with deployed proof contracts for ratings, attestations, policies, and agent identity."],
  ["What does AI do?", "AI explains ratings and proposals in plain language. Deterministic engines compute scores, policy checks, and compliance verdicts."],
  ["Can the agent trade by itself?", "No. The agent proposes and simulates. Guarded execution still requires user signing."],
  ["How does Auralis make money?", "The planned revenue lines are Intelligence API subscriptions, treasury monitoring tiers, and attestation mint fees."],
];

export default function FAQ() {
  return <main className="mx-auto max-w-4xl px-4 py-16">
    <h1 className="font-display text-5xl">FAQ</h1>
    <p className="mt-4 text-[var(--text-secondary)]">The short version: Auralis is a non-custodial risk, compliance, and proof layer for Mantle RWAs.</p>
    <section className="mt-8 space-y-3">
      {faqs.map(([q, a]) => <Card key={q}><CardContent className="p-5"><h2 className="font-medium">{q}</h2><p className="mt-2 text-sm text-[var(--text-secondary)]">{a}</p></CardContent></Card>)}
    </section>
  </main>;
}
