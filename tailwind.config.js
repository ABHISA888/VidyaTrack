/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A3356',
        saffron: '#C94C0C',
        teal: '#0A6E5E',
      },
      fontFamily: {
        ibm: ['"IBM Plex Sans"', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
      fontSize: {
        '3xl': '1.875rem', // 30px
      },
    },
  },
  plugins: [],
}
