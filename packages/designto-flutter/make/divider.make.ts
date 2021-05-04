import { nodes } from "@design-sdk/core";
import * as flutter from "@bridged.xyz/flutter-builder";
import { makeColor } from "./color.make";

export function makeDivider(node: nodes.ReflectDefaultShapeMixin) {
  // todo migrate this to detection logic
  if (node.rotation !== 0) {
    return;
  }
  // node.strokeCap
  // todo implement

  if (node instanceof nodes.ReflectRectangleNode) {
    // Case 1 has fill, and stroke
    // Case 2 has 0 height, has stroke
    // Case 3 has no stroke, height > 0 && has fill
    return new flutter.Divider({
      // don't use node.height -- for line, it's always 0
      height: node.strokeWeight,
      color: makeColor(node.fills),
      thickness: node.strokeWeight,
    });
  }

  // TODO - wrap with sized box if size is special
  if (node instanceof nodes.ReflectLineNode) {
    new flutter.Divider({
      // don't use node.height -- for line, it's always 0
      height: node.strokeWeight,
      color: makeColor(node.fills),
      thickness: node.strokeWeight,
    });
  }
}

export function makeVerticalDivider(node: nodes.ReflectDefaultShapeMixin) {
  // TODO - this is not fully implemented
  return new flutter.VerticalDivider({
    width: node.width,
    color: makeColor(node.fills),
    thickness: node.strokeWeight,
  });
}
