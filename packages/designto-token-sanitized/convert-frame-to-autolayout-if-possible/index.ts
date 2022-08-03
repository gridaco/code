import { convert_group_to_frame } from "../convert-group-to-frame";
import { mostFrequent } from "@reflect-ui/uiutils";
import {
  FigmaCrossAxisAligment,
  FigmaMainAxisAlignment,
} from "@design-sdk/figma-types";
import {
  convertLayoutModeToAxis,
  convertPrimaryAxisAlignItemsToMainAxisAlignment,
  convertCounterAxisAlignItemsToCrossAxisAlignment,
} from "@design-sdk/figma-node-conversion";
import { Axis, EdgeInsets, EdgeInsetsManifest } from "@reflect-ui/core";
import {
  ReflectFrameNode,
  ReflectGroupNode,
  ReflectSceneNodeType,
} from "@design-sdk/figma-node";
import type { ReflectSceneNode } from "@design-sdk/figma-node";

/**
 * Add AutoLayout attributes if layout has items aligned (either vertically or horizontally).
 * To make the calculation, the average position of every child, ordered, needs to pass a threshold.
 * If it fails for both X and Y axis, there is no AutoLayout and return it unchanged.
 * If it finds, add the correct attributes. When original node is a Group,
 * convert it to Frame before adding the attributes. Group doesn't have AutoLayout properties.
 */
export function convert_frame_to_autolayout_if_possible(
  node: ReflectFrameNode | ReflectGroupNode
): ReflectFrameNode | ReflectGroupNode {
  // console.log("convertToAutoLayout", "node", node);

  // 1. check if frame is already set with auto layout.
  if (node.type == ReflectSceneNodeType.frame) {
    if ((node as ReflectFrameNode).isAutoLayout) {
      return node;
    }
  }

  // 2. if non set, detect if non auto layout group or frame can be convert as it.

  // only go inside when AutoLayout is not already set.
  if (
    (node instanceof ReflectFrameNode &&
      node.layoutMode === undefined &&
      node.children.length > 0) ||
    node instanceof ReflectGroupNode
  ) {
    const [orderedChildren, direction, itemSpacing] = reorderChildrenIfAligned(
      node.children
    );
    node.children = orderedChildren;

    // if node is a group, convert to frame
    let frame: ReflectFrameNode;
    if (node instanceof ReflectGroupNode) {
      frame = convert_group_to_frame(node);
    } else {
      frame = node;
    }

    if (direction === "NONE" && frame.children.length > 1) {
      frame.isRelative = true;
    }

    if (direction === "NONE" && frame.children.length !== 1) {
      // catches when children is 0 or children is larger than 1
      return frame;
    }

    if (direction === "NONE" && frame.children.length === 1) {
      // Add fake AutoLayout when there is a single item. This is done for the Padding.
      frame.layoutMode = Axis.horizontal;
    } else {
      frame.layoutMode = convertLayoutModeToAxis(direction);
    }

    frame.itemSpacing = itemSpacing > 0 ? itemSpacing : 0;

    const padding = detectAutoLayoutPadding(frame);

    frame.padding = new EdgeInsets({
      top: Math.max(padding?.top ?? 0, 0),
      bottom: Math.max(padding?.bottom ?? 0, 0),
      left: Math.max(padding?.left ?? 0, 0),
      right: Math.max(padding?.right ?? 0, 0),
    });

    // update the child's layoutAlign attribute as INHERIT or STRETCH
    frame.children.map((child) => {
      layoutAlignInChild(child, node as ReflectFrameNode);
    });

    const allChildrenDirection = node.children.map((d) =>
      primaryAxisDirection(d, node)
    );

    const primaryDirection = allChildrenDirection.map((d) => d.primary);
    const counterDirection = allChildrenDirection.map((d) => d.counter);

    const _priorityOrders = ["MIN", "MAX", "CENTER"];
    if (frame.mainAxisAlignment == undefined) {
      frame.mainAxisAlignment = convertPrimaryAxisAlignItemsToMainAxisAlignment(
        mostFrequent(
          primaryDirection,
          _priorityOrders
        ) as FigmaMainAxisAlignment
      );
    }

    if (frame.crossAxisAlignment == undefined) {
      frame.crossAxisAlignment =
        convertCounterAxisAlignItemsToCrossAxisAlignment(
          mostFrequent(
            counterDirection,
            _priorityOrders
          ) as FigmaCrossAxisAligment
        );
    }

    // TODO inspect this. is this required?
    frame.counterAxisSizingMode = frame.counterAxisSizingMode ?? "FIXED";
    frame.primaryAxisSizingMode = frame.primaryAxisSizingMode ?? "FIXED";
  }

  return node;
}

