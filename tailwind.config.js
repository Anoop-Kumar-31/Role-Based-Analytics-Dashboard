/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#104967',
        'primary-blue': '#10B981',
        'secondary-blue': '#059669',
        'primary-grey': '#64748B',
        'background': '#F0F4F8',
        'primary-black': '#0F172A',
        'secondary-black': '#1E293B',
        'filler': '#F1F5F9',
        'light-grey': '#E2E8F0',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
        'elevated': '0 10px 40px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}