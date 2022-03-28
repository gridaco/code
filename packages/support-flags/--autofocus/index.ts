export const flag_key__autofocus = "autofocus";
// alias
const flag_key__auto_focus = "auto-focus";

export const flag_key_alias__autofocus = [
  flag_key__autofocus,
  flag_key__auto_focus,
];

export interface AutofocusFlag {
  flag: typeof flag_key__autofocus;
  value?: boolean;
}
