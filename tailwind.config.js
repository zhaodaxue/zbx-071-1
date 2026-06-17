/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#f0f7fa',
          100: '#d9edf3',
          200: '#b3dbe6',
          300: '#86c4d6',
          400: '#5FA8D3',
          500: '#3d8ebd',
          600: '#2d729e',
          700: '#265c80',
          800: '#0F4C5C',
          900: '#0a3640',
        },
        warning: {
          50: '#fff4ed',
          100: '#ffe4d4',
          200: '#ffc6a8',
          300: '#ffa072',
          400: '#E36414',
          500: '#d84b0a',
          600: '#bc3609',
          700: '#9b270c',
          800: '#7d210f',
          900: '#681e10',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
