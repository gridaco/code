import { WidgetKey } from "../../../builder-web-core";
import {
  Axis,
  BorderRadiusManifest,
  BoxShadowManifest,
  Color,
  EdgeInsets,
} from "@reflect-ui/core";
import { ReactWidget } from "../../widgets/widget";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import { Flex } from "../flex";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";

export class Column extends Flex {
  readonly _type = "column";

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
    super({ ...p, direction: Axis.vertical });
  }
}
