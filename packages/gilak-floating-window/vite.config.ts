import { defineConfig, mergeConfig } from "vite";

import { createLibraryConfig } from "../build-config/vite.config.base";

const baseConfig = createLibraryConfig({
  entry: "src/index.ts",
  name: "GilakFloatingWindow",
  fileName: "gilak-floating-window",
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
