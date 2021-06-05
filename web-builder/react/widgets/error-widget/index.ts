import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { JSX, JSXElementLike, css, JSXText } from "coli";

import { ReactWidget } from "../widget";

export class ErrorWidget extends ReactWidget {
  constructor(p: { key: WidgetKey }) {
    super(p);
  }
  styleData(): CSSProperties {
    return {
      color: "red",
    };
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("em"),
    };

    /// TODO - return text
    // `This layer/layout is not handled - key:${JSON.stringify(this.key)}`
  }
}
