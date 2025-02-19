/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Простая сетка из 16 столбцов
        '16': 'repeat(3, 320px)',
        '17': 'repeat(5, 150px)'
    },
  },
},
  plugins: [],
};