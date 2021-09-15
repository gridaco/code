import { WidgetKey } from "@coli.codes/web-builder-core";
import {
  CrossAxisAlignment,
  EdgeInsets,
  MainAxisAlignment,
  VerticalDirection,
} from "@reflect-ui/core";
import { MainAxisSize } from "@reflect-ui/core/lib/main-axis-size";
import { ReactWidget } from "../../widgets/widget";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import { Flex } from "../flex";

export class Column extends Flex {
  readonly _type = "column";

  constructor(p: {
    key: WidgetKey;
    children: Array<ReactWidget>;
    mainAxisAlignment?: MainAxisAlignment;
    mainAxisSize?: MainAxisSize;
    crossAxisAlignment?: CrossAxisAlignment;
    verticalDirection?: VerticalDirection;
    margin?: EdgeInsets;
    padding?: EdgeInsets;
    background?: BackgroundPaintLike[];
  }) {
    super({ ...p, direction: "column" });
  }
}
