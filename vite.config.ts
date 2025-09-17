import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [vue(), dts({ include: "src" })],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@root": path.relative(__dirname, "./"),
    },
  },
  // build: {
  //      lib: {
  //        entry: resolve(__dirname, "src/shared.ts"),
  //        formats: ["es"],
  //      },
  //   rollupOptions: {
  //     external: ["vue"],
  //     output: {
  //       globals: {
  //         vue: "Vue",
  //       },
  //     },
  //        },
  //   },
  // },
});
