import { nodes } from "@design-sdk/core";
import { Widget, WidgetKey } from "@reflect-ui/core";
import { tokenizeText } from "./token-text";
import { tokenizeLayout } from "./token-layout";
import { tokenizeContainer } from "./token-container";
import { tokenizeVector, tokenizeGraphics } from "./token-graphics";
import { tokenizeButton, tokenizeDivider } from "./token-widgets";
import { SingleOrArray, isNotEmptyArray } from "./utils";
import { array } from "@reflect-ui/uiutils";
import { detectIf } from "@reflect-ui/detection";
import { Stretched } from "./tokens";
import { byY, byYX } from "@designto/sanitized/sort-by-y-z";
import ignore_masking_pipline from "@designto/sanitized/ignore-masking-nodes";
import { default_tokenizer_config } from "./config";

export type { Widget };

/**
 * ENTRY POINT MAIN FUCTION
 * Main function for converting reflect design node tree to reflect widget token tree
 */
export function tokenize(node: nodes.ReflectSceneNode): Widget {
  if (!node) {
    throw "A valid design node should be passed in order to tokenize it into a reflect widget.";
  }
  return rootHandler(node);
}

/**
 * generator for root node
 * @param node
 * @returns
 */
function rootHandler(node: nodes.ReflectSceneNode): Widget {
  return dynamicGenerator(node) as Widget;
}

/**
 * one of [root, child, children]
 * @param node
 * @returns
 */
function dynamicGenerator(
  node: SingleOrArray<nodes.ReflectSceneNode>
): SingleOrArray<Widget> {
  if (isNotEmptyArray(node)) {
    const widgets: Array<Widget> = [];
    node = node as Array<nodes.ReflectSceneNode>;
    node
      // .reverse()
      // .sort(byY)
      .filter(
        ignore_masking_pipline(
          default_tokenizer_config.sanitizer_ignore_masking_node
        )
      )
      .forEach((node, index) => {
        widgets.push(handleNode(node));
      });

    // filter empty widgets (safe checker logic)
    const finalWidgets = widgets.filter((w) => array.filters.notEmpty(w));
    // console.log("flutterWidgetGenerator complete", widgets)
    return finalWidgets;
  } else {
    node = node as nodes.ReflectSceneNode;
    const finalWidget = handleNode(node);
    return finalWidget;
  }
}

/**
 * @internal - do not export as sdk usage. this should be exported & used for internal use only.
 * @param nodes
 * @returns
 */
export function handleChildren(
  nodes: Array<nodes.ReflectSceneNode>
): Array<Widget> {
  return dynamicGenerator(nodes) as Array<Widget>;
}

function handleNode(node: nodes.ReflectSceneNode): Widget {
  if (!node.type) {
    console.error(
      "cannot handle unknown type of node. node.type was undefined or null"
    );
    return;
  }

  // -------------------------------------------------------------------------
  // --------------------------- Detected tokens -----------------------------
  // -------------------------------------------------------------------------

  // - image -
  const _detect_if_image = detectIf.image(node);
  if (_detect_if_image.result) {
    return tokenizeGraphics.fromImage(node, _detect_if_image.data);
  }

  // - icon -
  const _detect_if_icon = detectIf.icon(node);
  if (_detect_if_icon.result) {
    return tokenizeGraphics.fromIcon(node, _detect_if_icon.data);
  }

  // - button -
  const _detect_if_button = detectIf.button(node);
  if (_detect_if_button.result) {
    return tokenizeButton.fromManifest(node, _detect_if_button.data);
  }

  // -------------------------------------------------------------------------
  // --------------------------- Detected tokens -----------------------------
  // -------------------------------------------------------------------------

  let tokenizedTarget: Widget;
  switch (node.type as string) {
    case nodes.ReflectSceneNodeType.rectangle:
      tokenizedTarget = tokenizeContainer.fromRectangle(
        node as nodes.ReflectRectangleNode
      );
      break;

    case nodes.ReflectSceneNodeType.text:
      tokenizedTarget = tokenizeText.fromText(node as nodes.ReflectTextNode);
      break;

    case nodes.ReflectSceneNodeType.frame:
      const _frame = node as nodes.ReflectFrameNode;
      tokenizedTarget = tokenizeLayout.fromFrame(_frame, _frame.children, {
        is_root: node.isRoot,
      });
      break;

    case nodes.ReflectSceneNodeType.vector:
      const _vector = node as nodes.ReflectVectorNode;
      tokenizedTarget = tokenizeVector.fromVector(_vector);
      break;

    case nodes.ReflectSceneNodeType.star:
      tokenizedTarget = tokenizeVector.fromStar();
      break;

    case nodes.ReflectSceneNodeType.poligon:
      tokenizedTarget = tokenizeVector.fromPoligon();
      break;

    case nodes.ReflectSceneNodeType.group:
      const _group = node as nodes.ReflectGroupNode;
      tokenizedTarget = tokenizeLayout.fromGroup(_group, _group.children);
      break;

    case nodes.ReflectSceneNodeType.ellipse:
      const _ellipse = node as nodes.ReflectEllipseNode;
      tokenizedTarget = tokenizeContainer.fromEllipse(_ellipse);
      break;

    case nodes.ReflectSceneNodeType.boolean_operation:
      console.log("tokenizing bool op to image", node);
      const _bool_op = node as nodes.ReflectBooleanOperationNode;
      tokenizedTarget = tokenizeGraphics.fromBooleanOperation(_bool_op);
      break;

    case nodes.ReflectSceneNodeType.line:
    // const _line = node as nodes.ReflectLineNode;
    // tokenizedTarget = tokenizeDivider.fromLine(_line);
    // break;

    default:
      console.error(`${node.type} is not yet handled by "@designto/token"`);
      break;
  }

  // post wrapping
  if (tokenizedTarget) {
    if (node.layoutAlign && node.layoutAlign === "STRETCH") {
      tokenizedTarget = new Stretched({
        key: new WidgetKey({
          ...tokenizedTarget.key,
          id: tokenizedTarget.key.id + "_stretched",
        }),
        child: tokenizedTarget,
        axis: node.parent?.layoutMode,
      });
    }
  }

  // console.log(
  //   "tokenizedTarget",
  //   tokenizedTarget.key.originName,
  //   tokenizedTarget
  // );

  return tokenizedTarget;
}
