/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neu: {
          bg: '#E0E5EC',
          text: '#3D4852',
          muted: '#6B7280',
          placeholder: '#A0AEC0',
          accent: 'var(--role-accent)',
          'accent-light': 'var(--role-accent-light)',
        },
        shadow: {
          'neu': '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)',
          'neu-sm': '5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.5)',
          'neu-hover': '12px 12px 20px rgb(163,177,198,0.7), -12px -12px 20px rgba(255,255,255,0.6)',
          'neu-inset': 'inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)',
          'neu-inset-deep': 'inset 10px 10px 20px rgb(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)',
          'neu-inset-sm': 'inset 3px 3px 6px rgb(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5)',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      transitionDuration: {
        'theme': '300ms',
      },
    },
  },
  plugins: [],
}
