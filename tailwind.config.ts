import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontWeight: {
        '550': '550',
        '650': '650',
        '750': '750',
      },
      fontSize: {
        'hero': ['clamp(3rem, 6.5vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'page-title': ['clamp(2.5rem, 4.5vw, 4.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'section-title': ['clamp(2rem, 3.5vw, 3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'card-title': ['clamp(1.2rem, 1.8vw, 1.45rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-crimson': 'linear-gradient(135deg, hsl(0 84% 50%), hsl(0 72% 38%))',
        'graphite-radial': 'radial-gradient(ellipse at top, hsl(240 10% 12%), hsl(240 10% 6%))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        graphite: {
          DEFAULT: 'hsl(var(--graphite))',
          light: 'hsl(var(--graphite-light))',
          mid: 'hsl(var(--graphite-mid))',
        },
        ivory: 'hsl(var(--ivory))',
        crimson: {
          DEFAULT: 'hsl(var(--crimson))',
          dark: 'hsl(var(--crimson-dark))',
          bright: 'hsl(var(--crimson-bright))',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          secondary: 'hsl(var(--surface-secondary))',
          tertiary: 'hsl(var(--surface-tertiary))',
        },
        content: {
          DEFAULT: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
          faint: 'hsl(var(--text-faint))',
        },
        line: {
          subtle: 'hsl(var(--border-subtle))',
          DEFAULT: 'hsl(var(--border-default))',
          strong: 'hsl(var(--border-strong))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
