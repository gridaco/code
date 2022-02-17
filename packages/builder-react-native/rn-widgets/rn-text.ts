///
/// React Native Text
/// copyright © 2022 Grida, Inc.
///

import type { Stringish, mixed } from "../_";
import type {
  RNReactNode,
  RNPressEvent,
  RNLayoutEvent,
  RNTextLayoutEvent,
  RNAccessibilityActionEvent,
} from "../_/fixme-types";
import type {
  RNPressRetentionOffset,
  RNAccessibilityActionInfo,
  RNAccessibilityRole,
  RNAccessibilityState,
} from "../rn-view";
import type { RNTextStyleProp } from "../rn-style-sheet";

type RNTextBreakStrategy = "balanced" | "highQuality" | "simple";
type RNDataDetectorType = "phoneNumber" | "link" | "email" | "none" | "all";
type RNAndroid_hyphenationFrequency = "normal" | "none" | "full";
type RNEllipsizeMode = "clip" | "head" | "middle" | "tail";

/**
 *
 * React Native Text Props interface
 *
 * @see https://reactnative.dev/docs/text#reference
 *
 * - [react-nattive/TextProps.js](https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/Text/TextProps.js)
 */
export interface RNTextProps {
  /**
   * Indicates whether the view is an accessibility element.
   *
   * See https://reactnative.dev/docs/text#accessible
   */
  accessible?: boolean;
  accessibilityActions?:
    | ReadonlyArray<RNAccessibilityActionInfo>
    | null
    | undefined;
  onAccessibilityAction?:
    | ((event: RNAccessibilityActionEvent) => mixed)
    | null
    | undefined;
  accessibilityHint?: Stringish;
  accessibilityLabel?: Stringish;
  accessibilityRole?: RNAccessibilityRole | null | undefined;
  accessibilityState?: RNAccessibilityState | null | undefined;

  /**
   * Whether font should be scaled down automatically.
   *
   * See https://reactnative.dev/docs/text#adjustsfontsizetofit
   */
  adjustsFontSizeToFit?: boolean | null | undefined;

  /**
   * Whether fonts should scale to respect Text Size accessibility settings.
   *
   * See https://reactnative.dev/docs/text#allowfontscaling
   */
  allowFontScaling?: boolean | undefined;

  /**
   * Set hyphenation strategy on Android.
   *
   */
  android_hyphenationFrequency?:
    | RNAndroid_hyphenationFrequency
    | null
    | undefined;
  children?: RNReactNode | null | undefined;

  /**
   * When `numberOfLines` is set, this prop defines how text will be
   * truncated.
   *
   * See https://reactnative.dev/docs/text#ellipsizemode
   */
  ellipsizeMode?: RNEllipsizeMode | null | undefined;

  /**
   * Specifies largest possible scale a font can reach when `allowFontScaling` is enabled.
   * Possible values:
   * `null/undefined` (default): inherit from the parent node or the global default (0)
   * `0`: no max, ignore parent/global default
   * `>= 1`: sets the maxFontSizeMultiplier of this node to this value
   */
  maxFontSizeMultiplier?: number | null | undefined;

  /**
   * Used to locate this view from native code.
   *
   * See https://reactnative.dev/docs/text#nativeid
   */
  nativeID?: string | null | undefined;

  /**
   * Used to truncate the text with an ellipsis.
   *
   * See https://reactnative.dev/docs/text#numberoflines
   */
  numberOfLines?: number | null | undefined;

  /**
   * Invoked on mount and layout changes.
   *
   * See https://reactnative.dev/docs/text#onlayout
   */
  onLayout?: ((event: RNLayoutEvent) => mixed) | null | undefined;

  /**
   * This function is called on long press.
   *
   * See https://reactnative.dev/docs/text#onlongpress
   */
  onLongPress?: ((event: RNPressEvent) => mixed) | null | undefined;

  /**
   * This function is called on press.
   *
   * See https://reactnative.dev/docs/text#onpress
   */
  onPress?: ((event: RNPressEvent) => mixed) | null | undefined;
  onPressIn?: ((event: RNPressEvent) => mixed) | null | undefined;
  onPressOut?: ((event: RNPressEvent) => mixed) | null | undefined;
  onResponderGrant?: ((event: RNPressEvent) => void) | null | undefined;
  onResponderMove?: ((event: RNPressEvent) => void) | null | undefined;
  onResponderRelease?: ((event: RNPressEvent) => void) | null | undefined;
  onResponderTerminate?: ((event: RNPressEvent) => void) | null | undefined;
  onResponderTerminationRequest?: (() => boolean) | null | undefined;
  onStartShouldSetResponder?: (() => boolean) | null | undefined;
  onMoveShouldSetResponder?: (() => boolean) | null | undefined;
  onTextLayout?: ((event: RNTextLayoutEvent) => mixed) | null | undefined;

  /**
   * Defines how far your touch may move off of the button, before
   * deactivating the button.
   *
   * See https://reactnative.dev/docs/text#pressretentionoffset
   */
  pressRetentionOffset?: RNPressRetentionOffset | null | undefined;

  /**
   * Lets the user select text.
   *
   * See https://reactnative.dev/docs/text#selectable
   */
  selectable?: boolean | null | undefined;
  style?: RNTextStyleProp | null | undefined;

  /**
   * Used to locate this view in end-to-end tests.
   *
   * See https://reactnative.dev/docs/text#testid
   */
  testID?: string | null | undefined;

  /**
   * Android Only
   */

  /**
   * Specifies the disabled state of the text view for testing purposes.
   *
   * See https://reactnative.dev/docs/text#disabled
   */
  disabled?: boolean | null | undefined;

  /**
   * The highlight color of the text.
   *
   * See https://reactnative.dev/docs/text#selectioncolor
   */
  selectionColor?: string | null | undefined;

  dataDetectorType?: RNDataDetectorType | null | undefined;

  /**
   * Set text break strategy on Android.
   *
   * See https://reactnative.dev/docs/text#textbreakstrategy
   */
  textBreakStrategy?: RNTextBreakStrategy | null | undefined;

  /**
   * iOS Only
   */
  /* --override--
  adjustsFontSizeToFit?: ?boolean;
     --override-- */

  /**
   * Smallest possible scale a font can reach.
   *
   * See https://reactnative.dev/docs/text#minimumfontscale
   */
  minimumFontScale?: number | null | undefined;

  /**
   * When `true`, no visual change is made when text is pressed down.
   *
   * See https://reactnative.dev/docs/text#supperhighlighting
   */
  suppressHighlighting?: boolean | null | undefined;
}

/**
 * React Native Text
 *
 *
 * @see https://reactnative.dev/docs/text#reference
 *
 * origin source
 * - [react-nattive/Text.js](https://github.com/facebook/react-native/blob/3e229f27bc9c7556876ff776abf70147289d544b/Libraries/Text/Text.js)
 * - [react-nattive/TextProps.js](https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/Text/TextProps.js)
 */
export class RNText implements RNTextProps {
  constructor({ ...props }: RNTextProps) {}
}
