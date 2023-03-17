/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const scrollBarHide = require('tailwind-scrollbar-hide');
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      blur: {
        xxxxs: '2px',
        xxxs: '1.5px',
        xxs: '1px',
        xs: '0.5px',
      },
      lineHeight: {
        screenshot: '1.5',
      },
      animation: {
        'unicorn-flow': 'unicornFlow 10s ease-in-out infinite',
        'ping-once': 'ping 1s linear 1',
        'fade-out': 'fadeOut 1s ease-in-out',
        'fade-in': 'fadeIn 1s ease-in-out',
        'carousell-20': 'moveIn 20s linear infinite',
        'carousell-18': 'moveIn 18s linear infinite',
        'carousell-16': 'moveIn 16s linear infinite',
        'carousell-14': 'moveIn 14s linear infinite',
        'carousell-12': 'moveIn 12s linear infinite',
        'carousell-10': 'moveIn 10s linear infinite',
        'fade-inout-first-loop': 'fadeInOut 10s ease-in-out infinite',
        'fade-inout-delay-loop': 'fadeInOut 10s ease-in-out 5s infinite',
      },
      keyframes: {
        unicornFlow: {
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '0% 100%' },
        },
        fadeOut: {
          '0%': { opacity: 100 },
          '100%': { opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
        moveIn: {
          '0%': { transform: 'translateX(-100vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        fadeInOut: {
          '0%': { opacity: 0 },
          '4%': { opacity: 0 },
          '7%': { opacity: 100 },
          '50%': { opacity: 100 },
          '53%': { opacity: 0 },
          '100%': { opacity: 0 },
        },
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1300px',
    },
    colors: {
      white: '#ede8d9',
      black: '#4c453e',
      gray: '#908c7f',
      red: '#9c2b1d',
      green: '#476f5d',
      yellow: '#ecbe3f',
      purple: '#aa7ebf',
      'red-light': '#cf5c5c',
      'white-faded': '#afaca3',
      'neon-white': '#ffffff',
      'neon-green': '#00ff9f',
      'neon-red': '#FF0677',
      'neon-yellow': '#FEE302',
      'neon-black': '#02090E',
      'neon-blue': '#3AE6F7',
      'neon-white-faded': '#112022',
      'neon-gray': '#112022',
      'neon-red-light': '#F73C5D',
      'neon-purple': '#e09eff',
    },
  },
  plugins: [scrollBarHide],
};
