import type { RNAnimatedNode } from "../_/fixme-types";
import { ____RNColorValue_Internal } from "./rn-color-value";
import type { RNGenericStyleProp } from "./_";

export type ____RNViewStyleProp_Internal = RNGenericStyleProp<
  Readonly<____RNViewStyle_Internal>
>;

export type ____RNViewStyle_Internal = Readonly<{
  // ...$Exact<____LayoutStyle_Internal>,
  // ...$Exact<____ShadowStyle_Internal>,
  // ...$Exact<____TransformStyle_Internal>,
  backfaceVisibility?: "visible" | "hidden";
  backgroundColor?: ____RNColorValue_Internal;
  borderColor?: ____RNColorValue_Internal;
  borderBottomColor?: ____RNColorValue_Internal;
  borderEndColor?: ____RNColorValue_Internal;
  borderLeftColor?: ____RNColorValue_Internal;
  borderRightColor?: ____RNColorValue_Internal;
  borderStartColor?: ____RNColorValue_Internal;
  borderTopColor?: ____RNColorValue_Internal;
  borderRadius?: number | RNAnimatedNode;
  borderBottomEndRadius?: number | RNAnimatedNode;
  borderBottomLeftRadius?: number | RNAnimatedNode;
  borderBottomRightRadius?: number | RNAnimatedNode;
  borderBottomStartRadius?: number | RNAnimatedNode;
  borderTopEndRadius?: number | RNAnimatedNode;
  borderTopLeftRadius?: number | RNAnimatedNode;
  borderTopRightRadius?: number | RNAnimatedNode;
  borderTopStartRadius?: number | RNAnimatedNode;
  borderStyle?: "solid" | "dotted" | "dashed";
  borderWidth?: number | RNAnimatedNode;
  borderBottomWidth?: number | RNAnimatedNode;
  borderEndWidth?: number | RNAnimatedNode;
  borderLeftWidth?: number | RNAnimatedNode;
  borderRightWidth?: number | RNAnimatedNode;
  borderStartWidth?: number | RNAnimatedNode;
  borderTopWidth?: number | RNAnimatedNode;
  opacity?: number | RNAnimatedNode;
  elevation?: number;
}>;
