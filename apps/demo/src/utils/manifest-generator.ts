import { readFileSync } from "fs";
import { resolve } from "path";
import { loadEnv, type Plugin } from "vite";

import { getBuildVersion } from "./build-version";

type ManifestGeneratorOptions = {
  source: string;
  output: string;
};

export const manifestGenerator = ({
  source,
  output,
}: ManifestGeneratorOptions): Plugin => {
  const manifest: Record<string, string> = {};

  return {
    name: "manifest-generator",
    configResolved(config) {
      const env = loadEnv(config.mode, process.cwd(), "VITE_");
      Object.keys(env).forEach((key) => (manifest[key] = env[key]));
      manifest.VITE_BUILD_VERSION = getBuildVersion();
    },
    generateBundle() {
      const path = resolve(process.cwd(), source);
      const manifestContent = readFileSync(path, "utf-8");
      const processedContent = manifestContent
        .replace(/%MANIFEST_NAME%/g, manifest.VITE_NAME)
        .replace(/%MANIFEST_SHORT_NAME%/g, manifest.VITE_SHORT_NAME)
        .replace(/%MANIFEST_DESCRIPTION%/g, manifest.VITE_DESCRIPTION)
        .replace(/%MANIFEST_BUILD_VERSION%/g, manifest.VITE_BUILD_VERSION)
        .replace(/%MANIFEST_THEME_COLOR%/g, manifest.VITE_THEME_COLOR)
        .replace(/%MANIFEST_BG_COLOR%/g, manifest.VITE_BG_COLOR);

      this.emitFile({
        type: "asset",
        fileName: output,
        source: processedContent,
      });
    },
  };
};
