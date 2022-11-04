import { spawn } from "child_process";
import fs from "fs";
import path from "path";

type Dependency = {
  name: string;
  version?: string | "latest" | "*";
};

type InstallOption =
  | {
      npmClient: "npm" | "yarn" | "pnpm";
      type: "install";
    }
  | {
      type: "update-package.json";
      installAfter: false;
    }
  | {
      type: "update-package.json";
      installAfter: true;
      npmClient: "npm" | "yarn" | "pnpm";
    };

/**
 * add requested dependencies to package.json
 *
 * - add with install - do not modify package.json, run install command instead
 * - don't add with install -
 */
export function add_dependencies(
  cwd = process.cwd(),
  {
    dependencies,
    devDependencies,
    ...installconfig
  }: {
    dependencies: Dependency[];
    devDependencies: Dependency[];
  } & InstallOption
) {
  const packagejson = path.resolve(cwd, "package.json");
  if (!fs.existsSync(packagejson)) {
    throw new Error(`package.json not found in ${cwd}`);
  }
  const manifest = require(packagejson);
  const deps = new Set(Object.keys(manifest.dependencies || {}));
  const devdeps = new Set(Object.keys(manifest.devDependencies || {}));

  switch (installconfig.type) {
    case "install": {
      const { npmClient } = installconfig;
      const install = npmClient === "npm" ? "install" : "add";
      // deps
      if (dependencies.length > 0) {
      }
      spawn(npmClient, [install, ...dependencies.map((d) => d.name)], { cwd });

      // devdeps
      if (devDependencies.length > 0) {
        spawn(
          npmClient,
          [install, dev_flag[npmClient], ...devDependencies.map((d) => d.name)],
          { cwd }
        );
      }
    }
  }
}

const dev_flag = {
  npm: "--save-dev",
  yarn: "--dev",
  pnpm: "--D",
} as const;
