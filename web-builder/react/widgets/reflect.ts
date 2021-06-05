import { ReactWidget } from "./widget";
import { ImportDeclaration, Import, JSX, JSXElementLike } from "coli";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { ColiObjectLike } from "@coli.codes/builder";

export abstract class ReflectReactWidget<T = any> extends ReactWidget {
  readonly _type: string;
  readonly imports: string;
  readonly tag: string;

  constructor({ key }: { key: WidgetKey }) {
    super({ key });
  }

  buildImportDeclaration(): ImportDeclaration {
    return new Import().import(this.imports).from("@reflect-ui/react").make();
  }

  abstract attributes(): ColiObjectLike<any>;

  jsxConfig(): JSXElementConfig {
    return {
      tag: JSX.identifier(this.tag),
      // atrributes: this.attributes() as any,
    };
  }
}
