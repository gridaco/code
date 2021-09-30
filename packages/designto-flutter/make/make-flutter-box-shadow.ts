import * as flutter from "@flutter-builder/flutter";
import { ReflectSceneNode } from "@design-sdk/core";
import { Figma } from "@design-sdk/figma";
import { roundNumber } from "@reflect-ui/uiutils";
import { makeColorFromRGBO } from "./make-flutter-color";

export function makeBoxShadow(
  node: ReflectSceneNode
): Array<flutter.BoxShadow> {
  let boxShadows: Array<flutter.BoxShadow> = [];

  if (node.effects?.length > 0) {
    const shadows: Array<Figma.ShadowEffect> = node.effects.filter(
      (d): d is Figma.ShadowEffect =>
        (d.type === "DROP_SHADOW" || d.type === "INNER_SHADOW") && d.visible
    );

    // if no shadow filtered available, return undefined
    if (shadows.length == 0) {
      return undefined;
    }

    shadows.forEach(function (d: Figma.ShadowEffect) {
      let boxShadow: flutter.BoxShadow;
      if (d.type == "DROP_SHADOW") {
        boxShadow = new flutter.BoxShadow({
          color: makeColorFromRGBO(d.color, d.color.a),
          blurRadius: requiredNumber(d.radius),
          spreadRadius: requiredNumber(d.spread),
          offset: requiredOffset(new flutter.Offset(d.offset.x, d.offset.y)),
        });
      } else if (d.type == "INNER_SHADOW") {
        // handling inner shadow
        // https://stackoverflow.com/a/55096682/5463235

        boxShadow = new flutter.BoxShadow({
          color: makeColorFromRGBO(d.color, d.color.a),
          blurRadius: requiredNumber(d.radius),
          // multiply -1 * blur for spread
          // TODO inspect this logic again.
          spreadRadius: requiredNumber((d.spread + d.radius) * -1),
          offset: requiredOffset(new flutter.Offset(d.offset.x, d.offset.y)),
        });
      }

      boxShadows.push(boxShadow);
    });
  }

  // return undefined if array is empty, since it's not needed.
  return boxShadows.length > 0 ? boxShadows : undefined;
}

function requiredNumber(number: number): number {
  const rounded = roundNumber(number);
  if (rounded == 0) {
    return undefined;
  }
  return rounded;
}

/**
 * returns undefined, if offset is redundant.
 */
function requiredOffset(offset: flutter.Offset): flutter.Offset {
  if (offset.dx == 0 && offset.dy == 0) {
    return undefined;
  }
  return offset;
}
