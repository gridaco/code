import type { WidgetKey, StylableJsxWidget } from "@web-builder/core";
import {
  Axis,
  BorderRadiusManifest,
  BoxShadowManifest,
  Color,
  EdgeInsets,
  IFlexManifest,
} from "@reflect-ui/core";
import { Flex } from "../rn-flex";

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
