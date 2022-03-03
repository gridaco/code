/**
 * the genral file output definition
 */
export interface File {
  /**
   * name of the file with optional extension
   *
   * by "optional", it doesn't mean you can skip the extension while expecting the handler to automatically detect the extension
   *
   * it means you can skip the extension for files that does not require a extension.
   * e.g.
   * ```
   * LICENSE
   * WATCHLISTS
   * OWNERS
   * DIR_METADATA
   * ```
   *
   * other wise, the extension is required.
   * e.g.
   * ```
   * index.html
   * index.ts
   * my-gf-selfie.jpg (null)
   * .gn
   * .vscode
   * .github
   * ```
   */
  name: string;

  /**
   * mime type of the file
   */
  readonly type: string;

  /**
   * The absolute path to the file relative to root of the environment.
   *
   * - acceptable: `/path/to/file.ts`
   * - unacceptable: `./path/to/file.ts`
   */
  path: string;

  /**
   * The contents of the file. binary is also acceptable.
   */
  content: string;

  /**
   * the size of the file
   */
  size?: number;
}
