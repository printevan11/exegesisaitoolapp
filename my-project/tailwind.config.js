/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a0f1f",
          900: "#0f1629",
          800: "#1a2847",
          700: "#2a3d5f",
          600: "#3a4d7f",
        },
        gold: {
          300: "#fcd34d",
          400: "#facc15",
          500: "#eab308",
        },
        slate: {
          300: "#cbd5e1",
          500: "#64748b",
        },
        emerald: {
          300: "#6ee7b7",
          500: "#10b981",
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
