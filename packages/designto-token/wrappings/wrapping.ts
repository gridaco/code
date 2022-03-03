import {
  Opacity,
  Positioned,
  SizedBox,
  ClipRRect,
  Blurred,
  Rotation,
  Widget,
  OverflowBox,
} from "@reflect-ui/core";
import { Stretched } from "../tokens";

export type WrappingToken =
  // layout / positioning / sizing wrappers
  | SizedBox
  | Stretched
  | Positioned
  | OverflowBox
  // transform wrappers
  | Rotation
  | Opacity
  // effect wrappers
  | Blurred
  // clip wrappers
  | ClipRRect;

/**
 * CAUTION - this is not related to `Wrap` Widget. this unwrapps a (nested) token that is wrapped with typeof `WrappingToken`
 * @param maybeWrapped
 * @returns
 */
export function unwrappedChild(maybeWrapped: Widget): Widget {
  if (
    maybeWrapped instanceof SizedBox ||
    maybeWrapped instanceof Stretched ||
    maybeWrapped instanceof Positioned ||
    maybeWrapped instanceof OverflowBox ||
    maybeWrapped instanceof Rotation ||
    maybeWrapped instanceof Opacity ||
    maybeWrapped instanceof Blurred ||
    maybeWrapped instanceof ClipRRect
  ) {
    return unwrappedChild(maybeWrapped.child);
  }
  return maybeWrapped;
}
