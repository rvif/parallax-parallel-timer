/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        "pending-bg": "#FFF5F9",
        "active-bg": "#F5F9FF",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
      },
    },
  },
  plugins: [],
};
