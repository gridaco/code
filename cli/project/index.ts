import { BuilderConfig, FrameworkConfig } from "@grida/builder-config";
import path from "path";
import {
  analyzeFramework as analyzeJsFramework,
  locateNodePackage,
} from "../npm";
import { analyzeFramework as analyzePubFramework, locatePubspec } from "../pub";
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
export function locateGridaProject(
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

export function locateBaseProject(cwd = process.cwd()): {
  base_dir: string;
  name: string;
  config_file: string;
  framework: FrameworkConfig["framework"];
  packages?: string[];
} {
  const pubspec = locatePubspec(cwd);
  const npm = locateNodePackage(cwd);

  if (npm && pubspec) {
    throw new Error(
      `Invalid project root configuration. both pubspec.yaml and package.json found from ${cwd}`
    );
  }

  if (npm) {
    const res = analyzeJsFramework(npm.manifest);
    if (res) {
      if (res.framework === "vue") {
        throw new Error("Vue is not supported yet");
      }
      if (res.framework === "svelte") {
        throw new Error("Svelte is not supported yet");
      }
      return {
        base_dir: npm.base_dir,
        name: npm.manifest.name,
        config_file: npm.package_json,
        ...(res as any),
      };
    }
  }

  if (pubspec) {
    const res = analyzePubFramework(pubspec.manifest);
    if (res) {
      return {
        base_dir: pubspec.base_dir,
        name: pubspec.manifest.name,
        config_file: pubspec.pubspec_yaml,
        ...res,
      };
    }
  }
}