/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        exo: ["Exo 2", "sans-serif"],
        nosifer: ["Nosifer", "sans-serif"],
      },
    },
  },
  plugins: [],
};
