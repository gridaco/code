import { WidgetKey } from "@coli.codes/web-builder-core";
import {
  WidgetWithStyle,
  MultiChildWidgetWithStyle,
} from "@coli.codes/web-builder-core/widget-with-style";

/**
 * React Widget that requires no additional custom import rather than react
 */
export abstract class ReactWidget extends WidgetWithStyle {
  readonly children?: ReactWidget[];
}

/**
 * React widget that contains multiple children in the same depth 1 hierarchy
 */
export abstract class ReactMultiChildWidget
  extends ReactWidget
  implements MultiChildWidgetWithStyle {
  readonly children: ReactWidget[] = [];
  tag: string;
  constructor(p: { key: WidgetKey; children: Array<ReactWidget> }) {
    super({ key: p.key });
    this.children = p.children;
  }
}

/**
 * In JSX, There are no difference between single child and multi child widgets.
 * This singlechild behaves like a multichild widget with single child,
 * which is present for representing connection between prebuilt widget that accepts single child,
 * or for creating constraints for simple layouts such as margin wrap.
 */
export abstract class ReactSingleChildWidget extends ReactMultiChildWidget {
  readonly child: ReactWidget;
  constructor(parameters: { key: WidgetKey; child: ReactWidget }) {
    super({
      key: parameters.key,
      children: [parameters.child],
    });

    this.child = parameters.child;
  }
}

/**
 * [SPECIAL] Independant widget that does not follow default builder's children handing logic, but containing it's own prebuilt children jsx
 * @todo
 */
export abstract class ReactIndependantWidget extends ReactWidget {}

/**
 * React widget containing only text values.
 * e.g. <div>I'm Text</div>, <Typography>I'm Text</Typography>, <h1>I'm Text</h1>
 */
export abstract class ReactTextChildWidget extends ReactWidget {
  readonly text: string;
  constructor(p: { key: WidgetKey; data: string }) {
    super({
      key: p.key,
    });

    this.text = p.data;
  }
}
