/**
 * A tokenizer config interface for extending tokenizer's behavior.
 *
 * The default tokenizer config is: @see {default_tokenizer_config}
 */
export interface TokenizerConfig {
  sanitizer_ignore_masking_node: boolean;

  /**
   * stops the tokenizer when max depth is reached relative to starter (root) node.
   * @default "infinite"
   */
  max_depth?: number | "infinite";

  /**
   * stops the current tokenizer (not the root tokenizing proc) when max depth is reached relative to current node.
   * @default "infinite"
   */
  max_each_depth?: number | "infinite";

  /**
   * (a.k.a should_stop) a middleware function that will be called before the each tokenization. if returns `true`, the tokenization will stop and return the current value.
   */
  should_break?: (node: any) => boolean;

  /**
   * a middleware function that will be called before the each tokenization. if returns `true`, the tokenization will be skipped.
   */
  should_skip?: (node: any) => boolean;

  /**
   * A function that is called in between every tokenization process. (on shot for on node)
   */
  process_listener?: (node: any) => void;
}
