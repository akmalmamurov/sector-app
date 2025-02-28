import type { Config } from "tailwindcss";
import plugin from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial", "sans-serif"],
        wix: ["Wix Madefor Text", "sans-serif"],
      },
      screens: {
        xs: "380px",
        sm: "576px",
        md: "768px",
        lg: "972px",
        lgl: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
      colors: {
        cerulean: "#0054AE",
        whiteOut: "#FBFBFB",
        greenLight: "#6AB04C",
        background: "#FAFAFA",
        superSilver: "#EEEEEE",
        textColor: "#333333",
        cottonBall: "#F2F6FB",
        whisperBlue: "#E5EAF1",
        stoneCold: "#555555",
        darkSoul: "#A3A3A3",
        titleColor: "#3B3B3B",
        wasabiColor: "#929292",
        dangerColor: "#EF403D",
        lightBg: "#F5F5F5",
        linkColor: "#3A92F0",
        celBlue: "#008CCB",
        beluga: "#F1F1F1",
        sunColor: "#FF8C00",
        orangeSun: "#EE8202",
        christmas: "#E0E0E0",
        hoverBg: "rgb(251, 251, 251)",
        explosiveGrey: "#C4C4C4",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        sectionShadow: "rgba(0, 0, 0, 0.07) 0px 7px 10px",
        discountWadow: "0 10px 36px rgba(0,0,0,.1)",
        navListShadow:
          "0 2px 4px -1px rgba(0,0,0,.04),0 4px 5px 0 rgba(0,0,0,.05),0 1px 10px 0 rgba(0,0,0,.07)",
        sidebarWadow: "0 10px 36px rgba(0, 0, 0, .1);",
        infoShadow: "rgba(0, 0, 0, 0.07) 0px 7px 20px;",
        toastShadow:
          "rgba(0,0,0,0.4) 0px 2px 4px -1px,rgba(0,0,0,0.05) 0px 4px 5px 0px,rgba(0,0,0,0.07) 0px 1px 10px 0px",
      },
    },
  },
  plugins: [plugin],
} satisfies Config;
