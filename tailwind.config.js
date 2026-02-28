/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--accent-white)",
        background: "var(--accent-blue)",
        light_background: "var(--accent-sky-blue)",
        grey: "var(--accent-grey)",
        hover: "var(--accent-sky-blue)",
      },
      fontFamily: {
        // primary: [Fredoka, sans-serif],
      },
    },
  },
  plugins: [],
};
