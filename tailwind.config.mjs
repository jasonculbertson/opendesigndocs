/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'SF Pro Icons',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        serif: ['New York', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1d1d1f',
            '--tw-prose-headings': '#1d1d1f',
            '--tw-prose-links': '#0066cc',
            '--tw-prose-bold': '#1d1d1f',
            '--tw-prose-bullets': '#86868b',
            maxWidth: '680px',
            fontSize: '19px',
            lineHeight: '1.47059',
            color: '#1d1d1f',
            fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
            h1: {
              fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: '600',
              fontSize: '48px',
              letterSpacing: '-0.003em',
              marginTop: '0',
              marginBottom: '1.5rem',
              lineHeight: '1.08349'
            },
            h2: {
              fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: '600',
              fontSize: '28px',
              letterSpacing: '.007em',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
              lineHeight: '1.20849'
            },
            h3: {
              fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: '600',
              fontSize: '24px',
              letterSpacing: '.009em',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: '1.20849'
            },
            p: {
              marginTop: '0',
              marginBottom: '1.4em',
              lineHeight: '1.47059'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              color: '#1d1d1f',
              backgroundColor: '#f5f5f7',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
              fontSize: '0.9em',
              fontFamily: 'SF Mono, Monaco, Consolas, monospace'
            },
            ul: {
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              lineHeight: '1.47059',
            },
            'ul > li': {
              paddingLeft: '1.5em',
            },
            'ul > li::before': {
              width: '0.375em',
              height: '0.375em',
              top: '0.6875em',
              left: '0.25em',
              backgroundColor: '#86868b',
              borderRadius: '50%'
            },
            strong: {
              fontWeight: '600',
              color: '#1d1d1f'
            },
            a: {
              color: '#0066cc',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};