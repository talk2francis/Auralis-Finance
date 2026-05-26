import { Card, CardContent, CardHeader, CardTitle, RatingSeal, StateWrapper } from "@auralis/ui";
import { CountUp, MotionDonut } from "../../../../components/MotionPrimitives";

const kpis = [
  ["Total value", "$128,420"],
  ["Blended APY", "5.42%"],
  ["Auralis Risk", "31"],
  ["Liquidity", "$42.8M"],
] as const;

export default function Dashboard() {
  return <div><h1 className="font-display text-4xl">Dashboard</h1><StateWrapper status="populated"><div className="mt-6 grid gap-4 md:grid-cols-4">{kpis.map(([label, value]) => <Card className="p-4" key={label}><div className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">{label}</div><div className="mt-1 font-display text-2xl text-[var(--ink)]"><CountUp value={value} /></div></Card>)}</div></StateWrapper><Card className="mt-6"><CardHeader><CardTitle>Allocation</CardTitle></CardHeader><CardContent><StateWrapper status="populated"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><MotionDonut percent={64} label="USDY allocation"/><div className="flex items-center gap-3"><RatingSeal grade="A"/> USDY position is within guardrails.</div></div></StateWrapper></CardContent></Card></div>;
}
