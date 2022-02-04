import type { Stringish } from "../_";

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

export type RNAccessibilityValue = Readonly<{
  /**
   * The minimum value of this component's range. (should be an integer)
   */
  min?: number;

  /**
   * The maximum value of this component's range. (should be an integer)
   */
  max?: number;

  /**
   * The current value of this component's range. (should be an integer)
   */
  now?: number;

  /**
   * A textual description of this component's value. (will override minimum, current, and maximum if set)
   */
  text?: Stringish;
}>;
