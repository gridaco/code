import { MainImageRepository } from "@design-sdk/core/assets-repository";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import { IconWidget } from "@reflect-ui/core";
import { DetectedIconData } from "@reflect-ui/detection/lib/icon.detection";
import { keyFromNode } from "../key";

function fromIcon(node: ReflectSceneNode, d: DetectedIconData): IconWidget {
  switch (d.type) {
    case "named":
      return new IconWidget({
        key: keyFromNode(node),
        color: d.color,
        size: d.size,
        icon: {
          ...d.icon,
          _type: "named-icon",
        },
      });
    case "design-node":
      const _tmp_img = MainImageRepository.instance
        .get("fill-later-assets")
        .addImage<`grida://${string}`>({
          key: node.id,
        });

      return new IconWidget({
        key: keyFromNode(node),
        color: d.color,
        size: d.size,
        icon: {
          uri: _tmp_img.url,
          _type: "remote-uri",
        },
      });
    default:
      throw `${d} not supported`;
  }
}

export const tokenizeIcon = {
  fromIcon: fromIcon,
};
