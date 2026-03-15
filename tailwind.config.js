/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#070d17",
        panel: "#111b2d",
        panelAlt: "#16233a",
        accent: "#53b4ff",
        accentSecondary: "#3ad4a6",
        muted: "#9fb0ce",
        border: "#2a3a58",
        danger: "#ff7a7a",
        warning: "#f6b862"
      },
      boxShadow: {
        premium: "0 20px 60px rgba(4, 9, 18, 0.45)",
        card: "0 10px 30px rgba(4, 9, 18, 0.35)"
      },
      borderRadius: {
        panel: "14px"
      },
      backgroundImage: {
        "app-gradient":
          "radial-gradient(circle at 0% 0%, rgba(18, 37, 68, 0.95) 0%, transparent 45%), radial-gradient(circle at 100% 0%, rgba(18, 48, 58, 0.85) 0%, transparent 40%), linear-gradient(170deg, #050b14 0%, #081121 55%, #070d17 100%)",
        "panel-gradient":
          "linear-gradient(180deg, rgba(18, 31, 50, 0.96), rgba(14, 24, 39, 0.98))"
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(8px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "fade-up": "fade-up 220ms ease-out"
      },
      fontFamily: {
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "Noto Sans", "sans-serif"]
      }
    }
  },
  plugins: []
};
