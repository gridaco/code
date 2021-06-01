import { ReflectReactWidget } from "../reflect";
import { TEXT_IMPORT } from "@coli.codes/reflect-web-builder";
import { css } from "coli";

export class ReflectText extends ReflectReactWidget {
  readonly imports: string = TEXT_IMPORT.named;
  readonly tag: string = TEXT_IMPORT.name;

  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
}
