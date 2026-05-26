import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle, RatingSeal, RiskRadar } from "@auralis/ui";

export default function Page() {
  return <main className="mx-auto max-w-6xl px-4 py-16"><section className="grid gap-10 md:grid-cols-[1.1fr_.9fr]"><div><p className="mb-4 text-sm font-medium text-[var(--teal)]">AI × RWA on Mantle</p><h1 className="font-display text-5xl leading-tight md:text-7xl">The risk and compliance layer for tokenized RWAs.</h1><p className="mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">Auralis rates Mantle RWAs, verifies wallet eligibility, and manages portfolio decisions under deterministic guardrails with on-chain proof.</p><div className="mt-8 flex gap-3"><Link href="/app"><Button>Open App</Button></Link><Link href="/ratings"><Button variant="secondary">View ratings</Button></Link></div></div><Card><CardHeader><CardTitle>Live rating preview</CardTitle></CardHeader><CardContent className="grid place-items-center gap-4"><RatingSeal grade="A" size="lg" /><RiskRadar values={[28,35,42,24,18,31,45]} /></CardContent></Card></section></main>;
}
