import type { IPackageManifest } from "@web-builder/nodejs";
import path from "path";
import { find_in_cwd, find_in_parent } from "../_utils/path";

const _PACKAGE_JSON = "package.json";

/**
 * finds a npm pacakge root with package.json search
 */
export function locateNodePackage(cwd = process.cwd()): {
  base_dir: string;
  package_json: string;
  manifest: IPackageManifest;
} | null {
  const packagejson = find_in_cwd(_PACKAGE_JSON, cwd);
  if (packagejson) {
    return {
      base_dir: path.dirname(packagejson),
      package_json: packagejson,
      manifest: read(packagejson),
    };
  }
  const packagejson_in_parent_dir = find_in_parent(_PACKAGE_JSON, cwd, true);
  if (packagejson_in_parent_dir) {
    return {
      base_dir: path.dirname(packagejson_in_parent_dir),
      package_json: packagejson_in_parent_dir,
      manifest: read(packagejson_in_parent_dir),
    };
  }
  return null;
}

/**
 * returns the config object by reading package.json file
 * @param path
 * @returns
 */
export function read(path): IPackageManifest {
  return require(path);
}

export function analyzeFramework(manifest: IPackageManifest): {
  framework: "react" | "react-native" | "solid-js" | "svelte" | "vue";
  packages?: string[];
} {
  const deps = new Set(Object.keys(manifest.dependencies || {}));
  const devdeps = new Set(Object.keys(manifest.devDependencies || {}));
  const alldeps = new Set([...deps, ...devdeps]);

  // framework
  const isreact = alldeps.has("react");
  const isreactnative = alldeps.has("react-native");
  const isvue3 = alldeps.has("vue");
  const issvelte = alldeps.has("svelte");
  const issolidjs = alldeps.has("solid-js");

  // managed packages
  const namedpackages = [
    "styled-components",
    "@emotion/styled",
    "@emotion/native",
  ];

  const packages = namedpackages
    .map((k) => {
      if (alldeps.has(k)) {
        return k;
      }
    })
    .filter(Boolean);

  if (isreact) {
    if (isreactnative) {
      return { framework: "react-native", packages: packages };
    }
    return { framework: "react", packages: packages };
  }

  if (isvue3) {
    return {
      framework: "vue",
      packages: packages,
    };
  }

  if (issvelte) {
    return {
      framework: "svelte",
      packages: packages,
    };
  }

  if (issolidjs) {
    return {
      framework: "solid-js",
      packages: packages,
    };
  }
}
