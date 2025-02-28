/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '12px',
        sm: '16px',
        lg: '20px',
      },
      maxWidth: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    fontSize: {
      'custom-5xl': '56px',
    },
    colors: {
      primary: '#253466',
      secondary: '#E5413F',
      white: '#ffffff',
      black: '#000000',
      'light-white': '#D3D6E0',
      'light-thin': '#F8F8F8',
      'light-black': '#333333',
      'light-blue': '#2289FF',
    },
    boxShadow: {
      nav: '0px 0px 23.6px 0px #0000001A',
      trusted: '0px 0px 7.5px 0px #00000026',
      hero: '8px 8px 6px 0px #253466',
      'hero-image': '3px 3px 7px -2px #253466',
      'job-card': '0px 0px 12px 0px #0000000D',
      'course-card': '0px 0px 22.7px 0px #00000029;',
      register: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    },
    backgroundImage: {
      'company-rank': "url('/src/assets/images/png/company-rank.png')",
      journey: "url('/src/assets/images/png/journey-bg.png')",
      hero: "url('/src/assets/images/webp/hero-bg.webp')",
      'footer-gradient':
        'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 5.5%, #FFFFFF 52.75%, rgba(255, 255, 255, 0.1) 95%)',

      'courses-card': 'linear-gradient(180deg, #F3FAFD 0%, #F7FAFF 100%)',
    },
    extend: {
      colors: {
        'orange-yellow': '#fff000',
        'orange-red': '#FF1100',
      },
      fontSize: {
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '36px',
      },
      keyframes: {
        hoverShadowBefore: {
          '0%': { width: '100%', height: '1px', top: '0', left: '0' },
          '33%': { width: '1px', height: '100%', top: '0', left: '0' },
          '66%': {
            width: '1px',
            height: '1px',
            top: 'calc(100% - 1px)',
            left: '0',
          },
          '100%': {
            width: '100%',
            height: '1px',
            top: 'calc(100% - 1px)',
            left: '0',
          },
        },
        hoverShadowAfter: {
          '0%': { width: '100%', height: '1px', bottom: '0', right: '0' },
          '33%': { width: '1px', height: '100%', bottom: '0', right: '0' },
          '66%': {
            width: '1px',
            height: '1px',
            bottom: 'calc(100% - 1px)',
            right: '0',
          },
          '100%': {
            width: '100%',
            height: '1px',
            bottom: 'calc(100% - 1px)',
            right: '0',
          },
        },
      },
      animation: {
        hoverShadowBefore: 'hoverShadowBefore 1s forwards',
        hoverShadowAfter: 'hoverShadowAfter 1s forwards',
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
