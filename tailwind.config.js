/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        primary: '#7C3AED',
        secondary: '#06B6D4',
        accent: '#A855F7',
        subtext: '#94A3B8',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite alternate',
        orbit: 'orbit 20s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px #7C3AED44' },
          '100%': { boxShadow: '0 0 60px #A855F788, 0 0 100px #7C3AED44' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
