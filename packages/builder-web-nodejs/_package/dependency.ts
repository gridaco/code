import { TVersion } from "./version";

/**
 * dependencies structure
 * ```
 * dependencies: {
 *    "a": "latest",
 *    "b": "latest"
 * }
 * ```
 */
export type Dependencies = { [key: string]: TVersion };

export interface SingleDependency {
  name: string;
  version: TVersion;
}

// export interface
