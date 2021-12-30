// primary
export const flag_key__as_h1 = "as-h1";
// alias
const flag_key__as_heading1 = "as-heading1";
const flag_key__as_headline1 = "as-headline1";
const flag_key__h1 = "h1";
const flag_key__heading1 = "heading1";
const flag_key__headline1 = "headline1";

export const flag_key_alias__as_h1 = [
  flag_key__as_h1,
  flag_key__as_heading1,
  flag_key__as_headline1,
  flag_key__h1,
  flag_key__heading1,
  flag_key__headline1,
];

export interface AsHeading1Flag {
  flag:
    | typeof flag_key__as_h1
    | typeof flag_key__as_heading1
    | typeof flag_key__as_headline1
    | typeof flag_key__h1
    | typeof flag_key__heading1
    | typeof flag_key__headline1;

  value: boolean;
  _raw?: string;
}
