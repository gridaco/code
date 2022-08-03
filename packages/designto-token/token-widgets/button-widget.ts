import { ReflectSceneNode } from "@design-sdk/figma-node";
import * as core from "@reflect-ui/core";
import { keyFromNode } from "../key";
import { manifests } from "@reflect-ui/detection";
import { tokenizeText } from "../token-text";
import { Colors, Container, EdgeInsets, WidgetKey } from "@reflect-ui/core";
import assert from "assert";
import { unwrappedChild } from "../wrappings";
import { tokenizeLayout } from "../token-layout";
import { WrappingContainer } from "../tokens";

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
): core.ButtonStyleButton | WrappingContainer<core.ButtonStyleButton> {
  assert(manifest.text, "text is required for button composing at this point");

  // TODO:
  // 1. support icon
  // 2. support base

  const _key = keyFromNode(node);

  const button = new core.ButtonStyleButton({
    key: _key,
    style: {
      textStyle: {
        default: new core.TextStyle(manifest.text.textStyle),
      },
      backgroundColor: {
        default: manifest.base
          ? manifest.base.primaryColor
          : Colors.transparent,
      },
      foregroundColor: {
        default: manifest.text.textStyle.color,
      },
      // overlayColor: { default: manifest.base.overlayColor }

      // TODO: support multiple shadows
      shadowColor: manifest.base?.primaryShadow && {
        default: manifest.base.primaryShadow.color,
      },
      // elevation: { default: 1},
      padding: {
        default: manifest.base ? manifest.base.padding : EdgeInsets.all(0),
      },
    },
    child: tokenizeText.fromText(manifest.text),
  });

  const sizing = manifest.base ?? manifest.text;

  if (manifest.base?.type === "FRAME") {
    const container = unwrappedChild<Container>(
      tokenizeLayout.fromFrame(
        manifest.base,
        manifest.base.children,
        { is_root: false },
        {}
      )
    );

    return new WrappingContainer({
      ...container,
      key: keyFromNode(node),
      child: button,
    });
  }

  return new WrappingContainer({
    key: _key.copyWith({ id: _key.id + ".sizedbox" }),
    width: sizing.width,
    height: sizing.height,
    child: button,
  });
}

export const tokenizeButton = {
  fromManifest: button,
};
