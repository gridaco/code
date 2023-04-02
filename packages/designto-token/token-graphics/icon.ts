import type { ReflectSceneNode } from "@design-sdk/figma-node";
import type { DetectedIconData } from "@reflect-ui/detection";
import { MainImageRepository } from "@design-sdk/asset-repository";
import { IconWidget } from "@reflect-ui/core";
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
