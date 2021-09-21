import { nodes } from "@design-sdk/core";
import { Widget } from "@reflect-ui/core";
import { tokenizeText } from "./token-text";
import { tokenizeLayout } from "./token-layout";
import { tokenizeContainer } from "./token-container";
import {
  tokenizeVector,
  tokenizeBitmap,
  tokenizeGraphics,
} from "./token-graphics";
import { tokenizeButton, tokenizeDivider } from "./token-widgets";
import { SingleOrArray, isNotEmptyArray } from "./utils";
import { array } from "@reflect-ui/uiutils";
import { detectIf } from "@reflect-ui/detection";

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
    node.forEach((node, index) => {
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

function handleChildren(nodes: Array<nodes.ReflectSceneNode>): Array<Widget> {
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
    case nodes.ReflectNodeType.rectangle:
      tokenizedTarget = tokenizeContainer.fromRectangle(
        node as nodes.ReflectRectangleNode
      );
      break;

    case nodes.ReflectNodeType.text:
      tokenizedTarget = tokenizeText.fromText(node as nodes.ReflectTextNode);
      break;

    case nodes.ReflectNodeType.frame:
      const _frame = node as nodes.ReflectFrameNode;
      tokenizedTarget = tokenizeLayout.fromFrame(
        _frame,
        handleChildren(_frame.children)
      );
      break;

    case nodes.ReflectNodeType.vector:
      const _vector = node as nodes.ReflectVectorNode;
      tokenizedTarget = tokenizeVector.fromVector(_vector);
      break;

    case nodes.ReflectNodeType.star:
      tokenizedTarget = tokenizeVector.fromStar();
      break;

    case nodes.ReflectNodeType.poligon:
      tokenizedTarget = tokenizeVector.fromPoligon();
      break;

    case nodes.ReflectNodeType.group:
      const _group = node as nodes.ReflectGroupNode;
      tokenizedTarget = tokenizeLayout.fromGroup(
        _group,
        handleChildren(_group.children)
      );
      break;

    case nodes.ReflectNodeType.ellipse:
      const _ellipse = node as nodes.ReflectEllipseNode;
      tokenizedTarget = tokenizeContainer.fromEllipse(_ellipse);
      break;

    case nodes.ReflectNodeType.line:
    // const _line = node as nodes.ReflectLineNode;
    // tokenizedTarget = tokenizeDivider.fromLine(_line);
    // break;

    default:
      console.error(`${node.type} is not yet handled by "@designto/token"`);
      break;
  }
  return tokenizedTarget;
}
