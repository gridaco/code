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
  const _key = keyFromNode(frame);
  const _background = [frame.primaryColor];

  if (frame.isAutoLayout) {
    switch (frame.layoutMode) {
      case Axis.horizontal:
        return new Row({
          key: _key,
          children: children,
          crossAxisAlignment: frame.crossAxisAlignment,
          mainAxisAlignment: frame.mainAxisAlignment,
          boxShadow: frame.primaryShadow,
          padding: frame.padding,
          background: _background,
        });
        break;
      case Axis.vertical:
        return new Column({
          key: _key,
          children: children,
          crossAxisAlignment: frame.crossAxisAlignment,
          mainAxisAlignment: frame.mainAxisAlignment,
          boxShadow: frame.primaryShadow,
          padding: frame.padding,
          background: _background,
        });
        break;
      default:
        console.info(`Frame: "${frame.name}" fallback to flex`);
        return new Flex({
          key: _key,
          direction: Axis.vertical,
          crossAxisAlignment: frame.crossAxisAlignment,
          mainAxisAlignment: frame.mainAxisAlignment,
          verticalDirection: VerticalDirection.down,
          boxShadow: frame.primaryShadow,
          padding: frame.padding,
          background: _background,
        });
        break;
    }
  }

  // else, stack.
  // todo - use constructor
  // todo - also convert as container if single child
  const stack = new Stack({
    key: _key,
    children: children,
    width: frame.width,
    height: frame.height,
    boxShadow: frame.primaryShadow,
    padding: frame.padding,
    background: _background,
  });
  return stack;
}

function fromGroup(
  group: nodes.ReflectGroupNode,
  children: Array<core.Widget>
): core.LayoutRepresntatives {
  console.log("group", group);
  const stack = new Stack({
    key: keyFromNode(group),
    children: children,
    width: group.width,
    height: group.height,
    boxShadow: group.primaryShadow,
  });
  stack.children = children;
  return stack;
}

export const tokenizeLayout = {
  fromFrame: fromFrame,
  fromGroup: fromGroup,
};
