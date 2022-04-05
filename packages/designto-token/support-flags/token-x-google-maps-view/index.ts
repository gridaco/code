import type {
  ReflectFrameNode,
  ReflectGroupNode,
  ReflectRectangleNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import type { Container } from "@reflect-ui/core";
import { tokenizeLayout } from "../../token-layout";
import { tokenizeContainer } from "../../token-container";
import { unwrappedChild } from "../../wrappings";
import type { XGoogleMapsFlag } from "@code-features/flags";
import { WrappingContainer, XGoogleMapsView } from "../../tokens";
import assert from "assert";
import { keyFromNode } from "../../key";

export function tokenize_flagged_google_maps_view(
  node: ReflectSceneNode,
  flag: XGoogleMapsFlag
) {
  try {
    const q = flag.value;
    node = validate_input(node);
    const _key = keyFromNode(node);

    const container = unwrappedChild(
      node.type === "RECTANGLE"
        ? tokenizeContainer.fromRectangle(node)
        : tokenizeLayout.fromFrameOrGroup(node, [], { is_root: false }, {})
    ) as Container;

    return new WrappingContainer({
      ...container,
      key: keyFromNode(node),
      child: new XGoogleMapsView({
        key: _key,
        ...container,
        q: q,
      }),
    });
  } catch (e) {
    throw new Error(`failed to tokenize google maps view: ${e.message}`);
  }
}

type GoogleMapsViewCompatNodeType =
  | ReflectFrameNode
  | ReflectGroupNode
  | ReflectRectangleNode;

function validate_input(node: ReflectSceneNode): GoogleMapsViewCompatNodeType {
  assert(
    node.type === "FRAME" || node.type === "GROUP" || node.type === "RECTANGLE",
    `google maps view target input must be a frame, group or rectangle, but "${node.type}" was given`
  );

  return node;
}
