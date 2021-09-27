import { TokenizerConfig } from "./config";

export const default_tokenizer_config: TokenizerConfig = {
  // temporarily ignoring since masking is not supported yet.
  sanitizer_ignore_masking_node: true,
};
