import { CrossAxisAlignment } from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core/lib";
/**
 * returns CrossAxisAlignment by counterAxisAlignItems
 * @param crossAxisAlignItems
 */
export function crossAxisAlignment(
  crossAxisAlignItems: core.CrossAxisAlignment
): CrossAxisAlignment {
  switch (crossAxisAlignItems) {
    case core.CrossAxisAlignment.start:
      return CrossAxisAlignment.start;
    case core.CrossAxisAlignment.end:
      return CrossAxisAlignment.end;
    case core.CrossAxisAlignment.stretch:
      return CrossAxisAlignment.stretch;
    case core.CrossAxisAlignment.center:
      return CrossAxisAlignment.center;
    default:
      return undefined;
  }
}
