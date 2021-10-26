import { WidgetKey } from "../widget-key";
import { JSXElementConfig, JsxWidget } from "../widget-core";
import { JSX } from "coli";

export class InstanciationElement extends JsxWidget {
  readonly identifier: string;
  // TODO: support arguments

  constructor({ key, identifier }: { key: WidgetKey; identifier: string }) {
    super({ key });
    this.identifier = identifier;
  }

  jsxConfig(): JSXElementConfig {
    return {
      type: "tag-and-attr",
      tag: JSX.identifier(this.identifier),
    };
  }
}
