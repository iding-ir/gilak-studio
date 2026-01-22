import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, type UserConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

interface LibraryConfig {
  entry: string;
  name: string;
  fileName: string;
}

export function createLibraryConfig(config: LibraryConfig): UserConfig {
  return defineConfig({
    resolve: {
      alias: {
        "@gilak/localization": resolve(__dirname, "../gilak-localization/src"),
        "@gilak/canvas": resolve(__dirname, "../gilak-canvas/src"),
        "@gilak/color-picker": resolve(__dirname, "../gilak-color-picker/src"),
        "@gilak/color-swatch": resolve(__dirname, "../gilak-color-swatch/src"),
        "@gilak/image-library": resolve(
          __dirname,
          "../gilak-image-library/src",
        ),
        "@gilak/drag-n-drop": resolve(__dirname, "../gilak-drag-n-drop/src"),
        "@gilak/utils": resolve(__dirname, "../gilak-utils/src"),
        "@gilak/floating-window": resolve(
          __dirname,
          "../gilak-floating-window/src",
        ),
        "@gilak/components": resolve(__dirname, "../gilak-components/src"),
        "@gilak/resizable-screen": resolve(
          __dirname,
          "../gilak-resizable-screen/src",
        ),
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: { exportType: "default", ref: true, titleProp: true },
        include: "**/*.svg",
      }),
      dts({
        include: ["src"],
        exclude: ["**/*.stories.tsx", "**/*.stories.ts"],
        insertTypesEntry: true,
        outDir: "dist",
      }),
    ],
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[name]_[local]_[hash:base64:5]",
      },
      preprocessorOptions: {
        scss: {},
      },
    },
    build: {
      lib: {
        entry: resolve(process.cwd(), config.entry),
        name: config.name,
        formats: ["es", "umd"],
        fileName: (format) => `${config.fileName}.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  });
}
