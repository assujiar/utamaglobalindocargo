import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "768px",
      md: "1024px",
      lg: "1440px",
      xl: "1441px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
          subtle: "var(--color-primary-subtle)",
        },
        bg: {
          light: "var(--color-bg-light)",
          dark: "var(--color-bg-dark)",
          "dark-elevated": "var(--color-bg-dark-elevated)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          inverse: "var(--color-text-inverse)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          dark: "var(--color-border-dark)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
      },
      fontFamily: {
        primary: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "30": "120px",
        "40": "160px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
      },
      maxWidth: {
        text: "720px",
        layout: "1440px",
      },
      fontSize: {
        "display-xl": ["96px", { lineHeight: "1.0" }],
        "display-lg": ["72px", { lineHeight: "1.05" }],
        "heading-xl": ["48px", { lineHeight: "1.15" }],
        "heading-lg": ["36px", { lineHeight: "1.2" }],
        "heading-md": ["28px", { lineHeight: "1.25" }],
        "body-lg": ["20px", { lineHeight: "1.6" }],
        body: ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        mono: ["14px", { lineHeight: "1.5" }],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        reveal: "var(--duration-reveal)",
      },
    },
  },
  plugins: [],
};

export default config;
