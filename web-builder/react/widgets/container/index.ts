import { ColiObjectLike } from "@coli.codes/builder";
import { CSSProperties } from "@coli.codes/css";
import { JSX, JSXElementLike, css } from "coli";

import { ReactWidget } from "../widget";

export class Container extends ReactWidget {
  buildStyle(): CSSProperties {
    throw new Error("Method not implemented.");
  }
  buildJsx(): ColiObjectLike<JSXElementLike> {
    return JSX.div().make();
  }
}
