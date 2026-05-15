import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


const ROOT_DIR = path.resolve(__dirname, "..");
const GENERATED_DIR = path.resolve(ROOT_DIR, "build", "site");


export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(GENERATED_DIR, "public"),
  resolve: {
    alias: {
      "@generated-manuscripts": path.resolve(GENERATED_DIR, "generated-manuscripts.js"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("generated-manuscripts.js")) {
            return "manuscript-data";
          }
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "router";
            if (id.includes("react")) return "framework";
            if (id.includes("lucide-react")) return "icons";
          }
          return undefined;
        },
      },
    },
  },
  server: {
    fs: {
      allow: [ROOT_DIR],
    },
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
