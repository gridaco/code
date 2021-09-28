import { retrievePrimaryColor } from "@design-sdk/core/utils";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import { Figma } from "@design-sdk/figma-types"; /** remove figma dependency */
import { Border } from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";

function fromNode(node: ReflectSceneNode) {
  if ("strokes" in node) {
    if (!node.strokes || node.strokes.length === 0) {
      return undefined;
    }
    return fromStrokes(node.strokes, {
      width: node.strokeWeight,
    });
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
  // generate the border, when it should exist
  // if width is 0, then we don't want to generate a border
  return width
    ? Border.all({
        color: retrievePrimaryColor(strokes),
        width: roundNumber(width),
      })
    : undefined;
}

export const tokenizeBorder = {
  fromStrokes: fromStrokes,
  fromNode: fromNode,
};
