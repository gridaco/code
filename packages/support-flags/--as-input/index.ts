// primary
export const flag_key__as_input = "as-input";
// alias
const flag_key__textfield = "textfield";
const flag_key__text_field = "text-field";

export const flag_key_alias_as_input = [
  flag_key__as_input,
  flag_key__textfield,
  flag_key__text_field,
];

export interface AsInputFlag {
  flag:
    | typeof flag_key__as_input
    | typeof flag_key__textfield
    | typeof flag_key__text_field;

  value: boolean;
  type: string;
  _raw?: string;
}
