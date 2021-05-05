import * as core from "@reflect-ui/core";

export function injectVisibility(container: core.Container, visible: boolean) {
  container.visible = visible;
}

export function injectRotation(container: core.Container, rotation: number) {
  throw "not implemented";
}

export function injectOpacity(container: core.Container, opacity: number) {
  container.opacity = opacity;
}
