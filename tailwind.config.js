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
      },
      boxShadow: {
        '3xl': '-10px -10px 30px 0px #FFF, 10px 10px 30px 0px rgba(174, 174, 192, 0.40);',
      },
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}