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
import type { XOSMFlag } from "@code-features/flags";
import { WrappingContainer, XOSMView } from "../../tokens";
import assert from "assert";
import { keyFromNode } from "../../key";

export function tokenize_flagged_osm_view(
  node: ReflectSceneNode,
  flag: XOSMFlag
) {
  try {
    const v = flag.value;
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
      child: new XOSMView({
        key: _key,
        ...container,
        latlng: typeof v === "boolean" ? undefined : v, // passing null will cause the default latlng to be used
      }),
    });
  } catch (e) {
    throw new Error(`failed to tokenize open street maps view: ${e.message}`);
  }
}

type OpenStreetMapsViewCompatNodeType =
  | ReflectFrameNode
  | ReflectGroupNode
  | ReflectRectangleNode;

function validate_input(
  node: ReflectSceneNode
): OpenStreetMapsViewCompatNodeType {
  assert(
    node.type === "FRAME" || node.type === "GROUP" || node.type === "RECTANGLE",
    `open street maps view target input must be a frame, group or rectangle, but "${node.type}" was given`
  );

  return node;
}
