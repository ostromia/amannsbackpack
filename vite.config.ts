import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    base: "/amannsbackpack/",

    resolve: {
        alias: {
            "~": "/src"
        }
    },

    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]]
            }
        })
    ]
});
