import { nodes } from "@design-sdk/core";
import * as core from "@reflect-ui/core";
import { keyFromNode } from "../key";

function fromRectangle(node: nodes.ReflectRectangleNode): core.Container {
  const container = new core.Container({ key: keyFromNode(node) });

  container.x = node.x;
  container.y = node.y;
  container.width = node.width;
  container.height = node.height;
  container.fills = node.fills as any; // todo
  container.borders = node.strokes as any; // todo

  return container;
}

function fromEllipse(ellipse: nodes.ReflectEllipseNode): core.Container {
  return undefined;
}

export const tokenizeContainer = {
  fromRectangle: fromRectangle,
  fromEllipse: fromEllipse,
};
