import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#08090D",
        surface: "#0F1117",
        surfaceHover: "#141724",
        surfaceAlt: "#11131A",
        surfaceRaised: "#141823",
        border: "#1E2230",
        foreground: "#F2F3F7",
        muted: "#8B8FA3",
        accent: {
          DEFAULT: "#4F5DFF",
          dim: "#3B46C9",
          bright: "#7B85FF",
          electric: "#5EEAFF",
        },
        destructive: "#EF4444",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        aurora: "aurora 10s ease-in-out infinite",
        "grid-pan": "grid-pan 18s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
        "tile-in": "tile-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee 42s linear infinite",
        "marquee-reverse": "marquee-reverse 48s linear infinite",
      },
      keyframes: {
        "tile-in": {
          "0%": { opacity: "0", transform: "translate3d(0,10px,0) scale(0.92)" },
          "100%": { opacity: "1", transform: "translate3d(0,0,0) scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -5px, 0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -32px, 0) scale(1.08)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(-8%, -8%, 0) rotate(0deg) scale(1)", opacity: "0.75" },
          "50%": { transform: "translate3d(8%, 8%, 0) rotate(10deg) scale(1.15)", opacity: "1" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "64px 64px" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
