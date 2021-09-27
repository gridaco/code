import { MainImageRepository } from "@design-sdk/core/assets-repository";
import type { ReflectBooleanOperationNode } from "@design-sdk/figma-node";
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

function fromBooleanOperation(
  booleanop: ReflectBooleanOperationNode
): ImageWidget {
  const _tmp_img = MainImageRepository.instance
    .get("fill-later-assets")
    .addImage({
      key: booleanop.id,
    });

  const widget = new ImageWidget({
    key: keyFromNode(booleanop),
    width: booleanop.width,
    height: booleanop.height,
    src: _tmp_img.url,
  });
  widget.x = booleanop.x;
  widget.y = booleanop.y;
  return widget;
}

export const tokenizeBitmap = {
  fromStar: fromStar,
  fromPaint: fromPaint,
  fromLine: fromLine,
  fromGroup: fromGroup,
  fromFrame: fromFrame,
  fromBooleanOperation: fromBooleanOperation,
};
