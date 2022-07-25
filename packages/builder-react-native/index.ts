export * from "./rn-import-specifications";
export * from "./rn-widgets";

// building strategies
import with_inline_style from "./rn-build-inline-style-widget";
import with_stylesheet from "./rn-build-stylesheet-widget";
import with_styled_components from "./rn-build-styled-component-widget";

const finilize = {
  with_inline_style,
  with_stylesheet,
  with_styled_components,
} as const;

export default finilize;
