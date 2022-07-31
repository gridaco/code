import fs from "fs";
import path from "path";

interface GridaProjectSearchResult {
  base_dir: string;
  config_file: string;
}

export function find_grida_project(
  cwd = process.cwd()
): GridaProjectSearchResult | null {
  const grida_config_js = find_grida_config_js_in_cwd(cwd);
  if (grida_config_js) {
    return {
      base_dir: path.dirname(grida_config_js),
      config_file: grida_config_js,
    };
  }
  const grida_config_js_in_parent_dir = find_grida_config_js_in_parent_dir(cwd);
  if (grida_config_js_in_parent_dir) {
    return {
      base_dir: path.dirname(grida_config_js_in_parent_dir),
      config_file: grida_config_js_in_parent_dir,
    };
  }
  return null;
}

export function find_grida_config_js_in_cwd(
  cwd = process.cwd()
): string | null {
  const grida_config_js = path.join(cwd, "grida.config.js");
  if (fs.existsSync(grida_config_js)) {
    return grida_config_js;
  }
  return null;
}

/**
 * find grida.config.js in parent directory (recursively)
 * cwd
 * ../grida.config.js
 * ../../grida.config.js
 * ../../../grida.config.js
 * ...
 */
export function find_grida_config_js_in_parent_dir(
  cwd: string = process.cwd()
) {
  const parent_dir = path.dirname(cwd);
  if (parent_dir === cwd) {
    return null;
  }
  const grida_config_js = path.join(parent_dir, "grida.config.js");
  if (fs.existsSync(grida_config_js)) {
    return grida_config_js;
  }
  return find_grida_config_js_in_parent_dir(parent_dir);
}
