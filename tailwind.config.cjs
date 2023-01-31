/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,html,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#FF0000',
        darkBlue: '#11063',
      },
    },
  },
  plugins: [],
};
