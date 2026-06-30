import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Talabarteria_Chuy/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      }
    }
  }
});