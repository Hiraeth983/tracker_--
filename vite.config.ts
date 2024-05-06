import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "lib/index.ts",
      name: "tracker",
      fileName: "tracker",
      formats: ["es", "cjs", "iife", "umd"],
    }
  }
})