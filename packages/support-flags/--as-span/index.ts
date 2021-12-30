// primary
export const flag_key__as_span = "as-span";
// alias
const flag_key__as_text_span = "as-text-span";
const flag_key__as_textspan = "as-textspan";
const flag_key__text_span = "text-span";
const flag_key__textspan = "textspan";

export const flag_key_alias__as_span = [
  flag_key__as_span,
  flag_key__as_text_span,
  flag_key__as_textspan,
  flag_key__text_span,
  flag_key__textspan,
];

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
