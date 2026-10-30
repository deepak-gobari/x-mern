import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");

  return {
    envDir: rootDir,
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${env.PORT}`,
          changeOrigin: true,
        },
      },
    },
  };
});