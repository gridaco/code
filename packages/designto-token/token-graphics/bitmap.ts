import { MainImageRepository } from "@design-sdk/core/assets-repository";
import type {
  ReflectBooleanOperationNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { ImageWidget } from "@reflect-ui/core";
import { ImagePaint } from "@reflect-ui/core/lib/cgr";
import { keyFromNode } from "../key";

function fromStar(): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromPaint(paint: ImagePaint): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromLine(): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromGroup(): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromFrame(): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromAnyNode(node: ReflectSceneNode) {
  const _tmp_img = MainImageRepository.instance
    .get("fill-later-assets")
    .addImage({
      key: node.id,
    });

  const widget = new ImageWidget({
    key: keyFromNode(node),
    width: node.width,
    height: node.height,
    src: _tmp_img.url,
  });
  widget.x = node.x;
  widget.y = node.y;
  return widget;
}

function fromBooleanOperation(
  booleanop: ReflectBooleanOperationNode
): ImageWidget {
  return fromAnyNode(booleanop);
}

export const tokenizeBitmap = {
  fromStar: fromStar,
  fromPaint: fromPaint,
  fromLine: fromLine,
  fromGroup: fromGroup,
  fromFrame: fromFrame,
  fromBooleanOperation: fromBooleanOperation,
  fromAnyNode: fromAnyNode,
};
