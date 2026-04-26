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
      "@generated-manuscript": path.resolve(GENERATED_DIR, "generated-manuscript.js"),
    },
  },
  server: {
    fs: {
      allow: [ROOT_DIR],
    },
  },
});
