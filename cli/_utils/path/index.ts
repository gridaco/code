import fs from "fs";
import path from "path";

/**
 * finds file with name in cwd
 *
 * e.g. package.json -> <cwd>/package.json
 *
 * @param name
 * @param cwd
 * @returns
 */
export function find_in_cwd(name, cwd = process.cwd()) {
  const file = path.join(cwd, name);
  if (fs.existsSync(file)) {
    return file;
  }
  return null;
}

/**
 * find file in parent directory (recursively)
 * cwd
 * ../package.json
 * ../../package.json
 * ../../../package.json
 * ...
 */
export function find_in_parent(name, cwd = process.cwd(), recursively = true) {
  const parent_dir = path.dirname(cwd);
  if (parent_dir === cwd) {
    return null;
  }
  const file = path.join(parent_dir, name);
  if (fs.existsSync(file)) {
    return file;
  }
  if (recursively) {
    return find_in_parent(name, parent_dir, recursively);
  }
  return null;
}
