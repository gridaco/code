import {
  TextFieldDecoration,
  TextField,
  InputBorder,
  OutlineInputBorder,
  Container,
} from "@reflect-ui/core";
import type { TextStyle } from "@reflect-ui/core";
import type { AsInputFlag } from "@code-features/flags/types";
import type {
  ReflectFrameNode,
  ReflectSceneNode,
  ReflectTextNode,
} from "@design-sdk/figma-node";
import { keyFromNode } from "../../key";
import assert from "assert";
import { tokenizeText } from "../../token-text";
import { detectIf } from "@reflect-ui/detection";
import { paintToColor } from "@design-sdk/core/utils/colors";
import { tokenizeLayout } from "../../token-layout";
import { unwrappedChild } from "../../wrappings";
import { WrappingContainer } from "../../tokens";

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
): TextField | WrappingContainer {
  if (flag.value === false) return;

  const validated = validate_input(node);
  if (validated.error === false) {
    const _key = keyFromNode(node);

    switch (validated.__type) {
      case "frame-as-input": {
        const { input_root, value, placeholder } = validated;

        const style =
          value && (tokenizeText.fromText(value).style as TextStyle);
        const placeholderStyle =
          placeholder &&
          (tokenizeText.fromText(placeholder).style as TextStyle);

        // if value only contains '●' or '·' - e.g. ● ● ● ● ● ● it is safe to be casted as a password input.
        const obscureText = /^[·\|●\s]+$/.test(
          (value?.data || placeholder?.data) ?? ""
        );

        const fillcolor =
          input_root.primaryFill.type === "SOLID"
            ? paintToColor(input_root.primaryFill)
            : null;

        const container = unwrappedChild(
          tokenizeLayout.fromFrame(
            input_root,
            input_root.children,
            { is_root: false },
            {}
          )
        ) as Container;

        return new WrappingContainer({
          ...container,
          key: keyFromNode(node),
          child: new TextField({
            key: _key,
            ...container,
            obscureText: obscureText,
            initialValue: value?.data,
            style: style || placeholderStyle,
            decoration: new TextFieldDecoration({
              border: new OutlineInputBorder({
                borderSide: container.border?.bottom,
                borderRadius: container.borderRadius,
              }),
              contentPadding: input_root.padding,
              filled: fillcolor ? true : false,
              fillColor: fillcolor,
              placeholderText: placeholder?.data,
              placeholderStyle: placeholderStyle,
              //
            }),
          }),
        });
      }

      case "text-as-input": {
        const { style } = tokenizeText.fromText(validated.input_root);
        return new TextField({
          key: _key,
          style: style as TextStyle,
          // TODO: support decoration
          initialValue: validated.input_root.data,
          decoration: new TextFieldDecoration({
            border: InputBorder.none,
          }),
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
 *    1. the root should be a flex
 *    2. the children should be a valid text node
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

      const firstTextNode = node.children.find(
        valid_text_node
      ) as ReflectTextNode;

      // this is not accurate
      const placeholder = detectIf.textfieldPlaceholder(node, firstTextNode);

      return {
        __type: "frame-as-input",
        input_root: node,
        placeholder: placeholder.result ? placeholder.data : undefined,
        value: placeholder.result ? undefined : firstTextNode,
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
  node && node.type === "TEXT" && node.visible && node.data.length >= 0;
