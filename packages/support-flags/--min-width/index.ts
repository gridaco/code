import { DimensionLength } from "@reflect-ui/core";

// primary
export const flag_key__min_width = "min-width";
// alias
const flag_key__minwidth = "minwidth";

export const flag_key_alias__min_width = [
  flag_key__min_width,
  flag_key__minwidth,
];

export interface MinWidthFlag {
  flag: typeof flag_key__min_width | typeof flag_key__minwidth;

  value: DimensionLength;
  _raw?: string;
}
