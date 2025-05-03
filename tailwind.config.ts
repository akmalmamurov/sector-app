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
        xs: "390px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        lgl: "1025px",
        xl: "1280px",
        "2xl": "1382px",
      },
      container: {
        center: true,
        padding: {
          default: "4px",
          xs: "0px",
        },
        screens: {
          xs: "389px",
          sm: "476px",
          md: "668px",
          lg: "892px",
          xl: "1180px",
          "2xl": "1422px",
        },
      },
      colors: {
        cerulean: "#0054AE",
        whiteOut: "#FBFBFB",
        greenLight: "#6AB04C",
        noghreiSilver:"#BDBDBD",
        background: "#FAFAFA",
        superSilver: "#EEEEEE",
        bleachedSilk: "#F3F3F3",
        textColor: "#333333",
        cottonBall: "#F2F6FB",
        whisperBlue: "#E5EAF1",
        stoneCold: "#555555",
        darkSoul: "#A3A3A3",
        titleColor: "#3B3B3B",
        wasabiColor: "#929292",
        pelati: "#FF3333",
        dangerColor: "#EF403D",
        lightBg: "#F5F5F5",
        linkColor: "#3A92F0",
        celBlue: "#008CCB",
        beluga: "#F1F1F1",
        sunColor: "#FF8C00",
        orangeSun: "#EE8202",
        christmas: "#E0E0E0",
        weekColor: "#8C8C8C",
        lobster: "#0054AE1F",
        iconBox: "rgb(249, 249, 249)",
        merlin: "#408ed4",
        dove: "#8a8a8a",
        hoverBg: "rgb(251, 251, 251)",
        bannerBg: "rgb(255, 255, 255,0.314)",
        explosiveGrey: "#C4C4C4",
        lightBlack: "rgba(0, 0, 0, 0.87)",
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
        promotionShadow: "0 3px 31.5px 0 rgba(0, 0, 0, 0.1)",
        cartMenuShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px",
        navListShadow:
          "0 2px 4px -1px rgba(0,0,0,.04),0 4px 5px 0 rgba(0,0,0,.05),0 1px 10px 0 rgba(0,0,0,.07)",
        sidebarWadow: "0 10px 36px rgba(0, 0, 0, .1);",
        infoShadow: "0px 7px 20px rgba(0, 0, 0, 0.07)",
        productListShadow:
          "0 2px 4px -1px rgba(0, 0, 0, .04), 0 4px 5px 0 rgba(0, 0, 0, .05), 0 1px 10px 0 rgba(0, 0, 0, .07)",
        cardShadow:
          "0 12px 24px rgba(44, 39, 56, .02), 0 24px 48px rgba(44, 39, 56, .04)",
        toastShadow:
          "rgba(0,0,0,0.4) 0px 2px 4px -1px,rgba(0,0,0,0.05) 0px 4px 5px 0px,rgba(0,0,0,0.07) 0px 1px 10px 0px",
      },
      backgroundImage: {
        "home-gradient": "linear-gradient(hsla(0, 0%, 100%, 0), #fff 98%) ",
      },
    },
    animation: {
      "loading-bar": "loading 1s ease-in-out infinite",
      "cart-loading": "cartLoading 1s ease-in-out infinite",
    },
    keyframes: {
      loading: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(100%)" },
      },
      cartLoading: {
        "0%": { width: "0%" },
        "50%": { width: "50%" },
        "100%": { width: "100%" },
      },
    },
  },
  plugins: [plugin],
} satisfies Config;
