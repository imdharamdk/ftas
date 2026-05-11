import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#030508",
        graphite: "#0a0f16",
        plasma: "#8a5cff",
        ion: "#00e7ff",
        signal: "#41ffb4",
        solar: "#ffc857",
      },
      boxShadow: {
        neon: "0 0 40px rgba(0, 231, 255, 0.22)",
        plasma: "0 0 42px rgba(138, 92, 255, 0.24)",
      },
      animation: {
        "grid-flow": "grid-flow 18s linear infinite",
        "scan-line": "scan-line 5s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "pulse-border": "pulse-border 3.4s ease-in-out infinite",
        "signal-wave": "signal-wave 2.6s ease-in-out infinite",
        "rotate-slow": "rotate-slow 28s linear infinite",
      },
      keyframes: {
        "grid-flow": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "96px 96px, -96px -96px" },
        },
        "scan-line": {
          "0%, 100%": { transform: "translateY(-12%)", opacity: "0" },
          "20%, 75%": { opacity: "0.95" },
          "50%": { transform: "translateY(112%)", opacity: "0.6" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
        "pulse-border": {
          "0%, 100%": { opacity: "0.38" },
          "50%": { opacity: "0.9" },
        },
        "signal-wave": {
          "0%, 100%": { transform: "scaleY(0.34)", opacity: "0.55" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
