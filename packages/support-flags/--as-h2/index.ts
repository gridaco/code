// primary
export const flag_key__as_h2 = "as-h2";
// alias
const flag_key__as_heading2 = "as-heading2";
const flag_key__as_headline2 = "as-headline2";
const flag_key__h2 = "h2";
const flag_key__heading2 = "heading2";
const flag_key__headline2 = "headline2";

export const flag_key_alias__as_h2 = [
  flag_key__as_h2,
  flag_key__as_heading2,
  flag_key__as_headline2,
  flag_key__h2,
  flag_key__heading2,
  flag_key__headline2,
];

export interface AsHeading2Flag {
  flag:
    | typeof flag_key__as_h2
    | typeof flag_key__as_heading2
    | typeof flag_key__as_headline2
    | typeof flag_key__h2
    | typeof flag_key__heading2
    | typeof flag_key__headline2;

  value: boolean;
  _raw?: string;
}
