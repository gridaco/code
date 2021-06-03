import { Widget, IMultiChildWidget, WidgetKey } from "./widget";
import { css, JSXElementLike } from "coli";
import { ColiObjectLike } from "@coli.codes/builder";
import { CSSProperties } from "@coli.codes/css";

export interface IWidgetWithStyle {
  buildStyle(): CSSProperties;
  buildJsx(): ColiObjectLike<JSXElementLike>;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class WidgetWithStyle
  extends Widget
  implements IWidgetWithStyle
{
  abstract buildStyle(): CSSProperties;

  abstract buildJsx(): ColiObjectLike<JSXElementLike>;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class MultiChildWidgetWithStyle
  extends WidgetWithStyle
  implements IWidgetWithStyle, IMultiChildWidget
{
  readonly children: Array<WidgetWithStyle> = [];

  constructor({ key }: { key: WidgetKey }) {
    super({ key: key });
  }
  abstract buildStyle(): CSSProperties;

  buildJsx(): ColiObjectLike<JSXElementLike> {
    const children = this.buildChildrenJsx();
    const container = this.buildContainingJsx(children);
    return container;
  }

  abstract buildContainingJsx(
    children: Array<ColiObjectLike<JSXElementLike>>
  ): ColiObjectLike<JSXElementLike>;

  buildChildrenJsx(): Array<ColiObjectLike<JSXElementLike>> {
    return this.children?.map((c) => {
      return c.buildJsx();
    });
  }
}
