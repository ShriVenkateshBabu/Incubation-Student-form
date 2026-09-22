/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        institute: {
          red: "#8B1D1D",
          redDark: "#6E1616",
          text: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["Inter", "Calibri", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
