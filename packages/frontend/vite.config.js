import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [react()],
    server: {
      host: "localhost",
      port: 3000,
      https: false,
      proxy: {
        "/api": {
          target: "https://api.gitsocial.net/api/v1",
          changeOrigin: true,
          followRedirects: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
  });
};
