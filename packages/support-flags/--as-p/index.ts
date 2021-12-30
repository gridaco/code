export const flag_key__as_p = "as-p";
export const flag_key__as_paragraph = "as-paragraph";
export const flag_key__paragraph = "paragraph";

export interface AsParagraphFlag {
  flag:
    | typeof flag_key__as_p
    | typeof flag_key__as_paragraph
    | typeof flag_key__paragraph;

  value: boolean;
  _raw?: string;
}
