import { ReactWidget } from "./widget";
import { ImportDeclaration, Import, JSX, JSXElementLike } from "coli";

export abstract class ReflectReactWidget extends ReactWidget {
  readonly _type: string;
  readonly imports: string;
  readonly tag: string;

  buildImportDeclaration(): ImportDeclaration {
    return new Import().import(this.imports).from("@reflect-ui/react").make();
  }

  buildJsx(): JSXElementLike {
    return JSX.tag(this.tag).__finalize();
  }
}
