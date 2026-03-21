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
        article: '680px',
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
            '--tw-prose-code': '#1B4F72',
            '--tw-prose-pre-bg': '#1E293B',
            '--tw-prose-quote-borders': '#E5E7EB',
            lineHeight: '1.9',
            fontSize: '16px',
            color: '#333',
            h2: {
              fontSize: '20px',
              fontWeight: '700',
              borderLeft: '4px solid #1B4F72',
              borderBottom: '1px solid #E5E7EB',
              padding: '0 0 10px 14px',
              borderRadius: '0',
              marginTop: '44px',
              marginBottom: '20px',
            },
            h3: {
              fontSize: '17px',
              fontWeight: '600',
              borderLeft: '3px solid #2E75B6',
              paddingLeft: '14px',
              marginTop: '32px',
              marginBottom: '14px',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '4px',
              borderLeftColor: '#E5E7EB',
              backgroundColor: '#F9FAFB',
              padding: '16px 20px',
              borderRadius: '0 8px 8px 0',
              color: '#6B7280',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            a: {
              color: '#2E75B6',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: '#1B4F72',
              },
            },
            code: {
              backgroundColor: '#F3F4F6',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '400',
              fontSize: '14px',
              color: '#1B4F72',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: '#1E293B',
              borderRadius: '8px',
              padding: '20px',
              margin: '24px 0',
            },
            img: {
              borderRadius: '0.5rem',
            },
            ul: {
              paddingLeft: '1.5em',
              margin: '16px 0',
            },
            'ul > li': {
              marginBottom: '8px',
              lineHeight: '1.8',
            },
            'ul > li::marker': {
              color: '#2E75B6',
            },
            'ol > li': {
              marginBottom: '8px',
              lineHeight: '1.8',
            },
            'ol > li::marker': {
              color: '#2E75B6',
            },
          },
        },
      }),
      fontSize: {
        'h1': ['24px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h1-mobile': ['21px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2': ['20px', { lineHeight: '1.5', fontWeight: '700' }],
        'h2-mobile': ['18px', { lineHeight: '1.5', fontWeight: '700' }],
        'h3': ['17px', { lineHeight: '1.5', fontWeight: '600' }],
        'h3-mobile': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.9' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'code': ['14px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
