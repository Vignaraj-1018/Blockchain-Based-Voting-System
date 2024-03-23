import { color_scheme } from './src/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: color_scheme,
    },
  },
  plugins: [],
}

