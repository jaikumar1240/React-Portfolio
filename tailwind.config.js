/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Adobe-inspired red scale (red / black / white theme)
        brand: {
          50: '#fff1ef',
          100: '#ffe0dc',
          200: '#ffc6bf',
          300: '#ff9d92',
          400: '#ff6a5c',
          500: '#f6392a',
          600: '#e11507',
          700: '#bb1206',
          800: '#98130c',
          900: '#7e1611',
          950: '#450a06',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2,6,23,0.12)',
        glow: '0 8px 30px -6px rgba(246,57,42,0.5)',
      },
    },
  },
  plugins: [],
}
