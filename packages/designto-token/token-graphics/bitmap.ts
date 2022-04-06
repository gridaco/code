import { MainImageRepository } from "@design-sdk/core/assets-repository";
import type {
  ReflectBooleanOperationNode,
  ReflectEllipseNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { BoxFit, ImageWidget } from "@reflect-ui/core";
import { ImagePaint } from "@reflect-ui/core/lib/cgr";
import { keyFromNode } from "../key";

/**
 * @deprecated TODO: update the asset repository pattern.
 */
const _asset_key = "fill-later-assets";

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
  const _tmp_img = MainImageRepository.instance.get(_asset_key).addImage({
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

/**
 * bake a ellipse as an bitmap for irregular shape, (e.g. with startingAngle or innerRadius)
 * @param node
 * @returns
 */
function fromIrregularEllipse(node: ReflectEllipseNode): ImageWidget {
  const _tmp_img = MainImageRepository.instance.get(_asset_key).addImage({
    key: node.id,
  });

  const widget = new ImageWidget({
    key: keyFromNode(node),
    width: node.width,
    height: node.height,
    // we set to contin, since the ellipse' source size will be different from actual bound box size of the ellipse.
    fit: BoxFit.contain,
    // TODO: suppport alignment and centerSlice due to fit: contain.
    // - alignment:
    // - centerSlice:
    semanticLabel: "image from ellipse",
    src: _tmp_img.url,
  });
  widget.x = node.x;
  widget.y = node.y;
  return widget;
}

export const tokenizeBitmap = {
  fromStar: fromStar,
  fromPaint: fromPaint,
  fromLine: fromLine,
  fromGroup: fromGroup,
  fromFrame: fromFrame,
  fromBooleanOperation: fromBooleanOperation,
  fromIrregularEllipse: fromIrregularEllipse,
  fromAnyNode: fromAnyNode,
};
