import { nodes } from "@design-sdk/core";
import * as core from "@reflect-ui/core";
import { tokenizeBackground } from "../token-background";
import { BoxShape } from "@reflect-ui/core/lib/box-shape";
import { keyFromNode } from "../key";
import { tokenizeBorder } from "../token-border";
function fromRectangle(rect: nodes.ReflectRectangleNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(rect),
    width: rect.width,
    height: rect.height,
    borderRadius: rect.cornerRadius,
    boxShadow: rect.primaryShadow,
    border: tokenizeBorder.fromNode(rect),
    background: tokenizeBackground.fromFills(rect.fills),
  });

  container.x = rect.x;
  container.y = rect.y;
  // container.border = new core.Border() as any; // FIXME: handle by count of fills.
  return container;
}

function fromEllipse(ellipse: nodes.ReflectEllipseNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(ellipse),
    width: ellipse.width,
    height: ellipse.height,
    boxShadow: ellipse.primaryShadow,
    border: tokenizeBorder.fromNode(ellipse),
    borderRadius: { all: Math.max(ellipse.width, ellipse.height) / 2 },
    background: tokenizeBackground.fromFills(ellipse.fills),
  });

  container.x = ellipse.x;
  container.y = ellipse.y;
  container.border = ellipse.strokes as any; // todo
  container.shape = BoxShape.circle;

  return container;
}

export const tokenizeContainer = {
  fromRectangle: fromRectangle,
  fromEllipse: fromEllipse,
};
