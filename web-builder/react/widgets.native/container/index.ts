import { ColiObjectLike } from "@coli.codes/builder";
import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import { JSX, JSXElementLike, css } from "coli";

import { ReactWidget } from "../../widgets/widget";

export class Container extends ReactWidget {
  _type = "Container";
  constructor(p: { key: WidgetKey; background?: BackgroundPaintLike[] }) {
    super(p);
  }

  styleData(): CSSProperties {
    return {};
  }
  jsxConfig(): JSXElementConfig {
    return {
      tag: JSX.identifier("div"),
    };
  }
}
