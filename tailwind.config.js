/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
        'mono': ['Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        'gold': '#CBA135',
        'scarlet': '#D72638',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};