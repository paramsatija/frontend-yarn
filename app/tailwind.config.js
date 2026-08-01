/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        yarn: {
          base: '#0a0a0a',
          surface: '#141414',
          elevated: '#1a1a1a',
          neon: '#ccff00',
          capital: '#00ff9d',
          legal: '#ffb800',
          enterprise: '#a855f7',
          governance: '#ff6b35',
          treasury: '#00d4ff',
        },
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['IBM Plex Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      fontSize: {
        'display-xl': ['clamp(48px, 8vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-l': ['clamp(40px, 5vw, 80px)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
        'heading-m': ['clamp(20px, 2vw, 32px)', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'heading-s': ['clamp(16px, 1.5vw, 20px)', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'body': ['clamp(12px, 1.2vw, 16px)', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-small': ['clamp(11px, 1vw, 14px)', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'caption': ['clamp(9px, 0.8vw, 11px)', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'data': ['14px', { lineHeight: '1.0', letterSpacing: '0.04em' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
