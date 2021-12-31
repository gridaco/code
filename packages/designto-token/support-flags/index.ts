import { parse, keys, FlagsParseResult } from "@code-features/flags";
import type { ReflectSceneNode } from "@design-sdk/figma";
import { tokenize_flagged_artwork } from "./token-artwork";
import { tokenize_flagged_heading } from "./token-heading";
import { tokenize_flagged_paragraph } from "./token-p";
import { tokenize_flagged_span } from "./token-span";
import { tokenize_flagged_wrap } from "./token-wrap";
import { tokenize_flagged_wh_declaration } from "./token-wh";

export default function (node: ReflectSceneNode) {
  const flags = parse(node.name);
  return handle_with_flags(node, flags);
}

function handle_with_flags(node, flags: FlagsParseResult) {
  // artwork
  const artwork_flag_alias =
    flags["artwork"] ||
    flags["export-as"] ||
    flags["export-as-png"] ||
    flags["export-as-svg"] ||
    flags["export-as-pdf"] ||
    flags["export-as-jpg"] ||
    flags["export-as-webp"] ||
    flags["export-as-jpeg"] ||
    flags["export-as-gif"];
  if (artwork_flag_alias) {
    return tokenize_flagged_artwork(node, artwork_flag_alias);
  }

  // wrap
  const wrap_flag_alias = flags["wrap"] || flags["as-wrap"] || flags["is-wrap"];
  if (wrap_flag_alias) {
    return tokenize_flagged_wrap(node, wrap_flag_alias);
  }

  // heading
  const heading_flag_alias =
    flags[keys.flag_key__as_h1] ||
    flags[keys.flag_key__as_h2] ||
    flags[keys.flag_key__as_h3] ||
    flags[keys.flag_key__as_h4] ||
    flags[keys.flag_key__as_h5] ||
    flags[keys.flag_key__as_h6];

  if (heading_flag_alias) {
    return tokenize_flagged_heading(node, heading_flag_alias);
  }

  const span_flag_alias = flags[keys.flag_key__as_span];
  if (span_flag_alias) {
    return tokenize_flagged_span(node, span_flag_alias);
  }

  const paragraph_flag_alias = flags[keys.flag_key__as_p];
  if (paragraph_flag_alias) {
    return tokenize_flagged_paragraph(node, paragraph_flag_alias);
  }

  const wh_declaration_flags = [
    flags[keys.flag_key__width],
    flags[keys.flag_key__min_width],
    flags[keys.flag_key__max_width],
    flags[keys.flag_key__height],
    flags[keys.flag_key__min_height],
    flags[keys.flag_key__max_height],
  ].filter(Boolean);

  if (wh_declaration_flags.length) {
    return tokenize_flagged_wh_declaration(node, wh_declaration_flags);
  }
}