/**
 * Standard average calculation. Length must be > 0
 */
function average(arr: Array<number>) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

/**
 * Check the average of children positions against this threshold;
 * This allows a small tolerance, which is useful when items are slightly overlayed.
 * If you set this lower, layouts will get more responsive but with less visual fidelity.
 */
const threshold = -2;

/**
 * Verify if children are sorted by their relative position and return them sorted, if identified.
 */
function reorderChildrenIfAligned(
  children: ReadonlyArray<ReflectSceneNode>
): [Array<ReflectSceneNode>, "HORIZONTAL" | "VERTICAL" | "NONE", number] {
  if (children.length === 1) {
    return [[...children], "NONE", 0];
  }

  const updateChildren = [...children];
  const [visit, avg] = shouldVisit(updateChildren);

  // check against a threshold
  if (visit === "VERTICAL") {
    // if all elements are horizontally aligned
    return [updateChildren.sort((a, b) => a.y - b.y), "VERTICAL", avg];
  } else {
    if (visit === "HORIZONTAL") {
      // if all elements are vertically aligned
      return [updateChildren.sort((a, b) => a.x - b.x), "HORIZONTAL", avg];
    }
  }

  return [updateChildren, "NONE", 0];
}

/**
 * Checks if layout is horizontally or vertically aligned.
 * First verify if all items are vertically aligned in Y axis (spacing > 0), then for X axis, then the average for Y and finally the average for X.
 * If no correspondence is found, returns "NONE".
 * In a previous version, it used a "standard deviation", but "average" performed better.
 */
function shouldVisit(
  children: ReadonlyArray<ReflectSceneNode>
): ["HORIZONTAL" | "VERTICAL" | "NONE", number] {
  const intervalY = calculateInterval(children, "y");
  const intervalX = calculateInterval(children, "x");

  const avgX = average(intervalX);
  const avgY = average(intervalY);

  if (intervalY === undefined || intervalX === undefined) {
    throw new Error(
      `both "intervalY" and "intervalX" shall not be undefined. (this is not a user error)`
    );
  }

  if (!intervalY.every((d) => d >= threshold)) {
    if (!intervalX.every((d) => d >= threshold)) {
      if (avgY <= threshold) {
        if (avgX <= threshold) {
          return ["NONE", 0];
        }
        return ["HORIZONTAL", avgX];
      }
      return ["VERTICAL", avgY];
    }
    return ["HORIZONTAL", avgX];
  }
  return ["VERTICAL", avgY];
}

// todo improve this method to try harder. Idea: maybe use k-means or hierarchical cluster?

/**
 * This function calculates the distance (interval) between items.
 * Example: for [item]--8--[item]--8--[item], the result is [8, 8]
 */
function calculateInterval(
  children: ReadonlyArray<ReflectSceneNode>,
  xOrY: "x" | "y"
): Array<number> {
  const hOrW: "width" | "height" = xOrY === "x" ? "width" : "height";

  // sort children based on X or Y values
  const sorted: Array<ReflectSceneNode> = [...children].sort(
    (a, b) => a[xOrY] - b[xOrY]
  );

  // calculate the distance between values (either vertically or horizontally)
  const interval = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    interval.push(sorted[i + 1][xOrY] - (sorted[i][xOrY] + sorted[i][hOrW]));
  }
  return interval;
}

const ZERO_PADDING = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

/**
 * Calculate the Padding.
 */
