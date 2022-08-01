import type { IPackageManifest } from "@web-builder/nodejs";
import path from "path";
import { find_in_cwd, find_in_parent } from "../_utils/path";

const _PACKAGE_JSON = "package.json";

/**
 * finds a npm pacakge root with package.json search
 */
export function locatePackage(cwd = process.cwd()): {
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
