import { CSSProperties } from "@coli.codes/css";
import { WidgetTree } from "../../widget-tree";

/**
 * A base html element containing all possible styles & attributes.
 * @deprecated - not ready
 */
export abstract class HtmlElement extends WidgetTree {
  abstract jsxConfig();

  styleData(): CSSProperties {
    return {};
  }
}
