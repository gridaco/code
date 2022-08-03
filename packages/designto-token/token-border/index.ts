import { retrievePrimaryColor } from "@design-sdk/figma-utils";
import type {
  ReflectSceneNode,
  ReflectLineNode,
  IReflectGeometryMixin,
} from "@design-sdk/figma-node";
import { Figma } from "@design-sdk/figma-types"; /** remove figma dependency */
import { Border, BorderStyle } from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";

function fromLineNode(node: ReflectLineNode) {
  const strokes = node.strokes;
  if (!strokes || strokes.length === 0) {
    return undefined;
  }
  // guard invisible borders
  if (strokes.filter(visible).length > 0) {
    const _p_stroke = strokes.find(visible);

    // generate the border, when it should exist
    // if width is 0, then we don't want to generate a border
    return node.strokeWeight
      ? new Border({
          // it's a line so we only add border to a single side.
          top: {
            color: retrievePrimaryColor([_p_stroke]),
            width: node.strokeWeight, // do not round number
            // the dashed border support is incomplete. we cannot support dashed gap since the platform does not support it.
            style: isDashed(node) ? BorderStyle.dashed : BorderStyle.solid,
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
        // the dashed border support is incomplete. we cannot support dashed gap since the platform does not support it.
        dashed: isDashed(node),
      });
    }
  }
}

function fromStrokes(
  strokes: ReadonlyArray<Figma.Paint>,
  {
    width,
    dashed,
  }: {
    /**
     * a stroke height
     */
    width: number;
    dashed: boolean;
  }
) {
  // guard invisible borders
  if (strokes.filter(visible).length > 0) {
    // generate the border, when it should exist
    // if width is 0, then we don't want to generate a border
    // using the first stroke. since css3 standard does not support multiple borders (as well as flutter)
    const _p_stroke = strokes.find(visible);
    return width
      ? Border.all({
          color: retrievePrimaryColor([_p_stroke]),
          width: roundNumber(width),
          style: dashed ? BorderStyle.dashed : BorderStyle.solid,
        })
      : undefined;
  }
}

const visible = (s) => s.visible;

/**
 *
 * returns if the node's border is dashed or not
 *
 * - when solid, the dashPattern is empty - `[]`
 * - when dashed, the dashPattern will be like - `[6, 6]`
 * @param s
 * @returns
 */
const isDashed = (s: IReflectGeometryMixin): boolean =>
  s.dashPattern?.length > 0;

export const tokenizeBorder = {
  fromStrokes: fromStrokes,
  fromNode: fromNode,
  fromLineNode: fromLineNode,
};
