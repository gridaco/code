export * from "./solid-import-specifications";
import with_inline_css from "./solid-inline-css-widget";
import with_styled_components from "./solid-styled-component-widget";

const finilize = {
  with_inline_css,
  with_styled_components,
} as const;

export default finilize;
