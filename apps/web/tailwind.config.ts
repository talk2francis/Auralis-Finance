import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        border: "var(--border)",
        "text-secondary": "var(--text-secondary)",
        teal: "var(--teal)",
        "teal-wash": "var(--teal-wash)",
        emerald: "var(--emerald)",
        amber: "var(--amber)",
        rose: "var(--rose)",
        brass: "var(--brass)",
      },
      borderRadius: { card: "var(--radius-card)" },
      boxShadow: { soft: "var(--shadow-soft)" },
      fontFamily: {
        display: ["Newsreader", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
    },
  },
} satisfies Config;
