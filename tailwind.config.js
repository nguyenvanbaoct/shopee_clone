/* eslint-disable @typescript-eslint/no-var-requires */
import plugin from "tailwindcss/plugin";
import lineClamp from "@tailwindcss/line-clamp";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                orange: "#ee4d2d",
            },
        },
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                ".container": {
                    maxWidth: theme("columns.7xl"),
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: theme("spacing.4"),
                    paddingRight: theme("spacing.4"),
                },
            });
        }),
        lineClamp,
    ],
};
