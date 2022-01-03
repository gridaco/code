import { DimensionLength } from "@reflect-ui/core";

export const flag_key__height = "height";

export const flag_key_alias__height = [flag_key__height];

export interface HeightFlag {
  flag: typeof flag_key__height;

  value:
    | DimensionLength
    | {
        min?: DimensionLength;
        max?: DimensionLength;
        initial?: DimensionLength;
      };
  _raw?: string;
}
