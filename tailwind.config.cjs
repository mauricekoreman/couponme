/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      offwhite: "#FFFFF4",
      blue: "#A3E8FF",
      pink: "#FF8EA9",
      purple: "#C0BFFF",
      green: "#78ECB4",
      orange: "#F8B654",
      red: "#E55F56",
      yellow: "#FFEC3F",
      black: "#000",
      white: "#FFF",
    },
    fontFamily: {
      displayRegular: ["Rockwell"],
      displayCondensed: ["RockwellCondensed"],
      displayBold: ["RockwellBold"],
      displayCondensedBold: ["RockwellCondensedBold"],
      regularThin: ["MontserratThin"],
      regularLight: ["MontserratLight"],
      regularRegular: ["MontserratRegular"],
      regularMedium: ["MontserratMedium"],
      regularSemiBold: ["MontserratSemiBold"],
      regularBold: ["MontserratBold"],
    },
    extend: {
      dropShadow: {
        removeBrutal: "0 0 0 rgba(0, 0, 0, 1)0",
        brutal: "1px 1px 0 rgba(0, 0, 0, 1)",
        brutal2: "2px 2px 0 rgba(0, 0, 0, 1)",
      },
      fontSize: {
        dynamic: "clamp(2rem, 15vw, 3.75rem)",
      },
    },
  },
  plugins: [],
};










































