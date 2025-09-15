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
        'off-white': '#FFF8F0',
        'gold': '#D4AF37',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Bebas Neue', 'Anton', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
