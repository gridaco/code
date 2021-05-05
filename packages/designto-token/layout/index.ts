import { nodes } from "@design-sdk/core";
import * as core from "@reflect-ui/core";
import { Axis, Column, Flex, Row, VerticalDirection } from "@reflect-ui/core";

function fromFrame(frame: nodes.ReflectFrameNode): core.LayoutRepresntatives {
  switch (frame.layoutMode) {
    case Axis.horizontal:
      return new Column({
        children: [],
      });
      break;
    case Axis.vertical:
      return new Row({
        children: [],
      });
      break;
    default:
      break;
  }

  return new Flex({
    direction: Axis.vertical,
    verticalDirection: VerticalDirection.down,
  });
}

function fromGroup(group: nodes.ReflectGroupNode): core.LayoutRepresntatives {
  return undefined;
}

export const tokenizeLayout = {
  fromFrame: fromFrame,
  fromGroup: fromGroup,
};
