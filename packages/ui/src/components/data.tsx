import { AlertTriangle, CheckCircle2, CircleDollarSign, XCircle } from "lucide-react";
import { cn } from "../lib";
import { Card } from "../primitives";

export function EligibilityChip({ verdict }: { verdict: "ELIGIBLE" | "RESTRICTED" | "DENIED" | "NOT_CHECKED" }) {
  const map = { ELIGIBLE: [CheckCircle2, "text-[var(--emerald)]", "Eligible"], RESTRICTED: [AlertTriangle, "text-[var(--amber)]", "Restricted"], DENIED: [XCircle, "text-[var(--rose)]", "Denied"], NOT_CHECKED: [AlertTriangle, "text-[var(--text-secondary)]", "Not checked"] } as const;
  const [Icon, tone, label] = map[verdict];
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium", tone)}><Icon size={14} />{label}</span>;
}
export function KpiStat({ label, value, delta }: { label: string; value: string; delta?: string }) { return <Card className="p-4"><div className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">{label}</div><div className="mt-1 font-display text-2xl text-[var(--ink)]">{value}</div>{delta && <div className="mt-1 text-xs text-[var(--emerald)]">{delta}</div>}</Card>; }
export function ConfidenceMeter({ value }: { value: number }) { const v = Math.max(0, Math.min(100, value)); return <div><div className="mb-1 flex justify-between text-xs"><span>Confidence</span><span>{v}%</span></div><div className="h-2 rounded-full bg-[var(--surface-muted)]"><div className="h-2 rounded-full bg-[var(--teal)]" style={{ width: `${v}%` }} /></div></div>; }
export function ProofCard({ label, hash }: { label: string; hash: string }) { return <Card className="p-4"><div className="text-xs text-[var(--text-secondary)]">{label}</div><div className="mt-1 font-mono text-sm text-[var(--ink)]">{hash.slice(0, 10)}…{hash.slice(-6)}</div></Card>; }
export function AllocationDonut({ percent }: { percent: number }) { const p = Math.max(0, Math.min(100, percent)); return <div className="grid h-28 w-28 place-items-center rounded-full" style={{ background: `conic-gradient(var(--teal) ${p}%, var(--surface-muted) 0)` }}><div className="grid h-20 w-20 place-items-center rounded-full bg-[var(--surface)] font-display">{p}%</div></div>; }
export function AssetIcon({ symbol }: { symbol: string }) { return <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-[var(--teal-wash)] text-xs font-semibold text-[var(--teal)]"><CircleDollarSign size={16} />{symbol.slice(0, 1)}</span>; }
