"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const items = [
  { kind: "Route", label: "Onboarding", href: "/app", hint: "Start the 5-step setup" },
  { kind: "Route", label: "Dashboard", href: "/app/dashboard", hint: "Portfolio risk overview" },
  { kind: "Route", label: "Opportunities", href: "/app/opportunities", hint: "Rated assets" },
  { kind: "Route", label: "Compliance", href: "/app/compliance", hint: "Wallet scan and attestations" },
  { kind: "Route", label: "Simulator", href: "/app/simulator", hint: "Rebalance preview" },
  { kind: "Route", label: "Copilot", href: "/app/copilot", hint: "Structured AI assistant" },
  { kind: "Route", label: "Policies", href: "/app/policies", hint: "Guardrails" },
  { kind: "Route", label: "Decisions", href: "/app/decisions", hint: "Proof ledger" },
  { kind: "Route", label: "Agent", href: "/app/agent", hint: "Skills and identity" },
  { kind: "Route", label: "Integrations", href: "/app/integrations", hint: "Connected services and health" },
  { kind: "Route", label: "Settings", href: "/app/settings", hint: "Profile, jurisdiction, risk, and controls" },
  ...["usdy", "meth", "usde"].map((asset) => ({ kind: "Asset", label: asset.toUpperCase(), href: `/app/opportunities/${asset}`, hint: "Open asset detail" })),
  ...["rate.asset", "compliance.scan", "policy.check", "decision.log", "attestation.mint"].map((skill) => ({ kind: "Skill", label: skill, href: `/app/agent?run=${skill}`, hint: "Inspect skill" })),
  { kind: "Decision", label: "Latest rebalance proof", href: "/app/decisions", hint: "Open decision detail" },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const filtered = useMemo(() => fuzzy(items, query).slice(0, 10), [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(true); }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function choose(href: string) {
    const recent = JSON.parse(localStorage.getItem("auralis:recent") ?? "[]") as string[];
    localStorage.setItem("auralis:recent", JSON.stringify([href, ...recent.filter((x) => x !== href)].slice(0, 5)));
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  const recent = typeof window === "undefined" ? [] : (JSON.parse(localStorage.getItem("auralis:recent") ?? "[]") as string[]).map((href) => items.find((item) => item.href === href)).filter(Boolean).slice(0, 3) as typeof items;
  const shown = filtered.length ? filtered : items.slice(0, 6);

  if (!open) return <button onClick={() => setOpen(true)} className="fixed bottom-4 left-4 z-40 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm shadow-[var(--shadow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)] print:hidden">⌘K</button>;

  return <div className="fixed inset-0 z-50 bg-black/30 p-4 print:hidden" role="presentation" onMouseDown={() => setOpen(false)}><section role="dialog" aria-modal="true" aria-label="Command palette" className="mx-auto mt-20 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-soft)]" onMouseDown={(e) => e.stopPropagation()}>
    <input autoFocus value={query} onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, shown.length - 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); } if (e.key === "Enter" && shown[active]) choose(shown[active].href); }} placeholder="Jump to a route, asset, skill, or decision…" className="w-full rounded-xl border border-[var(--border)] px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--teal)]" />
    {recent.length > 0 && <Section title="Recent" items={recent} choose={choose} activeHref="" />}
    <Section title={query ? "Results" : "Suggested"} items={shown} choose={choose} activeHref={shown[active]?.href} />
  </section></div>;
}

function Section({ title, items: sectionItems, choose, activeHref }: { title: string; items: typeof items; choose: (href: string) => void; activeHref: string }) {
  return <div className="mt-3"><h2 className="px-2 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{title}</h2><div className="mt-1 grid gap-1">{sectionItems.map((item) => <button key={`${title}-${item.href}-${item.label}`} onClick={() => choose(item.href)} className={`flex items-center justify-between rounded-xl px-3 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--teal)] ${activeHref === item.href ? "bg-[var(--teal-wash)]" : "hover:bg-[var(--surface-muted)]"}`}><span><span className="font-medium">{item.label}</span><span className="ml-2 text-xs text-[var(--text-secondary)]">{item.kind}</span><span className="block text-xs text-[var(--text-secondary)]">{item.hint}</span></span><span aria-hidden="true">↵</span></button>)}</div></div>;
}

function fuzzy<T extends { label: string; hint: string; kind: string }>(source: T[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return source;
  return source.map((item) => ({ item, score: score(`${item.kind} ${item.label} ${item.hint}`.toLowerCase(), q) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).map((x) => x.item);
}
function score(text: string, q: string) { if (text.includes(q)) return 100 + q.length; let i = 0; for (const char of text) if (char === q[i]) i++; return i === q.length ? i : 0; }
