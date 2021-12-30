export const flag_key__as_h5 = "as-h5";
export const flag_key__as_heading5 = "as-heading5";
export const flag_key__as_headline5 = "as-headline5";
export const flag_key__h5 = "h5";
export const flag_key__heading5 = "heading5";
export const flag_key__headline5 = "headline5";

export const flag_key_alias__as_h5 = [
  flag_key__as_h5,
  flag_key__as_heading5,
  flag_key__as_headline5,
  flag_key__h5,
  flag_key__heading5,
  flag_key__headline5,
];

export interface AsHeading5Flag {
  flag:
    | typeof flag_key__as_h5
    | typeof flag_key__as_heading5
    | typeof flag_key__as_headline5
    | typeof flag_key__h5
    | typeof flag_key__heading5
    | typeof flag_key__headline5;

  value: boolean;
  _raw?: string;
}
