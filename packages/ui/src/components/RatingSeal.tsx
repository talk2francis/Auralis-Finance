import { cn } from "../lib";

const gradeTone: Record<string, string> = { AAA: "#B08442", AA: "#B08442", A: "#0E9E8C", BBB: "#0F9D58", BB: "#D9870B", B: "#D9870B", C: "#D64550" };
export function RatingSeal({ grade = "A", size = "md", className }: { grade?: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const px = size === "lg" ? 72 : size === "sm" ? 42 : 56;
  return <div className={cn("inline-flex items-center justify-center rounded-full border bg-[var(--surface)] font-display font-semibold shadow-[var(--shadow-soft)]", className)} style={{ width: px, height: px, color: gradeTone[grade] ?? "var(--brass)", borderColor: "currentColor" }}>{grade}</div>;
}
