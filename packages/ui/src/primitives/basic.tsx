import * as React from "react";
import { cn } from "../lib";

export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span className={cn("inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium", className)} {...props} />;
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={cn("h-10 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm", className)} {...props} />);
Input.displayName = "Input";
export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("animate-pulse rounded-md bg-[var(--surface-muted)]", className)} {...props} />;
export const Table = ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => <table className={cn("w-full border-collapse text-sm", className)} {...props} />;
export const ProgressBar = ({ value = 0 }: { value?: number }) => <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]"><div className="h-full bg-[var(--teal)]" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
