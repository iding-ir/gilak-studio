import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";
import type { AliasOptions } from "vite";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

const packageNames = [
  "localization",
  "canvas",
  "color-picker",
  "color-swatch",
  "image-library",
  "drag-n-drop",
  "utils",
  "floating-window",
  "components",
  "resizable-screen",
  "stylist",
] as const;

const aliases: AliasOptions = Object.fromEntries(
  packageNames.map((name) => [
    `@gilak/${name}`,
    resolve(repoRoot, `packages/gilak-${name}/src`),
  ]),
);

const config: StorybookConfig = {
  stories: ["../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: [],
  viteFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias as AliasOptions),
        ...aliases,
      },
    },
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), "react", "react-dom"],
    },
  }),
};

export default config;
