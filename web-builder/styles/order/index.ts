export type CssOrderInputLike = number | "first";

/**
 * [css#order](https://developer.mozilla.org/en-US/docs/Web/CSS/order)
 * @param o
 */
export function order(o: CssOrderInputLike): number {
  if (typeof o == "number") {
    if (!Number.isInteger(o)) {
      throw "order must be in integer form";
    }

    return o;
  }
  if (o == "first") {
    return -1;
  }
  throw `cannot create css order with givven input. "${o}"`;
}
