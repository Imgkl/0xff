import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        "4k": "2560px",
      },
      fontFamily: {
        "minimal-mono": ["var(--font-minimal-mono)"],
        panchang: ["var(--font-panchang)"],
        "neutral-sans-regular": ["var(--font-neutral-sans-regular)"],
        "neutral-sans-medium": ["var(--font-neutral-sans-medium)"],
        "neutral-sans-bold": ["var(--font-neutral-sans-bold)"],
        "neutral-sans-black": ["var(--font-neutral-sans-black)"],
      },
      colors: {
        foreground: "var(--foreground)",
        background: "#FBFCF9",
        primary: "#DD6F45",
        textPrimary: "#1C1D21",
      },
    },
  },
  plugins: [],
};

export default config;
