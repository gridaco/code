import { JSX, JSXElementLike, css, JSXText } from "coli";

import { ReactWidget } from "../widget";

export class ErrorWidget extends ReactWidget {
  constructor(readonly id: string) {
    super();
  }
  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElementLike {
    return JSX.div({
      children: [
        new JSXText(`This layer/layout is not handled - id:${this.id}`),
      ],
    }).make();
  }
}
