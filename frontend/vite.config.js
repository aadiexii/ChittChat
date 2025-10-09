import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // ADD THIS ONE LINE to tell Vite to look for the .env file in the parent directory (the project root)
    envDir: "..",
    server: {
        port: 3000,
        proxy: (() => {
            const API_URL = process.env.VITE_API_URL || "http://localhost:5000";
            return {
                "/api": {
                    target: API_URL,
                    changeOrigin: true,
                },
                // This adds the necessary rule for your uploaded files
                "/uploads": {
                    target: API_URL,
                    changeOrigin: true,
                },
            };
        })(),
    },
});