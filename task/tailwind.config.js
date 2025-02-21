/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          custom: [
            "Work Sans", 
            "Verdana", 
            "Lucida Sans", 
            "Helvetica Neue", 
            "Arial", 
            "Roboto", 
            "sans-serif"
          ],
        },
      },
    },
    plugins: [],
  };
  