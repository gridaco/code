import { PackageManifest } from "@web-builder/nodejs";
import { npmInsatll } from "./install-npm";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import assert from "assert";
import { Dependency } from "./type";

type InstallOption =
  | {
      type: "write-only";
    }
  | {
      type: "write-and-install";
      npmClient: "npm";
    }
  | {
      type: "with-npm-client";
      npmClient: "npm"; // TODO: support yarn and pnpm
    };

interface AddDependencyResult {
  error?: Error;
  installed: boolean;
  before: PackageManifest;
  /**
   * if the dependency is added by npm i, then the package.json file requires some time to be written. on caller, you'll have to wait and resolve the manifest file after when this is complete.
   * This is not provided by this function.
   */
  manifest: () => PackageManifest;
  updated: {
    dependencies: Dependency[];
    devDependencies: Dependency[];
  };
}

/**
 * add requested dependencies to package.json
 *
 * - type: write-only - only write the dependencies to package.json
 * - type: write-and-install - write the dependencies to package.json and install the dependencies with npm client afterwards
 * - type: with-npm-client - install the dependencies with npm client and return the manifest file
 *    - WARNING: this does not return the proper manifest. the installation requires extra time to be fully write to package.json..
 *
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
  if ("npmClient" in installconfig) {
    assert(
      path.parse(packagejson).base === "package.json",
      "installation requires input package.json file path to be exact package.json file"
    );
  }

  let installed = false;
  const cwd = path.dirname(packagejson);
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

  const write_file = async () => {
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
    await fs.promises.writeFile(packagejson, JSON.stringify(manifest, null, 4));
  };

  switch (installconfig.type) {
    case "write-only": {
      await write_file();
      break;
    }
    case "write-and-install": {
      await write_file();
      await npmInsatll(cwd, [], {
        cache: true,
      });
      installed = true;
      break;
    }
    case "with-npm-client": {
      // let the spawned process handle the write & install
      const { npmClient } = installconfig;
      switch (npmClient) {
        case "npm": {
          if (target_deps.length > 0) {
            await npmInsatll(cwd, target_deps, {
              save: true,
            });
            installed = true;
          }

          // devdeps
          if (target_devdeps.length > 0) {
            await npmInsatll(cwd, target_devdeps, {
              save: true,
              saveDev: true,
            });
            installed = true;
          }
        }
      }
      // const install = npmClient === "npm" ? "install" : "add";
      // deps

      // check if package.json is updated by the spawned process

      break;
    }
  }

  return {
    installed: installed,
    before: prev_manifest,
    manifest: () => require(packagejson),
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

/**
 * the yarn add or npm install process needs extra time after the child process is complete for the package.json file is to be updated
 * this function checks if the process is fully complete.
 * @param snapshot
 * @param packagejson
 * @param timeout
 * @returns
 */
function is_install_complete(
  snapshot: PackageManifest,
  packagejson: string,
  timeout = 5000
): Promise<boolean> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const manifest = require(packagejson);
      // if there is change in file, it means installation is complete
      if (JSON.stringify(snapshot) !== JSON.stringify(manifest)) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
    setTimeout(() => {
      resolve(false);
    }, timeout);
  });
}
