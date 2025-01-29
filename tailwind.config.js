/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        default: '12px',
        sm: '16px',
        lg: '20px',
      },
      maxWidth: {
        default: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    colors: {
      primary: '#253466',
      secondary: '#E5413F',
      white: '#ffffff',
      black: '#000000',
      'light-white': '#D3D6E0',
      'light-thin': '#F8F8F8',
      'light-black': '#333333',
    },
    boxShadow: {
      nav: '0px 0px 23.6px 0px #0000001A',
      hero: '8px 8px 6px 0px #253466',
      'hero-image': '3px 3px 7px -2px #253466',
      register: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    },

    backgroundImage: {
      'company-rank': "url('/src/assets/images/png/company-rank.png')",
      journey: "url('/src/assets/images/png/journey-bg.png')",
      'footer-gradient':
        'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 5.5%, #FFFFFF 52.75%, rgba(255, 255, 255, 0.1) 95%)',
    },
    extend: {
      colors: {
        'orange-yellow': '#fff000',
        'orange-red': '#FF1100',
      },
      fontSize: {
        '3xl': '28px',
        '4xl': '32px',
        // '5xl': '36px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.common-transition': {
          transition: 'all 300ms linear',
        },
        '.shadow-hover-black': {
          boxShadow: '0 -50px 0 #000 inset',
        },
        '.shadow-hover-white': {
          boxShadow: '0 -50px 0 #fff inset',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
