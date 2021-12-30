import { DimensionLength } from "@reflect-ui/core";

// primary
export const flag_key__max_height = "max-height";
// alias
const flag_key__maxheight = "maxheight";

export const flag_key_alias__max_height = [
  flag_key__max_height,
  flag_key__maxheight,
];

export interface MaxHeightFlag {
  flag: typeof flag_key__max_height | typeof flag_key__maxheight;

  value: DimensionLength;
  _raw?: string;
}
