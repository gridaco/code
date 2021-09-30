import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, StylableJSXElementConfig, WidgetKey } from "../..";
import { JSX, JSXElementLike, css, JSXText } from "coli";

import {
  TextChildWidget,
  WidgetTree,
} from "@web-builder/core/widget-tree/widget";

export class ErrorWidget extends TextChildWidget {
  constructor(p: { key: WidgetKey; errorMessage: string }) {
    super({
      key: p.key,
      data: p.errorMessage,
    });
  }
  styleData(): CSSProperties {
    return {
      color: "red",
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("em"),
    };

    /// TODO - return text
    // `This layer/layout is not handled - key:${JSON.stringify(this.key)}`
  }
}
