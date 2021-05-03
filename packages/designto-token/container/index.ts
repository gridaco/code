import { nodes } from "@bridged.xyz/design-sdk";
import * as core from "@reflect-ui/core";

export function fromRectangle(
  node: nodes.ReflectRectangleNode
): core.Container {
  const container = new core.Container();

  container.x = node.x;
  container.y = node.y;
  container.width = node.width;
  container.height = node.height;
  container.fills = node.fills as any; // todo
  container.borders = node.strokes as any; // todo

  return container;
}

export function fromEllipse(ellipse: nodes.ReflectEllipseNode): core.Container {
  return undefined;
}

function injectVisibility(container: core.Container, visible: boolean) {
  container.visible = visible;
}

function injectRotation(container: core.Container, rotation: number) {
  throw "not implemented";
}

function injectOpacity(container: core.Container, opacity: number) {
  container.opacity = opacity;
}
