/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fifa-navy': '#003087',
        'fifa-red': '#CC0000',
        'fifa-gold': '#FFD700',
        'fifa-dark': '#080E1C',
        'fifa-darker': '#040810',
        'fifa-card': '#0F1828',
        'fifa-card2': '#131F35',
        'fifa-border': '#1E2D4A',
        'fifa-muted': '#4A6080',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255,215,0,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.3)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255,215,0,0.5)' },
          '50%': { textShadow: '0 0 30px rgba(255,215,0,1), 0 0 60px rgba(255,215,0,0.5)' },
        },
      },
    },
  },
  plugins: [],
}
