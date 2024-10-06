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
          target: env.VITE_BACKEND_BASE_URL,
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
