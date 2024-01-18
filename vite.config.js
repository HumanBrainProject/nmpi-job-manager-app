import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8", // or "istanbul"
    },
  },
});