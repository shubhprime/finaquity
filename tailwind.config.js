/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fq: {
          bg: '#070a0b',
          surface: '#0b0f10',
          'surface-2': '#10171a',
          'accent-1': '#86efac',
          'accent-2': '#4ade80',
          'accent-3': '#22c55e',
          accent: '#22c55e',
          success: '#4ade80',
          danger: '#f87171',
          warn: '#fbbf24',
          text: '#ffffff',
          'text-muted': '#9ca3af',
          'text-dim': '#6b7280'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
}
