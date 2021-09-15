import { nodes } from "@design-sdk/core";
import * as core from "@reflect-ui/core";
import { keyFromNode } from "../key";
function fromRectangle(node: nodes.ReflectRectangleNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(node),
    children: undefined,
  });

  container.x = node.x;
  container.y = node.y;
  container.width = node.width;
  container.height = node.height;
  container.fills = node.fills as any; // todo
  container.borders = node.strokes as any; // todo

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
  container.fills = ellipse.fills as any; // todo
  container.borders = ellipse.strokes as any; // todo
  container.borderRadius = { all: Math.max(ellipse.width, ellipse.height) / 2 };

  return container;
}

export const tokenizeContainer = {
  fromRectangle: fromRectangle,
  fromEllipse: fromEllipse,
};
