import { BoxShadowManifest } from "@reflect-ui/core";
///
///

import type {
  ReflectFrameNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { Column, Flex, Row, Wrap } from "@reflect-ui/core";
import type { AsWrapFlag } from "@code-features/flags/--as-wrap";
import { keyFromNode } from "../../key";
import { tokenize } from "../..";
import { default_tokenizer_config } from "../../config";
import { handleChildren } from "../../main";
import { unwrappedChild } from "../../wrappings";

// type InputLayout = Array<Column> | Array<Row>;

/**
 *
 * from
 * ```
 * row[
 *  col [1, 2, 3],
 *  col [4, 5, 6],
 *  col [7, 8, 9]
 * ]
 * ```
 *
 * to
 * ```
 * wrap[1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 */
export function tokenize_flagged_wrap(
  node: ReflectSceneNode,
  flag: AsWrapFlag
) {
  const validated = validate_input(node as any);
  if (validated.error === false) {
    // console.log("validated as wrap", validated);
    node = validated.wrap_root;
    return new Wrap({
      key: keyFromNode(validated.wrap_root),
      width: validated.wrap_root.width,
      height: validated.wrap_root.height,
      runSpacing: validated.runSpacing,
      spacing: validated.spacing,
      // flex: validated.wrap_root.layoutGrow,
      // mainAxisSize: _mainaxissize,
      // crossAxisAlignment: frame.crossAxisAlignment,
      // mainAxisAlignment: frame.mainAxisAlignment,
      // verticalDirection: VerticalDirection.down,
      boxShadow: validated.wrap_root.shadows as BoxShadowManifest[],
      padding: validated.wrap_root.padding,
      // background: _background,
      borderRadius: validated.wrap_root.cornerRadius,
      // border: _border,
      children: handleChildren(
        validated.wrap_children,
        "dangerously_use_current"
      ),
    });
  } else {
    throw new Error(validated.error);
  }
}

/**
 * validate if layer casted as wrap can be actually tokenized to wrap.
 *
 * 1. the root should be a column or row
 * 2. the children should be columns or rows
 * @param input
 */
function validate_input(
  node: ReflectFrameNode
):
  | {
      error: false;
      wrap_root: ReflectFrameNode;
      wrap_children: Array<ReflectSceneNode>;
      spacing: number;
      runSpacing: number;
    }
  | { error: string } {
  if (node.type !== "FRAME") {
    return { error: "wrap target is not a frame" };
  }

  const __fully_tokenized = tokenize(node, {
    ...default_tokenizer_config,
    // we don't want to use flags feature for the root, since if this not enabled, it will cause infinite loop.
    should_ignore_flag: (flag) => flag.id == node.id,
    max_depth: 1, // the root = 0, first level children = 1
  });

  // 1. the root should be a column or row
  const tokenized_node: Column | Row = unwrappedChild(__fully_tokenized) as any;
  if (tokenized_node instanceof Column || __fully_tokenized instanceof Row) {
    // if children len = 0, it's ok. all logic passed.
    if (tokenized_node.children.length === 0) {
      return {
        wrap_root: node as ReflectFrameNode,
        wrap_children: [],
        error: false,
        runSpacing: node.itemSpacing,
        spacing: 0,
      };
    }
    // 2. the children should be columns or rows
    const first_sample_child = unwrappedChild(
      tokenized_node.children[0]
    ) as Flex;
    const childrentype = first_sample_child._type;
    const has_mixed_chilren = tokenized_node.children.some((c) => {
      unwrappedChild(c)._type !== childrentype;
    });
    if (has_mixed_chilren) {
      return {
        error: `mixed children error : wrap can only have columns or rows as children`,
      };
    }

    const depth2_children = [].concat.apply(
      [],
      node.children.map((cr) => cr.children)
    );

    return {
      wrap_root: node as ReflectFrameNode,
      wrap_children: depth2_children,
      error: false,
      runSpacing: node.itemSpacing,
      spacing: first_sample_child.itemSpacing,
    };
  }
  return {
    error: `invalid root type error : the targetted wrap "${node.name}" must be able to interpret as a column or row originally. but got "${__fully_tokenized._type}" instead.`,
  };
}
