export const auralisTokens = {
  ink: "#0B1220",
  paper: "#FBFBF9",
  surface: "#FFFFFF",
  surfaceMuted: "#F4F5F3",
  border: "#E4E6E2",
  textSecondary: "#5B6472",
  teal: "#0E9E8C",
  tealWash: "#EAF6F4",
  emerald: "#0F9D58",
  amber: "#D9870B",
  rose: "#D64550",
  brass: "#B08442",
  radius: "14px",
  shadow: "0 18px 48px rgba(11, 18, 32, 0.08)",
} as const;

export const cssVariables = `
:root {
  --ink: ${auralisTokens.ink};
  --paper: ${auralisTokens.paper};
  --surface: ${auralisTokens.surface};
  --surface-muted: ${auralisTokens.surfaceMuted};
  --border: ${auralisTokens.border};
  --text-secondary: ${auralisTokens.textSecondary};
  --teal: ${auralisTokens.teal};
  --teal-wash: ${auralisTokens.tealWash};
  --emerald: ${auralisTokens.emerald};
  --amber: ${auralisTokens.amber};
  --rose: ${auralisTokens.rose};
  --brass: ${auralisTokens.brass};
  --radius-card: ${auralisTokens.radius};
  --shadow-soft: ${auralisTokens.shadow};
  --font-display: Newsreader, Georgia, serif;
  --font-ui: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
}`;

export const tailwindPreset = {
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
        ui: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      spacing: { grid: "8px" },
    },
  },
};
