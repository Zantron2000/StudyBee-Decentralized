/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "input-background": "#1A00C7",
        "primary-background": "#080033",
        "secondary-background": "#0F1B5E",
        "primary-button": "#5300FF",
        "secondary-button": "#395EFC",
        "font-color": "#FFFFFF"
      }
    },
  },
  plugins: [],
}