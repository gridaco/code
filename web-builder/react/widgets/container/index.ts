import { JSX, JSXElementLike } from "coli";
import { CSSStyleDeclaration } from "coli/lib/languages/css";
import { ReactWidget } from "../widget";

export class Container extends ReactWidget {
  buildStyle(): CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElementLike {
    return JSX.div().make()
  }
}
