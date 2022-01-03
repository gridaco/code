import { WidgetKey } from "../widget-key";
import { JSXElementConfig, JsxWidget } from "../widget-core";
import { JSX, JSXAttribute, Types } from "coli";

export class InstanciationElement extends JsxWidget {
  readonly identifier: string;
  readonly arguments: { [key: string]: any };

  constructor({
    key,
    identifier,
    arguments: _arguments,
  }: {
    key: WidgetKey;
    identifier: string;
    arguments: { [key: string]: any };
  }) {
    super({ key });
    this.identifier = identifier;
    this.arguments = _arguments ?? {};
  }

  jsxConfig(): JSXElementConfig {
    const _attrs = this.makeJsxAttributes();
    return {
      type: "tag-and-attr",
      tag: JSX.identifier(this.identifier),
      attributes: _attrs,
    };
  }

  private makeJsxAttributes() {
    const jsxValue = (value: any) => {
      switch (typeof value) {
        case "undefined":
          return JSX.exp(undefined);
        case "string":
          return JSX.text(value, "template-literal");
        case "number":
          return JSX.number(value);
        default:
          console.error(`Unsupported type of value: ${typeof value}`);
      }
    };

    return Object.keys(this.arguments)
      .map((key, index) => {
        const rec = this.arguments[key];
        return new JSXAttribute(rec.key, jsxValue(rec.value));
      })
      .filter((a) => a);
  }
}
