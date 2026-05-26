"use client";

import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value }: { value: string }) {
  const number = Number(value.replace(/[^0-9.]/g, ""));
  const reduce = useReducedMotion();
  const spring = useSpring(reduce || Number.isNaN(number) ? number : 0, { stiffness: 70, damping: 22 });
  const display = useTransform(spring, (latest) => value.replace(number.toString(), formatLike(value, latest)));
  useEffect(() => { spring.set(Number.isNaN(number) ? 0 : number); }, [number, spring]);
  if (Number.isNaN(number)) return <>{value}</>;
  return <motion.span>{display}</motion.span>;
}

export function MotionDonut({ percent, label = "allocation" }: { percent: number; label?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-label={`${label}: ${percent}%`}
      className="grid h-28 w-28 place-items-center rounded-full"
      initial={reduce ? false : { background: "conic-gradient(var(--teal) 0%, var(--surface-muted) 0)" }}
      animate={{ background: `conic-gradient(var(--teal) ${percent}%, var(--surface-muted) 0)` }}
      transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
    >
      <div className="grid h-20 w-20 place-items-center rounded-full bg-[var(--surface)] font-display">{percent}%</div>
    </motion.div>
  );
}

export function DrawOnBar({ value }: { value: number }) {
  const reduce = useReducedMotion();
  return <motion.div className="h-2 rounded-full bg-[var(--teal)]" initial={reduce ? false : { width: 0 }} animate={{ width: `${Math.max(0, Math.min(100, value))}%` }} transition={{ duration: reduce ? 0 : 0.2 }} />;
}

function formatLike(original: string, latest: number) {
  const decimals = original.includes(".") ? 2 : 0;
  return latest.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}
