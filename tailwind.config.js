import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        gray: '#717171',
        snowGray: "#F0F0F3",
        lightGreen:"#00FFAA"
      }
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}