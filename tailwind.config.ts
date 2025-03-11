import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        bgStyle: "#57c4ff31",
        bgFashion: "#da85c731",
        bgFood: "#7fb88133",
        bgTravel: "#ff795736",
        bgCulture: "#ffb04f45",
        bgCoding: " #5e4fff31",
      },
    },
  },
  plugins: [],
} satisfies Config;
