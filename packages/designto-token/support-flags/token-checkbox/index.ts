import { Checkbox, Container, ICheckboxManifest } from "@reflect-ui/core";
import type { AsCheckboxFlag } from "@code-features/flags";
import type {
  ReflectFrameNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { WrappingContainer } from "../../tokens";
import assert from "assert";
import { unwrappedChild } from "../../wrappings";
import { tokenizeLayout } from "../../token-layout";
import { keyFromNode } from "../../key";

export function tokenize_flagged_checkbox(
  node: ReflectSceneNode,
  flag: AsCheckboxFlag
): Checkbox | WrappingContainer<Checkbox> {
  if (flag.value === false) return;

  const validated = validate_checkbox(node);
  if (validated.error === false) {
    switch (validated.__type) {
      case "frame-as-checkbox": {
        const { checkbox_base, checkbox_value } = validated;

        const _key = keyFromNode(node);

        const container = unwrappedChild(
          tokenizeLayout.fromFrame(
            checkbox_base,
            checkbox_base.children,
            { is_root: false },
            {}
          )
        ) as Container;

        const checked = checkbox_value && checkbox_value.visible;

        return new WrappingContainer({
          ...container,
          key: keyFromNode(node),
          child: new Checkbox({
            key: _key,
            fillColor: { default: checkbox_base?.primaryColor },
            checkColor: checkbox_value?.primaryColor,
            value: checked,
          }),
        });
      }
      default:
        throw new Error("unreachable");
    }
  } else {
    throw new Error(validated.error);
  }
}

/**
 * validate if layer casted as checkbox can be actually tokenized to checkbox.
 * @param node
 */
function validate_checkbox(node: ReflectSceneNode):
  | {
      __type: "frame-as-checkbox";
      error: false;
      checkbox_base: ReflectFrameNode;
      checkbox_value?: ReflectSceneNode;
    }
  | { error: string } {
  assert(!!node, "target must not be null or undefined");
  switch (node.type) {
    case "FRAME": {
      const firstvaluenode = node.children.find(
        (child) => child.type === "VECTOR"
      );

      return {
        __type: "frame-as-checkbox",
        checkbox_base: node,
        checkbox_value: firstvaluenode,
        error: false,
      };
    }
    default:
      return { error: "checkbox target is not a valid frame node" };
  }
}
