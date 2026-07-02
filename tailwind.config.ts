import type { Config } from "tailwindcss";

/**
 * AVAN Group — Tailwind config.
 * Color ramps + base mirror `../avan-color-tokens.json`.
 * Easing/duration mirror `../avan-motion-tokens.json`.
 * Fonts resolve through CSS variables set in app/layout.tsx (see styles/tokens.css).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F1F6FF", 100: "#E3ECFB", 200: "#CAD9F3", 300: "#ADC1E5",
          400: "#8EA6D1", 500: "#7089B6", 600: "#556C96", 700: "#3F5377",
          800: "#2B3B57", 900: "#141E2D", 950: "#0E1722",
        },
        bronze: {
          50: "#FBF5EC", 100: "#F3EADC", 200: "#E6D6BD", 300: "#D4BD9A",
          400: "#C5A572", 500: "#A8895C", 600: "#8A6E45", 700: "#664F29",
          800: "#4A3819", 900: "#32240D", 950: "#1F1505",
        },
        verdant: {
          50: "#EEF9F2", 100: "#DEF1E5", 200: "#C1E2CD", 300: "#9FCDB1",
          400: "#7BB593", 500: "#599875", 600: "#3F7B5A", 700: "#2B5F43",
          800: "#1B452F", 900: "#0E2E1D", 950: "#051C10",
        },
        amber: {
          50: "#FFF4E4", 100: "#FDE8CD", 200: "#F5D2A3", 300: "#E8B672",
          400: "#D5983B", 500: "#BA7900", 600: "#995D00", 700: "#794600",
          800: "#593000", 900: "#3D1E00", 950: "#281100",
        },
        oxblood: {
          50: "#FFF1ED", 100: "#FFE3DD", 200: "#FDCBBF", 300: "#F2AD9D",
          400: "#DF8C7A", 500: "#C46D5A", 600: "#A25241", 700: "#8A4B3C",
          800: "#5F281D", 900: "#421810", 950: "#2B0C06",
        },
        azure: {
          50: "#EBF8FF", 100: "#D9EEFF", 200: "#B9DDFC", 300: "#93C7F2",
          400: "#6BACE0", 500: "#478FC6", 600: "#2C72A5", 700: "#195883",
          800: "#0B3E61", 900: "#032944", 950: "#00192C",
        },
        neutral: {
          50: "#F5F6F7", 100: "#EAEBED", 200: "#D6D8DC", 300: "#BEC0C5",
          400: "#A2A5AB", 500: "#85898F", 600: "#696C72", 700: "#505358",
          800: "#393B3F", 900: "#25272A", 950: "#161719",
        },
        cream: "#F4F1EA",
        "cream-raised": "#FAF8F3",
        obsidian: "#0A0E14",
        // Semantic aliases (light context)
        ftext: "#2A2E35",
        "ftext-soft": "#5C6470",
      },
      fontFamily: {
        serif: ["var(--avan-font-serif)", "Georgia", "serif"],
        sans: ["var(--avan-font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--avan-font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(96px, 15vw, 240px)", { lineHeight: "0.85", letterSpacing: "0.02em" }],
        "display-l": ["clamp(42px, 6.5vw, 88px)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-m": ["clamp(28px, 3.5vw, 44px)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        stat: ["clamp(56px, 8vw, 104px)", { lineHeight: "1" }],
        "body-lg": ["19px", { lineHeight: "1.7" }],
        body: ["17px", { lineHeight: "1.62" }],
        caption: ["13px", { lineHeight: "1.5" }],
        overline: ["11px", { lineHeight: "1.4", letterSpacing: "0.32em" }],
      },
      maxWidth: {
        container: "1320px",
        prose68: "68ch",
      },
      spacing: {
        "section-y": "clamp(96px, 12vh, 160px)",
        "section-y-sm": "72px",
        gutter: "32px",
        "gutter-sm": "22px",
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "2px",
      },
      boxShadow: {
        lift: "0 1px 0 rgba(20,30,45,0.04)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        accelerate: "cubic-bezier(0.4, 0, 1, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
        emphasized: "cubic-bezier(0.2, 0, 0, 1)",
        settle: "cubic-bezier(0.34, 1.16, 0.64, 1)",
      },
      transitionDuration: {
        fast: "100ms",
        normal: "200ms",
        slow: "300ms",
        deliberate: "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
