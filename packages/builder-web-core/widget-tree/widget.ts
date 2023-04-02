import { Dynamic } from "@reflect-ui/core/reflection";
import {
  WidgetKey,
  WidgetWithStyle,
  JsxWidget,
  MultiChildWidgetWithStyle,
  UnstylableJSXElementConfig,
  StylableJSXElementConfig,
} from "@web-builder/core";
import { JSXExpression, JSXText, StringLiteral } from "coli";
import type { CSSProperties } from "@coli.codes/css";

/**
 * Widget that requires no additional custom import rather than react
 */
export abstract class StylableJsxWidget<
  S = CSSProperties
> extends WidgetWithStyle<S> {
  abstract readonly children?: JsxWidget[];
}

export abstract class SelfClosingWidget
  extends StylableJsxWidget
  implements Omit<StylableJsxWidget, "children">
{
  readonly children?: undefined;
  abstract jsxConfig(): StylableJSXElementConfig;
}

/**
 * widget that contains multiple children in the same depth 1 hierarchy
 */
export abstract class MultiChildWidget<S = CSSProperties>
  extends StylableJsxWidget<S>
  implements MultiChildWidgetWithStyle
{
  readonly children: JsxWidget[] = [];
  tag: string;
  constructor(p: { key: WidgetKey; children: Array<JsxWidget> }) {
    super({ key: p.key });
    this.children = p.children;
  }
  abstract jsxConfig(): StylableJSXElementConfig;
}

/**
 * In JSX, There are no difference between single child and multi child widgets.
 * This singlechild behaves like a multichild widget with single child,
 * which is present for representing connection between prebuilt widget that accepts single child,
 * or for creating constraints for simple layouts such as margin wrap.
 */
export abstract class SingleChildWidget<S> extends StylableJsxWidget<S> {
  readonly child?: JsxWidget;
  constructor(parameters: { key: WidgetKey; child?: JsxWidget }) {
    super({
      key: parameters.key,
    });

    this.child = parameters.child;
  }

  abstract jsxConfig(): StylableJSXElementConfig;
}

/**
 * [SPECIAL] Independant widget that does not follow default builder's children handing logic, but containing it's own prebuilt children jsx
 * @todo @deprecated (not ready for use)
 */
export abstract class IndependantWidget extends StylableJsxWidget {
  abstract jsxConfig(): UnstylableJSXElementConfig;
}

/**
 * widget containing only text values.
 * e.g. <div>I'm Text</div>, <Typography>I'm Text</Typography>, <h1>I'm Text</h1>
 */
export abstract class TextChildWidget<
  S = CSSProperties
> extends SingleChildWidget<S> {
  readonly child: StylableJsxWidget;
  children?: StylableJsxWidget[];
  constructor(p: { key: WidgetKey }) {
    super({
      key: p.key,
    });
  }
  abstract jsxConfig(): StylableJSXElementConfig;

  abstract textData(): TextDataWidget;
}

export class TextDataWidget extends JsxWidget {
  readonly data: Dynamic<string>;
  constructor({ data, key }: { key: WidgetKey; data: Dynamic<string> }) {
    super({ key: key });
    this.data = data;
  }

  jsxConfig(): UnstylableJSXElementConfig<JSXText | JSXExpression> {
    switch (typeof this.data) {
      case "string": {
        return {
          type: "static-tree",
          tree: new JSXText(this.data),
        };
      }
      default: {
        return {
          type: "static-tree",
          tree: new JSXExpression(new StringLiteral("wip")),
        };
      }
    }
  }
}
