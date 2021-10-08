import { parse } from "@code-features/flags";
import type { ReflectSceneNode } from "@design-sdk/figma";
import { tokenize_flagged_artwork } from "./token-artwork";
import { tokenize_flagged_wrap } from "./token-wrap";

export default function (node: ReflectSceneNode) {
  const flags = parse(node.name);
  return handle_with_flags(node, flags);
}

function handle_with_flags(node, flags) {
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

  const wrap_flag_alias = flags["wrap"] || flags["as-wrap"] || flags["is-wrap"];
  if (wrap_flag_alias) {
    return tokenize_flagged_wrap(node, wrap_flag_alias);
  }
}
