import type { RNGenericStyleProp } from "./_";
import type { ____RNColorValue_Internal } from "./rn-color-value";
/**
 * @see https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/StyleSheet/StyleSheetTypes.js
 */
export type ____RNFontWeight_Internal =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

/**
 * @see https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/StyleSheet/StyleSheetTypes.js
 */
export type ____RNTextStyle_Internal = Readonly<{
  // ...$Exact<____ViewStyle_Internal>,
  color?: ____RNColorValue_Internal;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: "normal" | "italic";
  fontWeight?: ____RNFontWeight_Internal;
  fontVariant?: ReadonlyArray<
    | "small-caps"
    | "oldstyle-nums"
    | "lining-nums"
    | "tabular-nums"
    | "proportional-nums"
  >;
  textShadowOffset?: Readonly<{
    width: number;
    height: number;
  }>;
  textShadowRadius?: number;
  textShadowColor?: ____RNColorValue_Internal;
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  textAlignVertical?: "auto" | "top" | "bottom" | "center";
  includeFontPadding?: boolean;
  textDecorationLine?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";
  textDecorationStyle?: "solid" | "double" | "dotted" | "dashed";
  textDecorationColor?: ____RNColorValue_Internal;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  writingDirection?: "auto" | "ltr" | "rtl";
}>;

export type ____RNTextStyleProp_Internal = RNGenericStyleProp<
  Readonly<____RNTextStyle_Internal>
>;
