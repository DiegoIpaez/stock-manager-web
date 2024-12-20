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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        ["primary-dark"]: "var(--primary-dark)",
        ["primary-light"]: "var(--primary-light)",
        danger: "var(--danger)",
        ["danger-dark"]: "var(--danger-dark)",
        ["danger-light"]: "var(--danger-light)",
        warning: "var(--warning)",
        success: "var(--success)",
      },
    },
  },
  plugins: [],
};
export default config;
