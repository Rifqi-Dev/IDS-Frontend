/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    gridTemplateColumns: {
      "20/65/15": "20% 65% 15%",
      "15/85": "20% 80%",
      "20/40/40": "20% 40% 40%",
      2: "50% 50%",
      "70/30": "70% 30%",
    },
  },

  plugins: [],
};
