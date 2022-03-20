import { ButtonStyleButton, ButtonVariant, Container } from "@reflect-ui/core";
import type { AsButtonFlag } from "@code-features/flags/types";
import type {
  ReflectFrameNode,
  ReflectSceneNode,
  ReflectTextNode,
} from "@design-sdk/figma-node";
import assert from "assert";
import { tokenizeButton } from "../../token-widgets";

export function tokenize_flagged_button(
  node: ReflectSceneNode,
  flag: AsButtonFlag
): ButtonStyleButton | Container<ButtonStyleButton> {
  if (flag.value === false) return;

  const validated = validate_button(node);
  if (validated.error === false) {
    switch (validated.__type) {
      case "frame-as-button": {
        const { button_base, button_text } = validated;

        const button = tokenizeButton.fromManifest(button_base, {
          base: button_base,
          text: button_text,
          variant: ButtonVariant.custom,
        });

        return button;
      }
      case "text-as-button": {
        const { text } = validated;

        const button = tokenizeButton.fromManifest(text, {
          base: null,
          text: text,
          variant: ButtonVariant.flatText,
        });

        return button;
      }
      case "node-as-pressable": {
        throw new Error("not implemented");
        // const { node } = validated;
        // const button = tokenizeButton.fromManifest(node, {
        //   // @ts-ignore
        //   base: node,
        //   variant: ButtonVariant.custom,
        // });
        // return button;
      }
      default:
        throw new Error("unreachable");
    }
  } else {
    throw new Error(validated.error);
  }
}

/**
 * validate if layer casted as button can be actually tokenized to button.
 *
 * - when applyed to frame,
 *    1. the root should be a flex
 *    2. the children should be a valid text node
 *
 * - when applyed to text,
 *    1. the text should be visible
 *    2. the text should be not empty
 * @param node
 */
function validate_button(node: ReflectSceneNode):
  | {
      __type: "frame-as-button";
      error: false;
      button_base: ReflectFrameNode;
      button_text: ReflectTextNode;
    }
  | {
      __type: "text-as-button";
      error: false;
      text: ReflectTextNode;
    }
  | {
      __type: "node-as-pressable";
      error: false;
      node: ReflectSceneNode;
    }
  | { error: string } {
  assert(!!node, "target must not be null or undefined");
  switch (node.type) {
    case "FRAME": {
      assert(
        node.children.filter(valid_text_node).length > 0,
        "target must have at least one valid text child"
      );
      assert(
        node.isAutoLayout,
        "button target frame must be a autolayout frame"
      );

      const firstTextNode = node.children.find(
        valid_text_node
      ) as ReflectTextNode;

      return {
        __type: "frame-as-button",
        button_base: node,
        button_text: firstTextNode,
        error: false,
      };
    }
    case "TEXT": {
      assert(
        valid_text_node(node),
        "target must be a valid text node with data"
      );

      return {
        __type: "text-as-button",
        text: node,
        error: false,
      };
    }
    default:
      return { error: "button target is not a valid frame or a text node" };
  }
}

const valid_text_node = (node: ReflectSceneNode) =>
  node.type === "TEXT" && node.visible && node.data.length >= 0;
