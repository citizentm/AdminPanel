module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: '0.5rem',
      center: true,
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    fontFamily: {
      main: ['"Inter"', 'sans-serif', 'Arial'],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    extend: {},
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      backgroundColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['src/**/*.vue'],
  },
}
