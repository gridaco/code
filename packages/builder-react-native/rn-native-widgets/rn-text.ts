///
/// React Native Text
/// copyright © 2022 Grida, Inc.
///

import type { mixed } from "../_";
import type {
  RNReactNode,
  RNPressEvent,
  RNLayoutEvent,
  RNTextLayoutEvent,
} from "../_/fixme-types";
import type { TextStyle, TextProps } from "react-native";

/**
 *
 * React Native Text Props interface
 *
 * @see https://reactnative.dev/docs/text#reference
 *
 * - [react-nattive/TextProps.js](https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/Text/TextProps.js)
 */
export type RNTextProps = Omit<
  TextProps,
  | "children"
  | "style"
  | "onLayout"
  | "onLongPress"
  | "onPress"
  | "onPressIn"
  | "onPressOut"
  | "onResponderGrant"
  | "onResponderMove"
  | "onResponderRelease"
  | "onResponderTerminate"
  | "onResponderTerminationRequest"
  | "onStartShouldSetResponder"
  | "onMoveShouldSetResponder"
  | "onTextLayout"
> & {
  children?: RNReactNode | null | undefined;

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

  style?: TextStyle | null | undefined;
};

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
