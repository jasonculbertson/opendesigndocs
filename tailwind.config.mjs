/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(41, 41, 41)',
            '--tw-prose-headings': 'rgb(41, 41, 41)',
            maxWidth: '65ch',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: 'rgb(41, 41, 41)',
            fontFamily: 'Merriweather, Georgia, serif',
            h1: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '800',
              fontSize: '2.5rem',
              marginBottom: '2rem',
              lineHeight: '1.2'
            },
            h2: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '700',
              fontSize: '1.875rem',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
              lineHeight: '1.3'
            },
            h3: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '600',
              fontSize: '1.5rem'
            },
            p: {
              marginTop: '1.5rem',
              marginBottom: '1.5rem'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              color: 'rgb(41, 41, 41)',
              backgroundColor: 'rgb(243, 244, 246)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em'
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