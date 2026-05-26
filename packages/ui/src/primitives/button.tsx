import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib";

const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)]",
  {
    variants: {
      variant: {
        primary: "bg-[var(--ink)] text-white hover:bg-[#172033]",
        secondary: "border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-muted)]",
        ghost: "text-[var(--ink)] hover:bg-[var(--surface-muted)]",
        teal: "bg-[var(--teal)] text-white hover:brightness-95",
      },
      size: { sm: "h-8 px-3", md: "h-10 px-4", lg: "h-12 px-5" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
