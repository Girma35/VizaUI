import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Home page palette (ColorHunt: FFF2C6, FFF8DE, AAC4F5, 8CA9FF)
        cream: { light: '#FFF8DE', DEFAULT: '#FFF2C6' },
        palette: { blue: '#AAC4F5', accent: '#8CA9FF' },
        btn: '#F6CE71',
        primary: { DEFAULT: '#7c3aed', foreground: '#ffffff' },
        'primary-foreground': '#ffffff',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        secondary: { DEFAULT: '#334155', foreground: '#e2e8f0' },
        'secondary-foreground': '#e2e8f0',
        muted: { foreground: '#94a3b8' },
        'muted-foreground': '#94a3b8',
        accent: { DEFAULT: '#475569', foreground: '#f8fafc' },
        'accent-foreground': '#f8fafc',
        card: { DEFAULT: '#1e293b', foreground: '#f1f5f9' },
        'card-foreground': '#f1f5f9',
        ring: '#7c3aed',
        input: '#334155',
        background: '#0f172a',
        foreground: '#f8fafc',
      },
    },
  },
}

export default config
