/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    ".src/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        greatVibes: ['Great Vibes', 'serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

