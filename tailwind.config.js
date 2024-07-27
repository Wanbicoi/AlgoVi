/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zinc: {
          750: "#333338",
          950: "#0c0c0e",
        },
      },
      fontFamily: {
        majorMono: ['"Major Mono Display"', "monospace"],
        quicksand: ['"Quicksand"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
