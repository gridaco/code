import { parse, keys } from "@code-features/flags";
import type { ReflectSceneNode } from "@design-sdk/figma";
import { tokenize_flagged_artwork } from "./token-artwork";
import { tokenize_flagged_heading } from "./token-heading";
import { tokenize_flagged_paragraph } from "./token-p";
import { tokenize_flagged_span } from "./token-span";
import { tokenize_flagged_wrap } from "./token-wrap";

export default function (node: ReflectSceneNode) {
  const flags = parse(node.name);
  return handle_with_flags(node, flags);
}

function handle_with_flags(node, flags) {
  // process.env.NODE_ENV === "development" &&
  //   console.log("tokenize_flagged_node", node, flags);

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
    flags[keys.flag_key__h1] ||
    flags[keys.flag_key__as_h1] ||
    flags[keys.flag_key__heading1] ||
    flags[keys.flag_key__as_heading1] ||
    flags[keys.flag_key__headline1] ||
    flags[keys.flag_key__as_headline1] ||
    //
    flags[keys.flag_key__h2] ||
    flags[keys.flag_key__as_h2] ||
    flags[keys.flag_key__heading2] ||
    flags[keys.flag_key__as_heading2] ||
    flags[keys.flag_key__headline2] ||
    flags[keys.flag_key__as_headline2] ||
    //
    flags[keys.flag_key__h3] ||
    flags[keys.flag_key__as_h3] ||
    flags[keys.flag_key__heading3] ||
    flags[keys.flag_key__as_heading3] ||
    flags[keys.flag_key__headline3] ||
    flags[keys.flag_key__as_headline3] ||
    //
    flags[keys.flag_key__h4] ||
    flags[keys.flag_key__as_h4] ||
    flags[keys.flag_key__heading4] ||
    flags[keys.flag_key__as_heading4] ||
    flags[keys.flag_key__headline4] ||
    flags[keys.flag_key__as_headline4] ||
    //
    flags[keys.flag_key__h5] ||
    flags[keys.flag_key__as_h5] ||
    flags[keys.flag_key__heading5] ||
    flags[keys.flag_key__as_heading5] ||
    flags[keys.flag_key__headline5] ||
    flags[keys.flag_key__as_headline5] ||
    //
    flags[keys.flag_key__h6] ||
    flags[keys.flag_key__as_h6] ||
    flags[keys.flag_key__heading6] ||
    flags[keys.flag_key__as_heading6] ||
    flags[keys.flag_key__headline6] ||
    flags[keys.flag_key__as_headline6];
  if (heading_flag_alias) {
    return tokenize_flagged_heading(node, heading_flag_alias);
  }

  const span_flag_alias =
    flags[keys.flag_key__as_span] ||
    flags[keys.flag_key__as_text_span] ||
    flags[keys.flag_key__as_textspan] ||
    flags[keys.flag_key__text_span] ||
    flags[keys.flag_key__textspan];
  if (span_flag_alias) {
    return tokenize_flagged_span(node, span_flag_alias);
  }

  const paragraph_flag_alias =
    flags[keys.flag_key__as_p] ||
    flags[keys.flag_key__paragraph] ||
    flags[keys.flag_key__as_paragraph];
  if (paragraph_flag_alias) {
    return tokenize_flagged_paragraph(node, paragraph_flag_alias);
  }
}
