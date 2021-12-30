import { DimensionLength } from "@reflect-ui/core";

export const flag_key__fix_width = "fixed-width";

export interface FixWidthFlag {
  flag: typeof flag_key__fix_width;

  value: DimensionLength;
  _raw?: string;
}
