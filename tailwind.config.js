/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  future: {
    purgeLayersByDefault: true,
  },
  plugins: [],
  important: true,
  // Active dark mode on class basis
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};
