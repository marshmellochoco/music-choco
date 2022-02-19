const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class", // 'false', 'media' or 'class'
    theme: {
        colors: {
            text: "#1e293b",
            background: "#fff",
            primary: colors.red,
            secondary: colors.gray,
            icon: "#db2777",
            iconActive: "#fce7f3",
            iconHover: "#fecaca",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
