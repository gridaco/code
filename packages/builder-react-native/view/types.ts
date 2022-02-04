export type RNPressRetentionOffset = Readonly<{
  top: number;
  left: number;
  bottom: number;
  right: number;
}>;

export type RNAccessibilityActionInfo = Readonly<
  {
    name: string;
    label?: string;
  } & (any | object)
>;

export type RNAccessibilityRole =
  | "none"
  | "button"
  | "togglebutton"
  | "link"
  | "search"
  | "image"
  | "keyboardkey"
  | "text"
  | "adjustable"
  | "imagebutton"
  | "header"
  | "summary"
  | "alert"
  | "checkbox"
  | "combobox"
  | "menu"
  | "menubar"
  | "menuitem"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "scrollbar"
  | "spinbutton"
  | "switch"
  | "tab"
  | "tabbar"
  | "tablist"
  | "timer"
  | "list"
  | "toolbar";

export type RNAccessibilityState = {
  disabled?: boolean;
  selected?: boolean;
  checked?: (boolean | "mixed") | null | undefined;
  busy?: boolean;
  expanded?: boolean;
} & object;
