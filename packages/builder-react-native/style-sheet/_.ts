/**
 * @see https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/StyleSheet/StyleSheetTypes.js
 */
export type RNGenericStyleProp<T> =
  | null
  | void
  | T
  | false
  | ""
  | ReadonlyArray<RNGenericStyleProp<T>>;
