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
        "minimal": ["var(--font-minimal-mono)"],
        "geist": ["var(--font-geist-sans)"],
        "geistMono": ["var(--font-geist-mono)"]
      },
      colors: {
        foreground: "var(--foreground)",
        background: "#FBFCF9",
        primary: "#DD6F45",
        textPrimary: "#1C1D21",
      },
      keyframes: {
        blurFade: {
          '0%': { 
            opacity: '0',
            filter: 'blur(12px)',
            transform: 'translateY(4px)'
          },
          '20%': {
            opacity: '0.2',
            filter: 'blur(8px)',
            transform: 'translateY(3px)'
          },
          '40%': {
            opacity: '0.4',
            filter: 'blur(6px)',
            transform: 'translateY(2px)'
          },
          '60%': {
            opacity: '0.6',
            filter: 'blur(4px)',
            transform: 'translateY(1px)'
          },
          '80%': {
            opacity: '0.8',
            filter: 'blur(2px)',
            transform: 'translateY(0px)'
          },
          '100%': { 
            opacity: '1',
            filter: 'blur(0)',
            transform: 'translateY(0)'
          },
        },
        spring: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        blurFade: 'blurFade 0.5s ease-out forwards',
        spring: 'spring 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '24px 24px',
      },
    },
  },
  plugins: [],
};

export default config;
