import type { ProjectPart } from "../output-part-project";
import type { File } from "../output-file";
import type { Module } from "../output-module";
import * as k from "../../k";

export function make_project_part_output({
  name,
  version = "0.0.0",
  main,
  files,
  modules,
  os = ["*"],
  engines = {},
}: {
  name: string;
  version?: string;
  main: string;
  files: File[];
  modules: Module[];
  os?: string[];
  engines?: {
    [key: string]: string;
  };
}): ProjectPart {
  return {
    _type: "part-project",
    engines: engines,
    os: os,
    private: true,
    name: `${k.made_with_grida_npm_namespace}/${name}`,
    version: version,
    modules: modules,
    files: files,
    main: main,
  };
}
