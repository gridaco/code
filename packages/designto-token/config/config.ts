import type { Widget } from "@reflect-ui/core";
import type { ReflectSceneNode } from "@design-sdk/figma-node";

/**
 * A tokenizer config interface for extending tokenizer's behavior.
 *
 * The default tokenizer config is: @see {default_tokenizer_config}
 */
export interface TokenizerConfig {
  sanitizer_ignore_masking_node: boolean;

  /**
   * @default false - flags support enabled by default.
   */
  disable_flags_support?: boolean;

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
  should_break?: (
    node: ReflectSceneNode,
    depth?: number,
    meta?: CallbackMeta,
    config?: TokenizerConfig
  ) => boolean;

  /**
   * a middleware function that will be called before the each tokenization. if returns `true`, the tokenization will be skipped.
   */
  should_skip?: (
    node: ReflectSceneNode,
    depth?: number,
    meta?: CallbackMeta,
    config?: TokenizerConfig
  ) => boolean;

  /**
   * ignore a flag feature with a explicit gate.
   * if ignore_flag set to true, the flag will be ignored even if this function returns false.
   * It only affects when `true` returned as a result.
   */
  should_ignore_flag?: (
    node: ReflectSceneNode,
    depth?: number,
    meta?: CallbackMeta,
    config?: TokenizerConfig
  ) => boolean;

  /**
   * A function that is called in between every tokenization process. (on shot for on node)
   */
  process_listener?: (
    node: ReflectSceneNode,
    depth?: number,
    meta?: CallbackMeta,
    config?: TokenizerConfig
  ) => void;

  /**
   * A custom wrapping logic provider that can generally be use on any scenario.
   *
   * you can either return a original, wrapped or a modified token to transform the result, or return false to skip.
   * returning a value ohter thatn `Widget | fales` will throw - null / undefined / ...
   */
  custom_wrapping_provider?: (
    tokenized_child: Widget,
    node: ReflectSceneNode,
    depth?: number,
    meta?: CallbackMeta,
    config?: TokenizerConfig
  ) => Widget | false;
}

type CallbackMeta = {
  flags?: string[];
};
