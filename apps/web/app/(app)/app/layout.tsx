import Link from "next/link";
import { WalletButton } from "../../../lib/wallet-button";

const nav = [["/app", "Onboarding"], ["/app/dashboard", "Dashboard"], ["/app/opportunities", "Opportunities"], ["/app/compliance", "Compliance"], ["/app/simulator", "Simulator"], ["/app/copilot", "Copilot"], ["/app/policies", "Policies"], ["/app/decisions", "Decisions"], ["/app/agent", "Agent"]];
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen md:grid md:grid-cols-[248px_1fr]"><aside className="border-r border-[var(--border)] bg-[var(--surface)] p-5"><Link href="/" className="font-display text-2xl">Auralis</Link><nav className="mt-8 grid gap-2">{nav.map(([href,label])=><Link className="rounded-lg px-3 py-2 hover:bg-[var(--surface-muted)]" href={href} key={href}>{label}</Link>)}</nav></aside><main><div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] p-4"><span className="text-sm text-[var(--text-secondary)]">Mantle Mainnet · chainId 5000</span><WalletButton /></div><div className="p-6">{children}</div></main></div>;
}
