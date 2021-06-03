import { CSSProperties } from "@coli.codes/css";
import { WidgetKey } from "@coli.codes/web-builder-core";
import { JSX, JSXElementLike, css, JSXText } from "coli";

import { ReactWidget } from "../widget";

export class ErrorWidget extends ReactWidget {
  constructor(p: { key: WidgetKey }) {
    super(p);
  }
  buildStyle(): CSSProperties {
    return {
      color: "red",
    };
  }
  buildJsx(): JSXElementLike {
    return JSX.div({
      children: [
        new JSXText(
          `This layer/layout is not handled - key:${JSON.stringify(this.key)}`
        ),
      ],
    }).make();
  }
}
