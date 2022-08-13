import { PackageManifest } from "@web-builder/nodejs";
import { spawn, spawnSync } from "child_process";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import assert from "assert";

type Dependency = {
  name: string;
  version?: string | "latest" | "*";
};

type InstallOption =
  | {
      type: "write-only";
    }
  | {
      type: "write-and-install";
      npmClient: "npm" | "yarn" | "pnpm";
    };

interface AddDependencyResult {
  error?: Error;
  installed: boolean;
  before: PackageManifest;
  manifest: PackageManifest;
  updated: {
    dependencies: Dependency[];
    devDependencies: Dependency[];
  };
}

/**
 * add requested dependencies to package.json
 *
 * - add with install - do not modify package.json, run install command instead
 * - don't add with install -
 */
export async function add_dependencies(
  packagejson: string,
  {
    dependencies = [],
    devDependencies = [],
    ...installconfig
  }: {
    dependencies?: Dependency[];
    devDependencies?: Dependency[];
  } & InstallOption
): Promise<AddDependencyResult> {
  let installed = false;
  const manifest = require(packagejson);
  const prev_manifest = { ...manifest };
  const prev_deps = new Set(Object.keys(manifest.dependencies || {}));
  const prev_devdeps = new Set(Object.keys(manifest.devDependencies || {}));

  // targets not in prev_deps or prev_devdeps
  const target_deps = dependencies.filter(
    (dep) => !prev_deps.has(dep.name) && !prev_devdeps.has(dep.name)
  );
  const target_devdeps = devDependencies.filter(
    (dep) => !prev_deps.has(dep.name) && !prev_devdeps.has(dep.name)
  );

  async function makeDepsMap(deps: Dependency[]) {
    return await deps.reduce(
      async (acc, dep) => ({
        ...(await acc),
        [dep.name]: "^" + (await version(dep)),
      }),
      {}
    );
  }

  switch (installconfig.type) {
    case "write-only": {
      // write target deps & devdeps to package.json
      // sort with alphabetical order

      // add deps
      const adddeps = await makeDepsMap(target_deps);

      manifest.dependencies = {
        ...manifest.dependencies,
        ...adddeps,
      };
      manifest.dependencies = sort_az(manifest.dependencies);

      // add devdeps
      manifest.devDependencies = {
        ...manifest.devDependencies,
        ...(await makeDepsMap(target_devdeps)),
      };
      manifest.devDependencies = sort_az(manifest.devDependencies);

      // write package.json
      await fs.promises.writeFile(
        packagejson,
        JSON.stringify(manifest, null, 4)
      );

      break;
    }
    case "write-and-install": {
      assert(
        path.parse(packagejson).base === "package.json",
        "installation requires input package.json file path to be exact package.json file"
      );
      // let the spawned process handle the write & install
      const cwd = path.dirname(packagejson);
      const { npmClient } = installconfig;
      const install = npmClient === "npm" ? "install" : "add";
      // deps
      if (target_deps.length > 0) {
        spawnSync(npmClient, [install, ...target_deps.map((d) => d.name)], {
          cwd,
        });
        installed = true;
      }

      // devdeps
      if (target_devdeps.length > 0) {
        spawnSync(
          npmClient,
          [install, dev_flag[npmClient], ...target_devdeps.map((d) => d.name)],
          { cwd }
        );
        installed = true;
      }
      break;
    }
  }

  return {
    installed: installed,
    before: prev_manifest,
    manifest: require(packagejson),
    updated: {
      dependencies: [...target_deps],
      devDependencies: [...target_devdeps],
    },
  };
}

const dev_flag = {
  npm: "--save-dev",
  yarn: "--dev",
  pnpm: "--D",
} as const;

/**
 * get latest version from npm
 */
async function latest(pkg: string): Promise<string> {
  return (
    await (await fetch(`https://registry.npmjs.org/${pkg}/latest`)).json()
  ).version;
}

async function version(d: Dependency): Promise<string> {
  if (d.version !== "latest") {
    return d.version;
  } else if (d.version === "latest") {
    return await latest(d.name);
  } else {
    return await latest(d.name);
  }
}

function sort_az(obj: object) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}
