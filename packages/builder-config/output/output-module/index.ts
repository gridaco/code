type SupportedLanguagesExt =
  | "ts"
  | "tsx"
  | "js"
  | "jsx"
  | "vue"
  | "dart"
  | "svelte";

/**
 * a
 */
export interface ModuleFile extends File {
  _type: "module";
  language: SupportedLanguagesExt;

  /**
   * list of exporting member identifiers
   */
  exports: string[];
}
