import { BuilderConfig } from "@grida/builder-config";
import path from "path";
import { find_in_cwd, find_in_parent } from "../_utils/path";

const _GRIDA_CONFIG_JS = "grida.config.js";

interface GridaProjectSearchResult {
  base_dir: string;
  config_file: string;
  config: BuilderConfig;
}

/**
 * returns the config object by reading .config.js file
 * @param path
 * @returns
 */
export function read(path): BuilderConfig {
  return require(path) as BuilderConfig;
}

/**
 * locates grida project by searching for grida.config.js file in cwd and above.
 * @param cwd
 * @returns
 */
export function locateProject(
  cwd = process.cwd()
): GridaProjectSearchResult | null {
  const grida_config_js = find_in_cwd(_GRIDA_CONFIG_JS, cwd);
  if (grida_config_js) {
    return {
      base_dir: path.dirname(grida_config_js),
      config_file: grida_config_js,
      config: read(grida_config_js),
    };
  }
  const grida_config_js_in_parent_dir = find_in_parent(
    _GRIDA_CONFIG_JS,
    cwd,
    true
  );
  if (grida_config_js_in_parent_dir) {
    return {
      base_dir: path.dirname(grida_config_js_in_parent_dir),
      config_file: grida_config_js_in_parent_dir,
      config: read(grida_config_js_in_parent_dir),
    };
  }
  return null;
}
