import { retrievePrimaryColor } from "@design-sdk/core/utils";
import type { ReflectSceneNode, ReflectLineNode } from "@design-sdk/figma-node";
import { Figma } from "@design-sdk/figma-types"; /** remove figma dependency */
import { Border } from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";

function fromLineNode(node: ReflectLineNode) {
  const strokes = node.strokes;
  if (!strokes || strokes.length === 0) {
    return undefined;
  }
  // guard invisible borders
  if (strokes.filter(visible).length > 0) {
    // generate the border, when it should exist
    // if width is 0, then we don't want to generate a border
    return node.strokeWeight
      ? new Border({
          // it's a line so we only add border to a single side.
          top: {
            color: retrievePrimaryColor(strokes),
            width: node.strokeWeight, // do not round number
          },
        })
      : undefined;
  }
}

function fromNode(node: ReflectSceneNode) {
  if ("strokes" in node) {
    if (!node.strokes || node.strokes.length === 0) {
      return undefined;
    }
    if ("strokeWeight" in node) {
      return fromStrokes(node.strokes, {
        width: node.strokeWeight,
      });
    }
  }
}

function fromStrokes(
  strokes: ReadonlyArray<Figma.Paint>,
  {
    width,
  }: {
    /**
     * a stroke height
     */
    width: number;
  }
) {
  // guard invisible borders
  if (strokes.filter(visible).length > 0) {
    // generate the border, when it should exist
    // if width is 0, then we don't want to generate a border
    return width
      ? Border.all({
          color: retrievePrimaryColor(strokes),
          width: roundNumber(width),
        })
      : undefined;
  }
}

const visible = (s) => s.visible;

export const tokenizeBorder = {
  fromStrokes: fromStrokes,
  fromNode: fromNode,
  fromLineNode: fromLineNode,
};
