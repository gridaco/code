import { ColiObjectLike } from "@coli.codes/builder";
import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { JSX, JSXElementLike, css } from "coli";

import { ReactWidget } from "../../widgets/widget";

export class Container extends ReactWidget {
  _type = "Container";
  constructor(p: { key: WidgetKey }) {
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
