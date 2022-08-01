import fs from "fs";
import path from "path";
import glob from "glob";
/**
 * finds file with name in cwd
 *
 * e.g. package.json -> <cwd>/package.json
 * e.g. pubspec.y{,a}ml -> <cwd>/pubspec.yaml
 *
 * @param name
 * @param cwd
 * @returns
 */
export function find_in_cwd(name, cwd = process.cwd(), useglob = false) {
  if (useglob) {
    const file = glob.sync(name, { cwd }).pop() || null;
    if (file) {
      return path.resolve(cwd, file);
    }
  } else {
    const file = path.join(cwd, name);

    if (fs.existsSync(file)) {
      return file;
    }
    return null;
  }
}

/**
 * find file in parent directory (recursively)
 * cwd
 * ../package.json
 * ../../package.json
 * ../../../package.json
 * ...
 */
export function find_in_parent(
  name,
  cwd = process.cwd(),
  recursively = true,
  useglob = false
) {
  const parent_dir = path.dirname(cwd);
  if (parent_dir === cwd) {
    return null;
  }
  if (useglob) {
    const file = glob.sync(name, { cwd: parent_dir }).pop() || null;
    if (file) {
      return path.join(parent_dir, file);
    }
  } else {
    const file = path.join(parent_dir, name);
    if (fs.existsSync(file)) {
      return file;
    }
  }
  if (recursively) {
    return find_in_parent(name, parent_dir, recursively, useglob);
  }
  return null;
}
