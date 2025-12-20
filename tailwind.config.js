module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0D",
        coal: "#15161A",
        paper: "#FFF7DC"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
