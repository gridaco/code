import { CSSProperties } from "@coli.codes/css";
import { WidgetKey } from "@coli.codes/web-builder-core";
import {
  CrossAxisAlignment,
  EdgeInsets,
  MainAxisAlignment,
  VerticalDirection,
} from "@reflect-ui/core";
import { MainAxisSize } from "@reflect-ui/core/lib/main-axis-size";
import { JSX, JSXElementLike } from "coli";
import { ReactMultiChildWidget, ReactWidget } from "../../widgets/widget";
import * as css from "@web-builder/styles";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";

export class Column extends ReactMultiChildWidget {
  readonly _type = "column";

  mainAxisAlignment?: MainAxisAlignment;
  mainAxisSize?: MainAxisSize;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
  margin?: EdgeInsets;
  padding?: EdgeInsets;
  background?: BackgroundPaintLike[];

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
    super(p);

    this.mainAxisAlignment = p.mainAxisAlignment;
    this.mainAxisSize = p.mainAxisSize;
    this.crossAxisAlignment = p.crossAxisAlignment;
    this.verticalDirection = p.verticalDirection;

    this.margin = p.margin;
    this.padding = p.padding;
    this.background = p.background;
  }

  jsxConfig() {
    return {
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      display: "flex",
      "flex-direction": "column",
      "align-items": this.crossAxisAlignment,
      "box-shadow": css.boxshadow(this.boxShadow),
      ...css.background(this.background),
      ...css.padding(this.padding),
    };
  }
}
