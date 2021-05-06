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

function fromFrame(frame: nodes.ReflectFrameNode): core.LayoutRepresntatives {
  if (frame.isAutoLayout) {
    switch (frame.layoutMode) {
      case Axis.horizontal:
        return new Row({
          children: [],
        });
        break;
      case Axis.vertical:
        return new Column({
          children: [],
        });
        break;
      default:
        console.info(`Frame: "${frame.name}" fallback to flex`);
        return new Flex({
          direction: Axis.vertical,
          verticalDirection: VerticalDirection.down,
        });
        break;
    }
  }

  return new Stack();
}

function fromGroup(group: nodes.ReflectGroupNode): core.LayoutRepresntatives {
  return undefined;
}

export const tokenizeLayout = {
  fromFrame: fromFrame,
  fromGroup: fromGroup,
};
