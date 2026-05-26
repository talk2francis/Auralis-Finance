/* eslint-disable */
/* ============================================================
   Auralis Finance — Frontend
   Concatenated from the Claude Design handoff prototype.
   Files in load order: icons → components → topo → shell →
   marketing → app-pages-1 → app-pages-2 → main (App component).
   Cross-file references resolve within this module scope.
   mock.js is loaded as a side-effect in src/main.jsx and
   attaches window.Auralis (used by the components below).
   ============================================================ */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';


/* ===== icons.jsx ===== */
/* Auralis — Inline SVG icon set (Lucide-style, 1.5px stroke) */
const I = (path, viewBox = "0 0 24 24") => ({ size = 18, ...rest } = {}) => (
  <svg
    width={size} height={size} viewBox={viewBox}
    fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    {...rest}
  >
    {path}
  </svg>
);

const Icon = {
  // Brand mark — six-point asterisk, distinctive
  Brand: ({ size = 20, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g stroke={color || "var(--teal)"} strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="3.34" y1="7" x2="20.66" y2="17" />
        <line x1="3.34" y1="17" x2="20.66" y2="7" />
      </g>
      <circle cx="12" cy="12" r="2.5" fill={color || "var(--teal)"} />
    </svg>
  ),

  // UI
  Search: I(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>),
  ChevronDown: I(<path d="m6 9 6 6 6-6"/>),
  ChevronRight: I(<path d="m9 6 6 6-6 6"/>),
  ChevronLeft: I(<path d="m15 6-6 6 6 6"/>),
  ChevronUp: I(<path d="m18 15-6-6-6 6"/>),
  X: I(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>),
  Check: I(<path d="M20 6 9 17l-5-5"/>),
  Copy: I(<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>),
  External: I(<><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>),
  Info: I(<><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r=".5" fill="currentColor"/></>),
  Spark: I(<><path d="M12 3v3"/><path d="M12 18v3"/><path d="m4.93 4.93 2.12 2.12"/><path d="m16.95 16.95 2.12 2.12"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="m4.93 19.07 2.12-2.12"/><path d="m16.95 7.05 2.12-2.12"/><circle cx="12" cy="12" r="3"/></>),
  AlertTriangle: I(<><path d="m10.29 3.86-8.18 14a2 2 0 0 0 1.71 3h16.36a2 2 0 0 0 1.71-3l-8.18-14a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></>),
  ShieldCheck: I(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>),
  Layers: I(<><path d="m12.83 2.18 8.93 4.46a1 1 0 0 1 0 1.78l-8.93 4.46a2 2 0 0 1-1.66 0L2.24 8.42a1 1 0 0 1 0-1.78l8.93-4.46a2 2 0 0 1 1.66 0Z"/><path d="m2 13 8.95 4.47a2 2 0 0 0 1.66 0L22 13"/></>),
  Boxes: I(<><path d="M7 7v4l4 2"/><path d="m17 7-4 2v4"/><rect x="2" y="13" width="9" height="8" rx="1"/><rect x="13" y="13" width="9" height="8" rx="1"/><rect x="7.5" y="3" width="9" height="8" rx="1"/></>),
  Waves: I(<><path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/></>),
  TrendingDown: I(<><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></>),
  TrendingUp: I(<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>),
  Clock: I(<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
  Sparkles: I(<><path d="M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-2.06L8 4l1.94 5.94L16 12Z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M19 14v3"/><path d="M20.5 15.5h-3"/></>),
  Home: I(<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2Z"/></>),
  Compass: I(<><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88"/></>),
  Star: I(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>),
  Sliders: I(<><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/></>),
  MessageSquare: I(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>),
  Scale: I(<><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></>),
  FileText: I(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></>),
  Cpu: I(<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></>),
  Plug: I(<><path d="M9 2v6"/><path d="M15 2v6"/><path d="M12 17v5"/><path d="M5 8h14v3a7 7 0 0 1-14 0Z"/></>),
  Settings: I(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></>),
  Wallet: I(<><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></>),
  Plus: I(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>),
  Minus: I(<line x1="5" y1="12" x2="19" y2="12"/>),
  More: I(<><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></>),
  ArrowRight: I(<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>),
  ArrowUp: I(<><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>),
  ArrowDown: I(<><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>),
  Refresh: I(<><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></>),
  Globe: I(<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>),
  Mail: I(<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></>),
  Lock: I(<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>),
  Activity: I(<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>),
  Eye: I(<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>),
  Network: I(<><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><path d="M5 16v-3h14v3"/><path d="M12 8v5"/></>),
  Award: I(<><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></>),
  Database: I(<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>),
  Zap: I(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>),
  Hash: I(<><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>),
  Filter: I(<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>),
  Send: I(<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>),
  Sun: I(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></>),
  Moon: I(<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>),
};

window.Icon = Icon;

/* ===== components.jsx ===== */
/* ============================================================
   Auralis — Shared components
   RatingSeal · RiskRadar · EligibilityChip · KpiStat · ConfidenceMeter
   ProofCard · AllocationDonut · AssetIcon · StateWrapper
   TxButton · CopyButton · AIProvenance · VerifyWidget · MiniSpark
   ============================================================ */


/* ---------- formatters ---------- */
const fmtUSD = (n, opts = {}) => {
  const { compact = false, decimals = 0 } = opts;
  if (compact) {
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  }
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
const fmtPct = (n, d = 2) => `${n >= 0 ? "" : ""}${n.toFixed(d)}%`;
const fmtNum = (n, d = 0) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

window.fmtUSD = fmtUSD;
window.fmtPct = fmtPct;
window.fmtNum = fmtNum;

/* ---------- RatingSeal ---------- */
function RatingSeal({ grade = "A", size = "md" }) {
  return (
    <div className={`rating-seal rating-seal-${size}`} aria-label={`Auralis rating ${grade}`}>
      <span>{grade}</span>
    </div>
  );
}

/* ---------- AssetIcon ---------- */
function AssetIcon({ symbol, size = "md" }) {
  const palette = window.Auralis.ASSET_PALETTE[symbol] || { bg: "#EEE", fg: "#555", letters: symbol?.slice(0, 2) || "?" };
  return (
    <div className={`asset-icon asset-icon-${size}`} style={{ background: palette.bg, color: palette.fg }} aria-hidden="true">
      {palette.letters}
    </div>
  );
}

/* ---------- EligibilityChip ---------- */
function EligibilityChip({ verdict }) {
  const map = {
    ELIGIBLE: { cls: "chip-emerald", label: "Eligible", icon: <Icon.Check size={12} /> },
    RESTRICTED: { cls: "chip-amber", label: "Restricted", icon: <Icon.AlertTriangle size={12} /> },
    DENIED: { cls: "chip-rose", label: "Denied", icon: <Icon.X size={12} /> },
    NOT_CHECKED: { cls: "", label: "Not checked", icon: null },
  };
  const m = map[verdict] || map.NOT_CHECKED;
  return (
    <span className={`chip ${m.cls}`}>
      {m.icon}{m.label}
    </span>
  );
}

/* ---------- KpiStat with count-up ---------- */
function useCountUp(target, { duration = 600, decimals = 0, enabled = true } = {}) {
  const [v, setV] = useState(enabled ? 0 : target);
  useEffect(() => {
    if (!enabled) { setV(target); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setV(target); return; }
    let start = null;
    const from = 0;
    const raf = (t) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(from + (target - from) * eased);
      if (p < 1) id = requestAnimationFrame(raf);
    };
    let id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [target, duration, enabled]);
  return v;
}

function KpiStat({ label, value, format = "num", decimals = 2, prefix = "", suffix = "", delta, deltaSuffix = "%", info, band }) {
  // value can be a number; rest is formatting
  const v = useCountUp(typeof value === "number" ? value : 0);
  let display;
  if (typeof value !== "number") {
    display = value;
  } else if (format === "usd") {
    display = fmtUSD(v, { compact: Math.abs(value) >= 1e6, decimals: Math.abs(value) >= 1e6 ? 2 : 0 });
  } else if (format === "pct") {
    display = `${v.toFixed(decimals)}%`;
  } else {
    display = `${prefix}${v.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}${suffix}`;
  }
  return (
    <div className="card" style={{ padding: "20px 22px" }}>
      <div className="row between" style={{ alignItems: "flex-start" }}>
        <span className="caps">{label}</span>
        {info && (
          <span className="text-tertiary" title={info}>
            <Icon.Info size={14} />
          </span>
        )}
      </div>
      <div className="serif kpi-value" style={{ fontSize: 32, marginTop: 8, lineHeight: 1.1 }}>
        {display}
      </div>
      <div className="row gap-8 mt-8" style={{ minHeight: 22 }}>
        {typeof delta === "number" && (
          <span className={`chip ${delta >= 0 ? "chip-emerald" : "chip-rose"}`}>
            {delta >= 0 ? <Icon.ArrowUp size={11} /> : <Icon.ArrowDown size={11} />}
            {Math.abs(delta).toFixed(2)}{deltaSuffix}
          </span>
        )}
        {band && (
          <span className={`chip ${band === "Low" ? "chip-emerald" : band === "Medium" ? "chip-amber" : "chip-rose"}`}>
            {band} risk
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- ConfidenceMeter ---------- */
function ConfidenceMeter({ value, compact = false, label = true }) {
  const segs = compact ? 5 : 10;
  const on = Math.round((value / 100) * segs);
  const tier = value >= 80 ? { label: "High", color: "var(--emerald)" }
            : value >= 50 ? { label: "Medium", color: "var(--amber)" }
            : { label: "Low", color: "var(--rose)" };
  return (
    <div className={`row gap-8 ${compact ? "conf-compact" : ""}`} style={{ color: tier.color, alignItems: "center" }}>
      <div className={`conf-bar ${compact ? "conf-compact" : ""}`} style={{ flex: compact ? 1 : "0 0 auto" }}>
        {Array.from({ length: segs }, (_, i) => (
          <div key={i} className={`conf-seg ${i < on ? "on" : ""}`} />
        ))}
      </div>
      {label && (
        <span style={{ fontSize: 12, fontWeight: 500 }}>
          {tier.label} · {value}%
        </span>
      )}
    </div>
  );
}

/* ---------- CopyButton ---------- */
function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const onClick = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <button onClick={onClick} className="btn btn-ghost btn-sm" style={{ padding: "0 6px", color: "var(--text-tertiary)" }}>
      {copied ? <Icon.Check size={14} /> : <Icon.Copy size={14} />}
    </button>
  );
}

/* ---------- ProofCard ---------- */
function ProofCard({ label = "On-chain proof", hash, timestamp = "Just now", explorerUrl, verified = true }) {
  const trunc = window.Auralis.truncate;
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="row between">
        <span className="caps">{label}</span>
        {verified && (
          <span className="chip chip-emerald">
            <Icon.Check size={12} />Verified on-chain
          </span>
        )}
      </div>
      <div className="row gap-8 mt-12" style={{ alignItems: "center" }}>
        <span className="mono" style={{ color: "var(--text-secondary)" }}>{trunc(hash, 8, 6)}</span>
        <CopyButton text={hash} />
      </div>
      <div className="row between mt-12" style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
        <span>{timestamp}</span>
        <a href={explorerUrl} target="_blank" rel="noreferrer" className="row gap-4" style={{ color: "var(--teal-dark)", fontWeight: 500 }}>
          View on Mantle Explorer <Icon.External size={12} />
        </a>
      </div>
    </div>
  );
}

/* ---------- RiskRadar (7-axis) ---------- */
function RiskRadar({ dimensions, size = 260 }) {
  const dims = Object.entries(dimensions);
  const n = dims.length;
  const cx = size / 2, cy = size / 2;
  const r = size * 0.36;
  const angleFor = (i) => (-Math.PI / 2) + (i * 2 * Math.PI) / n;
  const point = (i, val) => {
    const a = angleFor(i);
    const ratio = val / 100;
    return [cx + Math.cos(a) * r * ratio, cy + Math.sin(a) * r * ratio];
  };
  const labelPos = (i) => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * (r + 22), cy + Math.sin(a) * (r + 16)];
  };
  // grid rings 25/50/75/100
  const rings = [0.25, 0.5, 0.75, 1].map(k => {
    const pts = dims.map((_, i) => {
      const a = angleFor(i);
      return `${cx + Math.cos(a) * r * k},${cy + Math.sin(a) * r * k}`;
    }).join(" ");
    return pts;
  });
  const data = dims.map(([_, v], i) => point(i, v).join(",")).join(" ");
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Risk radar">
      {rings.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="var(--border)" strokeWidth="1" />
      ))}
      {dims.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />;
      })}
      <polygon
        points={data}
        fill="var(--teal)"
        fillOpacity={drawn ? 0.18 : 0}
        stroke="var(--teal)"
        strokeWidth="1.5"
        strokeOpacity={drawn ? 1 : 0}
        style={{ transition: "fill-opacity 700ms ease-out, stroke-opacity 700ms ease-out" }}
      />
      {dims.map(([label], i) => {
        const [x, y] = labelPos(i);
        return (
          <text key={label}
            x={x} y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="500"
            fill="var(--text-secondary)"
            style={{ fontFamily: "var(--sans)" }}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

/* ---------- AllocationDonut (with morph) ---------- */
function AllocationDonut({ segments, total, totalLabel = "Total", size = 200, thickness = 24 }) {
  // segments: [{ label, pct, value, color }]
  const cx = size / 2, cy = size / 2;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  // Animate from 0 on mount, then morph between segment sets
  const [pcts, setPcts] = useState(segments.map(() => 0));
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPcts(segments.map(s => s.pct));
      return;
    }
    const start = pcts.slice();
    const target = segments.map(s => s.pct);
    const t0 = performance.now();
    const dur = 600;
    const raf = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPcts(start.map((from, i) => {
        const to = target[i] ?? 0;
        return from + (to - (from || 0)) * eased;
      }));
      if (p < 1) id = requestAnimationFrame(raf);
    };
    let id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments.map(s => s.pct).join("|"), segments.length]);

  let offset = 0;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Allocation">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-muted)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (pcts[i] / 100) * C;
          const el = (
            <circle key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
          offset += len + 1; // small gap
          return el;
        })}
        {total !== undefined && (
          <g>
            <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fill="var(--text-tertiary)" fontWeight="600" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {totalLabel}
            </text>
            <text x={cx} y={cy + 18} textAnchor="middle" fontFamily="var(--serif)" fontSize="22" fill="var(--text)">
              {total}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

/* ---------- MiniSpark ---------- */
function MiniSpark({ data, width = 80, height = 24, color = "var(--teal)" }) {
  if (!data || data.length === 0) return null;
  const vs = data.map(d => d.v);
  const min = Math.min(...vs), max = Math.max(...vs);
  const span = max - min || 1;
  const path = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.v - min) / span) * (height - 2) - 1;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const last = data[data.length - 1].v;
  const first = data[0].v;
  const up = last >= first;
  return (
    <svg width={width} height={height} aria-hidden="true">
      <path d={path} fill="none" stroke={up ? "var(--emerald)" : "var(--rose)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- AreaChart (custom, no library) ---------- */
function AreaChart({ data, width = 400, height = 180, color = "var(--teal)", showGrid = true, padding = { l: 36, r: 8, t: 8, b: 22 }, valueFormat = (v) => v.toFixed(2) }) {
  const W = width, H = height;
  const cw = W - padding.l - padding.r;
  const ch = H - padding.t - padding.b;
  const vs = data.map(d => d.v);
  const min = Math.min(...vs), max = Math.max(...vs);
  const span = max - min || 1;
  const x = (i) => padding.l + (i / (data.length - 1)) * cw;
  const y = (v) => padding.t + ch - ((v - min) / span) * ch;
  const line = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.v)}`).join(" ");
  const area = `${line} L ${x(data.length - 1)} ${padding.t + ch} L ${padding.l} ${padding.t + ch} Z`;
  const ticks = 3;
  const [hover, setHover] = useState(null);

  // Draw-on animation
  const pathRef = useRef(null);
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${len}`;
    pathRef.current.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      pathRef.current.style.transition = "stroke-dashoffset 700ms ease-out";
      pathRef.current.style.strokeDashoffset = "0";
    });
  }, [data]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - padding.l;
    const i = Math.round((px / cw) * (data.length - 1));
    if (i >= 0 && i < data.length) setHover(i);
  };

  const id = useMemo(() => `g${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}
      onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showGrid && Array.from({ length: ticks }, (_, i) => {
        const v = min + ((max - min) * (i + 1)) / (ticks + 1);
        const yy = y(v);
        return (
          <g key={i}>
            <line x1={padding.l} x2={W - padding.r} y1={yy} y2={yy} stroke="var(--border)" strokeDasharray="2 4" />
            <text x={padding.l - 6} y={yy + 3} fontSize="10" textAnchor="end" fill="var(--text-tertiary)">{valueFormat(v)}</text>
          </g>
        );
      })}
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" ref={pathRef} />
      {hover !== null && (
        <g>
          <line x1={x(hover)} x2={x(hover)} y1={padding.t} y2={padding.t + ch} stroke="var(--border-strong)" />
          <circle cx={x(hover)} cy={y(data[hover].v)} r="3.5" fill="var(--surface)" stroke={color} strokeWidth="2" />
          <rect x={Math.min(x(hover) + 8, W - 80)} y={y(data[hover].v) - 22} width="72" height="20" rx="4" fill="var(--ink)" />
          <text x={Math.min(x(hover) + 8, W - 80) + 36} y={y(data[hover].v) - 8} fontSize="11" textAnchor="middle" fill="white" fontFamily="var(--mono)">
            {valueFormat(data[hover].v)}
          </text>
        </g>
      )}
    </svg>
  );
}

/* ---------- StateWrapper (the universal data-state) ---------- */
function StateWrapper({ status = "populated", children, onRetry, emptyTitle = "Nothing here yet", emptyAction, emptyIcon, lastUpdated, skeleton, errorMessage = "Couldn't load this data." }) {
  if (status === "loading") {
    return <div className="page-enter">{skeleton || <DefaultSkeleton />}</div>;
  }
  if (status === "error") {
    return (
      <div className="card row between page-enter" style={{ padding: 20 }}>
        <div className="row gap-12">
          <span className="text-rose"><Icon.AlertTriangle /></span>
          <div>
            <div style={{ fontWeight: 500 }}>{errorMessage}</div>
            <div className="text-secondary fs-13">The mock service returned an error. Try again.</div>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={onRetry}>
          <Icon.Refresh size={14} />Retry
        </button>
      </div>
    );
  }
  if (status === "empty") {
    return (
      <div className="card stack page-enter" style={{ padding: 48, alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--surface-muted)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)" }}>
          {emptyIcon || <Icon.Search />}
        </div>
        <div className="mt-12 fw-500">{emptyTitle}</div>
        {emptyAction && <div className="mt-12">{emptyAction}</div>}
      </div>
    );
  }
  return (
    <div className="page-enter">
      {children}
      {status === "stale" && lastUpdated && (
        <div className="fs-12 text-tertiary mt-8">Updated {lastUpdated}</div>
      )}
    </div>
  );
}
function DefaultSkeleton() {
  return (
    <div className="card">
      <div className="skel" style={{ height: 16, width: "30%" }} />
      <div className="skel mt-12" style={{ height: 14, width: "60%" }} />
      <div className="skel mt-8" style={{ height: 14, width: "50%" }} />
    </div>
  );
}

/* ---------- Toaster ---------- */
const __toasts = { list: [], listeners: new Set() };
const Toast = {
  push(t) {
    const id = Math.random().toString(36).slice(2);
    const next = { id, kind: "info", ttl: 6000, ...t };
    __toasts.list = [...__toasts.list, next];
    __toasts.listeners.forEach(fn => fn(__toasts.list));
    if (next.ttl) setTimeout(() => Toast.dismiss(id), next.ttl);
    return id;
  },
  update(id, patch) {
    __toasts.list = __toasts.list.map(t => t.id === id ? { ...t, ...patch } : t);
    __toasts.listeners.forEach(fn => fn(__toasts.list));
  },
  dismiss(id) {
    __toasts.list = __toasts.list.filter(t => t.id !== id);
    __toasts.listeners.forEach(fn => fn(__toasts.list));
  },
};
function ToastStack() {
  const [list, setList] = useState(__toasts.list);
  useEffect(() => {
    const fn = (l) => setList([...l]);
    __toasts.listeners.add(fn);
    return () => __toasts.listeners.delete(fn);
  }, []);
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {list.map(t => (
        <div key={t.id} className={`toast ${t.kind === "success" ? "toast-success" : t.kind === "error" ? "toast-error" : ""}`}>
          <div style={{ flex: 1 }}>
            <div className="t-title">{t.title}</div>
            {t.sub && <div className="t-sub">{t.sub}</div>}
            {t.link && <a href={t.link.href} target="_blank" rel="noreferrer">{t.link.label}</a>}
          </div>
          <button onClick={() => Toast.dismiss(t.id)} className="btn-ghost" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Icon.X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------- TxButton ---------- */
function TxButton({ label, action, onConfirmed, variant = "primary", size = "", disabled, icon }) {
  const [state, setState] = useState("idle"); // idle | awaiting | pending | confirmed | failed
  const [hash, setHash] = useState(null);

  const run = async () => {
    if (state !== "idle" || disabled) return;
    setState("awaiting");
    try {
      // Simulate the wallet prompt before the actual call
      await new Promise(r => setTimeout(r, 900));
      setState("pending");
      const tid = Toast.push({ title: "Transaction pending", sub: "Waiting for confirmation…", kind: "info", ttl: 0 });
      const result = await action();
      setHash(result.txHash);
      Toast.update(tid, {
        title: "Transaction confirmed",
        sub: window.Auralis.truncate(result.txHash, 10, 8),
        link: { href: result.explorerUrl, label: "View on Explorer" },
        kind: "success",
        ttl: 6000,
      });
      setState("confirmed");
      onConfirmed?.(result);
      setTimeout(() => setState("idle"), 2000);
    } catch (err) {
      Toast.push({ title: "Transaction failed", sub: err.message || "Unknown error", kind: "error", ttl: 0 });
      setState("failed");
      setTimeout(() => setState("idle"), 2500);
    }
  };

  const cls = state === "confirmed" ? "btn-primary"
            : state === "failed" ? "btn-secondary"
            : variant === "secondary" ? "btn-secondary"
            : variant === "dark" ? "btn-dark"
            : "btn-primary";
  const content =
    state === "idle" ? <>{icon}{label}</>
    : state === "awaiting" ? <><Spinner />Awaiting signature…</>
    : state === "pending" ? <><Spinner />Pending · {window.Auralis.truncate(hash || "0x", 4, 4)}</>
    : state === "confirmed" ? <><Icon.Check size={14} />Confirmed</>
    : <><Icon.X size={14} />Failed</>;
  return (
    <button
      className={`btn ${cls} ${size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : ""}`}
      onClick={run}
      disabled={state !== "idle" || disabled}
      style={state === "failed" ? { borderColor: "var(--rose)", color: "var(--rose)" } : undefined}
    >
      {content}
    </button>
  );
}
function Spinner({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "spin 700ms linear infinite" }} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" fill="none" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
// inject the spin keyframe once
(function injectSpin() {
  if (document.getElementById("spinkf")) return;
  const s = document.createElement("style");
  s.id = "spinkf";
  s.textContent = "@keyframes spin{to{transform:rotate(360deg)}}";
  document.head.appendChild(s);
})();

/* ---------- AIProvenance ---------- */
function AIProvenance({ provenance }) {
  const [open, setOpen] = useState(false);
  const p = provenance || {
    model: "auralis-r1 / methodology v1.0",
    prompt: window.Auralis.fakeHash(),
    response: window.Auralis.fakeHash(),
    cached: false,
    generated: "2 minutes ago",
  };
  return (
    <div className="mt-12" style={{ background: "var(--surface-muted)", borderRadius: 10, padding: open ? 16 : "10px 14px", border: "1px solid var(--border)" }}>
      <button onClick={() => setOpen(!open)} className="row between" style={{ width: "100%", color: "var(--text-secondary)", fontSize: 13, fontWeight: 500 }}>
        <span className="row gap-8"><Icon.Hash size={14} />AI Provenance</span>
        <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }}><Icon.ChevronDown size={14} /></span>
      </button>
      {open && (
        <div className="stack gap-8 mt-12" style={{ fontSize: 12 }}>
          <ProvRow k="Model" v={p.model} />
          <ProvRow k="Methodology" v="v1.0" />
          <ProvRow k="Prompt hash" v={<span className="mono">{window.Auralis.truncate(p.prompt, 10, 6)}</span>} />
          <ProvRow k="Response hash" v={<span className="mono">{window.Auralis.truncate(p.response, 10, 6)}</span>} />
          <ProvRow k="Cached" v={p.cached ? "yes" : "no"} />
          <ProvRow k="Generated" v={p.generated} />
        </div>
      )}
    </div>
  );
}
function ProvRow({ k, v }) {
  return (
    <div className="row between">
      <span style={{ color: "var(--text-tertiary)" }}>{k}</span>
      <span>{v}</span>
    </div>
  );
}

/* ---------- VerifyWidget ---------- */
function VerifyWidget({ hash, recordType = "rating" }) {
  const [state, setState] = useState("idle"); // idle | checking | match | mismatch
  const [recomputed, setRecomputed] = useState(null);
  const run = async () => {
    setState("checking");
    const r = await window.Auralis.Services.verifyHash("x", hash);
    setRecomputed(r.recomputed);
    setState(r.match ? "match" : "mismatch");
  };
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="row between">
        <span className="caps">Verify {recordType} on-chain</span>
        <span className="text-tertiary" title="The record is recomputed and compared to the value stored on Mantle.">
          <Icon.Info size={14} />
        </span>
      </div>
      <div className="row between mt-12 gap-12" style={{ flexWrap: "wrap" }}>
        <span className="mono text-secondary">{window.Auralis.truncate(hash, 10, 8)}</span>
        {state === "idle" && (
          <button className="btn btn-secondary btn-sm" onClick={run}>
            <Icon.ShieldCheck size={14} />Verify on-chain
          </button>
        )}
        {state === "checking" && (
          <span className="row gap-8 text-secondary fs-13"><Spinner />Checking…</span>
        )}
        {state === "match" && (
          <span className="chip chip-emerald">
            <Icon.Check size={12} />Matches on-chain record
          </span>
        )}
        {state === "mismatch" && (
          <span className="chip chip-rose">
            <Icon.X size={12} />Does not match
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- Expose ---------- */
Object.assign(window, {
  RatingSeal, AssetIcon, EligibilityChip, KpiStat, ConfidenceMeter,
  ProofCard, RiskRadar, AllocationDonut, MiniSpark, AreaChart,
  StateWrapper, ToastStack, Toast, TxButton, CopyButton,
  AIProvenance, VerifyWidget, Spinner, useCountUp,
});

/* ===== topo.jsx ===== */
/* ============================================================
   Auralis — Topographic contour background
   Two flowing line clusters that hug the edges, leaving the
   centre breathable for content. Hand-tuned to feel like a
   risk surface / Mantle elevation map.
   ============================================================ */


/* ---------- Single cluster of parallel contour lines ---------- */
function generateCluster({ cx, cy, count, length, angleDeg, wobbleAmp, wobbleFreq, spacing, seed = 0, steps = 80, perLinePhase = 0.008 }) {
  const angle = (angleDeg * Math.PI) / 180;
  const dirX = Math.cos(angle);
  const dirY = Math.sin(angle);
  const normX = -dirY;
  const normY = dirX;
  const lines = [];
  for (let i = 0; i < count; i++) {
    const offsetT = (i - count / 2) * spacing;
    const pts = [];
    for (let s = 0; s <= steps; s++) {
      const u = (s / steps) * 2 - 1; // -1 to 1
      // Coherent low-frequency flow with tiny per-line phase shift.
      // Result: adjacent lines bend together like topo contours.
      const phase = i * perLinePhase;
      const wobble =
        Math.sin(u * wobbleFreq + seed + phase) * wobbleAmp +
        Math.cos(u * wobbleFreq * 0.55 + seed * 1.7 + phase * 0.7) * (wobbleAmp * 0.42) +
        Math.sin(u * wobbleFreq * 1.85 + seed * 0.3 + phase * 0.4) * (wobbleAmp * 0.14);
      const x = cx + u * (length / 2) * dirX + (offsetT + wobble) * normX;
      const y = cy + u * (length / 2) * dirY + (offsetT + wobble) * normY;
      pts.push([x, y]);
    }
    // Build a smooth path using quadratic bezier midpoints
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let k = 1; k < pts.length - 1; k++) {
      const mx = (pts[k][0] + pts[k + 1][0]) / 2;
      const my = (pts[k][1] + pts[k + 1][1]) / 2;
      d += ` Q${pts[k][0].toFixed(1)} ${pts[k][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    d += ` T${pts[pts.length - 1][0].toFixed(1)} ${pts[pts.length - 1][1].toFixed(1)}`;
    lines.push(d);
  }
  return lines;
}

/* ---------- TopoBackground — fixed-position SVG behind content ---------- */
function TopoBackground({ variant = "ambient" }) {
  // Two clusters: top-left swept diagonal, right-side vertical-ish.
  // Tuned to feel like a risk surface / Mantle elevation map — long, flowing
  // contours that hug the edges and leave the centre breathable.
  const clusterA = tm(
    () =>
      generateCluster({
        cx: 200,
        cy: 380,
        count: 56,
        length: 1700,
        angleDeg: 122,
        wobbleAmp: 180,
        wobbleFreq: 1.3,
        spacing: 5.2,
        seed: 1.4,
        steps: 90,
        perLinePhase: 0.012,
      }),
    []
  );
  const clusterB = tm(
    () =>
      generateCluster({
        cx: 1680,
        cy: 540,
        count: 72,
        length: 1800,
        angleDeg: 86,
        wobbleAmp: 130,
        wobbleFreq: 1.5,
        spacing: 4.6,
        seed: 3.1,
        steps: 90,
        perLinePhase: 0.009,
      }),
    []
  );
  const clusterC = tm(
    () =>
      generateCluster({
        cx: 880,
        cy: 1080,
        count: 32,
        length: 1500,
        angleDeg: 4,
        wobbleAmp: 90,
        wobbleFreq: 1.1,
        spacing: 6.5,
        seed: 7.2,
        steps: 70,
        perLinePhase: 0.014,
      }),
    []
  );

  const cls = variant === "hero" ? "topo-bg topo-bg-hero" : "topo-bg";

  return (
    <svg
      className={cls}
      viewBox="0 0 1920 1200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        {clusterA.map((d, i) => {
          const t = Math.abs(i - clusterA.length / 2) / (clusterA.length / 2);
          // Soft falloff at edges of the cluster — gives it organic blob shape
          const op = Math.pow(1 - t, 0.85) * 0.95 + 0.05;
          return <path key={`a${i}`} d={d} opacity={op} />;
        })}
        {clusterB.map((d, i) => {
          const t = Math.abs(i - clusterB.length / 2) / (clusterB.length / 2);
          const op = Math.pow(1 - t, 0.85) * 0.95 + 0.05;
          return <path key={`b${i}`} d={d} opacity={op} />;
        })}
        {clusterC.map((d, i) => {
          const t = Math.abs(i - clusterC.length / 2) / (clusterC.length / 2);
          const op = Math.pow(1 - t, 0.9) * 0.8 + 0.05;
          return <path key={`c${i}`} d={d} opacity={op} />;
        })}
      </g>
    </svg>
  );
}

