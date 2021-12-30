export const flag_key__as_h3 = "as-h3";
export const flag_key__as_heading3 = "as-heading3";
export const flag_key__as_headline3 = "as-headline3";
export const flag_key__h3 = "h3";
export const flag_key__heading3 = "heading3";
export const flag_key__headline3 = "headline3";

export interface AsHeading3Flag {
  flag:
    | typeof flag_key__as_h3
    | typeof flag_key__as_heading3
    | typeof flag_key__as_headline3
    | typeof flag_key__h3
    | typeof flag_key__heading3
    | typeof flag_key__headline3;

  value: boolean;
  _raw?: string;
}
