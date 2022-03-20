import {
  Opacity,
  Positioned,
  SizedBox,
  ClipRRect,
  Blurred,
  Rotation,
  Widget,
  OverflowBox,
  SingleChildScrollView,
} from "@reflect-ui/core";
import { Stretched } from "../tokens";

export type WrappingToken =
  // layout / positioning / sizing wrappers
  | SizedBox
  | Stretched
  | Positioned
  | OverflowBox
  // scroll
  | SingleChildScrollView
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
export function unwrappedChild<T extends Widget>(maybeWrapped: Widget): T {
  if (
    maybeWrapped instanceof SizedBox ||
    maybeWrapped instanceof Stretched ||
    maybeWrapped instanceof Positioned ||
    maybeWrapped instanceof OverflowBox ||
    maybeWrapped instanceof SingleChildScrollView ||
    maybeWrapped instanceof Rotation ||
    maybeWrapped instanceof Opacity ||
    maybeWrapped instanceof Blurred ||
    maybeWrapped instanceof ClipRRect
  ) {
    return unwrappedChild(maybeWrapped.child);
  }
  return maybeWrapped as T;
}
