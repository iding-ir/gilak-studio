import { defineConfig, mergeConfig } from "vite";

import { createLibraryConfig } from "../build-config/vite.config.base";

const baseConfig = createLibraryConfig({
  entry: "src/index.ts",
  name: "GilakCanvas",
  fileName: "index",
});

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      rollupOptions: {
        external: ["react", "react-dom"],
      },
    },
  }),
);
