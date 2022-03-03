import type { WidgetKey } from "../../widget-key";
import {
  Axis,
  BorderRadiusManifest,
  BoxShadowManifest,
  Color,
  EdgeInsets,
} from "@reflect-ui/core";
import { StylableJsxWidget } from "@web-builder/core/widget-tree/widget";
import { Flex } from "../flex";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";

export class Column extends Flex {
  readonly _type = "column";

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
    super({ ...p, direction: Axis.vertical });
  }
}
