import { nodes } from "@design-sdk/core";
import * as core from "@reflect-ui/core";
import * as flutter from "@bridged.xyz/flutter-builder";
import {
  makeColor,
  makeFlutterColorFromReflectColor,
} from "./make-flutter-color";

/**
 *
 * @param divider the reflect divider definition
 * @returns
 * TODO: - wrap with sized box if size is special
 */
export function makeFlutterDivider(
  divider: core.DividerWidget
): flutter.Divider {
  // Case 1 has fill, and stroke
  // Case 2 has 0 height, has stroke
  // Case 3 has no stroke, height > 0 && has fill
  return new flutter.Divider({
    height: divider.height,
    color: makeFlutterColorFromReflectColor(divider.color),
    thickness: divider.thickness,
    indent: divider.indent,
    endIndent: divider.endIndent,
  });
}

/**
 * @deprecated do not use. detection for vertical divider is not ready.
 * TODO: - this is not fully implemented
 * @param node
 * @returns
 */
export function makeVerticalDivider(node: nodes.ReflectDefaultShapeMixin) {
  return new flutter.VerticalDivider({
    width: node.width,
    color: makeColor(node.fills),
    thickness: node.strokeWeight,
  });
}
