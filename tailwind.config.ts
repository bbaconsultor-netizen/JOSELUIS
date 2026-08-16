import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff4e6",
          100: "#ffe2bf",
          200: "#ffc482",
          300: "#ffa347",
          400: "#ff8517",
          500: "#f36c00",
          600: "#dd5f00",
          700: "#c94f00",
          800: "#973c00",
          900: "#6b2a00",
        },
        accent: {
          50: "#fdf3ec",
          100: "#f9ddc9",
          200: "#f0b98c",
          300: "#e69354",
          400: "#d97324",
          500: "#c94f00",
          600: "#a94200",
          700: "#873500",
          800: "#652700",
          900: "#431a00",
        },
        ink: "#111111",
        paper: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
