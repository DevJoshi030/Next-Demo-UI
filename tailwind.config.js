module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        back: "#181c20",
        card: "#21262b",
        body: "rgba(0, 17, 1, 0.8)",
      },
      backgroundImage: {
        "code-pattern":
          "url('https://files.wallpaperpass.com/2019/10/coding%20wallpaper%20104%20-%201920x1080.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
