import { DimensionLength } from "@reflect-ui/core";

export const flag_key__max_width = "max-width";
export const flag_key__maxwidth = "maxwidth";

export const flag_key_alias__max_width = [
  flag_key__max_width,
  flag_key__maxwidth,
];

export interface MaxWidthFlag {
  flag: typeof flag_key__max_width | typeof flag_key__maxwidth;

  value: DimensionLength;
  _raw?: string;
}
