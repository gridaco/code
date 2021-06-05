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

export abstract class ReactSingleChildWidget extends ReactWidget {
  readonly child: ReactWidget;
  constructor(parameters: { key: WidgetKey; child: ReactWidget }) {
    super({
      key: parameters.key,
    });

    this.child = parameters.child;

    // clear children, insert child
    {
      this.children.length = 0;
      this.children.push(this.child);
    }
  }
}

/**
 * React widget containing only text values.
 * e.g. <div>I'm Text</div>, <Typography>I'm Text</Typography>, <h1>I'm Text</h1>
 */
export abstract class ReactTextChildWidget extends ReactWidget {
  readonly text: string;
  constructor(p: { key: WidgetKey; text: string }) {
    super({
      key: p.key,
    });

    this.text = p.text;
  }
}
