/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Museum Midnight & Gold Theme
        primary: {
          bg: '#0D0D0D',      // Base background
          card: '#1A1A1A',    // Card surface
          accent: '#D4AF37',  // Metallic Gold
          dark: '#0A0A0A',    // Deep Charcoal
          hover: '#2A2A2A',   // Hover state
        },
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.4)',
        'gold-glow-lg': '0 0 50px rgba(212, 175, 55, 0.6)',
      },
      backdropBlur: {
        xl: 'blur(20px)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const scrollbarStyles = {
        '.scrollbar-gold': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0A0A0A',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#D4AF37',
            borderRadius: '10px',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#E5C158',
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.5)',
          },
        },
      };
      addUtilities(scrollbarStyles);
    },
  ],
}
