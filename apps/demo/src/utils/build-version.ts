import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";

const DEFAULT_VERSION = "0.0.0";
const DEFAULT_GIT_HASH = "no-git";

const getPackageVersion = (): string => {
  try {
    const file = readFileSync(resolve(process.cwd(), "package.json"), "utf-8");
    const packageJson = JSON.parse(file);
    return packageJson.version || DEFAULT_VERSION;
  } catch {
    return DEFAULT_VERSION;
  }
};

const getGitCommitHash = (): string => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return DEFAULT_GIT_HASH;
  }
};

export const getBuildVersion = (): string => {
  switch (process.env.NODE_ENV) {
    case "development":
      return `dev-${Math.random().toString(36).substring(2, 6)}`;
    case "production":
      return `${getPackageVersion()}-${getGitCommitHash().substring(0, 4)}`;
    default:
      return "unknown";
  }
};
