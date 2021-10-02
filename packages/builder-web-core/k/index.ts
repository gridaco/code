import { CSSProperties } from "@coli.codes/css";

/**
 * smallest transparent image data as base64. - from https://stackoverflow.com/a/13139830/5463235
 */
export const image_smallest_fallback_source_base_64 =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const user_agent_stylesheet_override_default = <CSSProperties>{
  margin: "0px",
  "font-family": `Helvetica, "Helvetica Neue", Roboto, Noto, Arial, sans-serif`,
};

export const default_generic_fallback_font_family = "sans-serif";