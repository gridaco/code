import { nodes } from "@design-sdk/core";
import { retrieveFill } from "@design-sdk/core/utils";
import { paintToColor } from "@design-sdk/core/utils/colors";
import { Figma } from "@design-sdk/figma-types";
import * as core from "@reflect-ui/core";
import { Color } from "@reflect-ui/core";
import { BoxShape } from "@reflect-ui/core/lib/box-shape";
import { keyFromNode } from "../key";
function fromRectangle(node: nodes.ReflectRectangleNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(node),
    children: undefined,
    width: node.width,
    height: node.height,
    borderRadius: node.cornerRadius,
    color: forceFillsToSolidColor(node.fills), // FIXME: handle by count of fills.
  });

  container.x = node.x;
  container.y = node.y;
  // container.border = new core.Border() as any; // FIXME: handle by count of fills.
  return container;
}

function fromEllipse(ellipse: nodes.ReflectEllipseNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(ellipse),
    children: undefined,
  });

  container.x = ellipse.x;
  container.y = ellipse.y;
  container.width = ellipse.width;
  container.height = ellipse.height;
  container.color = forceFillsToSolidColor(ellipse.fills); // FIXME: handle by count of fills.
  container.border = ellipse.strokes as any; // todo
  container.shape = BoxShape.circle;
  container.borderRadius = { all: Math.max(ellipse.width, ellipse.height) / 2 };

  return container;
}

export const tokenizeContainer = {
  fromRectangle: fromRectangle,
  fromEllipse: fromEllipse,
};

function forceFillsToSolidColor(fills: ReadonlyArray<Figma.Paint>): Color {
  const fill = retrieveFill(fills, {
    onlySolid: true,
  });
  const color = paintToColor(fill as Figma.SolidPaint);
  return color;
}
