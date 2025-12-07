/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#104967',           // Use as: bg-main-blue, text-main-blue
        'primary-blue': '#4C68F4',        // Use as: bg-primary-blue, text-primary-blue
        'secondary-blue': '#3245a7',      // Use as: bg-secondary-blue, text-secondary-blue
        'primary-grey': '#54585a',        // Use as: bg-primary-grey, text-primary-grey
        'background': '#f5f5f5',          // Use as: bg-background
        'primary-black': '#1E1E1E',       // Use as: text-primary-black, bg-primary-black
        'secondary-black': '#1E1E1E',     // Use as: text-secondary-black, bg-secondary-black
        'filler': '#F1F1F1',              // Use as: bg-filler
        'light-grey': '#E1E1E1',          // Use as: text-light-grey, bg-light-grey
      },
      // You can also extend other theme properties here if needed
    },
  },
  plugins: [],
}