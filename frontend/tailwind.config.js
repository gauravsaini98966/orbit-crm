/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: "#0B1220",
          surface: "#121A2E",
          raised: "#1B2540",
          line: "#26314F",
        },
        paper: {
          DEFAULT: "#F6F7FB",
          surface: "#FFFFFF",
          raised: "#EEF1F8",
          line: "#DDE2EE",
        },
        signal: {
          DEFAULT: "#FF7A45",
          soft: "#FFB088",
        },
        orbit: {
          DEFAULT: "#5EEAD4",
          soft: "#99F6E4",
        },
        ink: {
          high: "#EAF0FF",
          mid: "#93A0C2",
          low: "#5A6584",
        },
        inkLight: {
          high: "#101425",
          mid: "#4B5573",
          low: "#8892AC",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(148,163,196,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,196,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slower": "spin-slow 70s linear infinite",
        "spin-reverse": "spin-reverse 55s linear infinite",
        drift: "drift 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
