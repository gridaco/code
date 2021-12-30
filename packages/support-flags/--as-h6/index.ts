export const flag_key__as_h6 = "as-h6";
export const flag_key__as_heading6 = "as-heading6";
export const flag_key__as_headline6 = "as-headline6";
export const flag_key__h6 = "h6";
export const flag_key__heading6 = "heading6";
export const flag_key__headline6 = "headline6";

export interface AsHeading6Flag {
  flag:
    | typeof flag_key__as_h6
    | typeof flag_key__as_heading6
    | typeof flag_key__as_headline6
    | typeof flag_key__h6
    | typeof flag_key__heading6
    | typeof flag_key__headline6;

  value: boolean;
  _raw?: string;
}
