import * as flutter from "@flutter-builder/flutter";
import { utils, nodes } from "@design-sdk/core";
import { roundNumber } from "@reflect-ui/uiutils";
import { makeSaflyAsSingle } from "../utils/make-as-safe-single";
export function wrapWithPositioned(
  node: nodes.ReflectSceneNode,
  child: flutter.Widget,
  parentId: string = ""
): flutter.Widget {
  console.log(
    `wrap:positioned :: wrapping node ${node.toString()} with Positioned with child ${
      child?.name
    }`
  );

  // avoid adding Positioned() when parent is not a Stack(), which can happen at the beggining
  if (!node.parent || parentId === node.parent.id || !child) {
    return child;
  }

  // check if view is in a stack. Group and Frames must have more than 1 element
  if ("isRelative" in node.parent && node.parent.isRelative === true) {
    const pos = retrieveAbsolutePosOrMakeWidget(node, child);
    if (pos instanceof flutter.Widget) {
      return pos;
    } else {
      // this is necessary because Group have absolute position, while Frame is relative.
      // output is always going to be relative to the parent.
      const [parentX, parentY] = utils.coordinates(node.parent);

      const diffX = node.x - parentX;
      const diffY = node.y - parentY;
      return new flutter.Positioned({
        left: roundNumber(diffX),
        top: roundNumber(diffY),
        child: makeSaflyAsSingle(child),
      });
    }
  }

  return child;
}

type Absolute = "Absolute";
function retrieveAbsolutePosOrMakeWidget(
  node: nodes.ReflectSceneNode,
  child: flutter.Widget
): flutter.Widget | Absolute {
  const positionedAlign = (align: string): flutter.Positioned => {
    return flutter.Positioned.fill({
      child: new flutter.Align({
        alignment: flutter.Alignment[align],
        child: child,
      }),
    }).addComment(`wrap:positioned of ${node.toString()}`);
  };

  switch (utils.commonPosition(node)) {
    case "None":
      return child;
    case "Absolute":
      return "Absolute";
    case "TopStart":
      return positionedAlign("topLeft");
    case "TopCenter":
      return positionedAlign("topCenter");
    case "TopEnd":
      return positionedAlign("topRight");
    case "CenterStart":
      return positionedAlign("centerLeft");
    case "Center":
      return positionedAlign("center");
    case "CenterEnd":
      return positionedAlign("centerRight");
    case "BottomStart":
      return positionedAlign("bottomLeft");
    case "BottomCenter":
      return positionedAlign("bottomCenter");
    case "BottomEnd":
      return positionedAlign("bottomRight");
  }
}
