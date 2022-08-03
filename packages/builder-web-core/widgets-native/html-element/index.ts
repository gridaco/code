import { CSSProperties } from "@coli.codes/css";
import { JsxWidget } from "widget-core";

/**
 * A base html element containing all possible styles & attributes.
 * @deprecated - not ready
 */
export abstract class HtmlElement extends JsxWidget {
  abstract jsxConfig();

  styleData(): CSSProperties {
    return {};
  }
}
