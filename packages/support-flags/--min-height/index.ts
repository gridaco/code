import { DimensionLength } from "@reflect-ui/core";

// primary
export const flag_key__min_height = "min-height";
// alias
const flag_key__minheight = "minheight";

export const flag_key_alias__min_height = [
  flag_key__min_height,
  flag_key__minheight,
];

export interface MinHeightFlag {
  flag: typeof flag_key__min_height | typeof flag_key__minheight;

  value: DimensionLength;
  _raw?: string;
}
