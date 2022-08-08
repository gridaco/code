import type {
  ReflectRectangleNode,
  ReflectLineNode,
  ReflectEllipseNode,
} from "@design-sdk/figma-node";
import * as core from "@reflect-ui/core";
import { tokenizeBackground } from "../token-background";
import { BoxShape } from "@reflect-ui/core";
import { keyFromNode } from "../key";
import { tokenizeBorder } from "../token-border";
import { BorderRadius, BoxShadowManifest } from "@reflect-ui/core";

function fromRectangle(rect: ReflectRectangleNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(rect),
    width: rect.width,
    height: rect.height,
    borderRadius: rect.cornerRadius,
    boxShadow: rect.shadows as BoxShadowManifest[],
    border: tokenizeBorder.fromNode(rect),
    background: tokenizeBackground.fromFills(rect.fills),
  });

  container.x = rect.x;
  container.y = rect.y;
  // container.border = new core.Border() as any; // FIXME: handle by count of fills.
  return container;
}

function fromLine(line: ReflectLineNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(line),
    width: line.width,
    height: 0,
    boxShadow: line.shadows as BoxShadowManifest[],
    border: tokenizeBorder.fromLineNode(line),
  });

  container.x = line.x;
  container.y = line.y;
  return container;
}

function fromEllipse(ellipse: ReflectEllipseNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(ellipse),
    width: ellipse.width,
    height: ellipse.height,
    boxShadow: ellipse.shadows as BoxShadowManifest[],
    border: tokenizeBorder.fromNode(ellipse),
    borderRadius: BorderRadius.all({ x: ellipse.width, y: ellipse.height }), // this is equivalant to css "50%"
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
  fromLine: fromLine,
};
