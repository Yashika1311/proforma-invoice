/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae1fd',
          300: '#7dcbfb',
          400: '#38aff7',
          500: '#0e90ea',
          600: '#0072c8',
          700: '#005aa2',
          800: '#004c86',
          900: '#00234B',
        },
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
