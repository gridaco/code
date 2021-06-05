import { Widget, IMultiChildWidget, WidgetKey } from "./widget";
import { JSXAtrributes, JSXIdentifier } from "coli";
import { CSSProperties } from "@coli.codes/css";
import { ColiObjectLike } from "@coli.codes/builder";

export interface JSXElementConfig {
  tag: ColiObjectLike<JSXIdentifier>;
  attributes?: JSXAtrributes;
}

export interface IWidgetWithStyle {
  styleData(): CSSProperties;
  jsxConfig(): JSXElementConfig;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class WidgetWithStyle
  extends Widget
  implements IWidgetWithStyle {
  abstract styleData(): CSSProperties;

  abstract jsxConfig(): JSXElementConfig;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class MultiChildWidgetWithStyle
  extends WidgetWithStyle
  implements IWidgetWithStyle, IMultiChildWidget {
  readonly children: Array<WidgetWithStyle> = [];

  constructor({ key }: { key: WidgetKey }) {
    super({ key: key });
  }
  abstract styleData(): CSSProperties;

  abstract jsxConfig(): JSXElementConfig;
}
