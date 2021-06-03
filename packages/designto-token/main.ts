import { nodes } from "@design-sdk/core";
import { Widget } from "@reflect-ui/core";
import { tokenizeText } from "./text";
import { tokenizeLayout } from "./layout";
import { tokenizeContainer } from "./container";
import { tokenizeVector, tokenizeBitmap } from "./graphics";
import { SingleOrArray, isNotEmptyArray } from "./utils";
import { array } from "@reflect-ui/uiutils";

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

    case nodes.ReflectNodeType.line:
    default:
      console.error(`${node.type} is not yet handled by "@designto/token"`);
      break;
  }
  return tokenizedTarget;
}
