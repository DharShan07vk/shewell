module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        xs: "1rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "3.75rem",
        xl: "5rem",
        "2xl": "6.25rem",
      },
    },
    screens: {
      xs: "320px",
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px"
    },

    extend: {
      colors: {
        primary: "#00898F",
        secondary: "#008F4E",
        inactive: "#4D4D4D",
        active: "#121212",
        "black-500": "#181818",
        "black-400": "#434343",
        "black-100": "#494949",
        "black-300": "#181818",
        "border-color": "#E9E9E9",
        "border-400": "#CBD5E1",
        "border-300": "#CDCDCD",
        "placeholder-color": "#777777",
        "gray-100": "#64748B",
        "blue-300": "#0E7490",
        "gray-200": "#4D4D4D",
        "gray-400": "#FFFFFF66",
        "white-100": "#ffffff80",
        "white-200": "#e4e4e726",
        "white-300": "#f0fff8cc",
        "white-500": "#ffffff",
      },
      screens: {
        "2xl": "1920px",

      },

      fontFamily: {
        inter: "'Inter', sans-serif",
        poppins: "'Poppins', sans-serif",
        pacifico: "var(--font-pacifico)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        testimonial: "url('/images/testimonial-background.png')",
        news: "url('/images/news/news-bg.png')",
        features: "url('/images/feautures/Features-bground.png')",
        doctorImage: "url('/images/bg.png')"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
