import { Widget, MultiChildWidget } from "./widget";
import { css, JSXElementLike } from "coli";

export interface IWidgetWithStyle {
  buildStyle(): css.CSSStyleDeclaration;
  buildJsx(): JSXElementLike;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class WidgetWithStyle
  extends Widget
  implements IWidgetWithStyle {
  abstract buildStyle(): css.CSSStyleDeclaration;

  abstract buildJsx(): JSXElementLike;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class MultiChildWidgetWithStyle
  extends MultiChildWidget
  implements IWidgetWithStyle {
  constructor() {
    super();
  }
  abstract buildStyle(): css.CSSStyleDeclaration;

  abstract buildJsx(): JSXElementLike;
}
