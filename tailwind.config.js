/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        deep: { DEFAULT: '#14532d', 50:'#f0fdf4',100:'#dcfce7',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d',950:'#052e16' },
        cream: { DEFAULT:'#fffbeb', 50:'#fffdf5',100:'#fffbeb',200:'#fef3c7' },
        amberx: { DEFAULT:'#d97706', 500:'#f59e0b', 600:'#d97706' }
      },
      fontFamily: { sans: ['system-ui','-apple-system','Segoe UI','Roboto','sans-serif'] },
      boxShadow: { card: '0 2px 12px rgba(20,83,45,0.08)' }
    }
  },
  plugins: []
}
