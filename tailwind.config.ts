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
          // Alias historiques (chatbot, 404…) : ramenés sur l'indigo.
          bright: token("accent-soft"),
          electric: token("accent-soft"),
          dim: token("accent"),
        },
        destructive: "#EF4444",
        border: "rgb(255 255 255 / 0.10)",
      },
      borderColor: {
        DEFAULT: "rgb(255 255 255 / 0.10)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Échelle display : fluide entre mobile et 1920px.
        "display-xl": ["clamp(4.5rem, 17vw, 17rem)", { lineHeight: "0.82", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(3.5rem, 11vw, 11rem)", { lineHeight: "0.85", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2.75rem, 7vw, 6.5rem)", { lineHeight: "0.88", letterSpacing: "-0.005em" }],
        "display-sm": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "0.92" }],
        label: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.14em" }],
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
