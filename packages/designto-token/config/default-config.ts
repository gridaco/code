import { TokenizerConfig } from "./config";

export const default_tokenizer_config: TokenizerConfig = <TokenizerConfig>{
  // temporarily ignoring since masking is not supported yet.
  sanitizer_ignore_masking_node: true,
  disable_flags_support: false,
  max_depth: "infinite",
  max_each_depth: "infinite",
  should_break: () => false,
  should_skip: () => false,
  process_listener: () => {},
};
