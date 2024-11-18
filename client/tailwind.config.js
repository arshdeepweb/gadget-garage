/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // blue-600
        secondary: '#d7e8ba', // custom color
        tertiary: '#611c35',
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

