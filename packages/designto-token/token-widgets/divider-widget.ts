import type { ReflectSceneNode } from "@design-sdk/figma-node";
import * as core from "@reflect-ui/core";
import { keyFromNode } from "../key";

/**
 * @param node - the detection passed node
 * @param manifest - the detection result data for composing divider
 * @returns
 */
function divider(
  node: ReflectSceneNode,
  manifest: core.DividerManifest
): core.DividerWidget {
  return new core.DividerWidget({
    key: keyFromNode(node),
    ...manifest,
  });
}

export const tokenizeDivider = {
  fromManifest: divider,
};
