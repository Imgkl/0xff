import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "220px",
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
        "4k": "2560px",
      },
      colors: {
        foreground: "var(--foreground)",
        background: "#fcfcfc"
      },
    },
  },
  plugins: [],
} satisfies Config;
