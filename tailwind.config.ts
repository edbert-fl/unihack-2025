const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral: {
          300: "hsl(var(--neutral-300))",
          800: "hsl(var(--neutral-800))",
        },
        indigo: {
          500: "hsl(var(--indigo-500))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": {
      ...newVars,
      "--background": "0 0% 0%",
      "--foreground": "210 40% 98%",
      "--card": "0 0% 0%",
      "--card-foreground": "210 40% 98%",
      "--popover": "0 0% 0%",
      "--popover-foreground": "210 40% 98%",
      "--primary": "0 0% 0%",
      "--primary-foreground": "210 40% 98%",
      "--secondary": "199 89% 77%",
      "--secondary-foreground": "0 0% 0%",
      "--muted": "217.2 32.6% 17.5%",
      "--muted-foreground": "215 20.2% 65.1%",
      "--accent": "199 89% 77%",
      "--accent-foreground": "0 0% 0%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "217.2 32.6% 17.5%",
      "--input": "217.2 32.6% 17.5%",
      "--ring": "199 89% 77%",
      "--radius": "0.5rem",
      "--neutral-300": "0 0% 85%",
      "--neutral-800": "0 0% 20%",
      "--indigo-500": "199 89% 77%",
    },
    ".dark": {
      "--background": "0 0% 0%",
      "--foreground": "210 40% 98%",
      "--card": "0 0% 0%",
      "--card-foreground": "210 40% 98%",
      "--popover": "0 0% 0%",
      "--popover-foreground": "210 40% 98%",
      "--primary": "0 0% 0%",
      "--primary-foreground": "210 40% 98%",
      "--secondary": "199 89% 77%",
      "--secondary-foreground": "0 0% 0%",
      "--muted": "217.2 32.6% 17.5%",
      "--muted-foreground": "215 20.2% 65.1%",
      "--accent": "199 89% 77%",
      "--accent-foreground": "0 0% 0%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "217.2 32.6% 17.5%",
      "--input": "217.2 32.6% 17.5%",
      "--ring": "199 89% 77%",
      "--neutral-300": "0 0% 85%",
      "--neutral-800": "0 0% 20%",
      "--indigo-500": "199 89% 77%",
    },
  });
}
