import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/oauth2": {
        target: "https://dev-plo5h022m82l6fki.us.auth0.com",
        changeOrigin: true,
        secure: false,
      },
    },
    host: "0.0.0.0",
  },
});
