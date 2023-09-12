/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "192" : "48rem",
        "128" : "32rem",
        "144" : "36rem",
        "108" : "27rem",
        "100" : "25rem",
        "84" : "21rem",
        "82" : "20.5rem",
        "81" : "20.25rem",
      },
      textSize: {

      }
    },
  },
  plugins: [],
}

