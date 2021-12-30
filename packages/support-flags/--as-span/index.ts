export const flag_key__as_span = "as-span";
export const flag_key__as_text_span = "as-text-span";
export const flag_key__as_textspan = "as-textspan";
export const flag_key__text_span = "text-span";
export const flag_key__textspan = "textspan";

export interface AsTextSpanFlag {
  flag:
    | typeof flag_key__as_span
    | typeof flag_key__as_text_span
    | typeof flag_key__as_textspan
    | typeof flag_key__text_span
    | typeof flag_key__textspan;

  value: boolean;
  _raw?: string;
}
