import { DimensionLength } from "@reflect-ui/core";

export const flag_key__min_width = "min-width";
export const flag_key__minwidth = "minwidth";

export const flag_key_alias__min_width = [
  flag_key__min_width,
  flag_key__minwidth,
];

export interface MinWidthFlag {
  flag: typeof flag_key__min_width | typeof flag_key__minwidth;

  value: DimensionLength;
  _raw?: string;
}
