import type { Config } from "tailwindcss";

// Tous les tons viennent des variables CSS définies dans app/globals.css (:root).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        surface: token("surface"),
        surfaceRaised: token("surface-raised"),
        foreground: token("foreground"),
        muted: token("muted"),
        line: token("line"),
        accent: {
          DEFAULT: token("accent"),
          soft: token("accent-soft"),
          ink: token("accent-ink"),
          // Alias historiques (chatbot, 404…) : ramenés sur l'indigo.
          bright: token("accent-soft"),
          electric: token("accent-soft"),
          dim: token("accent"),
        },
        destructive: "#EF4444",
        border: "rgb(var(--line) / 0.10)",
      },
      borderColor: {
        DEFAULT: "rgb(var(--line) / 0.10)",
      },
      fontFamily: {
        // Une seule police sur tout le site : Poppins.
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Échelle display : fluide entre mobile et 1920px.
        "display-xl": ["clamp(2.75rem, 9vw, 9rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6.5vw, 6.5rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 4.2vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.5rem, 2.8vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        label: ["0.75rem", { lineHeight: "1.1rem", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        content: "90rem",
        prose: "38rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
