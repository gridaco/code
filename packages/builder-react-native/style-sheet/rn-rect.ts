export type RNRect = Readonly<{
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}>;

export type RNRectOrSize = RNRect | number;
