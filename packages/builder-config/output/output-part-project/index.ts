import { File } from "../output-file";
import type { Module } from "../output-module";

/**
 * PartProject interface.
 *
 *
 * _references_: the part project is inspired from [package.json manifest](https://docs.npmjs.com/cli/v7/configuring-npm/package-json), yet compatitable across all frameworks, os, envs.
 */
export interface PartProject {
  _type: "part-project";

  engines: { [key: string]: string };

  os: string[];

  private: boolean;

  /**
   * name of the part project
   */
  name: string;

  version: string;

  description?: string;

  /**
   * authors
   */
  authors?: string[];

  homepage?: string;

  bugs?: string;

  license?: string;

  modules: Module[];

  files: File[];

  repository?:
    | {
        type: string;
        url: string;
      }
    | string;

  dependencies?: {
    [key: string]: string;
  };

  devDependencies?: {
    [key: string]: string;
  };

  peerDependencies?: {
    [key: string]: string;
  };

  /**
   * the main entry point of the project (just like in package.json for example)
   */
  main: string;
}
