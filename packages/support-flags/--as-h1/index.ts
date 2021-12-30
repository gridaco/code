export const flag_key__as_h1 = "as-h1";
export const flag_key__as_heading1 = "as-heading1";
export const flag_key__as_headline1 = "as-headline1";
export const flag_key__h1 = "h1";
export const flag_key__heading1 = "heading1";
export const flag_key__headline1 = "headline1";

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
