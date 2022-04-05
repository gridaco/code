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
import type { CameraDisplayFlag } from "@code-features/flags";
import { WrappingContainer, XCameraDisplayView } from "../../tokens";
import assert from "assert";
import { keyFromNode } from "../../key";

export function tokenize_flagged_camera_view(
  node: ReflectSceneNode,
  flag: CameraDisplayFlag
) {
  if (!flag.value) {
    return;
  }

  try {
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
      child: new XCameraDisplayView({
        key: _key,
        ...container,
      }),
    });
  } catch (e) {
    throw new Error(`failed to tokenize camera display view: ${e.message}`);
  }
}

type CameraDisplayCompatNodeType =
  | ReflectFrameNode
  | ReflectGroupNode
  | ReflectRectangleNode;

function validate_input(node: ReflectSceneNode): CameraDisplayCompatNodeType {
  assert(
    node.type === "FRAME" || node.type === "GROUP" || node.type === "RECTANGLE",
    `camera display view target input must be a frame, group or rectangle, but "${node.type}" was given`
  );

  return node;
}
