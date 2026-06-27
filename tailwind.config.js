/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black':   '#080808',
        'brand-dark':    '#120028',
        'brand-purple':  '#5B0DB5',
        'brand-purple2': '#7C3AED',
        'brand-gold':    '#C9A011',
        'brand-gold2':   '#E8BF30',
      },
      fontFamily: {
        oswald:  ['var(--font-oswald)', 'sans-serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
        inter:   ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'smoke-gradient': 'linear-gradient(to bottom, rgba(8,8,8,0.0) 0%, rgba(8,8,8,0.8) 100%)',
        'purple-gradient': 'linear-gradient(135deg, #120028 0%, #5B0DB5 100%)',
        'gold-gradient': 'linear-gradient(135deg, #9B7A08 0%, #E8BF30 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease forwards',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
