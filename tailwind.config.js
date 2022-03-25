const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#FCC822',
      secondary: '#333333',
      disabled: '#D1D1D1',
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
