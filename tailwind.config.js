/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EAF4FA",
          300: "#6FB5DB",
          500: "#1B6392", // الأساسي
          700: "#10405C",
        },
      },
    },
  },
  plugins: [],
};
