import { WrappingToken } from "@designto/token/wrappings";
import { Stretched } from "@designto/token/tokens";
import * as web from "@web-builder/core";
import {
  Opacity,
  Positioned,
  SizedBox,
  ClipRRect,
  Blurred,
  Rotation,
  Widget,
} from "@reflect-ui/core";

export function compose_wrappings(
  wrap: WrappingToken,
  children: web.WidgetTree[]
) {
  // ------------
  // region layout / positioning / sizing wrappers
  // SizedBox
  // Stretched
  // Positioned
  // endreigon
  // ------------
  // region transform wrappers
  // Rotation
  // Opacity
  // endreigon
  // ------------
  // region effect wrappers
  // Blurred
  // endregion
  // ------------
  // region clips
  // ClipRRect
  // endreigon
}
