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
        'christmas-red': '#DC2626',
        'holly-green': '#059669',
        'pine-green': '#047857',
        'christmas-gold': '#F59E0B',
        'warm-gold': '#D97706',
        'snow-white': '#F8FAFC',
        'winter-blue': '#1E40AF',
        'midnight-blue': '#1E3A8A',
        'off-white': '#FFF8F0',
        'candy-cane': '#EF4444',
        'mistletoe': '#10B981',
        'frost': '#E5E7EB',
      },
            fontFamily: {
              'sans': ['Poppins', 'sans-serif'],
              'display': ['Mountains of Christmas', 'cursive'],
              'accent': ['Candy Cane', 'cursive'],
              'fun': ['Snowburst One', 'cursive'],
            },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'snow': 'snow 10s linear infinite',
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
          '0%': { boxShadow: '0 0 5px #F59E0B, 0 0 10px #F59E0B, 0 0 15px #F59E0B' },
          '100%': { boxShadow: '0 0 10px #F59E0B, 0 0 20px #F59E0B, 0 0 30px #F59E0B' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        snow: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
