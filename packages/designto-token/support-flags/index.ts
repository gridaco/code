import {
  parse,
  keys,
  FlagsParseResult,
  WHDeclarationFlag,
  FixWHFlag,
} from "@code-features/flags";
import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { tokenize_flagged_artwork } from "./token-artwork";
import { tokenize_flagged_heading } from "./token-heading";
import { tokenize_flagged_paragraph } from "./token-p";
import { tokenize_flagged_span } from "./token-span";
import { tokenize_flagged_textfield } from "./token-textfield";
import { tokenize_flagged_wrap } from "./token-wrap";
import { tokenize_flagged_wh_declaration } from "./token-wh";
import { tokenize_flagged_fix_wh } from "./token-wh-fix";
import { tokenize_flagged_button } from "./token-button";
import { tokenize_flagged_slider } from "./token-slider";
import { tokenize_flagged_progress } from "./token-progress";

import { tokenize_flagged_google_maps_view } from "./token-x-google-maps-view";
import { tokenize_flagged_youtube_view } from "./token-x-youtube-view";
import { tokenize_flagged_camera_view } from "./token-x-camera-display";
import { tokenize_flagged_checkbox } from "./token-checkbox";

// module related
import { tokenize_flagged_declare } from "./token-declare";

export default function handleWithFlags(node: ReflectSceneNode) {
  const flags = parse(node.name);
  return _handle_with_flags(node, flags);
}

function _handle_with_flags(node, flags: FlagsParseResult) {
  // #region widget altering flags
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

  if (flags.__meta?.contains_button_flag) {
    return tokenize_flagged_button(node, flags[keys.flag_key__as_button]);
  }

  if (flags.__meta?.contains_checkbox_flag) {
    return tokenize_flagged_checkbox(node, flags[keys.flag_key__as_checkbox]);
  }

  if (flags.__meta?.contains_input_flag) {
    return tokenize_flagged_textfield(node, flags[keys.flag_key__as_input]);
  }

  if (flags.__meta?.contains_slider_flag) {
    return tokenize_flagged_slider(node, flags[keys.flag_key__as_slider]);
  }

  if (flags.__meta?.contains_progress_flag) {
    return tokenize_flagged_progress(node, flags[keys.flag_key__as_progress]);
  }
  // #endregion

  // #region exetnded views
  if (flags.__meta?.contains_x_google_maps_view_flag) {
    return tokenize_flagged_google_maps_view(
      node,
      flags[keys.flag_key__x_google_maps_view]
    );
  }

  if (flags.__meta?.contains_x_youtube_view_flag) {
    return tokenize_flagged_youtube_view(
      node,
      flags[keys.flag_key__x_youtube_view]
    );
  }

  if (flags.__meta?.contains_camera_flag) {
    return tokenize_flagged_camera_view(node, flags[keys.flag_key__camera]);
  }

  // #end exetnded views

  // #region element altering flags
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
  // #endregion

  // #region style extension flags
  const paragraph_flag_alias = flags[keys.flag_key__as_p];
  if (paragraph_flag_alias) {
    return tokenize_flagged_paragraph(node, paragraph_flag_alias);
  }

  const wh_declaration_flags: WHDeclarationFlag[] = [
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

  const fix_wh_flags: FixWHFlag[] = [
    flags[keys.flag_key__fix_width],
    flags[keys.flag_key__fix_height],
  ].filter(Boolean);
  if (fix_wh_flags.length) {
    return tokenize_flagged_fix_wh(node, fix_wh_flags);
  }
  // #endregion style extension flags

  // #region module related flags
  if (flags.__meta?.contains_declare_flag) {
    return tokenize_flagged_declare(node, flags[keys.flag_key__declare]);
  }
  // #endregion module related flags
}
