import { ColiObjectLike } from "@coli.codes/builder";
import { WidgetKey } from "@coli.codes/web-builder-core";
import {
  WidgetWithStyle,
  MultiChildWidgetWithStyle,
} from "@coli.codes/web-builder-core/widget-with-style";
import { JSX, JSXElementLike } from "coli";

/**
 * React Widget that requires no additional custom import rather than react
 */
export abstract class ReactWidget extends WidgetWithStyle {
  children: ReactWidget[];
}

export abstract class ReactMultiChildWidget
  extends ReactWidget
  implements MultiChildWidgetWithStyle
{
  readonly children: ReactWidget[] = [];
  tag: string;
  constructor(p: { key: WidgetKey; children: Array<ReactWidget> }) {
    super({ key: p.key });
    this.children = p.children;
  }

  buildContainingJsx(
    children: ColiObjectLike<JSXElementLike>[]
  ): ColiObjectLike<JSXElementLike> {
    return JSX.tag(this.tag, {
      children: children,
    });
  }

  buildJsx(): ColiObjectLike<JSXElementLike> {
    const children = this.buildChildrenJsx();
    const container = this.buildContainingJsx(children);
    return container;
  }

  buildChildrenJsx(): Array<ColiObjectLike<JSXElementLike>> {
    return this.children?.map((c) => {
      return c.buildJsx();
    });
  }
}