function detectAutoLayoutPadding(node: ReflectFrameNode): EdgeInsetsManifest {
  // if node is a root node, than no padding is required (to itself, which means relative to its parent - which does not exists since it is root.).
  if (node.isRoot) {
    return ZERO_PADDING;
  }

  // if node is already explicitly set as autolayout (this is usual) by designer, then return as-is
  if (node.isAutoLayout) {
    return node.padding;
  }

  // IN OTHER CASES,
  // from this point, this is dangerous assumption that group or frame might could be represented as a autolayout

  // this need to be run before VERTICAL or HORIZONTAL
  if (node.children.length === 1) {
    // left padding is first element's y value
    const left = node.children[0].x;

    const right = node.width - (node.children[0].x + node.children[0].width);

    const top = node.children[0].y;

    const bottom = node.height - (node.children[0].y + node.children[0].height);

    // return the smallest padding in each axis
    return {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    };
  } else if (node.layoutMode === Axis.vertical) {
    // top padding is first element's y value
    const top = node.children[0].y;

    // bottom padding is node height - last position + last height
    const last = node.children[node.children.length - 1];
    const bottom = node.height - (last.y + last.height);

    // the closest value to the left border
    const left = Math.min(...node.children.map((d) => d.x));

    // similar to [bottom] calculation, but using height and getting the minimum
    const right = Math.min(
      ...node.children.map((d) => node.width - (d.width + d.x))
    );

    // return the smallest padding in each axis
    return {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    };
  } else if (node.layoutMode === Axis.horizontal) {
    // left padding is first element's y value
    const left = node.children[0].x;

    // right padding is node width - last position + last width
    const last = node.children[node.children.length - 1];
    const right = node.width - (last.x + last.width);

    // the closest value to the top border
    const top = Math.min(...node.children.map((d) => d.y));

    // similar to [right] calculation, but using height and getting the minimum
    const bottom = Math.min(
      ...node.children.map((d) => node.height - (d.height + d.y))
    );

    // return the smallest padding in each axis
    return {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    };
  }

  return ZERO_PADDING;
}

/**
 * figma: check if children to be STRETCH or INHERIT
 */
function layoutAlignInChild(
  node: ReflectSceneNode,
  parentNode: ReflectFrameNode
) {
  // prevent malicious node input
  if (!(parentNode instanceof ReflectFrameNode)) {
    return;
  }

  const sameWidth =
    node.width - 2 >
    parentNode.width - parentNode.padding.left - parentNode.padding.right;

  const sameHeight =
    node.height - 2 >
    parentNode.height - parentNode.padding.top - parentNode.padding.bottom;

  if (parentNode.layoutMode === Axis.vertical) {
    node.layoutAlign = sameWidth ? "STRETCH" : "INHERIT";
  } else {
    node.layoutAlign = sameHeight ? "STRETCH" : "INHERIT";
  }
  // with custom AutoLayout, this is never going to be 1.
  node.layoutGrow = 0;
}

function primaryAxisDirection(
  node: ReflectSceneNode,
  parentNode: ReflectSceneNode
): { primary: "MIN" | "CENTER" | "MAX"; counter: "MIN" | "CENTER" | "MAX" } {
  // parentNode.layoutMode can't be NONE.
  const nodeCenteredPosX = node.x + node.width / 2;
  const parentCenteredPosX = parentNode.width / 2;

  const centerXPosition = nodeCenteredPosX - parentCenteredPosX;

  const nodeCenteredPosY = node.y + node.height / 2;
  const parentCenteredPosY = parentNode.height / 2;

  const centerYPosition = nodeCenteredPosY - parentCenteredPosY;

  if (parentNode.layoutMode === Axis.vertical) {
    return {
      primary: getPaddingDirection(centerYPosition),
      counter: getPaddingDirection(centerXPosition),
    };
  } else {
    return {
      primary: getPaddingDirection(centerXPosition),
      counter: getPaddingDirection(centerYPosition),
    };
  }
}

function getPaddingDirection(position: number): "MIN" | "CENTER" | "MAX" {
  // allow a small threshold
  if (position < -4) {
    return "MIN";
  } else if (position > 4) {
    return "MAX";
  } else {
    return "CENTER";
  }
}
