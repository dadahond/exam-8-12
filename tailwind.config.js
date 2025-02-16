/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        royalPurple: "#7C5DFA",
        softLavender: "#9277FF",
        deepNavy: "#1E2139",
        darkSlate: "#373B53",
        cloudBlue: "#DFE3FA",
        steelBlue: "#888EB0",
        mutedBlue: "#7E88C3",
        midnightBlack: "#0C0E16",
        coralRed: "#EC5757",
        softRed: "#FF9797",
        lightMist: "#F8F8FB",
        charcoalBlue: "#141625",

        // Dark mode colors
        dark: {
          bg: "#141625",
          text: "#DFE3FA",
          card: "#1E2139",
        },
      },
      fontFamily: {
        spartanBold: ["Spartan"],
        spartanMedium: ["Spartan"],
      },
    },
  },
  darkMode: "class", // Enable dark mode with class
  plugins: [require("daisyui"), "tailwind-scrollbar"],
  daisyui: {
    themes: ["light", "dark"],
  },
};
