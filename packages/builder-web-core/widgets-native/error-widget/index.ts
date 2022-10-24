import { CSSProperties } from "@coli.codes/css";
import { StylableJSXElementConfig, WidgetKey } from "../..";
import { JSX } from "coli";

import {
  TextChildWidget,
  TextDataWidget,
} from "@web-builder/core/widget-tree/widget";

export class ErrorWidget extends TextChildWidget {
  readonly errorMessage: string;
  constructor(p: { key: WidgetKey; errorMessage: string }) {
    super({
      key: p.key,
    });
    this.errorMessage = p.errorMessage;
  }

  textData() {
    return new TextDataWidget({
      key: this.key.copyWith({ id: this.key.id + ".text-data" }),
      data: this.errorMessage,
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
