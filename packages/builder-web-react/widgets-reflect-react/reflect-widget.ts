import { StylableJsxWidget } from "@web-builder/core/widget-tree/widget";
import { ImportDeclaration, Import, JSX, JSXElementLike } from "coli";
import {
  JSXElementConfig,
  StylableJSXElementConfig,
  WidgetKey,
} from "@web-builder/core";
import { ColiObjectLike } from "@coli.codes/builder";

export abstract class ReflectReactWidget<T = any> extends StylableJsxWidget {
  children?: StylableJsxWidget[];
  readonly _type: string;
  readonly imports: string;
  readonly tag: string;

  constructor({ key }: { key: WidgetKey }) {
    super({ key });
  }

  buildImportDeclaration(): ImportDeclaration {
    return new Import().imports(this.imports).from("@reflect-ui/react").make();
  }

  abstract attributes(): ColiObjectLike<any>;

  jsxConfig(): StylableJSXElementConfig {
    return {
      type: "tag-and-attr",
      tag: JSX.identifier(this.tag),
      // attributes: this.attributes() as any,
    };
  }
}
