import type { BuilderConfig } from "@grida/builder-config";
export interface GridaConfig extends BuilderConfig {
  name: string;

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
