const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF0C4',
        garnet: '#8C1007',
        charcoal: '#1A1A1A',
        primary: '#8C1007',
        background: '#FFF0C4',
      },
      fontFamily: {
        clash: ['"Clash Display"', ...defaultTheme.fontFamily.sans],
        jakarta: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        display: ['"Clash Display"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

