import { nodes } from "@design-sdk/core";
import * as core from "@reflect-ui/core";
import {
  Axis,
  Column,
  Stack,
  Flex,
  Row,
  VerticalDirection,
} from "@reflect-ui/core";
import { keyFromNode } from "../key";

function fromFrame(
  frame: nodes.ReflectFrameNode,
  children: Array<core.Widget>
): core.LayoutRepresntatives {
  if (frame.isAutoLayout) {
    switch (frame.layoutMode) {
      case Axis.horizontal:
        return new Row({
          key: keyFromNode(frame),
          children: children,
        });
        break;
      case Axis.vertical:
        return new Column({
          key: keyFromNode(frame),
          children: children,
        });
        break;
      default:
        console.info(`Frame: "${frame.name}" fallback to flex`);
        return new Flex({
          key: keyFromNode(frame),
          direction: Axis.vertical,
          verticalDirection: VerticalDirection.down,
        });
        break;
    }
  }

  // else, stack.
  // todo - use constructor
  // todo - also convert as container if single child
  const stack = new Stack({
    key: keyFromNode(frame),
  });
  stack.children = children;
  return stack;
}

function fromGroup(
  group: nodes.ReflectGroupNode,
  children: Array<core.Widget>
): core.LayoutRepresntatives {
  const stack = new Stack({
    key: keyFromNode(group),
  });
  stack.children = children;
  return stack;
}

export const tokenizeLayout = {
  fromFrame: fromFrame,
  fromGroup: fromGroup,
};
