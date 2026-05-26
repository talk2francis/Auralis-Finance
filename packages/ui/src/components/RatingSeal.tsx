import { cn } from "../lib";

const gradeTone: Record<string, string> = { AAA: "#7A5524", AA: "#7A5524", A: "#087568", BBB: "#087A43", BB: "#9A6207", B: "#9A6207", C: "#B4232E" };
export function RatingSeal({ grade = "A", size = "md", className }: { grade?: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const px = size === "lg" ? 72 : size === "sm" ? 42 : 56;
  return <div className={cn("inline-flex items-center justify-center rounded-full border bg-[var(--surface)] font-display font-semibold shadow-[var(--shadow-soft)]", className)} style={{ width: px, height: px, color: gradeTone[grade] ?? "var(--brass)", borderColor: "currentColor" }}>{grade}</div>;
}
