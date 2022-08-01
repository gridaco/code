import path from "path";
import { find_in_cwd, find_in_parent } from "../_utils/path";
import YAML from "yaml";
import fs from "fs";

const _PUBSPEC_YAML = "pubspec.y{,a}ml";

interface IPubSpecManifest {
  name: string;
  description?: string;
  dependencies?: { [key: string]: string };
}

interface PubspecSearchResult {
  base_dir: string;
  pubspec_yaml: string;
  manifest: IPubSpecManifest;
}

export function locatePubspec(cwd = process.cwd()): PubspecSearchResult | null {
  const pubspecyaml = find_in_cwd(_PUBSPEC_YAML, cwd, true);
  if (pubspecyaml) {
    return {
      base_dir: path.dirname(pubspecyaml),
      pubspec_yaml: pubspecyaml,
      manifest: read(pubspecyaml),
    };
  }
  const pubspecyaml_in_parent_dir = find_in_parent(
    _PUBSPEC_YAML,
    cwd,
    true,
    true
  );
  if (pubspecyaml_in_parent_dir) {
    return {
      base_dir: path.dirname(pubspecyaml_in_parent_dir),
      pubspec_yaml: pubspecyaml_in_parent_dir,
      manifest: read(path.join(pubspecyaml_in_parent_dir)),
    };
  }
  return null;
}

export function read(pubspec: string): IPubSpecManifest {
  return YAML.parse(fs.readFileSync(pubspec, "utf8"));
}

export function analyzeFramework(pubspec: IPubSpecManifest): {
  framework: "flutter";
} {
  const isflutter = "flutter" in pubspec || pubspec.dependencies?.flutter;
  if (isflutter) {
    return { framework: "flutter" };
  }
}
