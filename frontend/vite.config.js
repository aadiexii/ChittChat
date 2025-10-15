import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // This line permanently fixes the "GIPHY service not configured" error
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
                "/uploads": {
                    target: API_URL,
                    changeOrigin: true,
                },
            };
        })(),
    },
});