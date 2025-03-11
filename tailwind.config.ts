import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        Abril_Fatface: ["Abril Fatface", "serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "991px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
        },
      },
      colors: {
        sport: "#57c4ff31",
        fashion: "#da85c731",
        food: "#7fb88133",
        travel: "#ff795736",
        culture: "#ffb04f45",
        coding: "#5e4fff31",
      },
    },
  },
  plugins: [],
} satisfies Config;
