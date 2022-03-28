import { LinearProgressIndicator, Container, Colors } from "@reflect-ui/core";
import type { AsProgressFlag } from "@code-features/flags/types";
import type {
  ReflectEllipseNode,
  ReflectFrameNode,
  ReflectRectangleNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { keyFromNode } from "../../key";
import assert from "assert";
import { tokenizeLayout } from "../../token-layout";
import { unwrappedChild } from "../../wrappings";
import { WrappingContainer } from "../../tokens";

/**
 *
 */
export function tokenize_flagged_progress(
  node: ReflectSceneNode,
  flag: AsProgressFlag
): LinearProgressIndicator | WrappingContainer<LinearProgressIndicator> {
  if (flag.value === false) return;

  const validated = validate_progress(node);
  if (validated.error === false) {
    const _key = keyFromNode(node);

    switch (validated.__type) {
      case "frame-as-progress": {
        const { root, value } = validated;

        // TODO: use theme color as default if non available
        const fallbackcolor = Colors.blue;

        // initial value -----------------------------
        const p_w = root.width;
        const v_w = value?.width ?? 0;
        // calculate percentage of value by its width, round to 2 decimal point
        const _initial_value =
          // if the value node is floating, it means it is indeterminate, -0
          value.x <= 1
            ? Math.round((v_w / p_w + Number.EPSILON) * 100) / 100
            : -0;
        // -------------------------------------------

        // value x pos

        // active color ------------------------------
        const _activecolor = value?.primaryColor ?? fallbackcolor;
        // -------------------------------------------

        // bg color ----------------------------------
        const _bgcolor = root.primaryColor ?? fallbackcolor;
        // -------------------------------------------

        const container = unwrappedChild(
          tokenizeLayout.fromFrame(root, root.children, { is_root: false }, {})
        ) as Container;

        return new WrappingContainer({
          ...container,
          key: keyFromNode(node),
          child: new LinearProgressIndicator({
            key: _key,
            // ...container,
            backgroundColor: _bgcolor,
            color: _activecolor,
            value: _initial_value,
          }),
        });
      }
      default:
        throw new Error(
          `unexpected type while handling progress flag ${validated.__type}`
        );
    }
  } else {
    throw new Error(validated.error);
  }
}

type ValueIndicatorAcceptableNode = ReflectFrameNode | ReflectRectangleNode;

/**
 * validate if layer casted as progress can be actually tokenized to progress.
 *
 * - when applyed to frame,
 *    1. the root should be a long rect 1:1 < n
 *    2. the height of the value should be n >= (height of the root)
 *
 */
function validate_progress(node: ReflectSceneNode):
  | {
      __type: "frame-as-progress";
      error: false;
      root: ReflectFrameNode;
      value?: ValueIndicatorAcceptableNode;
    }
  | { error: string } {
  assert(!!node, "target must not be null or undefined");
  switch (node.type) {
    case "FRAME": {
      // find the root of progress
      // find the value of the progress

      const root = node;

      const value = node.grandchildren.find((n) => {
        const _0 = n.type === "FRAME" || n.type === "RECTANGLE";
        const _1 = n.width > 0 && n.height > 0;
        const _2 = n.height === root.height;
        const _3 = n.primaryColor !== root.primaryColor;
        return _0 && _1 && _2 && _3;
      });

      return {
        __type: "frame-as-progress",
        root: root,
        value: value as ValueIndicatorAcceptableNode,
        error: false,
      };
    }
    default:
      return { error: "progress target is not a valid frame or a text node" };
  }
}
