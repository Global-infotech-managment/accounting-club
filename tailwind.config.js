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
      primary: "#253466",
      secondary: "#E5413F",
      white: "#ffffff",
      black: "#000000",
      "light-white": "#D3D6E0",
      "light-thin": "#F8F8F8",
      "light-black": "#333333",
    },
    borderRadius: {
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      4.5: '18px',
      5: '20px',
      5.5: '22px',
      6: '24px',
      6.5: '26px',
      7: '28px',
      full: '9999px',
    },
    lineHeight: {
      100: '100%',
      110: '110%',
      120: '120%',
      130: '130%',
      132: '132%',
      140: '140%',
      150: '150%',
      160: '160%',
      170: '170%',
    },
    boxShadow: {
      "nav": "0px 0px 23.6px 0px #0000001A",
      "hero": "8px 8px 6px 0px #253466",
    },
    backgroundImage: {
      "company-rank": "url('/src/assets/images/png/company-rank.png')",
      "journey": "url('/src/assets/images/png/journey-bg.png')",
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
