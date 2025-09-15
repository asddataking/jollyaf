import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-red': '#B1002E',
        'evergreen': '#166534',
        'forest-green': '#0F5132',
        'emerald': '#10B981',
        'lime': '#84CC16',
        'off-white': '#FFF8F0',
        'gold': '#D4AF37',
        'dark-green': '#064E3B',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Bebas Neue', 'Anton', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #10B981, 0 0 10px #10B981, 0 0 15px #10B981' },
          '100%': { boxShadow: '0 0 10px #10B981, 0 0 20px #10B981, 0 0 30px #10B981' },
        },
      },
    },
  },
  plugins: [],
}
export default config
