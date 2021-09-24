import {
  WidgetKey,
  WidgetWithStyle,
  MultiChildWidgetWithStyle,
} from "@web-builder/core";

/**
 * Widget that requires no additional custom import rather than react
 */
export abstract class WidgetTree extends WidgetWithStyle {
  abstract readonly children?: WidgetTree[];
}

export abstract class SelfClosingWidget
  extends WidgetTree
  implements Omit<WidgetTree, "children"> {
  readonly children?: undefined;
}

/**
 * widget that contains multiple children in the same depth 1 hierarchy
 */
export abstract class MultiChildWidget
  extends WidgetTree
  implements MultiChildWidgetWithStyle {
  readonly children: WidgetTree[] = [];
  tag: string;
  constructor(p: { key: WidgetKey; children: Array<WidgetTree> }) {
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
export abstract class SingleChildWidget extends MultiChildWidget {
  readonly child: WidgetTree;
  constructor(parameters: { key: WidgetKey; child: WidgetTree }) {
    super({
      key: parameters.key,
      children: [parameters.child],
    });

    this.child = parameters.child;
  }
}

/**
 * [SPECIAL] Independant widget that does not follow default builder's children handing logic, but containing it's own prebuilt children jsx
 * @todo @deprecated (not ready for use)
 */
export abstract class IndependantWidget extends WidgetTree {}

/**
 * widget containing only text values.
 * e.g. <div>I'm Text</div>, <Typography>I'm Text</Typography>, <h1>I'm Text</h1>
 */
export abstract class TextChildWidget extends WidgetTree {
  readonly text: string;
  children?: WidgetTree[];
  constructor(p: { key: WidgetKey; data: string }) {
    super({
      key: p.key,
    });

    this.text = p.data;
  }
}
