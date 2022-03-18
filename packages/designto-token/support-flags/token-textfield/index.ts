import { TextField } from "@reflect-ui/core";
import type { TextStyle } from "@reflect-ui/core";
import type { AsInputFlag } from "@code-features/flags/types";
import type {
  ReflectFrameNode,
  ReflectSceneNode,
  ReflectTextNode,
} from "@design-sdk/figma-node";
import { keyFromNode } from "../../key";
import { tokenize } from "../..";
import { handleChildren } from "../../main";
import assert from "assert";
import { tokenizeText } from "../../token-text";

/**
 *
 * from
 * ```
 * row|col[
 *  enabled text,
 *  other elements,
 * ]
 * ```
 *
 * to
 * ```
 * input {
 *  enabled text
 * }
 * ```
 */
export function tokenize_flagged_textfield(
  node: ReflectSceneNode,
  flag: AsInputFlag
): TextField {
  if (flag.value === false) return;

  const validated = validate_input(node);
  if (validated.error === false) {
    const _key = keyFromNode(node);

    switch (validated.__type) {
      case "frame-as-input": {
        const { style } = tokenizeText.fromText(validated.value);
        return new TextField({
          key: _key,
          style: style as TextStyle,
          // TODO: support decoration
          decoration: null,
        });
      }
      case "text-as-input": {
        const { style } = tokenizeText.fromText(validated.input_root);

        return new TextField({
          key: _key,
          style: style as TextStyle,
          // TODO: support decoration
          decoration: null,
        });
      }
    }
  } else {
    throw new Error(validated.error);
  }
}

/**
 * validate if layer casted as input can be actually tokenized to input.
 *
 * - when applyed to frame,
 *    1. the root should be a column or row
 *    2. the children should be columns or rows
 *
 * - when applyed to text,
 *    1. the text should be visible
 *    2. the text should be not empty
 * @param input
 */
function validate_input(node: ReflectSceneNode):
  | {
      __type: "frame-as-input";
      error: false;
      input_root: ReflectFrameNode;
      placeholder?: ReflectTextNode;
      value?: ReflectTextNode;
    }
  | {
      __type: "text-as-input";
      error: false;
      input_root: ReflectTextNode;
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
        "input target frame must be a autolayout frame"
      );

      return {
        __type: "frame-as-input",
        input_root: node,
        // FIXME: no explicit placeholder checking here.
        placeholder: node.children.find(valid_text_node) as ReflectTextNode,
        value: node.children.find(valid_text_node) as ReflectTextNode,
        error: false,
      };
    }
    case "TEXT": {
      assert(
        valid_text_node(node),
        "target must be a valid text node with data"
      );

      return {
        __type: "text-as-input",
        input_root: node,
        error: false,
      };
    }
    default:
      return { error: "input target is not a valid frame or a text node" };
  }
}

const valid_text_node = (node: ReflectSceneNode) =>
  node.type === "TEXT" && node.visible && node.data.length >= 0;
