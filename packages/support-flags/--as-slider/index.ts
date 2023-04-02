// priamry
export const flag_key__as_slider = "as-slider";
// alias
const flag_key__as_range = "as-range";

export const flag_key_alias__as_slider = [
  flag_key__as_slider,
  flag_key__as_range,
];

export interface AsSliderFlag {
  flag: typeof flag_key__as_slider | typeof flag_key__as_range;

  value: boolean;
  _raw?: string;
}