/* ---------- useTheme hook + helpers ---------- */
function applyThemeNow(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("auralis_theme", theme);
  } catch (e) {}
}
function getStoredTheme() {
  try {
    return localStorage.getItem("auralis_theme") || "light";
  } catch (e) {
    return "light";
  }
}
function useTheme() {
  const [theme, setTheme] = React.useState(() => getStoredTheme());
  React.useEffect(() => {
    applyThemeNow(theme);
  }, [theme]);
  const toggle = React.useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);
  return { theme, toggle, setTheme };
}

/* ---------- ThemeToggle — sun/moon icon button ---------- */
function ThemeToggle({ theme, toggle, size = 18 }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Icon.Sun size={size} /> : <Icon.Moon size={size} />}
    </button>
  );
}

Object.assign(window, { TopoBackground, useTheme, ThemeToggle, applyThemeNow, getStoredTheme });

/* ===== shell.jsx ===== */
/* ============================================================
   Auralis — App shell: Sidebar, TopBar, CopilotWidget, CommandPalette
   ============================================================ */


/* ---------- Sidebar ---------- */
function Sidebar({ route, navigate, onDisconnect }) {
  const groups = [
    { label: "Overview", items: [
      { id: "/app/dashboard", label: "Dashboard", icon: <Icon.Home size={16} /> },
    ]},
    { label: "Discover", items: [
      { id: "/app/opportunities", label: "Opportunities", icon: <Icon.Compass size={16} /> },
      { id: "/ratings", label: "Ratings", icon: <Icon.Star size={16} /> },
    ]},
    { label: "Act", items: [
      { id: "/app/simulator", label: "Simulator", icon: <Icon.Sliders size={16} /> },
      { id: "/app/copilot", label: "AI Copilot", icon: <Icon.Sparkles size={16} /> },
    ]},
    { label: "Govern", items: [
      { id: "/app/compliance", label: "Compliance", icon: <Icon.ShieldCheck size={16} /> },
      { id: "/app/policies", label: "Policies", icon: <Icon.Scale size={16} /> },
      { id: "/app/decisions", label: "Decisions", icon: <Icon.FileText size={16} /> },
    ]},
    { label: "System", items: [
      { id: "/app/agent", label: "Agent", icon: <Icon.Cpu size={16} /> },
      { id: "/app/integrations", label: "Integrations", icon: <Icon.Plug size={16} /> },
      { id: "/app/settings", label: "Settings", icon: <Icon.Settings size={16} /> },
    ]},
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Icon.Brand size={22} />
        <div>
          <div className="sidebar-brand-name">Auralis Finance</div>
          <div className="row gap-4 mt-4">
            <span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Mantle Mainnet</span>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, overflow: "auto", marginTop: 8 }}>
        {groups.map(g => (
          <div className="sidebar-section" key={g.label}>
            <div className="sidebar-section-label">{g.label}</div>
            <div className="mt-8">
              {g.items.map(item => (
                <div
                  key={item.id}
                  className={`sidebar-item ${route === item.id || (item.id !== "/" && route.startsWith(item.id)) ? "active" : ""}`}
                  onClick={() => navigate(item.id)}
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => { if (e.key === "Enter") navigate(item.id); }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="card" style={{ padding: 14, background: "var(--surface-muted)", boxShadow: "none", borderRadius: 10, margin: "8px 0 0" }}>
        <div className="row gap-8">
          <Icon.MessageSquare size={14} />
          <div style={{ fontSize: 13, fontWeight: 500 }}>Need help?</div>
        </div>
        <div className="fs-12 text-secondary mt-4">
          Browse the docs or ask the Copilot.
        </div>
      </div>
    </aside>
  );
}

/* ---------- TopBar ---------- */
function TopBar({ navigate, onOpenPalette, onDisconnect, wallet, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <header className="topbar">
      <button className="topbar-search" onClick={onOpenPalette}>
        <Icon.Search size={14} />
        <span style={{ flex: 1, textAlign: "left", fontSize: 13 }}>Search any asset, protocol, or page…</span>
        <span className="kbd">⌘K</span>
      </button>

      <div className="row gap-12" style={{ marginLeft: "auto" }}>
        <button className="btn btn-ghost btn-sm" style={{ fontWeight: 400 }}>
          Main Portfolio <Icon.ChevronDown size={14} />
        </button>

        <ThemeToggle theme={theme} toggle={toggleTheme} />

        <div className="wallet-pill">
          <span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>
          <span>{wallet}</span>
          <CopyButton text={wallet} />
        </div>

        <div ref={menuRef} style={{ position: "relative" }}>
          <div className="avatar" onClick={() => setMenuOpen(v => !v)} role="button" tabIndex={0}
               onKeyDown={(e) => { if (e.key === "Enter") setMenuOpen(v => !v); }}>
            JA
          </div>
          {menuOpen && (
            <div style={{ position: "absolute", top: 40, right: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "var(--shadow-pop)", minWidth: 200, padding: 6, zIndex: 30 }}>
              <MenuItem icon={<Icon.Settings size={14} />} label="Settings" onClick={() => { setMenuOpen(false); navigate("/app/settings"); }} />
              <MenuItem icon={<Icon.Eye size={14} />} label="Appearance" />
              <MenuItem icon={<Icon.FileText size={14} />} label="Docs" onClick={() => navigate("/docs")} />
              <div className="divider" style={{ margin: "6px 0" }} />
              <MenuItem icon={<Icon.Wallet size={14} />} label="Disconnect" onClick={onDisconnect} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
function MenuItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="row gap-12" style={{ width: "100%", padding: "8px 10px", borderRadius: 6, fontSize: 13, transition: "background 120ms" }}
      onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-muted)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      <span style={{ color: "var(--text-tertiary)" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

/* ---------- Command Palette ---------- */
function CommandPalette({ open, onClose, navigate }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    if (!open) setQ("");
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, onClose]);
  if (!open) return null;

  const routes = [
    { kind: "Page", label: "Dashboard", path: "/app/dashboard" },
    { kind: "Page", label: "Opportunities", path: "/app/opportunities" },
    { kind: "Page", label: "Ratings", path: "/ratings" },
    { kind: "Page", label: "Compliance", path: "/app/compliance" },
    { kind: "Page", label: "Simulator", path: "/app/simulator" },
    { kind: "Page", label: "AI Copilot", path: "/app/copilot" },
    { kind: "Page", label: "Policies", path: "/app/policies" },
    { kind: "Page", label: "Decisions", path: "/app/decisions" },
    { kind: "Page", label: "Agent", path: "/app/agent" },
    { kind: "Page", label: "Integrations", path: "/app/integrations" },
    { kind: "Page", label: "Settings", path: "/app/settings" },
    { kind: "Page", label: "Landing", path: "/" },
    { kind: "Page", label: "Methodology", path: "/methodology" },
  ];
  const assets = window.Auralis.ASSETS.map(a => ({ kind: "Asset", label: `${a.symbol} · ${a.name}`, path: `/ratings/${a.id}` }));
  const skills = window.Auralis.AGENT.skills.map(s => ({ kind: "Skill", label: s.name, path: "/app/agent" }));
  const all = [...routes, ...assets, ...skills];
  const filtered = q ? all.filter(x => x.label.toLowerCase().includes(q.toLowerCase()) || x.kind.toLowerCase().includes(q.toLowerCase())) : all.slice(0, 12);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(11, 18, 32, 0.4)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: "90vw", background: "var(--surface)", borderRadius: 14, boxShadow: "var(--shadow-pop)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <div className="row gap-12" style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
          <Icon.Search size={16} />
          <input className="input" style={{ border: "none", padding: 0, height: "auto", background: "transparent", fontSize: 15 }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search routes, assets, skills…"
            autoFocus
          />
          <span className="kbd">esc</span>
        </div>
        <div style={{ maxHeight: 420, overflow: "auto", padding: 8 }}>
          {filtered.length === 0 && (
            <div className="text-secondary fs-13" style={{ padding: 20, textAlign: "center" }}>No matches.</div>
          )}
          {filtered.map((x, i) => (
            <button key={i} className="row gap-12 between" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, transition: "background 100ms" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-muted)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              onClick={() => { navigate(x.path); onClose(); }}
            >
              <div className="row gap-12">
                <span className="chip" style={{ fontSize: 10, padding: "1px 8px", height: 18 }}>{x.kind}</span>
                <span style={{ fontSize: 14 }}>{x.label}</span>
              </div>
              <span className="text-tertiary"><Icon.ChevronRight size={14} /></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Copilot Widget (floating) ---------- */
function CopilotWidget({ initiallyOpen = false, navigate }) {
  const [open, setOpen] = useState(initiallyOpen);
  const [msgs, setMsgs] = useState([
    { who: "bot", kind: "greeting", text: "Hi — I can explain your portfolio, run a compliance scan, or propose a rebalance." },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [msgs, streaming]);

  const ask = async (q) => {
    setMsgs(m => [...m, { who: "user", text: q }]);
    setInput("");
    setStreaming(true);
    const stream = { who: "bot", kind: "stream", text: "" };
    setMsgs(m => [...m, stream]);
    let txt = "";
    await window.Auralis.Services.askCopilot(q, (t) => {
      txt += t;
      setMsgs(m => {
        const c = m.slice();
        c[c.length - 1] = { ...c[c.length - 1], text: txt };
        return c;
      });
    });
    // After stream — replace with full structured reply
    setMsgs(m => {
      const c = m.slice();
      c[c.length - 1] = { who: "bot", kind: "structured", reply: window.Auralis.COPILOT_REPLY };
      return c;
    });
    setStreaming(false);
  };

  return (
    <>
      {!open && (
        <button className="copilot-fab" onClick={() => setOpen(true)} aria-label="Open Auralis Copilot">
          <Icon.Sparkles size={22} />
        </button>
      )}
      {open && (
        <div className="copilot-panel">
          <div className="row between" style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
            <div className="row gap-8">
              <Icon.Sparkles size={16} />
              <span style={{ fontWeight: 600 }}>Auralis Copilot</span>
              <span className="chip" style={{ fontSize: 10, padding: "0 6px", height: 18 }}>Beta</span>
            </div>
            <button className="btn-ghost" onClick={() => setOpen(false)}><Icon.X size={16} /></button>
          </div>

          <div ref={threadRef} style={{ flex: 1, overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            {msgs.map((m, i) => (
              <CopilotMessage key={i} m={m} navigate={navigate} />
            ))}
          </div>

          <div style={{ padding: 10, borderTop: "1px solid var(--border)" }}>
            <div className="row gap-8" style={{ flexWrap: "wrap", marginBottom: 10 }}>
              {["Explain my risk score", "Run a compliance scan", "What changed today?"].map(q => (
                <button key={q} className="chip" onClick={() => ask(q)} style={{ cursor: "pointer" }}>{q}</button>
              ))}
            </div>
            <form className="row gap-8" onSubmit={(e) => { e.preventDefault(); if (input.trim() && !streaming) ask(input.trim()); }}>
              <input className="input" placeholder="Ask Auralis…" value={input} onChange={(e) => setInput(e.target.value)} />
              <button className="btn btn-primary btn-sm" type="submit" disabled={!input.trim() || streaming}><Icon.Send size={14} /></button>
            </form>
            <div className="fs-12 text-tertiary mt-8">Advisory only — verify decisions.</div>
          </div>
        </div>
      )}
    </>
  );
}

function CopilotMessage({ m, navigate }) {
  if (m.who === "user") {
    return (
      <div style={{ alignSelf: "flex-end", maxWidth: "85%", padding: "10px 12px", background: "var(--teal-wash)", color: "var(--teal-dark)", borderRadius: "12px 12px 4px 12px", fontSize: 14 }}>
        {m.text}
      </div>
    );
  }
  if (m.kind === "greeting") {
    return (
      <div style={{ maxWidth: "92%", padding: "10px 12px", background: "var(--surface-muted)", borderRadius: "12px 12px 12px 4px", fontSize: 13, color: "var(--text-secondary)" }}>
        {m.text}
      </div>
    );
  }
  if (m.kind === "stream") {
    return (
      <div style={{ maxWidth: "92%", padding: "12px 14px", background: "var(--surface-muted)", borderRadius: "12px 12px 12px 4px", fontSize: 14 }}>
        {m.text}<span className="blink">▋</span>
      </div>
    );
  }
  if (m.kind === "structured") {
    const r = m.reply;
    return (
      <div style={{ background: "var(--surface-muted)", borderRadius: "12px 12px 12px 4px", padding: 14, fontSize: 13 }}>
        <div className="caps mb-8">Executive summary</div>
        <div className="mb-12">{r.summary}</div>

        <div className="caps mb-8">Recommended actions</div>
        <div className="stack gap-8 mb-12">
          {r.actions.map((a, i) => (
            <div key={i} className="row between" style={{ padding: "8px 10px", background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontWeight: 500 }}>{a.title}</div>
                <div className="fs-12 text-secondary">{a.note}</div>
              </div>
              <span className="chip chip-emerald">{a.delta}</span>
            </div>
          ))}
        </div>

        <div className="caps mb-8">Expected outcome</div>
        <div className="stack gap-4 mb-12">
          {r.outcome.map((o, i) => (
            <div key={i} className="row between fs-13">
              <span className="text-secondary">{o.label}</span>
              <span><span className="text-tertiary">{o.from}</span> → <span className="fw-500">{o.to}</span></span>
            </div>
          ))}
        </div>

        <ConfidenceMeter value={r.confidence} compact />
        <div className="row gap-8 mt-12">
          <button className="btn btn-secondary btn-sm" onClick={() => navigate("/app/simulator")}>
            <Icon.Sliders size={14} />Open simulator
          </button>
          <button className="btn btn-ghost btn-sm">Save as rule</button>
        </div>
        <div className="fs-12 text-tertiary mt-12">{r.caveats}</div>
      </div>
    );
  }
  return null;
}

// blink keyframe
(function () {
  if (document.getElementById("blinkkf")) return;
  const s = document.createElement("style");
  s.id = "blinkkf";
  s.textContent = ".blink{animation:blink 1s steps(2) infinite}@keyframes blink{50%{opacity:0}}";
  document.head.appendChild(s);
})();

Object.assign(window, { Sidebar, TopBar, CommandPalette, CopilotWidget });

/* ===== marketing.jsx ===== */
/* ============================================================
   Auralis — Marketing pages
   /, /product, /methodology, /ratings, /ratings/:id, /security, /business, /docs, /faq, /company
   ============================================================ */


/* ---------- Marketing header & footer ---------- */
function MktHeader({ route, navigate, onConnect, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Product", path: "/product" },
    { label: "Ratings", path: "/ratings" },
    { label: "Methodology", path: "/methodology" },
    { label: "Security", path: "/security" },
    { label: "Docs", path: "/docs" },
    { label: "Company", path: "/company" },
  ];
  return (
    <header className={`mkt-header ${scrolled ? "scrolled" : ""}`}>
      <div className="mkt-container row between">
        <button className="row gap-8" onClick={() => navigate("/")}>
          <Icon.Brand size={22} />
          <span style={{ fontWeight: 600, fontSize: 15 }}>Auralis Finance</span>
        </button>
        <nav className="mkt-nav" style={{ display: window.innerWidth > 880 ? "flex" : "none" }}>
          {links.map(l => (
            <a key={l.path} onClick={() => navigate(l.path)} style={{ cursor: "pointer", color: route === l.path ? "var(--text)" : undefined }}>{l.label}</a>
          ))}
        </nav>
        <div className="row gap-12">
          <span className="chip">
            <span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>
            Mantle Mainnet
          </span>
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button className="btn btn-primary btn-sm" onClick={onConnect}>Open App</button>
        </div>
      </div>
    </header>
  );
}

function MktFooter({ navigate }) {
  return (
    <footer className="mkt-footer">
      <div className="mkt-container">
        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, alignItems: "flex-start" }}>
          <div>
            <div className="row gap-8" style={{ color: "white" }}>
              <Icon.Brand size={20} color="white" />
              <span style={{ fontWeight: 600 }}>Auralis Finance</span>
            </div>
            <div className="mt-12" style={{ fontSize: 13, maxWidth: 280 }}>
              AI risk and compliance layer for tokenized real-world assets on Mantle.
            </div>
            <form className="row gap-8 mt-24" onSubmit={(e) => { e.preventDefault(); Toast.push({ title: "Subscribed", sub: "We'll be in touch.", kind: "success" }); }}>
              <input className="input" placeholder="you@firm.com" style={{ background: "var(--ink-soft)", borderColor: "rgba(255,255,255,0.15)", color: "white" }} />
              <button className="btn btn-primary btn-sm" type="submit">Subscribe</button>
            </form>
          </div>
          <div>
            <h4>Product</h4>
            <a onClick={() => navigate("/product")}>Overview</a>
            <a onClick={() => navigate("/ratings")}>Ratings</a>
            <a onClick={() => navigate("/methodology")}>Methodology</a>
            <a onClick={() => navigate("/app")}>Open app</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a onClick={() => navigate("/docs")}>Documentation</a>
            <a onClick={() => navigate("/security")}>Security</a>
            <a onClick={() => navigate("/faq")}>FAQ</a>
          </div>
          <div>
            <h4>Company</h4>
            <a onClick={() => navigate("/company")}>About</a>
            <a onClick={() => navigate("/business")}>Business model</a>
            <a href="#">Press</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Disclosures</a>
          </div>
        </div>
        <div className="row between mt-48" style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
          <span>© 2026 Auralis Finance · Built on Mantle</span>
          <span>Auralis provides risk information, not financial or legal advice.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Reveal-on-scroll wrapper ---------- */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setShown(true), delay);
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${shown ? "in" : ""}`}>{children}</div>;
}

/* ============================================================
   PRODUCT PREVIEW (hero) — miniature dashboard mock
   ============================================================ */
function ProductPreview() {
  return (
    <div style={{ background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", boxShadow: "0 24px 60px rgba(11,18,32,0.12)", overflow: "hidden" }}>
      {/* browser chrome */}
      <div className="row gap-8" style={{ padding: "10px 14px", background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: "#E4836B" }}></span>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: "#E2C166" }}></span>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: "#7DBF8C" }}></span>
        <div style={{ flex: 1, marginLeft: 12, height: 22, background: "var(--surface)", borderRadius: 6, padding: "0 10px", display: "flex", alignItems: "center", fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--mono)" }}>
          app.auralis.finance/dashboard
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div className="row between mb-12">
          <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Portfolio Dashboard</div>
          <span className="chip chip-emerald" style={{ fontSize: 10 }}>
            <span className="chip-dot chip-dot-emerald" style={{ width: 5, height: 5, borderRadius: "50%" }}></span>Live
          </span>
        </div>
        <div className="grid gap-12" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
          <MiniKpi label="Value" value="$18.42M" delta="+6.27%" />
          <MiniKpi label="APY" value="9.18%" delta="+0.73%" />
          <MiniKpi label="Risk" value="42" band="Low" />
          <MiniKpi label="Liquidity" value="$1.78M" />
        </div>
        <div className="grid gap-12 mt-12" style={{ gridTemplateColumns: "200px 1fr" }}>
          <div style={{ padding: 8, background: "var(--surface-muted)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AllocationDonut
              segments={window.Auralis.PORTFOLIO.allocation}
              total="$18.4M"
              size={140}
              thickness={18}
            />
          </div>
          <div style={{ padding: 10, background: "var(--surface-muted)", borderRadius: 10, position: "relative" }}>
            <div className="row between mb-8">
              <div className="caps">Performance · 30D</div>
              <span className="chip chip-emerald" style={{ fontSize: 10 }}>+6.27%</span>
            </div>
            <AreaChart data={window.Auralis.PORTFOLIO.performance} width={420} height={120} padding={{ l: 30, r: 4, t: 4, b: 16 }} valueFormat={(v) => v.toFixed(0)} />
          </div>
        </div>
        <div className="mt-12 card" style={{ padding: 0, boxShadow: "none" }}>
          {window.Auralis.PORTFOLIO.positions.slice(0, 3).map((p, i) => (
            <div key={p.symbol} className="row between" style={{ padding: "10px 12px", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
              <div className="row gap-12">
                <AssetIcon symbol={p.symbol} size="sm" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                  <div className="fs-12 text-tertiary">{p.source}</div>
                </div>
              </div>
              <div className="row gap-16">
                <span className="mono fs-12">{fmtUSD(p.value, { compact: true, decimals: 2 })}</span>
                <RatingSeal grade={p.grade} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function MiniKpi({ label, value, delta, band }) {
  return (
    <div style={{ padding: 10, background: "var(--surface-muted)", borderRadius: 10 }}>
      <div className="fs-12 text-tertiary">{label}</div>
      <div className="serif" style={{ fontSize: 18, marginTop: 2 }}>{value}</div>
      {delta && <div className="fs-12 text-emerald">{delta}</div>}
      {band && <div className="fs-12"><span className="chip chip-emerald" style={{ fontSize: 10 }}>{band}</span></div>}
    </div>
  );
}

/* ============================================================
   LANDING /
   ============================================================ */
function MktLanding({ navigate, onConnect }) {
  const stats = [
    { label: "Assets rated", v: 34, suffix: "+" },
    { label: "Decisions logged", v: 12842, format: "num" },
    { label: "Avg. yield uplift", v: 1.28, suffix: "%" },
    { label: "Active users", v: 2318, format: "num" },
  ];
  const loop = ["Observe", "Rate", "Verify", "Simulate", "Approve", "Execute", "Prove"];
  const pillars = [
    { id: "rate", title: "Rate", subtitle: "Asset Intelligence", icon: <Icon.Star size={20} />,
      copy: "Every tokenized real-world asset gets an Auralis Rating — a letter grade, a 0–100 risk score, and a seven-part risk breakdown." },
    { id: "verify", title: "Verify", subtitle: "Compliance & Eligibility", icon: <Icon.ShieldCheck size={20} />,
      copy: "For your connected wallet, Auralis tells you whether you may hold each asset, and lets you mint an on-chain proof." },
    { id: "manage", title: "Manage", subtitle: "Portfolio Agent", icon: <Icon.Sparkles size={20} />,
      copy: "An AI agent recommends and simulates rebalances under hard guardrails — you approve, it executes, every step proven on-chain." },
  ];
  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="mkt-container grid" style={{ gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1fr)", gap: 64, alignItems: "center" }}>
          <div>
            <div className="mkt-eyebrow">Auralis · AI Risk & Compliance</div>
            <h1 className="mkt-h1">Risk intelligence for real‑world yield.</h1>
            <p className="mkt-lede">Auralis is the AI agent that rates, compliance-checks, and rebalances tokenized real-world assets on Mantle — with every decision proven on-chain.</p>
            <div className="row gap-12 mt-32">
              <button className="btn btn-primary btn-lg" onClick={onConnect}>Open App<Icon.ArrowRight size={14} /></button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate("/ratings")}>View live ratings</button>
            </div>
            <div className="row gap-16 mt-24 fs-13 text-secondary">
              <span className="row gap-8"><Icon.Check size={14} />Non-custodial</span>
              <span className="row gap-8"><Icon.Check size={14} />Every decision on-chain</span>
              <span className="row gap-8"><Icon.Check size={14} />Built for transparency</span>
            </div>
          </div>
          <Reveal delay={120}><ProductPreview /></Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ background: "var(--surface-muted)", padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="mkt-container row between" style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500, flexWrap: "wrap", gap: 20 }}>
          <span className="row gap-8"><Icon.Network size={14} />Built on Mantle</span>
          <span className="row gap-8"><Icon.Lock size={14} />Non-custodial by design</span>
          <span className="row gap-8"><Icon.ShieldCheck size={14} />Every decision on-chain</span>
          <span className="row gap-8"><Icon.Sparkles size={14} />Methodology v1.0 · published</span>
        </div>
      </section>

      {/* LIVE STATS */}
      <section className="mkt-section">
        <div className="mkt-container">
          <Reveal>
            <div className="grid gap-32" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {stats.map((s, i) => <LiveStat key={i} {...s} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="mkt-section" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="mkt-container">
          <Reveal>
            <div className="mkt-eyebrow">What Auralis does</div>
            <h2 className="mkt-h2 mt-12" style={{ maxWidth: 720 }}>Three things, in one closed loop.</h2>
          </Reveal>
          <div className="grid gap-24 mt-48" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div className="card card-hover" style={{ padding: 28 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.icon}
                  </div>
                  <div className="caps mt-20">{p.subtitle}</div>
                  <h3 className="mkt-h3 mt-4">{p.title}.</h3>
                  <p className="mt-12 text-secondary" style={{ fontSize: 15 }}>{p.copy}</p>
                  <a onClick={() => navigate("/product")} className="row gap-8 mt-20 text-teal" style={{ cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                    Learn more <Icon.ArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — the loop */}
      <section className="mkt-section">
        <div className="mkt-container">
          <Reveal>
            <div className="mkt-eyebrow">The Auralis loop</div>
            <h2 className="mkt-h2 mt-12" style={{ maxWidth: 720 }}>Observe → Rate → Verify → Simulate → Approve → Execute → Prove.</h2>
            <p className="mkt-lede mt-16">Every action in Auralis follows the same seven-step path. Nothing is hidden. Every step is reproducible.</p>
          </Reveal>
          <div className="row gap-12 mt-48" style={{ flexWrap: "wrap", justifyContent: "center" }}>
            {loop.map((s, i) => (
              <Reveal key={s} delay={i * 60}>
                <div className="row gap-12">
                  <div className="card" style={{ padding: "14px 18px", minWidth: 140 }}>
                    <div className="caps">Step {String(i + 1).padStart(2, "0")}</div>
                    <div className="serif mt-4" style={{ fontSize: 18 }}>{s}</div>
                  </div>
                  {i < loop.length - 1 && <Icon.ArrowRight size={14} color="var(--text-tertiary)" />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORTED ASSETS */}
      <section className="mkt-section" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="mkt-container">
          <Reveal>
            <div className="row between" style={{ flexWrap: "wrap", gap: 24 }}>
              <div>
                <div className="mkt-eyebrow">Supported assets</div>
                <h2 className="mkt-h2 mt-12">Rated and continuously monitored.</h2>
              </div>
              <button className="btn btn-secondary" onClick={() => navigate("/ratings")}>View all ratings<Icon.ArrowRight size={14} /></button>
            </div>
          </Reveal>
          <div className="grid gap-16 mt-32" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {window.Auralis.ASSETS.map((a, i) => (
              <Reveal key={a.id} delay={i * 40}>
                <div className="card card-hover" style={{ padding: 16, cursor: "pointer" }} onClick={() => navigate(`/ratings/${a.id}`)}>
                  <div className="row between">
                    <AssetIcon symbol={a.symbol} size="md" />
                    <RatingSeal grade={a.grade} size="sm" />
                  </div>
                  <div className="mt-12" style={{ fontWeight: 500 }}>{a.name}</div>
                  <div className="fs-12 text-tertiary">{a.assetClass}</div>
                  <div className="row between mt-12 fs-13">
                    <span className="text-secondary">APY</span>
                    <span className="mono">{a.riskAdjustedApy.toFixed(2)}%</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY TEASER */}
      <section className="mkt-section">
        <div className="mkt-container grid gap-48" style={{ gridTemplateColumns: "1.1fr 1fr", alignItems: "center" }}>
          <Reveal>
            <div className="mkt-eyebrow">Methodology</div>
            <h2 className="mkt-h2 mt-12">Not a black box.</h2>
            <p className="mkt-lede mt-16">Every Auralis rating is built from seven dimensions: asset, issuer, liquidity, peg, oracle, smart-contract, and concentration. The composite score is published, versioned, and verifiable.</p>
            <button className="btn btn-secondary mt-24" onClick={() => navigate("/methodology")}>Read the methodology<Icon.ArrowRight size={14} /></button>
          </Reveal>
          <Reveal delay={120}>
            <div className="card" style={{ padding: 32, display: "flex", justifyContent: "center" }}>
              <RiskRadar dimensions={window.Auralis.ASSETS[0].dims} size={300} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--ink)", color: "white", padding: "112px 0" }}>
        <div className="mkt-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="mkt-h2" style={{ color: "white", maxWidth: 720, margin: "0 auto", fontSize: 52 }}>
              The next trillion dollars won't be managed by banks.
            </h2>
            <p className="mt-20" style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, maxWidth: 520, margin: "20px auto 0" }}>
              It will be managed by code, audited by AI, and proven on-chain. Auralis is the layer that makes that possible.
            </p>
            <div className="mt-32">
              <button className="btn btn-primary btn-lg" onClick={onConnect}>Open App<Icon.ArrowRight size={14} /></button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function LiveStat({ label, v, suffix = "", format }) {
  const val = useCountUp(v, { duration: 1200 });
  const display = format === "num" ? Math.round(val).toLocaleString("en-US") : val.toFixed(suffix === "%" ? 2 : 0);
  return (
    <div>
      <div className="serif" style={{ fontSize: 48, lineHeight: 1.05 }}>
        {display}{suffix}
      </div>
      <div className="caps mt-8">{label}</div>
    </div>
  );
}

/* ============================================================
   PRODUCT /product
   ============================================================ */
function MktProduct({ navigate }) {
  const pillars = [
    { title: "Rate", subtitle: "Asset Intelligence", points: [
      "Composite 0–100 risk score and AAA–C letter grade",
      "Seven dimensions, each with a published rationale",
      "Continuous monitoring with depeg and oracle watchers",
      "Every rating versioned, hashed, and anchored on Mantle",
    ], graphic: "rating" },
    { title: "Verify", subtitle: "Compliance & Eligibility", points: [
      "Wallet screen with sanctions and counterparty heuristics",
      "Eligibility verdicts per asset and per jurisdiction",
      "Portable compliance reports and on-chain attestations",
      "Quiet 'not legal advice' notice on every surface",
    ], graphic: "eligibility" },
    { title: "Manage", subtitle: "Portfolio Agent", points: [
      "AI proposes; you approve. Always.",
      "Seven hard guardrails enforced before any execution",
      "Before/after simulation with morphing donut",
      "Decisions and proofs in one auditable trail",
    ], graphic: "simulator" },
  ];
  return (
    <div className="page-enter">
      <section className="mkt-section">
        <div className="mkt-container">
          <div className="mkt-eyebrow">Product</div>
          <h1 className="mkt-h1 mt-12">The three things Auralis does.</h1>
          <p className="mkt-lede mt-16">One closed loop — Rate, Verify, Manage. Each pillar is its own surface in the app. Together they make tokenized real-world yield safe to hold at size.</p>
        </div>
      </section>

      {pillars.map((p, i) => (
        <section key={p.title} className="mkt-section" style={{ background: i % 2 === 1 ? "var(--surface)" : undefined, borderTop: i % 2 === 1 ? "1px solid var(--border)" : undefined, borderBottom: i % 2 === 1 ? "1px solid var(--border)" : undefined }}>
          <div className="mkt-container grid gap-48" style={{ gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr" }}>
            <Reveal>
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <div className="mkt-eyebrow">Pillar 0{i + 1}</div>
                <h2 className="mkt-h2 mt-12">{p.title}.<br/><span style={{ color: "var(--text-secondary)" }}>{p.subtitle}.</span></h2>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
                  {p.points.map(pt => (
                    <li key={pt} className="row gap-12" style={{ padding: "8px 0", fontSize: 15 }}>
                      <span className="text-teal" style={{ marginTop: 4 }}><Icon.Check size={16} /></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <PillarGraphic kind={p.graphic} />
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="mkt-section">
        <div className="mkt-container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="mkt-h2" style={{ maxWidth: 640, margin: "0 auto" }}>One closed loop.</h2>
            <p className="mkt-lede mt-16" style={{ margin: "16px auto 0" }}>Observe → Rate → Verify → Simulate → Approve → Execute → Prove.</p>
            <button className="btn btn-secondary mt-32" onClick={() => navigate("/docs")}>Read the docs<Icon.ArrowRight size={14} /></button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
function PillarGraphic({ kind }) {
  if (kind === "rating") {
    const a = window.Auralis.ASSETS[2]; // mETH AA
    return (
      <div className="card" style={{ padding: 28 }}>
        <div className="row between">
          <div className="row gap-12">
            <AssetIcon symbol={a.symbol} size="lg" />
            <div>
              <div className="serif" style={{ fontSize: 22 }}>{a.name}</div>
              <div className="fs-13 text-tertiary">{a.assetClass}</div>
            </div>
          </div>
          <RatingSeal grade={a.grade} size="lg" />
        </div>
        <div className="grid gap-16 mt-24" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <KpiStat label="Risk score" value={a.riskScore} band={a.band} />
          <KpiStat label="Risk-adj. APY" value={a.riskAdjustedApy} format="pct" decimals={2} />
        </div>
      </div>
    );
  }
  if (kind === "eligibility") {
    const m = window.Auralis.COMPLIANCE.matrix.slice(0, 5);
    return (
      <div className="card" style={{ padding: 0 }}>
        <div className="row between" style={{ padding: 18, borderBottom: "1px solid var(--border)" }}>
          <span className="caps">Eligibility · jurisdiction NG</span>
          <span className="chip chip-emerald" style={{ fontSize: 11 }}>Wallet cleared</span>
        </div>
        {m.map(row => {
          const a = window.Auralis.ASSETS.find(x => x.id === row.assetId);
          return (
            <div key={row.assetId} className="row between" style={{ padding: "12px 18px", borderTop: "1px solid var(--border)" }}>
              <div className="row gap-12">
                <AssetIcon symbol={a.symbol} size="sm" />
                <span style={{ fontSize: 14 }}>{a.name}</span>
              </div>
              <EligibilityChip verdict={row.verdict} />
            </div>
          );
        })}
      </div>
    );
  }
  if (kind === "simulator") {
    const before = window.Auralis.PORTFOLIO.allocation;
    const after = [
      { label: "DeFi", pct: 48, value: 0, color: "#0E9E8C" },
      { label: "RWA", pct: 38, value: 0, color: "#1F58A8" },
      { label: "Stablecoins", pct: 14, value: 0, color: "#8C97A8" },
    ];
    return (
      <div className="card" style={{ padding: 28 }}>
        <div className="row between mb-12">
          <span className="caps">Simulator · before → after</span>
          <span className="chip chip-emerald">+0.24% APY</span>
        </div>
        <div className="row gap-24" style={{ justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <AllocationDonut segments={before} total="9.18%" totalLabel="APY" size={160} thickness={20} />
            <div className="mt-8 fs-13 text-secondary">Current</div>
          </div>
          <div style={{ alignSelf: "center" }}><Icon.ArrowRight size={20} color="var(--text-tertiary)" /></div>
          <div style={{ textAlign: "center" }}>
            <AllocationDonut segments={after} total="9.42%" totalLabel="APY" size={160} thickness={20} />
            <div className="mt-8 fs-13 text-emerald">Proposed</div>
          </div>
        </div>
      </div>
    );
  }
}

/* ============================================================
   METHODOLOGY /methodology
   ============================================================ */
function MktMethodology() {
  const dims = [
    { key: "Asset", def: "The underlying real-world or on-chain exposure — its quality, cash-flow stability, and structure." },
    { key: "Issuer", def: "The legal and operational entity that issues or operates the asset. Track record, audits, and regulatory standing." },
    { key: "Liquidity", def: "Primary and secondary depth, exit costs at size, and behaviour during recent stress windows." },
    { key: "Peg", def: "For stable-class exposure, observed deviation distribution over rolling windows. Tighter is better." },
    { key: "Oracle", def: "Price-feed quality, source diversity, and update cadence. Single-source feeds score lower." },
    { key: "Smart-contract", def: "Audits, time-since-deploy, formal verification, and historical incident record." },
    { key: "Concentration", def: "Holder concentration and counterparty graph depth. Higher concentration penalised." },
  ];
  return (
    <div className="page-enter">
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="mkt-container">
          <div className="mkt-eyebrow">Methodology · v1.0</div>
          <h1 className="mkt-h1 mt-12">How Auralis rates assets.</h1>
          <p className="mkt-lede mt-16">A plain-language explanation of the seven dimensions, the composite score, and why every rating is reproducible.</p>
        </div>
      </section>
      <section className="mkt-section" style={{ paddingTop: 32 }}>
        <div className="mkt-container grid gap-48" style={{ gridTemplateColumns: "240px 1fr" }}>
          <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <div className="caps mb-12">On this page</div>
            <a href="#dims" style={{ display: "block", padding: "6px 0", fontSize: 13, color: "var(--text-secondary)" }}>The seven dimensions</a>
            <a href="#score" style={{ display: "block", padding: "6px 0", fontSize: 13, color: "var(--text-secondary)" }}>Composite score & grade</a>
            <a href="#repro" style={{ display: "block", padding: "6px 0", fontSize: 13, color: "var(--text-secondary)" }}>Versioned & reproducible</a>
            <a href="#compliance" style={{ display: "block", padding: "6px 0", fontSize: 13, color: "var(--text-secondary)" }}>Compliance methodology</a>
          </aside>
          <div>
            <h2 className="mkt-h2" id="dims">The seven dimensions.</h2>
            <p className="mkt-lede mt-12">Auralis rates assets on seven dimensions. Each is scored 0–100; higher is better. The composite is a weighted aggregate.</p>
            <div className="card mt-24" style={{ padding: 0 }}>
              {dims.map((d, i) => (
                <div key={d.key} className="row gap-16" style={{ padding: "18px 22px", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{d.key}</div>
                    <div className="fs-14 text-secondary mt-4">{d.def}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-24 mt-48" style={{ gridTemplateColumns: "1fr 1.1fr", alignItems: "center" }}>
              <div className="card" style={{ padding: 24, display: "flex", justifyContent: "center" }}>
                <RiskRadar dimensions={window.Auralis.ASSETS[0].dims} size={280} />
              </div>
              <div>
                <h2 className="mkt-h2" id="score">Composite score.</h2>
                <p className="mkt-lede mt-12">The seven dimensions roll up into a single 0–100 score (lower is safer) and a letter grade from AAA to C. Bands are anchored to historical drawdown distributions and re-calibrated yearly.</p>
                <div className="grid gap-16 mt-24" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                  {[
                    { g: "AAA", b: "0–10" }, { g: "AA", b: "11–25" }, { g: "A", b: "26–40" }, { g: "BBB", b: "41–55" },
                    { g: "BB", b: "56–70" }, { g: "B", b: "71–85" }, { g: "C", b: "86–100" },
                  ].map(t => (
                    <div key={t.g} className="card" style={{ padding: "12px 14px", boxShadow: "none" }}>
                      <RatingSeal grade={t.g} size="sm" />
                      <div className="fs-12 text-tertiary mt-8">{t.b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h2 className="mkt-h2 mt-48" id="repro">Versioned & reproducible.</h2>
            <p className="mkt-lede mt-12">Every rating is hashed alongside its input snapshot and methodology version. The hash is anchored on Mantle. Anyone can recompute the rating from the inputs and verify the match.</p>
            <h2 className="mkt-h2 mt-48" id="compliance">Compliance methodology.</h2>
            <p className="mkt-lede mt-12">Eligibility verdicts are formed from issuer terms, jurisdiction restrictions, and any applicable transfer rules. The verdict is presented with cited reasons and a confidence value. Auralis provides compliance tooling and risk information, not legal advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   RATINGS EXPLORER /ratings
   ============================================================ */
function MktRatings({ navigate }) {
  const [status, setStatus] = useState("loading");
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState("all");
  const [grade, setGrade] = useState("all");
  const [sort, setSort] = useState({ k: "riskScore", dir: 1 });

  const load = () => {
    setStatus("loading");
    window.Auralis.setForceSuccess(true);
    window.Auralis.Services.getRatings().then(d => {
      setAssets(d); setStatus("populated");
    }).catch(e => { setError(e.message); setStatus("error"); });
  };
  useEffect(() => { load(); }, []);

  const classes = ["all", ...new Set(window.Auralis.ASSETS.map(a => a.assetClass))];
  const grades = ["all", "AAA", "AA", "A", "BBB", "BB", "B", "C"];

  let filtered = assets.filter(a =>
    (q === "" || a.name.toLowerCase().includes(q.toLowerCase()) || a.symbol.toLowerCase().includes(q.toLowerCase())) &&
    (klass === "all" || a.assetClass === klass) &&
    (grade === "all" || a.grade === grade)
  );
  filtered = filtered.slice().sort((a, b) => {
    const av = a[sort.k], bv = b[sort.k];
    if (typeof av === "string") return sort.dir * av.localeCompare(bv);
    return sort.dir * (av - bv);
  });

  const tableSort = (k) => () => setSort(s => s.k === k ? { k, dir: -s.dir } : { k, dir: 1 });

  return (
    <div className="page-enter">
      <section style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="mkt-container">
          <div className="mkt-eyebrow">Public · no wallet needed</div>
          <h1 className="mkt-h1 mt-12">Auralis Ratings.</h1>
          <p className="mkt-lede mt-16">Every tokenized real-world asset on Mantle, rated and continuously monitored.</p>
        </div>
      </section>

      <section style={{ paddingBottom: 96 }}>
        <div className="mkt-container">
          <div className="card row gap-12" style={{ padding: 16, flexWrap: "wrap" }}>
            <div className="row gap-8" style={{ flex: 1, minWidth: 200, background: "var(--surface-muted)", borderRadius: 8, padding: "0 12px", height: 36 }}>
              <Icon.Search size={14} color="var(--text-tertiary)" />
              <input className="input" style={{ background: "transparent", border: "none", padding: 0, height: "auto", flex: 1 }}
                placeholder="Search assets…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <select className="select" style={{ width: 180 }} value={klass} onChange={(e) => setKlass(e.target.value)}>
              {classes.map(c => <option key={c} value={c}>{c === "all" ? "All asset classes" : c}</option>)}
            </select>
            <select className="select" style={{ width: 140 }} value={grade} onChange={(e) => setGrade(e.target.value)}>
              {grades.map(c => <option key={c} value={c}>{c === "all" ? "All grades" : c}</option>)}
            </select>
            {(q || klass !== "all" || grade !== "all") && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setQ(""); setKlass("all"); setGrade("all"); }}>Reset</button>
            )}
          </div>

          <div className="fs-12 text-tertiary mt-16">Updated 14m ago · methodology v1.0</div>

          <div className="mt-12">
            <StateWrapper
              status={status === "populated" && filtered.length === 0 ? "empty" : (status === "stale" ? "stale" : status)}
              lastUpdated="14 minutes ago"
              onRetry={load}
              emptyTitle="No assets match these filters"
              emptyAction={<button className="btn btn-secondary btn-sm" onClick={() => { setQ(""); setKlass("all"); setGrade("all"); }}>Reset filters</button>}
              skeleton={<RatingsSkeleton />}
            >
              <div className="card card-flush">
                <table className="t-table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Rating</th>
                      <th onClick={tableSort("riskScore")} style={{ cursor: "pointer" }}>Risk score</th>
                      <th onClick={tableSort("riskAdjustedApy")} style={{ cursor: "pointer" }}>Risk-adj. APY</th>
                      <th onClick={tableSort("tvlUsd")} style={{ cursor: "pointer" }}>TVL</th>
                      <th>30D</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(a => (
                      <tr key={a.id} onClick={() => navigate(`/ratings/${a.id}`)}>
                        <td>
                          <div className="row gap-12">
                            <AssetIcon symbol={a.symbol} size="md" />
                            <div>
                              <div style={{ fontWeight: 500 }}>{a.name}</div>
                              <div className="fs-12 text-tertiary">{a.symbol} · {a.assetClass}</div>
                            </div>
                          </div>
                        </td>
                        <td><RatingSeal grade={a.grade} size="sm" /></td>
                        <td>
                          <div className="row gap-12" style={{ minWidth: 140 }}>
                            <span className="mono">{a.riskScore}</span>
                            <div style={{ flex: 1, height: 6, background: "var(--surface-muted)", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${a.riskScore}%`, background: a.band === "Low" ? "var(--emerald)" : a.band === "Medium" ? "var(--amber)" : "var(--rose)" }} />
                            </div>
                          </div>
                        </td>
                        <td className="mono">{a.riskAdjustedApy.toFixed(2)}%</td>
                        <td className="mono">{fmtUSD(a.tvlUsd, { compact: true })}</td>
                        <td><MiniSpark data={a.priceSeries} width={64} height={20} /></td>
                        <td><a className="text-teal fs-13 fw-500 row gap-4">Details<Icon.ChevronRight size={12} /></a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </StateWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
function RatingsSkeleton() {
  return (
    <div className="card card-flush">
      <div style={{ padding: 12, background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
        <div className="skel" style={{ height: 12, width: 100 }} />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="row gap-16" style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>
          <div className="skel" style={{ width: 32, height: 32, borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <div className="skel" style={{ height: 12, width: "30%" }} />
            <div className="skel mt-8" style={{ height: 10, width: "20%" }} />
          </div>
          <div className="skel" style={{ width: 28, height: 28, borderRadius: "50%" }} />
          <div className="skel" style={{ width: 120, height: 12 }} />
          <div className="skel" style={{ width: 60, height: 12 }} />
          <div className="skel" style={{ width: 64, height: 20 }} />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   PUBLIC RATING DETAIL /ratings/:id
   ============================================================ */
function MktRatingDetail({ navigate, params }) {
  const [status, setStatus] = useState("loading");
  const [a, setA] = useState(null);

  useEffect(() => {
    setStatus("loading");
    window.Auralis.setForceSuccess(true);
    window.Auralis.Services.getRating(params.id).then(d => { setA(d); setStatus("populated"); }).catch(() => setStatus("error"));
  }, [params.id]);

  if (status !== "populated" || !a) {
    return <div className="mkt-container" style={{ paddingTop: 64 }}><StateWrapper status={status} skeleton={<DetailSkeleton />} /></div>;
  }
  const dimRationale = {
    Asset: "Underlying construction is well understood.",
    Issuer: "Issuer holds a strong track record and clear governance.",
    Liquidity: "Primary liquidity is robust; secondary depth on Mantle is moderate.",
    Peg: "Observed deviation over 90 days remains inside ±5bps.",
    Oracle: "Multiple price sources with healthy update cadence.",
    "Smart-contract": "Audited; no incidents in 24 months.",
    Concentration: "Top-3 holder concentration is the primary watch-item.",
  };
  return (
    <div className="page-enter">
      <section style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="mkt-container">
          <a onClick={() => navigate("/ratings")} className="row gap-8 text-secondary fs-13" style={{ cursor: "pointer" }}>
            <Icon.ChevronLeft size={14} />Back to ratings
          </a>
          <div className="row between mt-16" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
            <div className="row gap-20">
              <AssetIcon symbol={a.symbol} size="lg" />
              <div>
                <div className="row gap-12">
                  <h1 className="serif" style={{ fontSize: 36, margin: 0, fontWeight: 460, letterSpacing: "-0.015em" }}>{a.name}</h1>
                  <span className="chip">{a.symbol}</span>
                </div>
                <div className="row gap-8 mt-8">
                  <span className="chip">{a.assetClass}</span>
                  <span className="chip"><span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>Mantle Mainnet</span>
                </div>
                <div className="mt-12 text-secondary" style={{ maxWidth: 620, fontSize: 15 }}>{a.description}</div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <RatingSeal grade={a.grade} size="lg" />
              <div className="caps mt-12">Auralis rating</div>
              <div className="fs-12 text-tertiary">methodology v1.0</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 64 }}>
        <div className="mkt-container grid gap-16" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <KpiStat label="Risk score" value={a.riskScore} format="num" decimals={0} band={a.band} />
          <KpiStat label="Risk-adj. APY" value={a.riskAdjustedApy} format="pct" decimals={2} delta={0.18} />
          <KpiStat label="TVL" value={a.tvlUsd / 1e6} format="num" decimals={1} prefix="$" suffix="M" />
          <KpiStat label="30-day trend" value={a.trend30d} format="pct" decimals={1} delta={a.trend30d} />
        </div>

        {/* Risk breakdown */}
        <div className="mkt-container mt-32">
          <div className="card" style={{ padding: 24 }}>
            <div className="row between mb-16">
              <h3 className="serif" style={{ fontSize: 22, margin: 0 }}>Risk breakdown</h3>
              <span className="chip">7 dimensions</span>
            </div>
            <div className="grid gap-32" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <RiskRadar dimensions={a.dims} size={320} />
              </div>
              <div className="stack gap-12">
                {Object.entries(a.dims).map(([k, v]) => (
                  <div key={k}>
                    <div className="row between">
                      <span style={{ fontWeight: 500 }}>{k}</span>
                      <span className="mono">{v}/100</span>
                    </div>
                    <div style={{ height: 6, background: "var(--surface-muted)", borderRadius: 3, overflow: "hidden", marginTop: 6 }}>
                      <div style={{ height: "100%", width: `${v}%`, background: "var(--teal)" }} />
                    </div>
                    <div className="fs-12 text-tertiary mt-4">{dimRationale[k]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* History + AI summary */}
        <div className="mkt-container grid gap-16 mt-24" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
          <div className="card">
            <div className="row between mb-12">
              <h3 className="serif" style={{ fontSize: 18, margin: 0 }}>Rating history · 30D</h3>
              <span className="chip">Risk score (lower = safer)</span>
            </div>
            <AreaChart data={a.scoreSeries} width={500} height={220} color="var(--teal)" valueFormat={(v) => v.toFixed(0)} />
          </div>
          <div className="card">
            <div className="caps mb-8">AI summary</div>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>{a.rationale}</p>
            <div className="mt-16"><ConfidenceMeter value={86} /></div>
            <div className="fs-13 text-secondary mt-12">
              <span className="text-tertiary">What would change this rating: </span>
              a sustained peg deviation beyond ±10bps over 14 days, or a meaningful change in issuer terms.
            </div>
            <AIProvenance />
          </div>
        </div>

        {/* On-chain proof */}
        <div className="mkt-container grid gap-16 mt-24" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <ProofCard label="Rating proof" hash={a.ratingHash} timestamp="Anchored 8 minutes ago" explorerUrl={window.Auralis.explorerOf(a.ratingHash)} />
          <VerifyWidget hash={a.ratingHash} recordType="rating" />
        </div>

        {/* CTA */}
        <div className="mkt-container mt-32">
          <div className="card" style={{ background: "var(--teal-wash)", borderColor: "transparent", padding: 28 }}>
            <div className="row between" style={{ flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="serif" style={{ fontSize: 22 }}>Connect your wallet to check eligibility for {a.symbol}.</div>
                <div className="text-secondary mt-4">See your verdict, mint an attestation, and add this asset to your portfolio.</div>
              </div>
              <button className="btn btn-primary" onClick={() => navigate("/app")}>Open App<Icon.ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function DetailSkeleton() {
  return (
    <div className="card">
      <div className="skel" style={{ height: 36, width: "40%" }} />
      <div className="skel mt-12" style={{ height: 14, width: "60%" }} />
      <div className="grid gap-12 mt-24" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skel" style={{ height: 88 }} />)}
      </div>
    </div>
  );
}

/* ============================================================
   Simple sub-pages: security, business, docs, faq, company
   ============================================================ */
function MktSimple({ which, navigate }) {
  if (which === "security") {
    return (
      <div className="page-enter mkt-section">
        <div className="mkt-container" style={{ maxWidth: 800 }}>
          <div className="mkt-eyebrow">Security</div>
          <h1 className="mkt-h1 mt-12">Non-custodial by design.</h1>
          <p className="mkt-lede mt-16">Auralis never holds funds and never holds keys. The user approves every action; the agent only advises.</p>
          <h2 className="serif mt-48" style={{ fontSize: 28, margin: 0 }}>The five safety rules</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
            {[
              "One key, used once — no persistent signing key on Auralis servers.",
              "No autonomous execution without explicit approval, ever.",
              "No auto-deploy of new contracts — only audited deployments are wired.",
              "No tight loops — every off-chain agent is rate-limited and cached.",
              "Everything cached & rate-limited — no surprise on-chain bursts.",
            ].map((r, i) => (
              <li key={i} className="row gap-12 card" style={{ padding: 16, marginTop: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 8, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{i + 1}</div>
                <span style={{ fontSize: 15 }}>{r}</span>
              </li>
            ))}
          </ul>
          <h2 className="serif mt-48" style={{ fontSize: 28, margin: 0 }}>Guardrails</h2>
          <p className="mkt-lede mt-12">Seven hard policy limits run before any execution: per-asset cap, per-protocol cap, liquidity floor, slippage limit, confidence floor, cooldown, and a human-approval threshold. Failing any one blocks the action.</p>
          <h2 className="serif mt-48" style={{ fontSize: 28, margin: 0 }}>Responsible disclosure</h2>
          <p className="mkt-lede mt-12">Report a vulnerability at <a className="text-teal" href="#">security@auralis.finance</a>. We respond inside 24 hours.</p>
          <div className="card mt-48" style={{ padding: 20, background: "var(--surface-muted)", boxShadow: "none" }}>
            <div className="caps mb-8">Notice</div>
            <div className="fs-14 text-secondary">Auralis provides risk information, not financial or legal advice. Compliance verdicts are tooling for your own due diligence, not a substitute for it.</div>
          </div>
        </div>
      </div>
    );
  }
  if (which === "business") {
    return (
      <div className="page-enter mkt-section">
        <div className="mkt-container" style={{ maxWidth: 800 }}>
          <div className="mkt-eyebrow">Business model</div>
          <h1 className="mkt-h1 mt-12">Trust asymmetry blocks RWA adoption.</h1>
          <p className="mkt-lede mt-16">Tokenized real-world assets are growing fast. What is missing is a credible, verifiable risk layer. That is what Auralis sells.</p>
          <div className="grid gap-16 mt-32" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { t: "Auralis Intelligence API", sub: "Ratings, eligibility, and risk telemetry by subscription.", icon: <Icon.Database size={20} /> },
              { t: "Premium treasury tier", sub: "Configurable guardrails, white-label, audit log exports.", icon: <Icon.Award size={20} /> },
              { t: "Attestation fees", sub: "Small per-mint fee on on-chain compliance attestations.", icon: <Icon.ShieldCheck size={20} /> },
            ].map(c => (
              <div key={c.t} className="card">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
                <div className="serif mt-16" style={{ fontSize: 18 }}>{c.t}</div>
                <div className="fs-14 text-secondary mt-8">{c.sub}</div>
              </div>
            ))}
          </div>
          <h2 className="serif mt-48" style={{ fontSize: 28, margin: 0 }}>Revenue-first, not token-first.</h2>
          <p className="mkt-lede mt-12">No utility token, no farming, no extractive launch. The business sells a useful product to people who already need it.</p>
        </div>
      </div>
    );
  }
  if (which === "docs") {
    const cards = [
      { t: "Judge Guide", sub: "The shortest path through Auralis for evaluators.", featured: true },
      { t: "Architecture", sub: "How the pieces fit together." },
      { t: "Risk Methodology", sub: "The seven dimensions in detail." },
      { t: "Compliance Framework", sub: "How verdicts are formed." },
      { t: "Agent Design", sub: "ERC-8004 identity, skills, reputation." },
      { t: "Contracts", sub: "Mantle deployments and ABIs." },
      { t: "API", sub: "Intelligence API reference." },
      { t: "Security", sub: "Threat model and disclosure." },
      { t: "Deployment", sub: "Run locally or against testnet." },
    ];
    return (
      <div className="page-enter mkt-section">
        <div className="mkt-container">
          <div className="mkt-eyebrow">Documentation</div>
          <h1 className="mkt-h1 mt-12">Build with Auralis.</h1>
          <p className="mkt-lede mt-16">Specs, references, and guides — start with the Judge Guide if you are here to evaluate.</p>
          <div className="grid gap-16 mt-32" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {cards.map(c => (
              <a key={c.t} className="card card-hover" style={{ padding: 22, background: c.featured ? "var(--teal-wash)" : undefined, borderColor: c.featured ? "transparent" : undefined, cursor: "pointer" }} onClick={() => Toast.push({ title: `Opening doc · ${c.t}`, sub: "Mock — would route to the doc.", kind: "info" })}>
                <div className="row between">
                  <div className="serif" style={{ fontSize: 20 }}>{c.t}</div>
                  <Icon.ArrowRight size={16} color="var(--text-tertiary)" />
                </div>
                <div className="fs-14 text-secondary mt-12">{c.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (which === "faq") {
    const items = [
      ["What is Auralis?", "Auralis is an AI agent that rates tokenized real-world assets, verifies whether your wallet may hold them, and manages a portfolio under hard guardrails — proving every decision on-chain."],
      ["Is it custodial?", "No. Auralis holds no funds and no keys. The user approves every action; the agent advises."],
      ["Is this financial or legal advice?", "No. Auralis provides risk information and compliance tooling. Use it to support your own decisions and due diligence."],
      ["Which assets are supported?", "At launch: USDY, QCDT, mETH, cmETH, USDe, MI4, Aave on Mantle, and Merchant Moe LPs."],
      ["What does it cost?", "Read access is free. The Intelligence API and premium treasury tier are paid. Attestation minting carries a small on-chain fee."],
      ["How do compliance attestations work?", "Auralis evaluates eligibility for your jurisdiction, you mint an attestation, and the result is anchored on Mantle. The attestation is portable."],
      ["What is the Auralis Rating?", "A composite 0–100 risk score and AAA–C letter grade across seven dimensions. Every rating is versioned and verifiable."],
      ["What's on the roadmap?", "More asset classes, deeper simulator scenarios, and a public Intelligence API."],
    ];
    return (
      <div className="page-enter mkt-section">
        <div className="mkt-container" style={{ maxWidth: 800 }}>
          <div className="mkt-eyebrow">Frequently asked</div>
          <h1 className="mkt-h1 mt-12">Questions, answered.</h1>
          <div className="mt-32 stack gap-8">
            {items.map(([q, a], i) => <Faq key={i} q={q} a={a} />)}
          </div>
        </div>
      </div>
    );
  }
  if (which === "company") {
    const team = [
      { name: "Adaeze N.", role: "Founder · Risk", initials: "AN" },
      { name: "Mo H.", role: "Co-founder · Engineering", initials: "MH" },
      { name: "Léa V.", role: "Compliance", initials: "LV" },
      { name: "Jin P.", role: "Quant", initials: "JP" },
      { name: "Sofia K.", role: "Design", initials: "SK" },
    ];
    return (
      <div className="page-enter mkt-section">
        <div className="mkt-container" style={{ maxWidth: 900 }}>
          <div className="mkt-eyebrow">Company</div>
          <h1 className="mkt-h1 mt-12">Managed by code, audited by AI, proven on-chain.</h1>
          <p className="mkt-lede mt-16">We build the infrastructure that makes tokenized real-world assets safe to hold at size. We move slowly on what matters and quickly on what doesn't.</p>
          <h2 className="serif mt-48" style={{ fontSize: 28, margin: 0 }}>Team</h2>
          <div className="grid gap-16 mt-20" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {team.map(m => (
              <div key={m.name} className="card" style={{ padding: 18, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--surface-muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "var(--text-secondary)" }}>{m.initials}</div>
                <div className="mt-12" style={{ fontWeight: 500 }}>{m.name}</div>
                <div className="fs-12 text-tertiary mt-4">{m.role}</div>
              </div>
            ))}
          </div>
          <div className="card mt-48" style={{ padding: 24 }}>
            <div className="caps">Contact</div>
            <div className="row gap-12 mt-12"><Icon.Mail size={16} color="var(--text-tertiary)" /><a className="text-teal">hello@auralis.finance</a></div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ padding: 0 }}>
      <button className="row between" style={{ width: "100%", padding: "18px 22px", textAlign: "left" }} onClick={() => setOpen(!open)}>
        <span style={{ fontWeight: 500, fontSize: 15 }}>{q}</span>
        <span style={{ color: "var(--text-tertiary)", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }}><Icon.ChevronDown size={16} /></span>
      </button>
      {open && <div className="text-secondary" style={{ padding: "0 22px 22px", fontSize: 15, lineHeight: 1.55 }}>{a}</div>}
    </div>
  );
}

Object.assign(window, { MktHeader, MktFooter, MktLanding, MktProduct, MktMethodology, MktRatings, MktRatingDetail, MktSimple });

/* ===== app-pages-1.jsx ===== */
/* ============================================================
   Auralis — App pages (1/2)
   /app onboarding · /app/dashboard · /app/opportunities · /app/opportunities/:id
   ============================================================ */


/* ============================================================
   ONBOARDING /app
   ============================================================ */
function Onboarding({ navigate, onComplete }) {
  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState(null); // wallet name
  const [connecting, setConnecting] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [mode, setMode] = useState("advisory");
  const [risk, setRisk] = useState("Balanced");
  const [drawdown, setDrawdown] = useState("-15% (Moderate)");
  const [liq, setLiq] = useState("Medium · 72h exit");
  const [scanning, setScanning] = useState(false);
  const [scanPct, setScanPct] = useState(0);
  const [scanStep, setScanStep] = useState("");

  const wallets = [
    { id: "metamask", name: "MetaMask", desc: "Browser extension wallet", emoji: "🦊" },
    { id: "wc", name: "WalletConnect", desc: "Mobile wallets via QR", emoji: "🔗" },
    { id: "cb", name: "Coinbase Wallet", desc: "Self-custody wallet", emoji: "🪙" },
    { id: "rabby", name: "Rabby", desc: "DeFi-focused desktop wallet", emoji: "🐰" },
  ];

  const stepDef = [
    { label: "Connect" },
    { label: "Network" },
    { label: "Mode" },
    { label: "Risk profile" },
    { label: "First scan" },
  ];

  const connect = async (id) => {
    setConnecting(true);
    await new Promise(r => setTimeout(r, 800));
    setConnected(id === "metamask" ? "MetaMask" : id === "wc" ? "WalletConnect" : id === "cb" ? "Coinbase Wallet" : id === "rabby" ? "Rabby" : "Email");
    setConnecting(false);
  };
  const verifyNetwork = async () => {
    setVerifying(true);
    await new Promise(r => setTimeout(r, 700));
    setVerified(true);
    setVerifying(false);
  };
  const runScan = async () => {
    setScanning(true);
    await window.Auralis.Services.runComplianceScan(({ pct, step: s }) => { setScanPct(pct); setScanStep(s); });
    setScanning(false);
    onComplete({ mode, risk });
    navigate("/app/dashboard");
  };

  const canNext = (() => {
    if (step === 0) return !!connected;
    if (step === 1) return verified;
    if (step === 4) return false; // step 5 has its own button
    return true;
  })();

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", padding: "48px 24px" }}>
      <div className="row gap-12" style={{ maxWidth: 960, margin: "0 auto 32px", justifyContent: "center" }}>
        <Icon.Brand size={28} />
        <div style={{ fontWeight: 600, fontSize: 18 }}>Auralis Finance</div>
      </div>

      <div className="grid gap-24" style={{ gridTemplateColumns: "1.5fr 1fr", maxWidth: 1100, margin: "0 auto" }}>
        <div className="card" style={{ padding: 32 }}>
          {/* Step indicator */}
          <div className="row gap-12 between" style={{ marginBottom: 28 }}>
            {stepDef.map((s, i) => (
              <div key={i} className="row gap-8" style={{ flex: 1, alignItems: "center" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: i < step ? "var(--teal)" : i === step ? "var(--teal-wash)" : "var(--surface-muted)",
                  color: i < step ? "white" : i === step ? "var(--teal-dark)" : "var(--text-tertiary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, border: i === step ? "2px solid var(--teal)" : "none", flexShrink: 0,
                }}>
                  {i < step ? <Icon.Check size={12} /> : i + 1}
                </div>
                <div className="fs-12" style={{ color: i === step ? "var(--text)" : "var(--text-tertiary)", fontWeight: i === step ? 500 : 400 }}>{s.label}</div>
                {i < stepDef.length - 1 && <div style={{ flex: 1, height: 1, background: i < step ? "var(--teal)" : "var(--border)" }} />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div>
              <h2 className="serif" style={{ fontSize: 28, margin: 0 }}>Connect your wallet</h2>
              <p className="text-secondary mt-8">Pick how you'd like to sign in. You can change this later.</p>
              <div className="grid gap-12 mt-24" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {wallets.map(w => {
                  const isActive = connected === w.name;
                  return (
                    <button key={w.id} className="card card-hover" style={{ padding: 18, textAlign: "left", borderColor: isActive ? "var(--teal)" : undefined, background: isActive ? "var(--teal-wash)" : undefined }} onClick={() => connect(w.id)}>
                      <div className="row gap-12">
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{w.emoji}</div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{w.name}</div>
                          <div className="fs-12 text-tertiary">{w.desc}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="divider mt-24" />
              <button className="card card-hover row between mt-16" style={{ width: "100%", padding: 18, textAlign: "left", borderColor: connected === "Email" ? "var(--teal)" : undefined, background: connected === "Email" ? "var(--teal-wash)" : undefined }} onClick={() => connect("email")}>
                <div className="row gap-12">
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.Mail size={18} /></div>
                  <div>
                    <div style={{ fontWeight: 500 }}>Continue with email</div>
                    <div className="fs-12 text-tertiary">No wallet today — we'll generate one for you.</div>
                  </div>
                </div>
                <Icon.ArrowRight size={14} />
              </button>
              {connecting && <div className="row gap-8 mt-16 text-secondary fs-13"><Spinner />Requesting signature…</div>}
              {connected && !connecting && (
                <div className="card mt-16 row between" style={{ padding: 14, background: "var(--emerald-wash)", borderColor: "transparent", boxShadow: "none" }}>
                  <span className="row gap-8 text-emerald" style={{ fontWeight: 500 }}><Icon.Check size={14} />Connected via {connected}</span>
                  <span className="mono fs-12">0x8a7F…9c3D</span>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="serif" style={{ fontSize: 28, margin: 0 }}>Verify network</h2>
              <p className="text-secondary mt-8">Auralis runs on Mantle. We'll confirm your wallet is on the right chain.</p>
              <div className="card mt-24" style={{ padding: 20 }}>
                <div className="row between">
                  <div className="row gap-12">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon.Network size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>Mantle Mainnet</div>
                      <div className="mono fs-12 text-tertiary">Chain ID 5000</div>
                    </div>
                  </div>
                  {!verified ? (
                    <button className="btn btn-primary btn-sm" onClick={verifyNetwork} disabled={verifying}>
                      {verifying ? <><Spinner />Verifying…</> : "Verify"}
                    </button>
                  ) : (
                    <span className="chip chip-emerald"><Icon.Check size={12} />Verified</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="serif" style={{ fontSize: 28, margin: 0 }}>Choose mode</h2>
              <p className="text-secondary mt-8">How much should Auralis do for you? You can change this any time.</p>
              <div className="grid gap-12 mt-24">
                {[
                  { id: "simulation", t: "Simulation", sub: "Run risk-aware simulations. No funds move.", icon: <Icon.Sliders size={18} /> },
                  { id: "advisory", t: "Advisory", sub: "Get recommendations. You execute every action.", icon: <Icon.Sparkles size={18} /> },
                  { id: "guarded", t: "Guarded Execution", sub: "Auralis executes within your guardrails.", icon: <Icon.ShieldCheck size={18} /> },
                ].map(o => {
                  const active = mode === o.id;
                  return (
                    <button key={o.id} className="card card-hover row between" style={{ padding: 18, textAlign: "left", borderColor: active ? "var(--teal)" : undefined, background: active ? "var(--teal-wash)" : undefined }} onClick={() => setMode(o.id)}>
                      <div className="row gap-12">
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-muted)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal-dark)" }}>{o.icon}</div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{o.t}</div>
                          <div className="fs-13 text-secondary mt-4">{o.sub}</div>
                        </div>
                      </div>
                      {active && <span className="chip chip-teal"><Icon.Check size={12} />Selected</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="serif" style={{ fontSize: 28, margin: 0 }}>Risk profile</h2>
              <p className="text-secondary mt-8">Set the shape of your portfolio. We'll size your guardrails to match.</p>
              <div className="row gap-4 mt-24" style={{ background: "var(--surface-muted)", padding: 4, borderRadius: 10 }}>
                {["Conservative", "Moderate", "Balanced", "Growth", "Aggressive"].map(r => (
                  <button key={r} className="btn btn-sm" style={{
                    flex: 1, background: risk === r ? "var(--surface)" : "transparent",
                    boxShadow: risk === r ? "var(--shadow)" : "none", borderRadius: 6,
                    color: risk === r ? "var(--text)" : "var(--text-secondary)",
                    fontWeight: risk === r ? 500 : 400,
                  }} onClick={() => setRisk(r)}>{r}</button>
                ))}
              </div>
              <div className="grid gap-16 mt-24" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <div className="caps mb-8">Max drawdown</div>
                  <select className="select" value={drawdown} onChange={(e) => setDrawdown(e.target.value)}>
                    <option>-5% (Conservative)</option>
                    <option>-10% (Cautious)</option>
                    <option>-15% (Moderate)</option>
                    <option>-25% (Growth)</option>
                  </select>
                </div>
                <div>
                  <div className="caps mb-8">Liquidity preference</div>
                  <select className="select" value={liq} onChange={(e) => setLiq(e.target.value)}>
                    <option>High · same-day exit</option>
                    <option>Medium · 72h exit</option>
                    <option>Low · &gt; 1 week</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="serif" style={{ fontSize: 28, margin: 0 }}>First compliance scan</h2>
              <p className="text-secondary mt-8">Auralis checks your wallet against sanctions lists and risk heuristics. It takes a moment.</p>
              <div className="card mt-24" style={{ padding: 28, textAlign: "center", background: scanning ? "var(--surface-muted)" : undefined }}>
                {!scanning ? (
                  <>
                    <div style={{ width: 56, height: 56, margin: "0 auto", borderRadius: 14, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon.ShieldCheck size={24} />
                    </div>
                    <div className="serif mt-16" style={{ fontSize: 20 }}>Run my first compliance scan</div>
                    <div className="fs-13 text-secondary mt-8">No seed phrase. No gas for your first check.</div>
                    <button className="btn btn-primary btn-lg mt-20" onClick={runScan}>Start scan<Icon.ArrowRight size={14} /></button>
                  </>
                ) : (
                  <>
                    <div className="row gap-12" style={{ justifyContent: "center" }}>
                      <Spinner size={20} />
                      <span style={{ fontWeight: 500 }}>{scanStep}</span>
                    </div>
                    <div style={{ height: 6, background: "var(--surface)", borderRadius: 3, overflow: "hidden", marginTop: 18 }}>
                      <div style={{ height: "100%", width: `${scanPct}%`, background: "var(--teal)", transition: "width 200ms" }} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step controls */}
          <div className="row between mt-32">
            <button className="btn btn-ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              <Icon.ChevronLeft size={14} />Back
            </button>
            <div className="row gap-12">
              {step < 4 && <button className="btn btn-ghost" onClick={() => { onComplete({ mode, risk }); navigate("/app/dashboard"); }}>Skip setup</button>}
              {step < 4 && (
                <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext}>
                  Next<Icon.ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: live config summary */}
        <aside>
          <div className="card" style={{ padding: 20, position: "sticky", top: 24 }}>
            <div className="caps mb-12">Your configuration</div>
            <ConfigRow label="Wallet" value={connected || "—"} />
            <ConfigRow label="Network" value={verified ? "Mantle Mainnet · 5000" : "—"} />
            <ConfigRow label="Mode" value={step >= 2 ? mode[0].toUpperCase() + mode.slice(1) : "—"} />
            <ConfigRow label="Risk profile" value={step >= 3 ? risk : "—"} />
            <ConfigRow label="Max drawdown" value={step >= 3 ? drawdown : "—"} />
            <ConfigRow label="Liquidity" value={step >= 3 ? liq : "—"} />
            <div className="divider mt-12 mb-12" />
            <div className="caps">Why this matters</div>
            <div className="fs-13 text-secondary mt-8">
              Your mode and risk profile shape every recommendation. Auralis enforces them as hard limits — nothing executes outside.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
function ConfigRow({ label, value }) {
  return (
    <div className="row between" style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
      <span className="text-tertiary">{label}</span>
      <span style={{ fontWeight: 500, color: value === "—" ? "var(--text-tertiary)" : "var(--text)" }}>{value}</span>
    </div>
  );
}

/* ============================================================
   DASHBOARD /app/dashboard
   ============================================================ */
function Dashboard({ navigate }) {
  const [status, setStatus] = useState("loading");
  const [p, setP] = useState(null);
  const [range, setRange] = useState("30D");
  const load = () => {
    setStatus("loading");
    window.Auralis.setForceSuccess(true);
    window.Auralis.Services.getPortfolio().then(d => { setP(d); setStatus("populated"); }).catch(() => setStatus("error"));
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="page-enter">
      <div className="row between mb-24" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Portfolio Dashboard</h1>
          <div className="text-secondary mt-4">Monitor your risk-aware RWA and DeFi allocations on Mantle.</div>
        </div>
        <div className="row gap-12">
          <button className="btn btn-secondary" onClick={() => navigate("/app/compliance")}><Icon.ShieldCheck size={14} />Run scan</button>
          <button className="btn btn-primary" onClick={() => navigate("/app/simulator")}><Icon.Sliders size={14} />Open simulator</button>
        </div>
      </div>

      <StateWrapper status={status} onRetry={load} skeleton={<DashboardSkel />}>
        {p && (
          <>
            {/* KPI row */}
            <div className="grid gap-16" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              <KpiStat label="Total portfolio value" value={p.totalUsd / 1e6} format="num" decimals={2} prefix="$" suffix="M" delta={p.delta30d} />
              <KpiStat label="Blended APY" value={p.blendedApy} format="pct" decimals={2} delta={p.apyDelta} />
              <KpiStat label="Auralis risk score" value={p.riskScore} format="num" decimals={0} band="Low" info="Lower is safer (0–100)" />
              <KpiStat label="Available liquidity" value={p.availableLiquidity / 1e6} format="num" decimals={2} prefix="$" suffix="M" />
            </div>

            {/* Middle row */}
            <div className="grid gap-16 mt-16" style={{ gridTemplateColumns: "1.1fr 1.4fr 1.2fr" }}>
              <div className="card">
                <div className="row between mb-16">
                  <div className="caps">Allocation</div>
                  <span className="chip">3 classes</span>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AllocationDonut segments={p.allocation} total={fmtUSD(p.totalUsd, { compact: true, decimals: 2 })} totalLabel="Total" size={180} thickness={22} />
                </div>
                <div className="stack gap-8 mt-20">
                  {p.allocation.map(s => (
                    <div key={s.label} className="row between fs-13">
                      <div className="row gap-8">
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }}></span>
                        <span>{s.label}</span>
                      </div>
                      <span><span className="mono">{fmtUSD(s.value, { compact: true, decimals: 2 })}</span> <span className="text-tertiary">· {s.pct}%</span></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="row between mb-12">
                  <div>
                    <div className="caps">Performance</div>
                    <div className="row gap-8 mt-4">
                      <span className="serif" style={{ fontSize: 22 }}>+{p.delta30d}%</span>
                      <span className="chip chip-emerald" style={{ fontSize: 11 }}><Icon.ArrowUp size={11} />30D</span>
                    </div>
                  </div>
                  <div className="row gap-4" style={{ background: "var(--surface-muted)", padding: 4, borderRadius: 8 }}>
                    {["7D", "30D", "90D"].map(r => (
                      <button key={r} className="btn btn-sm" style={{ padding: "0 10px", background: range === r ? "var(--surface)" : "transparent", boxShadow: range === r ? "var(--shadow)" : "none", color: range === r ? "var(--text)" : "var(--text-tertiary)" }} onClick={() => setRange(r)}>{r}</button>
                    ))}
                  </div>
                </div>
                <AreaChart data={p.performance} width={500} height={220} valueFormat={(v) => v.toFixed(1)} />
              </div>

              <div className="card" style={{ background: "var(--teal-wash)", borderColor: "transparent" }}>
                <div className="row between">
                  <div className="caps" style={{ color: "var(--teal-dark)" }}>AI Recommendation</div>
                  <span className="chip chip-emerald">High confidence · 86%</span>
                </div>
                <div className="serif mt-12" style={{ fontSize: 20, lineHeight: 1.25 }}>Increase allocation to supervised RWA credit.</div>
                <div className="fs-13 text-secondary mt-12">
                  USDe funding yield has compressed 130bps. A 4% rotation from USDe to USDY + Aave improves your risk-adjusted yield while keeping every guardrail intact.
                </div>
                <div className="row gap-8 mt-16">
                  <button className="btn btn-primary btn-sm" onClick={() => navigate("/app/simulator")}>Review recommendation<Icon.ArrowRight size={14} /></button>
                  <button className="btn btn-ghost btn-sm">Dismiss</button>
                </div>
                <div className="fs-12 text-tertiary mt-12">Generated 2h ago · advisory only</div>
              </div>
            </div>

            {/* Positions */}
            <div className="card card-flush mt-16">
              <div className="row between" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Positions</div>
                  <div className="fs-12 text-tertiary mt-4">{p.positions.length} assets across 4 protocols · updated 2 min ago</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate("/app/opportunities")}><Icon.Plus size={14} />Add position</button>
              </div>
              <table className="t-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Source</th>
                    <th>Value</th>
                    <th>APY</th>
                    <th>Rating</th>
                    <th>Risk</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {p.positions.map(pos => (
                    <tr key={pos.symbol} onClick={() => navigate(`/app/opportunities/${pos.symbol}`)}>
                      <td>
                        <div className="row gap-12">
                          <AssetIcon symbol={pos.symbol} size="md" />
                          <div>
                            <div style={{ fontWeight: 500 }}>{pos.name}</div>
                            <div className="fs-12 text-tertiary">{pos.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-secondary fs-13">{pos.source}</td>
                      <td>
                        <div className="mono">{fmtUSD(pos.value, { compact: true, decimals: 2 })}</div>
                        <div className="fs-12 text-tertiary">{pos.weight}%</div>
                      </td>
                      <td className="mono">{pos.apy.toFixed(2)}%</td>
                      <td><RatingSeal grade={pos.grade} size="sm" /></td>
                      <td><span className={`chip ${pos.band === "Low" ? "chip-emerald" : "chip-amber"}`}>{pos.band}</span></td>
                      <td>
                        <div className="row gap-8" onClick={(e) => e.stopPropagation()}>
                          <button className="btn btn-ghost btn-sm">View</button>
                          <button className="btn btn-ghost btn-sm" style={{ padding: "0 6px" }}><Icon.More size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent decisions + system status */}
            <div className="grid gap-16 mt-16" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
              <div className="card">
                <div className="row between mb-16">
                  <div className="caps">Recent decisions</div>
                  <a onClick={() => navigate("/app/decisions")} className="text-teal fs-13 fw-500" style={{ cursor: "pointer" }}>View all<Icon.ChevronRight size={12} /></a>
                </div>
                {window.Auralis.DECISIONS.slice(0, 4).map(d => (
                  <div key={d.id} className="row between" style={{ padding: "12px 0", borderTop: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{d.action}</div>
                      <div className="fs-12 text-tertiary mt-4">{d.sub} · {d.timeLabel}</div>
                    </div>
                    <div className="row gap-12">
                      <span className={`chip ${d.outcome === "Executed" ? "chip-emerald" : d.outcome === "Rejected" ? "chip-rose" : d.outcome === "Simulated" ? "chip-amber" : "chip-teal"}`}>{d.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="row between mb-12">
                  <div className="caps">System status</div>
                  <span className="chip chip-emerald"><span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>All systems operational</span>
                </div>
                <div className="stack gap-8 mt-12">
                  {[
                    "Rating engine", "Compliance engine", "Mantle RPC", "Price oracles", "On-chain logger",
                  ].map(s => (
                    <div key={s} className="row between fs-13">
                      <span>{s}</span>
                      <span className="chip chip-emerald" style={{ fontSize: 10, padding: "0 8px", height: 18 }}>OK</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </StateWrapper>
    </div>
  );
}
function DashboardSkel() {
  return (
    <div>
      <div className="grid gap-16" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skel" style={{ height: 110 }} />)}
      </div>
      <div className="grid gap-16 mt-16" style={{ gridTemplateColumns: "1fr 1.4fr 1.2fr" }}>
        <div className="skel" style={{ height: 320 }} />
        <div className="skel" style={{ height: 320 }} />
        <div className="skel" style={{ height: 320 }} />
      </div>
      <div className="skel mt-16" style={{ height: 360 }} />
    </div>
  );
}

/* ============================================================
   OPPORTUNITIES /app/opportunities
   ============================================================ */
function Opportunities({ navigate }) {
  const [status, setStatus] = useState("loading");
  const [assets, setAssets] = useState([]);
  const [klass, setKlass] = useState("all");
  const [risk, setRisk] = useState("all");
  const [q, setQ] = useState("");
  const [hidden, setHidden] = useState({});
  const load = () => {
    setStatus("loading");
    window.Auralis.setForceSuccess(true);
    window.Auralis.Services.getRatings().then(d => { setAssets(d); setStatus("populated"); }).catch(() => setStatus("error"));
  };
  useEffect(() => { load(); }, []);

  const fitFor = (a) => a.riskScore <= 30 ? "Strong fit" : a.riskScore <= 45 ? "Good fit" : "Watch";
  const fitChip = (f) => f === "Strong fit" ? "chip-emerald" : f === "Good fit" ? "chip-teal" : "chip-amber";

  const classes = ["all", ...new Set(window.Auralis.ASSETS.map(a => a.assetClass))];
  let filtered = assets.filter(a =>
    (q === "" || a.name.toLowerCase().includes(q.toLowerCase())) &&
    (klass === "all" || a.assetClass === klass) &&
    (risk === "all" || a.band === risk)
  );

  // chart series (multi-asset)
  const series = filtered.slice(0, 5);
  const visible = series.filter(s => !hidden[s.id]);
  const W = 720, H = 260, pad = { l: 36, r: 12, t: 12, b: 28 };

  return (
    <div className="page-enter">
      <div className="row between mb-24" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Opportunities</h1>
          <div className="text-secondary mt-4">Compare DeFi and RWA yield opportunities on Mantle.</div>
        </div>
      </div>

      <div className="card row gap-12 mb-16" style={{ padding: 14, flexWrap: "wrap" }}>
        <div className="row gap-8" style={{ flex: 1, minWidth: 200, background: "var(--surface-muted)", borderRadius: 8, padding: "0 12px", height: 36 }}>
          <Icon.Search size={14} color="var(--text-tertiary)" />
          <input className="input" style={{ background: "transparent", border: "none", padding: 0, height: "auto", flex: 1 }} placeholder="Search opportunities…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="select" style={{ width: 180 }} value={klass} onChange={(e) => setKlass(e.target.value)}>
          {classes.map(c => <option key={c} value={c}>{c === "all" ? "All asset classes" : c}</option>)}
        </select>
        <select className="select" style={{ width: 140 }} value={risk} onChange={(e) => setRisk(e.target.value)}>
          <option value="all">All risk</option><option>Low</option><option>Medium</option><option>High</option>
        </select>
        <select className="select" style={{ width: 140 }}>
          <option>Any liquidity</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
      </div>

      <div className="grid gap-16" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <StateWrapper status={status === "populated" && filtered.length === 0 ? "empty" : status} onRetry={load}
          emptyTitle="No opportunities match these filters"
          emptyAction={<button className="btn btn-secondary btn-sm" onClick={() => { setQ(""); setKlass("all"); setRisk("all"); }}>Reset filters</button>}>
          <div className="card card-flush">
            <table className="t-table">
              <thead>
                <tr><th>Opportunity</th><th>APY</th><th>TVL</th><th>Risk</th><th>Rating</th><th>Fit</th><th></th></tr>
              </thead>
              <tbody>
                {filtered.map(a => {
                  const fit = fitFor(a);
                  return (
                    <tr key={a.id} onClick={() => navigate(`/app/opportunities/${a.id}`)}>
                      <td>
                        <div className="row gap-12">
                          <AssetIcon symbol={a.symbol} size="md" />
                          <div>
                            <div style={{ fontWeight: 500 }}>{a.name}</div>
                            <div className="fs-12 text-tertiary">{a.assetClass}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="mono">{a.nominalApy.toFixed(2)}%</div>
                        <div className="fs-12 text-emerald">+{(a.trend30d).toFixed(1)}%</div>
                      </td>
                      <td className="mono">{fmtUSD(a.tvlUsd, { compact: true })}</td>
                      <td><span className={`chip ${a.band === "Low" ? "chip-emerald" : "chip-amber"}`}>{a.band}</span></td>
                      <td><RatingSeal grade={a.grade} size="sm" /></td>
                      <td><span className={`chip ${fitChip(fit)}`}>{fit}</span></td>
                      <td>
                        <div className="row gap-8" onClick={(e) => e.stopPropagation()}>
                          <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/app/opportunities/${a.id}`)}>View</button>
                          <button className="btn btn-ghost btn-sm" style={{ padding: "0 6px" }}><Icon.More size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="card mt-16">
            <div className="row between mb-12">
              <div className="caps">Yield trends · 30D</div>
              <div className="row gap-8" style={{ flexWrap: "wrap" }}>
                {series.map(s => (
                  <button key={s.id} className="chip" style={{ background: hidden[s.id] ? "var(--surface-muted)" : "var(--teal-wash)", color: hidden[s.id] ? "var(--text-tertiary)" : "var(--teal-dark)", border: "1px solid transparent", cursor: "pointer" }} onClick={() => setHidden(h => ({ ...h, [s.id]: !h[s.id] }))}>
                    {s.symbol}
                  </button>
                ))}
              </div>
            </div>
            <MultiLineChart series={visible} width={W} height={H} padding={pad} />
          </div>
        </StateWrapper>

        <div className="stack gap-16">
          <div className="card">
            <div className="caps mb-12">Suggested for this portfolio</div>
            {window.Auralis.ASSETS.slice(0, 3).map(a => (
              <div key={a.id} className="row between" style={{ padding: "12px 0", borderTop: "1px solid var(--border)" }} onClick={() => navigate(`/app/opportunities/${a.id}`)}>
                <div className="row gap-12">
                  <AssetIcon symbol={a.symbol} size="md" />
                  <div>
                    <div style={{ fontWeight: 500 }}>{a.name}</div>
                    <div className="fs-12 text-tertiary">Fits your {a.band.toLowerCase()}-risk profile</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="mono">{a.riskAdjustedApy.toFixed(2)}%</div>
                  <div className="fs-12 text-tertiary">risk-adj.</div>
                </div>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm mt-12" style={{ width: "100%" }} onClick={() => navigate("/app/copilot")}><Icon.Sparkles size={14} />Ask Copilot for more</button>
          </div>

          <div className="card" style={{ background: "var(--surface-muted)", boxShadow: "none" }}>
            <div className="caps">Tip</div>
            <div className="fs-14 mt-8">Click any opportunity to add it to your <a onClick={() => navigate("/app/simulator")} className="text-teal" style={{ cursor: "pointer", fontWeight: 500 }}>simulator</a> before committing.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function MultiLineChart({ series, width = 720, height = 260, padding = { l: 36, r: 12, t: 12, b: 28 } }) {
  if (!series || series.length === 0) {
    return <div className="text-tertiary fs-13" style={{ padding: 32, textAlign: "center" }}>Toggle a series above to see trends.</div>;
  }
  const cw = width - padding.l - padding.r;
  const ch = height - padding.t - padding.b;
  const allVs = series.flatMap(s => s.priceSeries.map(p => p.v / s.priceSeries[0].v));
  const min = Math.min(...allVs), max = Math.max(...allVs);
  const span = max - min || 1;
  const x = (i, n) => padding.l + (i / (n - 1)) * cw;
  const y = (v) => padding.t + ch - ((v - min) / span) * ch;
  const COLORS = ["#0E9E8C", "#1F58A8", "#D9870B", "#5340A4", "#19794A"];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map(p => {
        const v = min + span * p;
        return <line key={p} x1={padding.l} x2={width - padding.r} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeDasharray="2 4" />;
      })}
      {series.map((s, i) => {
        const n = s.priceSeries.length;
        const norm = s.priceSeries.map(p => p.v / s.priceSeries[0].v);
        const path = norm.map((v, j) => `${j === 0 ? "M" : "L"} ${x(j, n)} ${y(v)}`).join(" ");
        return <path key={s.id} d={path} fill="none" stroke={COLORS[i % COLORS.length]} strokeWidth="1.6" />;
      })}
    </svg>
  );
}

/* ============================================================
   ASSET DETAIL /app/opportunities/:id
   ============================================================ */
function AssetDetail({ params, navigate }) {
  const [status, setStatus] = useState("loading");
  const [a, setA] = useState(null);
  const [range, setRange] = useState("30D");
  const load = () => {
    setStatus("loading");
    window.Auralis.setForceSuccess(true);
    window.Auralis.Services.getRating(params.id).then(d => { setA(d); setStatus("populated"); }).catch(() => setStatus("error"));
  };
  useEffect(() => { load(); }, [params.id]);

  return (
    <div className="page-enter">
      <a onClick={() => navigate("/app/opportunities")} className="row gap-8 text-secondary fs-13 mb-16" style={{ cursor: "pointer" }}>
        <Icon.ChevronLeft size={14} />Back to opportunities
      </a>
      <StateWrapper status={status} onRetry={load}>
        {a && (
          <>
            <div className="card mb-16">
              <div className="row between" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
                <div className="row gap-20">
                  <AssetIcon symbol={a.symbol} size="lg" />
                  <div>
                    <div className="row gap-12">
                      <h1 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 460 }}>{a.name}</h1>
                      <span className="chip">{a.symbol}</span>
                    </div>
                    <div className="row gap-8 mt-8">
                      <span className="chip">{a.assetClass}</span>
                      <span className="chip"><span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>Mantle Mainnet</span>
                    </div>
                    <div className="mt-12 text-secondary fs-14" style={{ maxWidth: 620 }}>{a.description}</div>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <RatingSeal grade={a.grade} size="lg" />
                  <div className="caps mt-8">Auralis rating</div>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid gap-16" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              <KpiStat label="Current APY" value={a.nominalApy} format="pct" decimals={2} delta={a.trend30d} />
              <KpiStat label="Current allocation" value={a.symbol === "mETH" ? 31.7 : 0} format="pct" decimals={1} info="% of your portfolio" />
              <KpiStat label="Available liquidity" value={a.tvlUsd / 1e6 * 0.2} format="num" decimals={1} prefix="$" suffix="M" />
              <KpiStat label="Risk score" value={a.riskScore} format="num" decimals={0} band={a.band} />
            </div>

            {/* Middle */}
            <div className="grid gap-16 mt-16" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
              <div className="card">
                <div className="row between mb-12">
                  <div className="caps">Performance · 30D</div>
                  <div className="row gap-4" style={{ background: "var(--surface-muted)", padding: 4, borderRadius: 8 }}>
                    {["7D", "30D", "90D"].map(r => (
                      <button key={r} className="btn btn-sm" style={{ padding: "0 10px", background: range === r ? "var(--surface)" : "transparent", boxShadow: range === r ? "var(--shadow)" : "none", color: range === r ? "var(--text)" : "var(--text-tertiary)" }} onClick={() => setRange(r)}>{r}</button>
                    ))}
                  </div>
                </div>
                <AreaChart data={a.priceSeries} valueFormat={(v) => v.toFixed(2)} width={520} height={220} />
              </div>
              <div className="card">
                <div className="caps mb-16">Yield composition</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AllocationDonut segments={a.yieldComposition.map(y => ({ ...y, value: 0 }))} total={`${a.nominalApy.toFixed(2)}%`} totalLabel="APY" size={170} thickness={20} />
                </div>
                <div className="stack gap-8 mt-16">
                  {a.yieldComposition.map(y => (
                    <div key={y.label} className="row between fs-13">
                      <div className="row gap-8">
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: y.color }}></span>
                        <span>{y.label}</span>
                      </div>
                      <span className="mono">{y.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk breakdown */}
            <div className="card mt-16">
              <div className="row between mb-16">
                <h3 className="serif" style={{ fontSize: 20, margin: 0 }}>Risk breakdown</h3>
                <span className="chip">7 dimensions</span>
              </div>
              <div className="grid gap-32" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <RiskRadar dimensions={a.dims} size={300} />
                </div>
                <div className="stack gap-12">
                  {Object.entries(a.dims).map(([k, v]) => (
                    <div key={k}>
                      <div className="row between">
                        <span style={{ fontWeight: 500 }}>{k}</span>
                        <span className="mono fs-13">{v}/100</span>
                      </div>
                      <div style={{ height: 5, background: "var(--surface-muted)", borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${v}%`, background: "var(--teal)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI + Actions */}
            <div className="grid gap-16 mt-16" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
              <div className="card" style={{ background: "var(--teal-wash)", borderColor: "transparent" }}>
                <div className="row between">
                  <div className="caps" style={{ color: "var(--teal-dark)" }}>AI view</div>
                  <ConfidenceMeter value={84} compact />
                </div>
                <div className="serif mt-12" style={{ fontSize: 22 }}>Hold exposure.</div>
                <div className="fs-14 text-secondary mt-12">{a.rationale}</div>
                <div className="row gap-8 mt-16">
                  <button className="btn btn-secondary btn-sm">Review recommendation</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate("/app/simulator")}>Open simulator</button>
                </div>
                <AIProvenance />
              </div>

              <div className="card">
                <div className="caps mb-12">Actions</div>
                <div className="stack gap-8">
                  <button className="btn btn-secondary" onClick={() => navigate("/app/simulator")}><Icon.Sliders size={14} />Add to simulator</button>
                  <button className="btn btn-secondary"><Icon.Layers size={14} />Set exposure cap</button>
                  <button className="btn btn-secondary" onClick={() => navigate("/app/compliance")}><Icon.ShieldCheck size={14} />Run eligibility check</button>
                  <a className="btn btn-secondary" href={window.Auralis.explorerOf(a.ratingHash)} target="_blank" rel="noreferrer"><Icon.External size={14} />View on Mantle Explorer</a>
                  <TxButton label="Anchor rating on-chain" action={window.Auralis.Services.anchorRating} icon={<Icon.Hash size={14} />} />
                </div>
              </div>
            </div>

            {/* Where it is used */}
            {a.usedBy.length > 0 && (
              <div className="card mt-16">
                <div className="row between mb-12">
                  <div className="caps">Where it's used</div>
                  <span className="chip">{a.usedBy.length} venues</span>
                </div>
                {a.usedBy.map(u => (
                  <div key={u.name} className="row between" style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontWeight: 500 }}>{u.name}</span>
                    <span><span className="mono">{fmtUSD(u.value, { compact: true })}</span> <span className="text-tertiary fs-12">· {u.pct}%</span></span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid gap-16 mt-16" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <ProofCard hash={a.ratingHash} timestamp="Anchored 8 minutes ago" explorerUrl={window.Auralis.explorerOf(a.ratingHash)} />
              <VerifyWidget hash={a.ratingHash} />
            </div>
          </>
        )}
      </StateWrapper>
    </div>
  );
}

Object.assign(window, { Onboarding, Dashboard, Opportunities, AssetDetail, MultiLineChart });

/* ===== app-pages-2.jsx ===== */
/* ============================================================
   Auralis — App pages (2/2)
   /app/compliance · /app/simulator · /app/copilot · /app/decisions
   /app/policies · /app/agent · /app/integrations · /app/settings
   ============================================================ */


/* ============================================================
   COMPLIANCE /app/compliance — 4 tabs
   ============================================================ */
function Compliance({ navigate }) {
  const [tab, setTab] = useState("scan");
  const tabs = [
    { id: "scan", label: "Wallet Scan", icon: <Icon.ShieldCheck size={14} /> },
    { id: "matrix", label: "Eligibility Matrix", icon: <Icon.Boxes size={14} /> },
    { id: "report", label: "Report", icon: <Icon.FileText size={14} /> },
    { id: "attest", label: "Attestations", icon: <Icon.Award size={14} /> },
  ];
  return (
    <div className="page-enter">
      <div className="mb-24">
        <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Compliance & Eligibility</h1>
        <div className="text-secondary mt-4">Screen your wallet, check eligibility per jurisdiction, and mint portable attestations.</div>
      </div>

      <div className="card mb-16 row gap-12" style={{ padding: "12px 16px", background: "var(--amber-wash)", borderColor: "transparent", boxShadow: "none" }}>
        <Icon.Info size={16} color="var(--amber)" />
        <span className="fs-13" style={{ color: "#8a5a1f" }}>
          Auralis provides compliance tooling and risk information, not legal advice.
        </span>
      </div>

      <div className="card-flush card mb-16" style={{ padding: 6, background: "var(--surface)" }}>
        <div className="row gap-4">
          {tabs.map(t => (
            <button key={t.id} className="row gap-8" onClick={() => setTab(t.id)} style={{
              padding: "10px 16px", borderRadius: 8, fontSize: 14,
              background: tab === t.id ? "var(--teal-wash)" : "transparent",
              color: tab === t.id ? "var(--teal-dark)" : "var(--text-secondary)",
              fontWeight: tab === t.id ? 500 : 400,
            }}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "scan" && <ComplianceScan navigate={navigate} />}
      {tab === "matrix" && <ComplianceMatrix />}
      {tab === "report" && <ComplianceReport setTab={setTab} />}
      {tab === "attest" && <ComplianceAttest />}
    </div>
  );
}

function ComplianceScan() {
  const [state, setState] = useState("ready"); // ready | running | done
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState("");
  const [result, setResult] = useState(window.Auralis.COMPLIANCE.walletScreen);
  const [expanded, setExpanded] = useState(new Set([3])); // pre-expand the warn item

  const run = async () => {
    setState("running"); setPct(0);
    await window.Auralis.Services.runComplianceScan(({ pct, step: s }) => { setPct(pct); setStep(s); });
    setState("done");
    Toast.push({ title: "Scan complete", sub: "Wallet cleared with 1 minor flag.", kind: "success" });
  };

  return (
    <div className="grid gap-16" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
      <div>
        {state === "running" ? (
          <div className="card" style={{ padding: 32, textAlign: "center" }}>
            <div className="row gap-12" style={{ justifyContent: "center" }}>
              <Spinner size={18} />
              <span style={{ fontWeight: 500 }}>{step}</span>
            </div>
            <div style={{ height: 6, background: "var(--surface-muted)", borderRadius: 3, overflow: "hidden", marginTop: 18 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "var(--teal)", transition: "width 200ms" }} />
            </div>
            <div className="mt-12 fs-12 text-tertiary">{Math.round(pct)}%</div>
          </div>
        ) : (
          <div className="card">
            <div className="row between">
              <div>
                <div className="caps">Last scan</div>
                <div className="serif mt-4" style={{ fontSize: 20 }}>{result.summary}</div>
                <div className="fs-12 text-tertiary mt-4">Ran {result.runAt}</div>
              </div>
              <button className="btn btn-primary" onClick={run}><Icon.Refresh size={14} />Re-scan</button>
            </div>
            <div className="divider mt-20" />
            <div className="caps mt-20 mb-12">Findings</div>
            <div className="stack gap-8">
              {result.checks.map((c, i) => {
                const isOpen = expanded.has(i);
                const chip = c.verdict === "pass" ? "chip-emerald" : c.verdict === "warn" ? "chip-amber" : "chip-rose";
                const label = c.verdict === "pass" ? "Pass" : c.verdict === "warn" ? "Warn" : "Fail";
                return (
                  <div key={i} className="card" style={{ padding: 14, boxShadow: "none" }}>
                    <button className="row between" style={{ width: "100%" }} onClick={() => {
                      const n = new Set(expanded); n.has(i) ? n.delete(i) : n.add(i); setExpanded(n);
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{c.label}</span>
                      <span className="row gap-8">
                        <span className={`chip ${chip}`}>{label}</span>
                        <span className="text-tertiary" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 150ms" }}><Icon.ChevronDown size={14} /></span>
                      </span>
                    </button>
                    {isOpen && c.detail && <div className="fs-13 text-secondary mt-12">{c.detail}</div>}
                    {isOpen && !c.detail && <div className="fs-13 text-secondary mt-12">No matches against the {c.label.toLowerCase()}.</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="stack gap-16">
        <div className="card" style={{ background: "var(--teal-wash)", borderColor: "transparent" }}>
          <div className="caps" style={{ color: "var(--teal-dark)" }}>What happens here</div>
          <div className="fs-14 mt-8" style={{ lineHeight: 1.55 }}>
            Auralis runs your connected wallet through sanctions lists, mixer-interaction heuristics, and the on-chain counterparty graph. The result is yours — anchor it, share it, or use it inside the matrix.
          </div>
        </div>
        <div className="card">
          <div className="caps mb-8">Connected wallet</div>
          <div className="row between">
            <span className="mono fs-13">0x8a7F…9c3D</span>
            <CopyButton text="0x8a7F9d1B4eA6...9c3D" />
          </div>
          <div className="caps mt-16 mb-8">Jurisdiction</div>
          <div className="row gap-8"><Icon.Globe size={14} color="var(--text-tertiary)" /><span style={{ fontWeight: 500 }}>Nigeria · NG</span></div>
          <div className="fs-12 text-tertiary mt-4">Change in Settings.</div>
        </div>
      </div>
    </div>
  );
}

function ComplianceMatrix() {
  const [selected, setSelected] = useState(null);
  const matrix = window.Auralis.COMPLIANCE.matrix;
  return (
    <div className="grid gap-16" style={{ gridTemplateColumns: selected ? "1.4fr 1fr" : "1fr" }}>
      <div className="card card-flush">
        <div className="row between" style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>
          <div>
            <div style={{ fontWeight: 500 }}>Eligibility matrix · jurisdiction NG</div>
            <div className="fs-12 text-tertiary mt-4">8 assets · confidence values are AI-estimated</div>
          </div>
          <span className="chip"><Icon.Refresh size={12} />Just refreshed</span>
        </div>
        <table className="t-table">
          <thead>
            <tr><th>Asset</th><th>Class</th><th>Verdict</th><th>Reasons</th><th>Confidence</th></tr>
          </thead>
          <tbody>
            {matrix.map(row => {
              const a = window.Auralis.ASSETS.find(x => x.id === row.assetId);
              return (
                <tr key={row.assetId} onClick={() => setSelected(row)}>
                  <td>
                    <div className="row gap-12">
                      <AssetIcon symbol={a.symbol} size="md" />
                      <div>
                        <div style={{ fontWeight: 500 }}>{a.name}</div>
                        <div className="fs-12 text-tertiary">{a.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-secondary fs-13">{a.assetClass}</td>
                  <td><EligibilityChip verdict={row.verdict} /></td>
                  <td className="fs-13 text-secondary" style={{ maxWidth: 320 }}>{row.reasons[0]}</td>
                  <td><ConfidenceMeter value={row.confidence} compact label={false} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="card page-enter">
          <button className="btn btn-ghost btn-sm mb-12" onClick={() => setSelected(null)}><Icon.X size={14} />Close</button>
          {(() => {
            const a = window.Auralis.ASSETS.find(x => x.id === selected.assetId);
            return (
              <>
                <div className="row gap-12">
                  <AssetIcon symbol={a.symbol} size="lg" />
                  <div>
                    <div className="serif" style={{ fontSize: 20 }}>{a.name}</div>
                    <div className="fs-12 text-tertiary">{a.assetClass}</div>
                  </div>
                </div>
                <div className="mt-16"><EligibilityChip verdict={selected.verdict} /></div>
                <div className="caps mt-20 mb-8">Cited reasons</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {selected.reasons.map((r, i) => (
                    <li key={i} className="row gap-8" style={{ padding: "8px 0", fontSize: 14 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-tertiary)", marginTop: 8 }}></span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <div className="caps mt-16 mb-8">AI confidence</div>
                <ConfidenceMeter value={selected.confidence} />
                <AIProvenance />
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function ComplianceReport({ setTab }) {
  return (
    <div className="card" style={{ padding: 32, maxWidth: 880 }}>
      <div className="row between">
        <div>
          <div className="caps">Auralis · compliance report</div>
          <h2 className="serif mt-4" style={{ fontSize: 26, margin: 0 }}>Wallet 0x8a7F…9c3D</h2>
        </div>
        <div className="row gap-8">
          <button className="btn btn-secondary btn-sm" onClick={() => Toast.push({ title: "Report exported", sub: "PDF · 4 pages", kind: "success" })}><Icon.FileText size={14} />Export PDF</button>
          <button className="btn btn-primary btn-sm" onClick={() => setTab("attest")}><Icon.Award size={14} />Mint attestation</button>
        </div>
      </div>
      <div className="divider mt-20" />

      <div className="grid gap-16 mt-20" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <ReportField k="Wallet" v={<span className="mono">0x8a7F…9c3D</span>} />
        <ReportField k="Jurisdiction" v="Nigeria · NG" />
        <ReportField k="Methodology" v="v1.0" />
        <ReportField k="Generated" v="Just now" />
      </div>

      <div className="caps mt-32 mb-8">Wallet screen summary</div>
      <div className="card" style={{ padding: 16, background: "var(--surface-muted)", boxShadow: "none" }}>
        Wallet cleared. One minor counterparty-exposure flag (severity: minor) — see Wallet Scan.
      </div>

      <div className="caps mt-24 mb-12">Per-asset verdicts</div>
      <div className="card" style={{ padding: 0, boxShadow: "none", border: "1px solid var(--border)" }}>
        {window.Auralis.COMPLIANCE.matrix.map((r, i) => {
          const a = window.Auralis.ASSETS.find(x => x.id === r.assetId);
          return (
            <div key={r.assetId} className="row between" style={{ padding: "12px 16px", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
              <div className="row gap-12">
                <AssetIcon symbol={a.symbol} size="sm" />
                <span style={{ fontWeight: 500 }}>{a.name}</span>
                <span className="text-tertiary fs-12">· {a.assetClass}</span>
              </div>
              <EligibilityChip verdict={r.verdict} />
            </div>
          );
        })}
      </div>

      <div className="card mt-24" style={{ padding: 14, background: "var(--surface-muted)", boxShadow: "none" }}>
        <div className="fs-12 text-secondary">
          This report reflects Auralis methodology v1.0. Reasons are derived from issuer terms, jurisdiction restrictions, and protocol parameters as of the timestamp above. Auralis provides compliance tooling and risk information, not legal advice.
        </div>
      </div>
    </div>
  );
}
function ReportField({ k, v }) {
  return (
    <div>
      <div className="caps">{k}</div>
      <div className="mt-4" style={{ fontWeight: 500 }}>{v}</div>
    </div>
  );
}

function ComplianceAttest() {
  const [items, setItems] = useState(window.Auralis.COMPLIANCE.attestations);
  const [showMint, setShowMint] = useState(false);
  const [klass, setKlass] = useState("Liquid Staking");
  const [verdict, setVerdict] = useState("Eligible");
  const [period, setPeriod] = useState("90 days");

  const onMinted = (r) => {
    setItems(it => [{ id: `att-00${it.length + 1}`, assetClass: klass, verdict, validUntil: "2026-09-01", hash: r.txHash }, ...it]);
    setShowMint(false);
  };

  return (
    <div>
      <div className="row between mb-16">
        <div>
          <h3 style={{ margin: 0, fontWeight: 500 }}>Minted attestations</h3>
          <div className="fs-12 text-tertiary mt-4">{items.length} active · gasless first mint</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowMint(true)}><Icon.Plus size={14} />Mint new attestation</button>
      </div>

      <div className="card card-flush">
        <table className="t-table">
          <thead>
            <tr><th>Asset class</th><th>Verdict</th><th>Valid until</th><th>On-chain proof</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(att => (
              <tr key={att.id}>
                <td style={{ fontWeight: 500 }}>{att.assetClass}</td>
                <td><EligibilityChip verdict={att.verdict === "Eligible" ? "ELIGIBLE" : att.verdict === "Restricted" ? "RESTRICTED" : "DENIED"} /></td>
                <td className="mono fs-13">{att.validUntil}</td>
                <td>
                  <div className="row gap-8">
                    <span className="mono fs-12">{window.Auralis.truncate(att.hash, 8, 6)}</span>
                    <CopyButton text={att.hash} />
                    <a href={window.Auralis.explorerOf(att.hash)} target="_blank" rel="noreferrer" className="text-teal"><Icon.External size={14} /></a>
                  </div>
                </td>
                <td><button className="btn btn-ghost btn-sm" style={{ color: "var(--rose)" }} onClick={() => setItems(items.filter(x => x.id !== att.id))}>Revoke</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showMint && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(11,18,32,0.4)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowMint(false)}>
          <div className="card" onClick={(e) => e.stopPropagation()} style={{ width: 460, padding: 24 }}>
            <div className="row between">
              <h3 className="serif" style={{ margin: 0, fontSize: 20 }}>Mint compliance attestation</h3>
              <button onClick={() => setShowMint(false)}><Icon.X size={16} /></button>
            </div>
            <div className="caps mt-20 mb-8">Asset class</div>
            <select className="select" value={klass} onChange={(e) => setKlass(e.target.value)}>
              {["Treasury RWA", "Liquid Staking", "Synthetic Dollar", "Lending"].map(o => <option key={o}>{o}</option>)}
            </select>
            <div className="caps mt-16 mb-8">Verdict</div>
            <select className="select" value={verdict} onChange={(e) => setVerdict(e.target.value)}>
              {["Eligible", "Restricted", "Denied"].map(o => <option key={o}>{o}</option>)}
            </select>
            <div className="caps mt-16 mb-8">Validity period</div>
            <select className="select" value={period} onChange={(e) => setPeriod(e.target.value)}>
              {["30 days", "90 days", "180 days"].map(o => <option key={o}>{o}</option>)}
            </select>
            <div className="card mt-20" style={{ padding: 14, background: "var(--teal-wash)", borderColor: "transparent", boxShadow: "none" }}>
              <div className="fs-13" style={{ color: "var(--teal-dark)", fontWeight: 500 }}>Your first attestation is gasless.</div>
              <div className="fs-12 text-secondary mt-4">Auralis covers the on-chain fee for the first attestation per wallet.</div>
            </div>
            <div className="row gap-8 mt-20" style={{ justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setShowMint(false)}>Cancel</button>
              <TxButton label="Mint attestation" icon={<Icon.Award size={14} />} action={() => window.Auralis.Services.mintAttestation({ assetClass: klass, verdict })} onConfirmed={onMinted} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SIMULATOR /app/simulator
   ============================================================ */
function Simulator({ navigate }) {
  const portfolio = window.Auralis.PORTFOLIO;
  const [scenario, setScenario] = useState("base");
  const [targets, setTargets] = useState(() => Object.fromEntries(portfolio.positions.map(p => [p.symbol, p.weight])));

  // scenario shifts
  const scenarioShifts = {
    base: 0,
    stress: 1,
    conservative: -1,
  };
  useEffect(() => {
    // when scenario changes, modify proposed weights
    const shift = scenarioShifts[scenario];
    if (shift === 0) return;
    setTargets(prev => {
      const cp = { ...prev };
      // Shift defensive assets up/down
      if (scenario === "stress") {
        cp.USDC = (cp.USDC || 0) + 4;
        cp.USDe = Math.max(0, (cp.USDe || 0) - 3);
        cp.MMOE = Math.max(0, (cp.MMOE || 0) - 1);
      } else if (scenario === "conservative") {
        cp.USDY = (cp.USDY || 0) + 3;
        cp.USDe = Math.max(0, (cp.USDe || 0) - 2);
        cp.MMOE = Math.max(0, (cp.MMOE || 0) - 1);
      }
      return cp;
    });
  }, [scenario]);

  const total = Object.values(targets).reduce((s, v) => s + v, 0);
  const valid = Math.abs(total - 100) < 0.5;

  const setW = (sym, v) => setTargets(t => ({ ...t, [sym]: Math.max(0, v) }));

  // Compute proposed allocation by class (just for the donut morph)
  const proposedAllocByClass = useMemo(() => {
    const map = { DeFi: 0, RWA: 0, Stablecoins: 0 };
    portfolio.positions.forEach(p => {
      const w = targets[p.symbol] || 0;
      if (p.symbol === "USDC") map.Stablecoins += w;
      else if (p.symbol === "USDY") map.RWA += w;
      else if (p.symbol === "USDe") map.Stablecoins += w; // synthetic dollar tracked with stables
      else map.DeFi += w;
    });
    const colors = { DeFi: "#0E9E8C", RWA: "#1F58A8", Stablecoins: "#8C97A8" };
    return Object.entries(map).map(([label, pct]) => ({ label, pct, color: colors[label], value: 0 }));
  }, [targets]);

  // mock impact
  const apyDelta = ((targets.USDY - 21.5) * 0.04 + (targets.USDe - 11.9) * 0.05 + (targets.USDC - 9.7) * -0.02);
  const riskDelta = -((targets.USDY - 21.5) * 0.15 + (targets.USDC - 9.7) * 0.2 - (targets.USDe - 11.9) * 0.3);
  const liquidityImpact = (targets.USDC - 9.7) * 18000;
  const estCost = Math.abs((targets.USDe - 11.9)) * 280 + Math.abs((targets.USDY - 21.5)) * 200 + 200;

  const [showApproval, setShowApproval] = useState(false);

  return (
    <div className="page-enter">
      <div className="row between mb-24" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Simulator</h1>
          <div className="text-secondary mt-4">Model rebalances before execution. Nothing here moves funds.</div>
        </div>
        <div className="row gap-4" style={{ background: "var(--surface-muted)", padding: 4, borderRadius: 10 }}>
          {[{ id: "base", l: "Base case" }, { id: "stress", l: "Stress case" }, { id: "conservative", l: "Conservative" }].map(s => (
            <button key={s.id} className="btn btn-sm" style={{ padding: "0 12px", background: scenario === s.id ? "var(--surface)" : "transparent", boxShadow: scenario === s.id ? "var(--shadow)" : "none", color: scenario === s.id ? "var(--text)" : "var(--text-tertiary)" }} onClick={() => setScenario(s.id)}>{s.l}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-16 mb-16" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <DonutCard title="Current portfolio" value={fmtUSD(portfolio.totalUsd, { compact: true, decimals: 2 })} apy={portfolio.blendedApy} segments={portfolio.allocation} />
        <DonutCard title="Proposed portfolio" value={fmtUSD(portfolio.totalUsd, { compact: true, decimals: 2 })} apy={portfolio.blendedApy + apyDelta} apyDelta={apyDelta} segments={proposedAllocByClass} proposed />
      </div>

      <div className="grid gap-16" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div className="card card-flush">
          <div className="row between" style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontWeight: 500 }}>Rebalance adjustments</div>
            <div className="row gap-8">
              <span className={`chip ${valid ? "chip-emerald" : "chip-rose"}`}>Total {total.toFixed(1)}%</span>
              {!valid && <span className="fs-12 text-rose">Must equal 100%</span>}
            </div>
          </div>
          <table className="t-table">
            <thead>
              <tr><th>Asset</th><th>Current %</th><th>Target %</th><th>Δ</th><th style={{ minWidth: 220 }}>Slider</th><th></th></tr>
            </thead>
            <tbody>
              {portfolio.positions.map(p => {
                const cur = p.weight, tgt = targets[p.symbol] || 0;
                const d = tgt - cur;
                return (
                  <tr key={p.symbol} style={{ cursor: "default" }}>
                    <td>
                      <div className="row gap-12">
                        <AssetIcon symbol={p.symbol} size="sm" />
                        <span style={{ fontWeight: 500 }}>{p.symbol}</span>
                      </div>
                    </td>
                    <td className="mono">{cur.toFixed(1)}%</td>
                    <td className="mono">{tgt.toFixed(1)}%</td>
                    <td>
                      <span className={`chip ${d > 0.1 ? "chip-emerald" : d < -0.1 ? "chip-rose" : ""}`}>
                        {d >= 0 ? "+" : ""}{d.toFixed(1)}%
                      </span>
                    </td>
                    <td>
                      <input type="range" min="0" max="50" step="0.1" value={tgt}
                        onChange={(e) => setW(p.symbol, parseFloat(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--teal)" }} />
                    </td>
                    <td>
                      <input type="number" min="0" max="100" step="0.1" value={tgt.toFixed(1)} onChange={(e) => setW(p.symbol, parseFloat(e.target.value) || 0)}
                        className="input" style={{ width: 72, height: 28, padding: "0 8px" }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="stack gap-16">
          <div className="card">
            <div className="caps mb-12">Impact</div>
            <ImpactRow label="Est. APY change" value={`${apyDelta >= 0 ? "+" : ""}${apyDelta.toFixed(2)}%`} pos={apyDelta >= 0} />
            <ImpactRow label="Risk-score change" value={`${riskDelta >= 0 ? "+" : ""}${riskDelta.toFixed(1)}`} pos={riskDelta <= 0} />
            <ImpactRow label="Liquidity impact" value={`${liquidityImpact >= 0 ? "+" : ""}${fmtUSD(liquidityImpact, { compact: true })}`} pos={liquidityImpact >= 0} />
            <ImpactRow label="Est. transaction cost" value={fmtUSD(estCost, { decimals: 0 })} muted />
          </div>
          <div className="card">
            <div className="caps mb-12">Route preview</div>
            <div className="stack gap-8">
              {[
                "Rebalance stablecoins",
                "Trim USDe via Merchant Moe",
                "Mint USDY via primary",
                "Settle and anchor decision",
              ].map((s, i) => (
                <div key={s} className="row between fs-13" style={{ padding: "8px 0", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
                  <span className="row gap-8">
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--surface-muted)", color: "var(--text-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600 }}>{i + 1}</span>
                    {s}
                  </span>
                  <span className="chip">Pending</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setShowApproval(true)} disabled={!valid}>
            Review approval<Icon.ArrowRight size={14} />
          </button>
        </div>
      </div>

      {showApproval && <ApprovalSheet onClose={() => setShowApproval(false)} apyDelta={apyDelta} estCost={estCost} />}
    </div>
  );
}
function DonutCard({ title, value, apy, apyDelta, segments, proposed }) {
  return (
    <div className="card">
      <div className="row between mb-12">
        <div className="caps" style={{ color: proposed ? "var(--teal-dark)" : "var(--text-tertiary)" }}>{title}</div>
        {apyDelta !== undefined && apyDelta !== 0 && (
          <span className={`chip ${apyDelta > 0 ? "chip-emerald" : "chip-rose"}`}>
            {apyDelta > 0 ? "+" : ""}{apyDelta.toFixed(2)}% APY
          </span>
        )}
      </div>
      <div className="row gap-24" style={{ alignItems: "center" }}>
        <AllocationDonut segments={segments} total={`${apy.toFixed(2)}%`} totalLabel="Blended APY" size={170} thickness={22} />
        <div style={{ flex: 1 }}>
          <div className="serif" style={{ fontSize: 26 }}>{value}</div>
          <div className="fs-12 text-tertiary">Total value</div>
          <div className="stack gap-6 mt-16">
            {segments.map(s => (
              <div key={s.label} className="row between fs-13">
                <div className="row gap-8">
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }}></span>
                  <span>{s.label}</span>
                </div>
                <span className="mono">{s.pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function ImpactRow({ label, value, pos, muted }) {
  return (
    <div className="row between" style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}>
      <span className="text-secondary fs-13">{label}</span>
      <span style={{ fontWeight: 500, color: muted ? "var(--text)" : pos ? "var(--emerald)" : "var(--rose)" }} className="mono">{value}</span>
    </div>
  );
}
function ApprovalSheet({ onClose, apyDelta, estCost }) {
  const policy = [
    { rule: "Max allocation per asset (25%)", result: "Pass", value: "23.5%" },
    { rule: "Max allocation per protocol (30%)", result: "Pass", value: "21.2%" },
    { rule: "Minimum liquidity score (70)", result: "Pass", value: "86" },
    { rule: "Slippage limit (0.50%)", result: "Pass", value: "0.18%" },
    { rule: "Minimum AI confidence (75%)", result: "Pass", value: "86%" },
    { rule: "Rebalance cooldown (24h)", result: "Pass", value: "ok" },
    { rule: "Human approval threshold ($250K)", result: "Pass", value: "$84,200" },
  ];
  const allPass = policy.every(p => p.result === "Pass");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(11,18,32,0.4)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div className="card" onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: "100%", padding: 0, maxHeight: "85vh", overflow: "auto" }}>
        <div className="row between" style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <div>
            <div className="caps">Confirm rebalance</div>
            <h3 className="serif mt-4" style={{ fontSize: 22, margin: 0 }}>Review and approve</h3>
          </div>
          <button onClick={onClose}><Icon.X size={16} /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div className="caps mb-8">Assets affected</div>
          <div className="card" style={{ padding: 14, boxShadow: "none" }}>
            {[
              { sym: "USDY", from: 21.5, to: 24.5 }, { sym: "USDe", from: 11.9, to: 7.9 }, { sym: "Aave", from: 18.5, to: 19.5 },
            ].map(r => (
              <div key={r.sym} className="row between fs-13" style={{ padding: "6px 0" }}>
                <div className="row gap-8"><AssetIcon symbol={r.sym} size="sm" />{r.sym}</div>
                <span><span className="text-tertiary mono">{r.from}%</span> → <span className="mono">{r.to}%</span></span>
              </div>
            ))}
          </div>

          <div className="grid gap-12 mt-16" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="card" style={{ padding: 14, boxShadow: "none", background: "var(--surface-muted)" }}>
              <div className="caps">Network</div>
              <div className="row gap-8 mt-4"><span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>Mantle Mainnet</div>
            </div>
            <div className="card" style={{ padding: 14, boxShadow: "none", background: "var(--surface-muted)" }}>
              <div className="caps">Est. gas</div>
              <div className="mono mt-4">{fmtUSD(estCost, { decimals: 0 })}</div>
            </div>
          </div>

          <div className="caps mt-20 mb-8">Policy check</div>
          <div className="card" style={{ padding: 0, boxShadow: "none", border: "1px solid var(--border)" }}>
            {policy.map((p, i) => (
              <div key={p.rule} className="row between" style={{ padding: "10px 14px", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
                <span className="fs-13">{p.rule}</span>
                <span className="row gap-8">
                  <span className="mono fs-12 text-tertiary">{p.value}</span>
                  <span className="chip chip-emerald" style={{ fontSize: 11 }}><Icon.Check size={11} />Pass</span>
                </span>
              </div>
            ))}
          </div>

          <div className="row between mt-24">
            <div>
              <div className="fs-12 text-tertiary">Expected APY</div>
              <div className="serif" style={{ fontSize: 22 }}>+{apyDelta.toFixed(2)}%</div>
            </div>
            <div className="row gap-8">
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <TxButton label="Approve & execute" icon={<Icon.ShieldCheck size={14} />}
                disabled={!allPass}
                action={window.Auralis.Services.logDecision}
                onConfirmed={() => { onClose(); }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COPILOT FULL PAGE /app/copilot
   ============================================================ */
function CopilotPage({ navigate }) {
  const [msgs, setMsgs] = useState([
    { who: "bot", kind: "greeting", text: "I can explain your portfolio, propose a rebalance, or check eligibility. What's on your mind?" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const threadRef = useRef(null);
  useEffect(() => { threadRef.current && (threadRef.current.scrollTop = threadRef.current.scrollHeight); }, [msgs, streaming]);
  const ask = async (q) => {
    setMsgs(m => [...m, { who: "user", text: q }]);
    setInput(""); setStreaming(true);
    setMsgs(m => [...m, { who: "bot", kind: "stream", text: "" }]);
    let txt = "";
    await window.Auralis.Services.askCopilot(q, (t) => {
      txt += t;
      setMsgs(m => { const c = m.slice(); c[c.length - 1] = { ...c[c.length - 1], text: txt }; return c; });
    });
    setMsgs(m => { const c = m.slice(); c[c.length - 1] = { who: "bot", kind: "structured", reply: window.Auralis.COPILOT_REPLY }; return c; });
    setStreaming(false);
  };
  return (
    <div className="page-enter">
      <div className="mb-24">
        <div className="row gap-12">
          <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>AI Copilot</h1>
          <span className="chip">Beta</span>
        </div>
        <div className="text-secondary mt-4">Ask Auralis for portfolio guidance — every reply is structured and auditable.</div>
      </div>
      <div className="grid gap-16" style={{ gridTemplateColumns: "1.7fr 1fr" }}>
        <div className="card card-flush" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 220px)", minHeight: 540 }}>
          <div ref={threadRef} style={{ flex: 1, overflow: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {msgs.map((m, i) => <FullMessage key={i} m={m} navigate={navigate} />)}
          </div>
          <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
            <div className="row gap-8 mb-12" style={{ flexWrap: "wrap" }}>
              {["How should I rebalance to improve risk-adjusted yield?", "Is my portfolio compliant?", "What changed today?"].map(q => (
                <button key={q} className="chip" style={{ cursor: "pointer" }} onClick={() => ask(q)}>{q}</button>
              ))}
            </div>
            <form className="row gap-8" onSubmit={(e) => { e.preventDefault(); if (input.trim() && !streaming) ask(input.trim()); }}>
              <input className="input" placeholder="Ask Auralis…" value={input} onChange={(e) => setInput(e.target.value)} />
              <button className="btn btn-primary" type="submit" disabled={!input.trim() || streaming}><Icon.Send size={14} />Send</button>
            </form>
            <div className="fs-12 text-tertiary mt-12">AI responses may be inaccurate. Verify important decisions. Not financial advice.</div>
          </div>
        </div>

        <div className="stack gap-16">
          <div className="card">
            <div className="caps mb-12">Recommended allocation</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AllocationDonut segments={[
                { label: "DeFi", pct: 48, color: "#0E9E8C", value: 0 },
                { label: "RWA", pct: 38, color: "#1F58A8", value: 0 },
                { label: "Stablecoins", pct: 14, color: "#8C97A8", value: 0 },
              ]} total="9.42%" totalLabel="APY" size={160} thickness={20} />
            </div>
          </div>
          <div className="card">
            <div className="caps mb-12">Reasoning factors</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {window.Auralis.COPILOT_REPLY.reasoning.map((r, i) => (
                <li key={i} className="row gap-8" style={{ padding: "6px 0", fontSize: 13 }}>
                  <span className="text-emerald" style={{ marginTop: 3 }}><Icon.Check size={12} /></span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="caps mb-12">Policy check summary</div>
            <div className="stack gap-6">
              {["Per-asset cap","Per-protocol cap","Liquidity floor","Slippage limit","Confidence floor"].map(p => (
                <div key={p} className="row between fs-13">
                  <span>{p}</span>
                  <span className="chip chip-emerald" style={{ fontSize: 11 }}>Within limit</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ background: "var(--amber-wash)", borderColor: "transparent" }}>
            <div className="caps" style={{ color: "var(--amber)" }}>Risk alert</div>
            <div className="fs-13 mt-4">USDe funding rate fell 130bps in 14 days. Low severity.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function FullMessage({ m, navigate }) {
  if (m.who === "user") {
    return <div style={{ alignSelf: "flex-end", maxWidth: 540, padding: "12px 16px", background: "var(--teal-wash)", color: "var(--teal-dark)", borderRadius: "14px 14px 4px 14px", fontSize: 15 }}>{m.text}</div>;
  }
  if (m.kind === "greeting") {
    return <div style={{ maxWidth: 540, padding: "12px 16px", background: "var(--surface-muted)", borderRadius: "14px 14px 14px 4px", color: "var(--text-secondary)" }}>{m.text}</div>;
  }
  if (m.kind === "stream") {
    return <div style={{ maxWidth: 640, padding: "14px 18px", background: "var(--surface-muted)", borderRadius: "14px 14px 14px 4px" }}>{m.text}<span className="blink">▋</span></div>;
  }
  if (m.kind === "structured") {
    const r = m.reply;
    return (
      <div className="card" style={{ maxWidth: 760, padding: 20 }}>
        <div className="caps mb-8">Executive summary</div>
        <p style={{ margin: 0, lineHeight: 1.6 }}>{r.summary}</p>

        <div className="caps mt-20 mb-8">Recommended actions</div>
        <div className="stack gap-8">
          {r.actions.map((a, i) => (
            <div key={i} className="row between" style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10 }}>
              <div>
                <div style={{ fontWeight: 500 }}>{a.title}</div>
                <div className="fs-12 text-secondary mt-2">{a.note}</div>
              </div>
              <span className="chip chip-emerald">{a.delta}</span>
            </div>
          ))}
        </div>

        <div className="caps mt-20 mb-8">Expected outcome</div>
        <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {r.outcome.map(o => (
            <div key={o.label} className="card" style={{ padding: 12, boxShadow: "none", background: "var(--surface-muted)" }}>
              <div className="caps">{o.label}</div>
              <div className="row gap-8 mt-4"><span className="text-tertiary">{o.from}</span><Icon.ArrowRight size={12} color="var(--text-tertiary)" /><span className="serif" style={{ fontSize: 18 }}>{o.to}</span></div>
            </div>
          ))}
        </div>

        <div className="caps mt-20 mb-8">Reasoning factors</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {r.reasoning.map((x, i) => (
            <li key={i} className="row gap-8" style={{ padding: "4px 0", fontSize: 14 }}>
              <span className="text-emerald" style={{ marginTop: 4 }}><Icon.Check size={12} /></span>{x}
            </li>
          ))}
        </ul>

        <div className="row between mt-16">
          <ConfidenceMeter value={r.confidence} />
          <div className="row gap-8">
            <button className="btn btn-secondary btn-sm" onClick={() => navigate("/app/simulator")}><Icon.Sliders size={14} />Open simulator</button>
            <button className="btn btn-ghost btn-sm">Save as rule</button>
          </div>
        </div>
        <div className="fs-12 text-tertiary mt-8">{r.caveats}</div>
        <AIProvenance />
      </div>
    );
  }
  return null;
}

/* ============================================================
   DECISIONS /app/decisions
   ============================================================ */
function Decisions({ navigate }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const all = window.Auralis.DECISIONS;
  const filtered = filter === "All" ? all : all.filter(d => d.outcome === filter);
  const counts = {
    All: all.length, Simulated: all.filter(d => d.outcome === "Simulated").length,
    Approved: all.filter(d => d.outcome === "Approved").length, Executed: all.filter(d => d.outcome === "Executed").length,
    Rejected: all.filter(d => d.outcome === "Rejected").length,
  };
  return (
    <div className="page-enter">
      <div className="row between mb-24" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Decisions</h1>
          <div className="text-secondary mt-4">Review AI actions, simulations, and on-chain proofs.</div>
        </div>
        <button className="btn btn-secondary" onClick={() => Toast.push({ title: "Exported", sub: `${filtered.length} rows as CSV`, kind: "success" })}><Icon.FileText size={14} />Export CSV</button>
      </div>

      <div className="grid gap-12 mb-16" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {[
          { id: "All", k: "All decisions", color: "var(--text)" },
          { id: "Simulated", k: "Simulated", color: "var(--amber)" },
          { id: "Approved", k: "Approved", color: "var(--teal-dark)" },
          { id: "Executed", k: "Executed", color: "var(--emerald)" },
          { id: "Rejected", k: "Rejected", color: "var(--rose)" },
        ].map(t => (
          <button key={t.id} className={`card card-hover`} style={{ padding: 16, textAlign: "left", borderColor: filter === t.id ? "var(--teal)" : undefined, background: filter === t.id ? "var(--teal-wash)" : undefined }} onClick={() => setFilter(t.id)}>
            <div className="caps">{t.k}</div>
            <div className="serif mt-8" style={{ fontSize: 26, color: t.color }}>{counts[t.id]}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-16" style={{ gridTemplateColumns: open ? "1.4fr 1fr" : "1fr" }}>
        <div className="card card-flush">
          <table className="t-table">
            <thead>
              <tr><th>Action</th><th>Assets</th><th>Confidence</th><th>Policy</th><th>Tx hash</th><th>Time</th><th>Outcome</th></tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} onClick={() => setOpen(d)}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{d.action}</div>
                    <div className="fs-12 text-tertiary mt-2">{d.sub}</div>
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      {d.assets.slice(0, 3).map((s, i) => (
                        <span key={s} style={{ marginLeft: i === 0 ? 0 : -8 }}><AssetIcon symbol={s} size="sm" /></span>
                      ))}
                    </div>
                  </td>
                  <td><ConfidenceMeter value={d.confidence} compact label={false} /></td>
                  <td><span className={`chip ${d.policy === "Pass" ? "chip-emerald" : d.policy === "Warn" ? "chip-amber" : "chip-rose"}`}>{d.policy}</span></td>
                  <td>
                    <div className="row gap-8" onClick={(e) => e.stopPropagation()}>
                      <span className="mono fs-12">{window.Auralis.truncate(d.txHash, 6, 4)}</span>
                      <a href={window.Auralis.explorerOf(d.txHash)} target="_blank" rel="noreferrer" className="text-teal"><Icon.External size={12} /></a>
                    </div>
                  </td>
                  <td className="fs-13 text-secondary">{d.timeLabel}</td>
                  <td><span className={`chip ${d.outcome === "Executed" ? "chip-emerald" : d.outcome === "Rejected" ? "chip-rose" : d.outcome === "Simulated" ? "chip-amber" : "chip-teal"}`}>{d.outcome}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {open && (
          <div className="card page-enter" style={{ alignSelf: "start" }}>
            <div className="row between mb-12">
              <div className="caps">Decision detail</div>
              <button onClick={() => setOpen(null)}><Icon.X size={14} /></button>
            </div>
            <div className="serif" style={{ fontSize: 20 }}>{open.action}</div>
            <div className="fs-13 text-secondary mt-4">{open.sub}</div>

            <div className="caps mt-20 mb-8">Inputs</div>
            <div className="stack gap-6 fs-13">
              <DetRow k="Trigger" v="AI recommendation" />
              <DetRow k="Strategy" v="Risk-adjusted yield optimisation" />
              <DetRow k="Notional value" v="$84,200" />
            </div>

            <div className="caps mt-20 mb-8">AI reasoning summary</div>
            <p className="fs-14" style={{ margin: 0, lineHeight: 1.6 }}>{open.reasoning}</p>
            <a className="text-teal fs-13 fw-500 row gap-4 mt-8" style={{ cursor: "pointer" }}>View full reasoning<Icon.ChevronRight size={12} /></a>

            <div className="caps mt-20 mb-8">Policy checks</div>
            <div className="stack gap-4">
              {open.policyChecks.map(p => (
                <div key={p.rule} className="row between fs-13">
                  <span>{p.rule}</span>
                  <span className={`chip ${p.value.startsWith("Pass") ? "chip-emerald" : "chip-amber"}`}>{p.value}</span>
                </div>
              ))}
            </div>

            <div className="caps mt-20 mb-8">Simulation</div>
            <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <MiniMetric k="APY uplift" v={`+${open.simulation.apyDelta}%`} />
              <MiniMetric k="30D PnL" v={fmtUSD(open.simulation.pnl30)} />
              <MiniMetric k="VaR (95%)" v={fmtUSD(open.simulation.var95)} />
            </div>

            <div className="caps mt-20 mb-8">On-chain proof</div>
            <ProofCard label="Decision proof" hash={open.txHash} timestamp={open.timeLabel} explorerUrl={window.Auralis.explorerOf(open.txHash)} />
            <div className="mt-12"><VerifyWidget hash={open.txHash} recordType="decision" /></div>
          </div>
        )}
      </div>
    </div>
  );
}
function DetRow({ k, v }) { return (<div className="row between"><span className="text-tertiary">{k}</span><span style={{ fontWeight: 500 }}>{v}</span></div>); }
function MiniMetric({ k, v }) {
  return (<div className="card" style={{ padding: 10, boxShadow: "none", background: "var(--surface-muted)" }}>
    <div className="caps">{k}</div>
    <div className="serif mt-4" style={{ fontSize: 16 }}>{v}</div>
  </div>);
}

/* ============================================================
   POLICIES /app/policies — 2 tabs
   ============================================================ */
function Policies() {
  const [tab, setTab] = useState("rules");
  const [values, setValues] = useState(Object.fromEntries(window.Auralis.POLICY.guardrails.map(g => [g.id, g.value])));
  const [enabled, setEnabled] = useState(Object.fromEntries(window.Auralis.POLICY.guardrails.map(g => [g.id, g.enabled])));

  const applyTemplate = (tpl) => {
    setValues(v => ({ ...v, ...tpl.values }));
    Toast.push({ title: `Template applied · ${tpl.name}`, sub: "Save to commit the changes on-chain.", kind: "info" });
    setTab("rules");
  };

  return (
    <div className="page-enter">
      <div className="row between mb-24" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Policy guardrails</h1>
          <div className="text-secondary mt-4">Hard limits enforced on every AI recommendation and execution.</div>
        </div>
      </div>

      <div className="card mb-16" style={{ padding: 6 }}>
        <div className="row gap-4">
          {[
            { id: "rules", l: "Guardrails", i: <Icon.Sliders size={14} /> },
            { id: "templates", l: "Templates", i: <Icon.Boxes size={14} /> },
          ].map(t => (
            <button key={t.id} className="row gap-8" onClick={() => setTab(t.id)} style={{
              padding: "10px 16px", borderRadius: 8, fontSize: 14,
              background: tab === t.id ? "var(--teal-wash)" : "transparent",
              color: tab === t.id ? "var(--teal-dark)" : "var(--text-secondary)", fontWeight: tab === t.id ? 500 : 400,
            }}>{t.i}{t.l}</button>
          ))}
        </div>
      </div>

      {tab === "rules" && (
        <div className="grid gap-16" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
          <div>
            <div className="grid gap-12" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {window.Auralis.POLICY.guardrails.map(g => {
                const IconComp = Icon[g.icon];
                return (
                  <div key={g.id} className="card">
                    <div className="row between">
                      <div className="row gap-8">
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {IconComp && <IconComp size={14} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 14 }}>{g.label}</div>
                          <div className="fs-12 text-tertiary mt-2">{g.help}</div>
                        </div>
                      </div>
                      <Toggle on={enabled[g.id]} onChange={(v) => setEnabled(e => ({ ...e, [g.id]: v }))} />
                    </div>
                    <div className="row gap-12 mt-16" style={{ alignItems: "center" }}>
                      <input type="range" min={g.min} max={g.max} step={g.step || 1} value={values[g.id]}
                        onChange={(e) => setValues(v => ({ ...v, [g.id]: parseFloat(e.target.value) }))}
                        style={{ flex: 1, accentColor: "var(--teal)" }}
                        disabled={!enabled[g.id]} />
                      <div className="row gap-4" style={{ minWidth: 92, justifyContent: "flex-end" }}>
                        {g.unit === "$" ? (
                          <span className="mono fs-14" style={{ fontWeight: 500 }}>${values[g.id].toLocaleString()}</span>
                        ) : (
                          <>
                            <input type="number" className="input" style={{ width: 64, height: 28, padding: "0 8px", textAlign: "right" }} value={values[g.id]} onChange={(e) => setValues(v => ({ ...v, [g.id]: parseFloat(e.target.value) || 0 }))} disabled={!enabled[g.id]} />
                            <span className="text-tertiary fs-13">{g.unit}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row gap-8 mt-20" style={{ justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setValues(Object.fromEntries(window.Auralis.POLICY.guardrails.map(g => [g.id, g.value])))}>Reset to defaults</button>
              <TxButton label="Save guardrails" icon={<Icon.ShieldCheck size={14} />} action={window.Auralis.Services.savePolicy} />
            </div>
          </div>

          <div className="stack gap-16">
            <div className="card">
              <div className="row between">
                <div className="caps">Policy health</div>
                <span className="chip chip-emerald"><Icon.Check size={12} />Healthy</span>
              </div>
              <div className="fs-13 text-secondary mt-8">All seven guardrails are within working bands.</div>
            </div>
            <div className="card">
              <div className="caps mb-12">Recently blocked</div>
              {window.Auralis.POLICY.blocked.map(b => (
                <div key={b.attempt} className="row between" style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}>
                  <div>
                    <div className="fs-13" style={{ fontWeight: 500 }}>{b.attempt}</div>
                    <div className="fs-12 text-tertiary mt-2">{b.rule} · {b.time}</div>
                  </div>
                  <span className="chip chip-rose">Blocked</span>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="caps mb-12">Policy check preview</div>
              <div className="fs-13 text-secondary mb-12">Sample: "Trim USDe -4% → Add USDY +3%, Aave +1%"</div>
              <div className="stack gap-4 fs-13">
                {["Per-asset cap", "Per-protocol cap", "Liquidity floor", "Slippage limit", "Confidence floor"].map(p => (
                  <div key={p} className="row between"><span>{p}</span><span className="chip chip-emerald" style={{ fontSize: 11 }}>Pass</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "templates" && (
        <div className="grid gap-16" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {window.Auralis.POLICY.templates.map(tpl => (
            <div key={tpl.id} className="card">
              <div className="caps">{tpl.headline}</div>
              <h3 className="serif mt-8" style={{ fontSize: 22, margin: 0 }}>{tpl.name}</h3>
              <div className="stack gap-6 mt-16">
                {Object.entries(tpl.values).slice(0, 5).map(([k, v]) => {
                  const g = window.Auralis.POLICY.guardrails.find(x => x.id === k);
                  return (
                    <div key={k} className="row between fs-13">
                      <span className="text-secondary">{g.label}</span>
                      <span className="mono">{g.unit === "$" ? `$${v.toLocaleString()}` : `${v}${g.unit}`}</span>
                    </div>
                  );
                })}
              </div>
              <button className="btn btn-secondary mt-20" style={{ width: "100%" }} onClick={() => applyTemplate(tpl)}>Apply template</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{ width: 32, height: 18, borderRadius: 9, background: on ? "var(--teal)" : "var(--border-strong)", position: "relative", transition: "background var(--t-fast)" }}>
      <span style={{ width: 14, height: 14, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: on ? 16 : 2, transition: "left var(--t-fast)" }}></span>
    </button>
  );
}

/* ============================================================
   AGENT /app/agent
   ============================================================ */
function Agent() {
  const a = window.Auralis.AGENT;
  return (
    <div className="page-enter">
      <div className="mb-24">
        <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Agent identity</h1>
        <div className="text-secondary mt-4">The Auralis agent's on-chain identity, skill registry, and reputation.</div>
      </div>

      <div className="grid gap-16 mb-16" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card" style={{ padding: 28, background: "linear-gradient(180deg, var(--surface) 0%, var(--surface-muted) 100%)" }}>
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <div className="row gap-16">
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg, var(--teal), var(--ink))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow)" }}>
                <Icon.Brand size={28} color="white" />
              </div>
              <div>
                <div className="caps">Soulbound · non-transferable</div>
                <div className="serif mt-4" style={{ fontSize: 24 }}>{a.name}</div>
                <div className="row gap-12 mt-8">
                  <span className="chip">{a.spec}</span>
                  <span className="chip">Registered {a.registered}</span>
                </div>
              </div>
            </div>
            <div className="row gap-8">
              <span className="chip chip-emerald"><span className="chip-dot chip-dot-emerald" style={{ width: 6, height: 6, borderRadius: "50%" }}></span>Active</span>
            </div>
          </div>
          <div className="grid gap-16 mt-24" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <ReportField k="Token ID" v={<span className="mono">{a.tokenId}</span>} />
            <ReportField k="Spec" v={a.spec} />
            <ReportField k="Methodology" v="v1.0" />
          </div>
        </div>
        <div className="grid gap-16" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <KpiStat label="Ratings issued" value={a.reputation.ratings} format="num" decimals={0} />
          <KpiStat label="Attestations" value={a.reputation.attestations} format="num" decimals={0} />
          <KpiStat label="Decisions logged" value={a.reputation.decisions} format="num" decimals={0} />
        </div>
      </div>

      <div className="card mb-16">
        <div className="row between mb-16">
          <div>
            <div className="caps">Skills registry</div>
            <div className="fs-12 text-tertiary mt-2">12 skills · 4 on-chain · 8 off-chain</div>
          </div>
          <button className="btn btn-secondary btn-sm"><Icon.External size={14} />View on chain</button>
        </div>
        <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {a.skills.map(s => (
            <div key={s.name} className="card" style={{ padding: 14, boxShadow: "none" }}>
              <div className="row between">
                <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: "var(--teal-dark)" }}>{s.name}</span>
                <span className="chip" style={{ fontSize: 10, padding: "0 6px", height: 18 }}>{s.chain}</span>
              </div>
              <div className="fs-12 text-secondary mt-8" style={{ minHeight: 32 }}>{s.desc}</div>
              <div className="row between mt-12">
                <span className="fs-12 text-tertiary">Last run · {s.lastRun}</span>
                <button className="btn btn-ghost btn-sm" style={{ padding: "0 8px", fontSize: 12 }} onClick={() => Toast.push({ title: `${s.name} · ran`, sub: "Mock result: ok", kind: "info" })}>Run</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="row between mb-12">
          <div className="caps">On-chain activity</div>
          <span className="chip">Last 5 events</span>
        </div>
        {a.activity.map((act, i) => (
          <div key={i} className="row between" style={{ padding: "12px 0", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
            <div className="row gap-12">
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--teal-wash)", color: "var(--teal-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.Activity size={14} /></div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{act.what}</div>
                <div className="fs-12 text-tertiary mt-2">{act.time}</div>
              </div>
            </div>
            <a href={window.Auralis.explorerOf(act.hash)} target="_blank" rel="noreferrer" className="row gap-8 text-teal fs-12 fw-500">
              <span className="mono">{window.Auralis.truncate(act.hash, 6, 4)}</span><Icon.External size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   INTEGRATIONS /app/integrations and /app/settings
   ============================================================ */
function Integrations() {
  const ints = window.Auralis.INTEGRATIONS;
  const grouped = ints.reduce((m, x) => { (m[x.category] ||= []).push(x); return m; }, {});
  return (
    <div className="page-enter">
      <div className="mb-24">
        <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Integrations</h1>
        <div className="text-secondary mt-4">Connected services, environment, and system health.</div>
      </div>

      <div className="grid gap-16" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div>
          {Object.entries(grouped).map(([cat, list]) => (
            <div key={cat} className="mb-16">
              <div className="caps mb-8">{cat}</div>
              <div className="grid gap-12" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {list.map(i => (
                  <div key={i.name} className="card row between" style={{ padding: 16 }}>
                    <div className="row gap-12">
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-muted)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.Plug size={16} /></div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{i.name}</div>
                        <div className="fs-12 text-tertiary mt-2">{i.desc}</div>
                      </div>
                    </div>
                    <span className="chip chip-emerald"><Icon.Check size={12} />{i.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stack gap-16">
          <div className="card">
            <div className="caps mb-12">Environment</div>
            <div className="stack gap-8 fs-13">
              <DetRow k="Network" v="Mantle Mainnet" />
              <DetRow k="Chain ID" v={<span className="mono">5000</span>} />
              <DetRow k="RPC" v={<span className="mono">rpc.mantle.xyz</span>} />
              <DetRow k="Explorer" v={<a className="text-teal mono" href="https://explorer.mantle.xyz" target="_blank" rel="noreferrer">explorer.mantle.xyz</a>} />
            </div>
          </div>
          <div className="card">
            <div className="row between mb-12">
              <div className="caps">System health</div>
              <span className="chip chip-emerald">All operational</span>
            </div>
            <div className="stack gap-6 fs-13">
              {["Rating engine", "Compliance engine", "On-chain logger", "Price oracles", "Mantle RPC"].map(s => (
                <div key={s} className="row between"><span>{s}</span><span className="chip chip-emerald" style={{ fontSize: 11 }}><Icon.Check size={11} />Operational</span></div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="caps mb-12">Security controls</div>
            <div className="stack gap-6 fs-13">
              {[
                "Non-custodial", "No server signing key", "Guardrails enabled", "Rate limiting enabled",
              ].map(s => (
                <div key={s} className="row between"><span>{s}</span><span className="text-emerald"><Icon.Check size={14} /></span></div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="caps mb-12">Refresh intervals</div>
            <div className="stack gap-12">
              <div className="row between"><span className="fs-13">Market data</span><select className="select" style={{ width: 120, height: 28 }}><option>15 min</option><option>30 min</option><option>60 min</option></select></div>
              <div className="row between"><span className="fs-13">Strategies</span><select className="select" style={{ width: 120, height: 28 }}><option>60 min</option><option>4 hours</option><option>Daily</option></select></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings({ onDisconnect }) {
  const [name, setName] = useState("Jamie Adler");
  const [country, setCountry] = useState("Nigeria · NG");
  const [risk, setRisk] = useState("Balanced");
  const [mode, setMode] = useState("Advisory");
  return (
    <div className="page-enter" style={{ maxWidth: 760 }}>
      <div className="mb-24">
        <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 460, letterSpacing: "-0.01em" }}>Settings</h1>
        <div className="text-secondary mt-4">Profile, jurisdiction, mode, and danger zone.</div>
      </div>

      <SettingSection title="Profile" onSave={() => Toast.push({ title: "Profile saved", kind: "success" })}>
        <Field label="Display name" v={name} onChange={setName} />
      </SettingSection>

      <SettingSection title="Jurisdiction declaration" onSave={() => Toast.push({ title: "Re-run your compliance scan", sub: "Your eligibility may have changed.", kind: "info" })}>
        <Field label="Country" v={country} onChange={setCountry} as="select" options={["Nigeria · NG", "United Kingdom · GB", "Switzerland · CH", "Singapore · SG", "United Arab Emirates · AE"]} />
      </SettingSection>

      <SettingSection title="Risk profile" onSave={() => Toast.push({ title: "Risk profile updated", kind: "success" })}>
        <Field label="Profile" v={risk} onChange={setRisk} as="select" options={["Conservative", "Moderate", "Balanced", "Growth", "Aggressive"]} />
      </SettingSection>

      <SettingSection title="Mode" onSave={() => Toast.push({ title: "Mode updated", kind: "success" })}>
        <Field label="Operating mode" v={mode} onChange={setMode} as="select" options={["Simulation", "Advisory", "Guarded execution"]} />
      </SettingSection>

      <SettingSection title="Notifications" onSave={() => Toast.push({ title: "Notification preferences saved", kind: "success" })}>
        <div className="row between" style={{ padding: "8px 0" }}><span className="fs-14">Email — daily summary</span><Toggle on={true} onChange={() => {}} /></div>
        <div className="row between" style={{ padding: "8px 0" }}><span className="fs-14">In-app — depeg alerts</span><Toggle on={true} onChange={() => {}} /></div>
        <div className="row between" style={{ padding: "8px 0" }}><span className="fs-14">In-app — recommendation ready</span><Toggle on={true} onChange={() => {}} /></div>
      </SettingSection>

      <SettingSection title="Appearance" onSave={() => Toast.push({ title: "Appearance saved", kind: "success" })}>
        <Field label="Theme" v="Light" as="select" options={["Light", "Dark (preview)"]} onChange={() => {}} />
      </SettingSection>

      <div className="card" style={{ borderColor: "var(--rose)", marginTop: 16 }}>
        <div className="caps" style={{ color: "var(--rose)" }}>Danger zone</div>
        <div className="row between mt-12">
          <div>
            <div style={{ fontWeight: 500 }}>Disconnect wallet</div>
            <div className="fs-13 text-secondary mt-2">Your local state is cleared. You can reconnect any time.</div>
          </div>
          <button className="btn btn-secondary" style={{ color: "var(--rose)", borderColor: "var(--rose)" }} onClick={onDisconnect}>Disconnect</button>
        </div>
        <div className="row between mt-16">
          <div>
            <div style={{ fontWeight: 500 }}>Clear local data</div>
            <div className="fs-13 text-secondary mt-2">Drops cached configuration and recent decisions.</div>
          </div>
          <button className="btn btn-secondary" onClick={() => Toast.push({ title: "Local data cleared", kind: "info" })}>Clear</button>
        </div>
      </div>
    </div>
  );
}
function SettingSection({ title, children, onSave }) {
  return (
    <div className="card mb-16">
      <div className="row between mb-12">
        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>{title}</h3>
        <button className="btn btn-secondary btn-sm" onClick={onSave}>Save</button>
      </div>
      {children}
    </div>
  );
}
function Field({ label, v, onChange, as = "input", options = [] }) {
  return (
    <div style={{ padding: "8px 0" }}>
      <div className="caps mb-8">{label}</div>
      {as === "select" ? (
        <select className="select" value={v} onChange={(e) => onChange(e.target.value)}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input className="input" value={v} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

Object.assign(window, { Compliance, Simulator, CopilotPage, Decisions, Policies, Agent, Integrations, Settings });

/* ===== main.jsx (App component, mount moved to src/main.jsx) ===== */
/* ============================================================
   Auralis — Router + App entry
   Hash-based routing with /path?param style
   ============================================================ */


/* ---------- Hash router ---------- */
function parseHash() {
  const h = window.location.hash || "#/";
  const path = h.slice(1) || "/";
  return path;
}
function useRouter() {
  const [path, setPath] = useState(parseHash());
  useEffect(() => {
    const fn = () => setPath(parseHash());
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  const navigate = useCallback((to) => {
    if (to.startsWith("http")) { window.open(to, "_blank"); return; }
    window.location.hash = "#" + to;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return { path, navigate };
}

/* ---------- Mock auth context (simple) ---------- */
function useMockAuth() {
  const [auth, setAuthRaw] = useState(() => {
    try {
      const stored = localStorage.getItem("auralis_auth");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { connected: false, onboardingDone: false, mode: "advisory", risk: "Balanced" };
  });
  const setAuth = (patch) => {
    setAuthRaw(a => {
      const next = { ...a, ...patch };
      try { localStorage.setItem("auralis_auth", JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };
  const connect = () => setAuth({ connected: true });
  const completeOnboarding = (cfg) => setAuth({ connected: true, onboardingDone: true, ...cfg });
  const disconnect = () => {
    try { localStorage.removeItem("auralis_auth"); } catch (e) {}
    setAuthRaw({ connected: false, onboardingDone: false, mode: "advisory", risk: "Balanced" });
  };
  return { auth, connect, disconnect, completeOnboarding };
}

/* ---------- Route matcher ---------- */
function matchRoute(path) {
  if (path === "/") return { name: "landing" };
  if (path === "/product") return { name: "product" };
  if (path === "/methodology") return { name: "methodology" };
  if (path === "/ratings") return { name: "ratings" };
  if (path.startsWith("/ratings/")) return { name: "rating-detail", params: { id: path.split("/")[2] } };
  if (path === "/security") return { name: "security" };
  if (path === "/business") return { name: "business" };
  if (path === "/docs") return { name: "docs" };
  if (path === "/faq") return { name: "faq" };
  if (path === "/company") return { name: "company" };
  if (path === "/app") return { name: "onboarding" };
  if (path === "/app/dashboard") return { name: "dashboard" };
  if (path === "/app/opportunities") return { name: "opportunities" };
  if (path.startsWith("/app/opportunities/")) return { name: "asset-detail", params: { id: path.split("/")[3] } };
  if (path === "/app/compliance") return { name: "compliance" };
  if (path === "/app/simulator") return { name: "simulator" };
  if (path === "/app/copilot") return { name: "copilot" };
  if (path === "/app/policies") return { name: "policies" };
  if (path === "/app/decisions") return { name: "decisions" };
  if (path === "/app/agent") return { name: "agent" };
  if (path === "/app/integrations") return { name: "integrations" };
  if (path === "/app/settings") return { name: "settings" };
  return { name: "landing" };
}

/* ---------- App ---------- */
function App() {
  const { path, navigate } = useRouter();
  const { auth, connect, disconnect, completeOnboarding } = useMockAuth();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  const isAppRoute = path.startsWith("/app");

  // Gate /app/* on connected. /app onboarding is reachable when not connected.
  useEffect(() => {
    if (isAppRoute && path !== "/app" && !auth.connected) {
      navigate("/app");
    }
  }, [path, isAppRoute, auth.connected, navigate]);

  // Open palette on ⌘K / Ctrl-K globally
  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(v => !v);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  const route = matchRoute(path);

  const handleOpenApp = () => {
    if (auth.connected && auth.onboardingDone) navigate("/app/dashboard");
    else navigate("/app");
  };

  // Marketing routes
  if (!isAppRoute) {
    return (
      <>
        <TopoBackground variant="ambient" />
        <MktHeader route={path} navigate={navigate} onConnect={handleOpenApp} theme={theme} toggleTheme={toggleTheme} />
        {route.name === "landing" && <MktLanding navigate={navigate} onConnect={handleOpenApp} />}
        {route.name === "product" && <MktProduct navigate={navigate} />}
        {route.name === "methodology" && <MktMethodology />}
        {route.name === "ratings" && <MktRatings navigate={navigate} />}
        {route.name === "rating-detail" && <MktRatingDetail navigate={navigate} params={route.params} />}
        {(route.name === "security" || route.name === "business" || route.name === "docs" || route.name === "faq" || route.name === "company") &&
          <MktSimple which={route.name} navigate={navigate} />}
        <MktFooter navigate={navigate} />
        <ToastStack />
      </>
    );
  }

  // Onboarding
  if (route.name === "onboarding") {
    return (
      <>
        <TopoBackground variant="ambient" />
        <Onboarding navigate={navigate} onComplete={completeOnboarding} />
        <ToastStack />
      </>
    );
  }

  // App shell
  return (
    <>
      <TopoBackground variant="ambient" />
      <div className="app-root">
        <Sidebar route={path} navigate={navigate} onDisconnect={disconnect} />
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <TopBar navigate={navigate} onOpenPalette={() => setPaletteOpen(true)} onDisconnect={() => { disconnect(); navigate("/app"); }} wallet="0x8a7F…9c3D" theme={theme} toggleTheme={toggleTheme} />
          <main className="content" key={path}>
            {route.name === "dashboard" && <Dashboard navigate={navigate} />}
            {route.name === "opportunities" && <Opportunities navigate={navigate} />}
            {route.name === "asset-detail" && <AssetDetail navigate={navigate} params={route.params} />}
            {route.name === "compliance" && <Compliance navigate={navigate} />}
            {route.name === "simulator" && <Simulator navigate={navigate} />}
            {route.name === "copilot" && <CopilotPage navigate={navigate} />}
            {route.name === "policies" && <Policies />}
            {route.name === "decisions" && <Decisions navigate={navigate} />}
            {route.name === "agent" && <Agent />}
            {route.name === "integrations" && <Integrations />}
            {route.name === "settings" && <Settings onDisconnect={() => { disconnect(); navigate("/app"); }} />}
          </main>
        </div>
      </div>
      <CopilotWidget navigate={navigate} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} navigate={navigate} />
      <ToastStack />
    </>
  );
}


export { App };
