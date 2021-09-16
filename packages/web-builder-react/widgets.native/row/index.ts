import { ReactWidget } from "../../widgets/widget";
import { WidgetKey } from "@coli.codes/web-builder-core";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { Axis, Color, EdgeInsets } from "@reflect-ui/core";
import { Flex } from "../flex";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";

export class Row extends Flex {
  readonly _type = "row";
  constructor(
    p: Omit<IFlexManifest, "direction"> & {
      key: WidgetKey;
      children: Array<ReactWidget>;
      boxShadow?: BoxShadowManifest;
      margin?: EdgeInsets;
      padding?: EdgeInsets;
      color?: Color;
    }
  ) {
    super({
      ...p,
      direction: Axis.horizontal,
    });
  }
}
