import { ReactWidget } from "../../widgets/widget";
import { WidgetKey } from "../../../builder-web-core";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import {
  Axis,
  BorderRadiusManifest,
  Color,
  EdgeInsets,
} from "@reflect-ui/core";
import { Flex } from "../flex";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";

export class Row extends Flex {
  readonly _type = "row";
  constructor(
    p: Omit<IFlexManifest<ReactWidget>, "direction"> & {
      key: WidgetKey;
      margin?: EdgeInsets;
      padding?: EdgeInsets;
      boxShadow?: BoxShadowManifest;
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
