/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        },
        bg: {
          DEFAULT: 'var(--color-bg)',
          secondary: 'var(--color-bg-secondary)',
        },
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
        article: '720px',
        sidebar: '280px',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text)',
            '--tw-prose-headings': 'var(--color-text)',
            '--tw-prose-links': 'var(--color-secondary)',
            '--tw-prose-bold': 'var(--color-text)',
            '--tw-prose-bullets': 'var(--color-secondary)',
            '--tw-prose-counters': 'var(--color-secondary)',
            '--tw-prose-code': 'var(--color-text)',
            '--tw-prose-pre-bg': 'var(--color-bg-secondary)',
            '--tw-prose-quote-borders': 'var(--color-accent)',
            lineHeight: '1.9',
            fontSize: '16px',
            h2: {
              borderBottom: 'none',
              borderLeft: '4px solid #1B4F72',
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '12px 16px',
              borderRadius: '0 6px 6px 0',
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            h3: {
              borderLeft: '2px solid #E5E7EB',
              paddingLeft: '12px',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: 'var(--color-accent)',
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '1rem 1.25rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            a: {
              color: 'var(--color-secondary)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: 'var(--color-primary)',
              },
            },
            code: {
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '0.5rem',
            },
            img: {
              borderRadius: '0.5rem',
            },
            'ul > li::marker': {
              color: 'var(--color-secondary)',
            },
            'ol > li::marker': {
              color: 'var(--color-secondary)',
            },
          },
        },
      }),
      fontSize: {
        'h1': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'h1-mobile': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.4', fontWeight: '700' }],
        'h2-mobile': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3-mobile': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.8' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'code': ['14px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
