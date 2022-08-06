import type { BuilderConfig } from "@grida/builder-config";

export type GridaProjectType = "module" | "project";

export interface GridaConfig extends BuilderConfig {
  name: string;

  /**
   * @see {GridaProjectType}
   *
   * - module: can be published via `grida publish`
   * - project: can be deployed via `grida deploy`
   *
   * @default "project"
   */
  type: GridaProjectType;

  /**
   * grida codegen fallback directory.
   *
   * - flutter - `./lib/grida`
   * - node - `./(src | . | lib)/grida`
   *
   * @default "./grida"
   */
  fallbackDir?: string;
}
