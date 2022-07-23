import { StylableJSXElementConfig, WidgetKey } from "@web-builder/core";
import { JSX } from "coli";
import type { TextStyle } from "react-native";
import {
  TextChildWidget,
  TextDataWidget,
} from "@web-builder/core/widget-tree/widget";

export class ErrorWidget extends TextChildWidget<TextStyle> {
  readonly errorMessage: string;
  constructor(p: { key: WidgetKey; errorMessage: string }) {
    super({
      key: p.key,
    });
    this.errorMessage = p.errorMessage;
  }

  textData() {
    return new TextDataWidget({
      key: WidgetKey.copyWith(this.key, { id: this.key.id + ".text-data" }),
      data: this.errorMessage,
    });
  }

  styleData(): TextStyle {
    return {
      color: "red",
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("Text"),
    };

    /// TODO - return text
    // `This layer/layout is not handled - key:${JSON.stringify(this.key)}`
  }
}
