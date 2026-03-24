import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcfa',
          100: '#faf8f5',
          200: '#f4f1ec',
          300: '#e8e5e0',
        },
        ink: {
          DEFAULT: '#1a1a2e',
          light: '#64648b',
          faint: '#9494ad',
        },
        forest: {
          DEFAULT: '#2d6a4f',
          dark: '#1b4332',
          light: '#52b788',
          pale: '#d8f3dc',
        },
      },
      fontFamily: {
        serif: ['"Crimson Pro"', '"Noto Serif JP"', 'Georgia', 'serif'],
        sans: ['"Outfit"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
      typography: {
        editorial: {
          css: {
            '--tw-prose-body': '#1a1a2e',
            '--tw-prose-headings': '#1a1a2e',
            '--tw-prose-lead': '#64648b',
            '--tw-prose-links': '#2d6a4f',
            '--tw-prose-bold': '#1a1a2e',
            '--tw-prose-counters': '#64648b',
            '--tw-prose-bullets': '#9494ad',
            '--tw-prose-hr': '#e8e5e0',
            '--tw-prose-quotes': '#1a1a2e',
            '--tw-prose-quote-borders': '#2d6a4f',
            '--tw-prose-captions': '#64648b',
            '--tw-prose-code': '#1b4332',
            '--tw-prose-pre-code': '#1a1a2e',
            '--tw-prose-pre-bg': '#f4f1ec',
            '--tw-prose-th-borders': '#e8e5e0',
            '--tw-prose-td-borders': '#f4f1ec',
            'a': {
              color: '#2d6a4f',
              textDecoration: 'none',
              borderBottom: '1px solid #d8f3dc',
              transition: 'border-color 0.2s',
              '&:hover': {
                borderBottomColor: '#2d6a4f',
              },
            },
            'blockquote': {
              fontStyle: 'normal',
              borderLeftWidth: '3px',
              borderLeftColor: '#2d6a4f',
              backgroundColor: '#fdfcfa',
              padding: '0.75rem 1rem',
              borderRadius: '0 0.375rem 0.375rem 0',
            },
            'code': {
              fontWeight: '500',
              color: '#1b4332',
              backgroundColor: '#f4f1ec',
              borderRadius: '0.25rem',
              padding: '0.15rem 0.4rem',
              border: '1px solid #e8e5e0',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            'h1, h2, h3, h4': {
              fontFamily: '"Crimson Pro", "Noto Serif JP", Georgia, serif',
              letterSpacing: '-0.01em',
            },
            'h2': {
              marginTop: '2.5em',
            },
            'table': {
              fontSize: '0.875rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}
export default config