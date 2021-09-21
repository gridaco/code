import { ReflectSceneNode } from "@design-sdk/core";
import * as core from "@reflect-ui/core";
import { keyFromNode } from "../key";
import { manifests } from "@reflect-ui/detection";

/**
 * Note - this universal button is used temporarily. the button tokens will be splited into more specific usecase following material button classification.
 *
 * @param node - the detection passed node
 * @param manifest - the detection result data for composing button
 * @returns
 */
function button(
  node: ReflectSceneNode,
  manifest: manifests.DetectedButtonManifest
): core.ButtonWidget {
  // TODO:
  // 1. support icon
  // 2. support elevated
  // 3. support outlined
  // 4. support base
  const flattened_button_manifest: core.ButtonManifest = {
    ...manifest,
    minWidth: manifest.base.width,
    height: manifest.base.height,
    text: { ...manifest.text, style: undefined },
    base: undefined,
    icon: undefined,
  };

  return new core.ButtonWidget({
    key: keyFromNode(node),
    ...flattened_button_manifest,
  });
}

export const tokenizeButton = {
  fromManifest: button,
};
