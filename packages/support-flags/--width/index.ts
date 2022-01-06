import { DimensionLength } from "@reflect-ui/core";

export const flag_key__width = "width";

export const flag_key_alias__width = [flag_key__width];

export interface WidthFlag {
  flag: typeof flag_key__width;

  value:
    | DimensionLength
    | {
        min?: DimensionLength;
        max?: DimensionLength;
        initial?: DimensionLength;
      };
  _raw?: string;
}
