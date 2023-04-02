import { StylableJsxWidget } from "@web-builder/core/widget-tree/widget";
import { WidgetKey } from "../..";
import { BoxShadowManifest } from "@reflect-ui/core";
import {
  Axis,
  BorderRadiusManifest,
  Color,
  EdgeInsets,
} from "@reflect-ui/core";
import { Flex } from "../flex";
import { IFlexManifest } from "@reflect-ui/core";

export class Row extends Flex {
  readonly _type = "row";
  constructor(
    p: Omit<IFlexManifest<StylableJsxWidget>, "direction"> & {
      key: WidgetKey;
      margin?: EdgeInsets;
      padding?: EdgeInsets;
      boxShadow?: BoxShadowManifest[];
      color?: Color;
      borderRadius?: BorderRadiusManifest;
    }
  ) {
    super({
      ...p,
      direction: Axis.horizontal,
    });
  }
}
