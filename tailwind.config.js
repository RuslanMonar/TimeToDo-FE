/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
     "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
     "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
     "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
    ],
  theme: {
    extend: {
      colors: {
        background: "#f9f7ff",
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          950: "#0b0a03",
        },
        rose: {
          400: "#fdaeae",
        },
      },
      backgroundImage: {
        'logo': "url('src/assets/main-logo.png')",
      },
      scale: {
        '101': '1.01',
      }
    },
  },
  plugins: [],
});
