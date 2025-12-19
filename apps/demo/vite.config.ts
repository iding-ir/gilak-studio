import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  resolve: {
    alias: {
      "@gilak/canvas": resolve(__dirname, "../../packages/gilak-canvas/src"),
      "@gilak/color-picker": resolve(
        __dirname,
        "../../packages/gilak-color-picker/src",
      ),
      "@gilak/color-swatch": resolve(
        __dirname,
        "../../packages/gilak-color-swatch/src",
      ),
      "@gilak/utils": resolve(__dirname, "../../packages/gilak-utils/src"),
      "@gilak/floating-window": resolve(
        __dirname,
        "../../packages/gilak-floating-window/src",
      ),
      "@gilak/components": resolve(
        __dirname,
        "../../packages/gilak-components/src",
      ),
      "@gilak/resizable-screen": resolve(
        __dirname,
        "../../packages/gilak-resizable-screen/src",
      ),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {},
    },
  },
});
