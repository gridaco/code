import { WidgetKey } from "../../../builder-web-core";
import { Axis, Color, EdgeInsets } from "@reflect-ui/core";
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
      background?: BackgroundPaintLike[];
      color?: Color;
    }
  ) {
    super({ ...p, direction: Axis.vertical });
  }
}
