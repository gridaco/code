export const flag_key__as_h4 = "as-h4";
export const flag_key__as_heading4 = "as-heading4";
export const flag_key__as_headline4 = "as-headline4";
export const flag_key__h4 = "h4";
export const flag_key__heading4 = "heading4";
export const flag_key__headline4 = "headline4";

export interface AsHeading4Flag {
  flag:
    | typeof flag_key__as_h4
    | typeof flag_key__as_heading4
    | typeof flag_key__as_headline4
    | typeof flag_key__h4
    | typeof flag_key__heading4
    | typeof flag_key__headline4;
  value?: boolean;
}
