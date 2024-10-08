import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xsp: "320px",
        smp: "360px",
        mdp: "380px",
        lgp: "420px",
        xlp: "440px",
      },
      colors: {
        primary: setColors("primary"),
        font: {
          DEFAULT: "rgb(var(--corner-default))",
          primary: "rgb(var(--font-primary))",
          secondary: "rgb(var(--font-secondary))",
          custom: {
            light: "rgb(var(--font-custom-light))",
            dark: "rgb(var(--font-custom-dark))",
          },
        },
        fill: {
          DEFAULT: "rgb(var(--fill-default))",
          primary: "rgb(var(--fill-primary))",
          secondary: "rgb(var(--fill-secondary))",
        },
        corner: {
          DEFAULT: "rgb(var(--corner-default))",
          primary: "rgb(var(--corner-primary))",
          secondary: "rgb(var(--corner-secondary))",
        },
      },
      fontFamily: {
        "custom-serif": ["var(--font-serif)"],
        "custom-sans": ["var(--font-sans)"],
        "custom-mono": ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
  safelist: ["group"],
};
export default config;

function setColors(color: string) {
  return {
    50: `rgb(var(--${color}-50))`,
    100: `rgb(var(--${color}-100))`,
    200: `rgb(var(--${color}-200))`,
    300: `rgb(var(--${color}-300))`,
    400: `rgb(var(--${color}-400))`,
    500: `rgb(var(--${color}-500))`,
    600: `rgb(var(--${color}-600))`,
    700: `rgb(var(--${color}-700))`,
    800: `rgb(var(--${color}-800))`,
    900: `rgb(var(--${color}-900))`,
    950: `rgb(var(--${color}-950))`,
  };
}
