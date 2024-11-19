/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#010101', // blue-600
        secondary: '#F2F0EA', // custom color
        tertiary: '#A4A4A4',
        fourth: "#ffa630"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'], // optional rounded scrollbar
  },
}

