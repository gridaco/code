import { ReactWidget } from "../../widgets/widget";
import { WidgetKey } from "@coli.codes/web-builder-core";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { Color, EdgeInsets } from "@reflect-ui/core";
import { Flex } from "../flex";

export class Row extends Flex {
  readonly _type = "row";
  constructor({
    key,
    children,
  }: {
    key: WidgetKey;
    children: Array<ReactWidget>;
    boxShadow?: BoxShadowManifest;
    margin?: EdgeInsets;
    padding?: EdgeInsets;
    color?: Color;
  }) {
    super({
      key: key,
      children: children,
      direction: "row",
    });
  }
}
