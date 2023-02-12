/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'title': `36px`,
        'section': `24px`,
        'src': `20px`,
        'caption': `16px`
      },
      fontWeight: {
        'title': `800`,
        'section': `600`,
        'src': `400`,
        'caption': `400`
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        DEFAULT: '3px',
      },
      colors: {
        'background': '#ffffff',
        'main': '#000000',
        'enabled': '#4e54e5',
        'disabled': '#8e908e',
      },
    },
  },
  plugins: [],
}