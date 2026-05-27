import Link from "next/link";
import { Card, CardContent } from "@auralis/ui";

const docs = [
  ["Judge Guide", "https://github.com/talk2francis/Auralis-Finance/blob/main/docs/JUDGE_GUIDE.md", "The fastest 5-minute and 15-minute demo paths."],
  ["Tutorial", "https://github.com/talk2francis/Auralis-Finance/blob/main/docs/TUTORIAL.md", "Step-by-step USDY closed-loop walkthrough."],
  ["API", "https://github.com/talk2francis/Auralis-Finance/blob/main/docs/API.md", "Public endpoints, schemas, examples, and rate limits."],
  ["Security", "https://github.com/talk2francis/Auralis-Finance/blob/main/docs/SECURITY.md", "Non-custodial rules, threat model, Slither notes."],
  ["Contracts", "https://github.com/talk2francis/Auralis-Finance/blob/main/docs/CONTRACTS.md", "Mantle deployments, ABIs, and verification notes."],
  ["Business Model", "https://github.com/talk2francis/Auralis-Finance/blob/main/docs/BUSINESS_MODEL.md", "Revenue lines and GTM plan."],
];

export default function Docs(){return <main className="mx-auto max-w-5xl px-4 py-16"><h1 className="font-display text-5xl">Docs</h1><p className="mt-4 text-[var(--text-secondary)]">Auralis documentation is written for judges, builders, treasury users, and protocol integrators.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{docs.map(([title,href,body])=><Card key={title}><CardContent className="p-5"><h2 className="font-medium">{title}</h2><p className="mt-2 text-sm text-[var(--text-secondary)]">{body}</p><Link className="mt-4 inline-block text-sm text-[var(--teal)]" href={href}>Open document →</Link></CardContent></Card>)}</div><section className="mt-8 rounded-2xl border border-[var(--border)] p-5 text-sm text-[var(--text-secondary)]"><p>Core API endpoints: /api/ratings, /api/ratings/:assetId, /api/compliance/scan, /api/portfolio/:wallet, /api/simulate, /api/copilot, /api/verify/rating.</p></section></main>}
