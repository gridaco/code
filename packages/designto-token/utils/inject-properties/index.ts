////
//// Legacy - do not use
////

import * as core from "@reflect-ui/core";

/**
 * @deprecated
 * @param container
 * @param visible
 */
export function injectVisibility(container: core.Container, visible: boolean) {
  container.visible = visible;
}

/**
 * @deprecated
 */
export function injectRotation(container: core.Container, rotation: number) {
  throw "not implemented";
}
