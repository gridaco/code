import { WidgetKey } from "@coli.codes/web-builder-core";
import { JSX, JSXElementLike, css, JSXText } from "coli";

import { ReactWidget } from "../widget";

export class ErrorWidget extends ReactWidget {
  constructor(p: { key: WidgetKey }) {
    super(p);
  }
  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
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
