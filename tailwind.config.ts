import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Budgexa Brand Palette ── */
        Budgexa: {
          green:          "#254F22",
          orange:         "#F5824A",
          alert:          "#A03A13",
          beige:          "#EDE4CC",
          "green-dark":   "#1a3818",
          "green-light":  "#16A34A",
          "orange-dark":  "#d96a34",
          "beige-dark":   "#ddd3b5",
          "beige-light":  "#f5f0e4",
          text:           "#1a2e19",
          "text-muted":   "#4a6548",
          muted:          "#f3f4f6",
          lemon:          "#DCFCE7",
          grey:           "#6B7280",
          ash:            "#F6F7F6",
          red:            "#df0e0ee2",

          /* ── Smart Stash / Sage palette ── */
          sage: {
            DEFAULT:  "#CBE8C3",   // card bg — bg-Budgexa-sage
            dark:     "#3D8C3A",   // header icon circle — bg-Budgexa-sage-dark
            mid:      "#A8CBA1",   // row icon circle — bg-Budgexa-sage-mid
            label:    "#3d6b38",  
          },
        },

        /* ── Semantic aliases (shadcn compatibility) ── */
        background: "var(--background)",
        foreground:  "var(--foreground)",
        primary: {
          DEFAULT:    "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border:  "var(--border)",
        input:   "var(--input)",
        ring:    "var(--ring)",
        destructive: {
          DEFAULT:    "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
        poppins: ["var(--font-display)", "sans-serif"],
      },
      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        xl:   "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card:      "0 2px 16px 0 rgba(37,79,34,0.08)",
        "card-lg": "0 8px 40px 0 rgba(37,79,34,0.12)",
        glow:      "0 0 32px 0 rgba(245,130,74,0.25)",
      },
      backgroundImage: {
        "hero-grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }, 
      },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
      },
      animation: {
        "slide-up":       "slide-up 0.6s ease-out both",
        "slide-up-delay": "slide-up 0.6s ease-out 0.15s both",
        "slide-up-slow":  "slide-up 0.6s ease-out 0.3s both",
        "fade-in":        "fade-in 0.8s ease-out both",
        "fade-up-1": "fade-up 0.8s ease both",
        "fade-up-2": "fade-up 0.8s 0.15s ease both",
        "fade-up-3": "fade-up 0.8s 0.30s ease both",
        "fade-up-4": "fade-up 0.8s 0.45s ease both",
        float:            "float 4s ease-in-out infinite",
        pulse2:           "pulse2 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;