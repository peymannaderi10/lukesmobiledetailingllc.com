/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D21F3C",
          light: "#E8364F",
          dark: "#A0182E",
        },
        secondary: {
          DEFAULT: "#D21F3C",
          light: "#E8364F",
        },
        "background-dark": "#0A0A0A",
        "accent-dark": "#171717",
        "surface-dark": "#121212",
        white: "#FFFFFF",
        gray: {
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
      fontFamily: {
        display: ["var(--font-lexend)", "Lexend", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      transitionDuration: {
        600: "600ms",
      },
    },
  },
  plugins: [],
};
