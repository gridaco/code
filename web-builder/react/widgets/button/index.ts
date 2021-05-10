import { ReflectReactWidget } from "../reflect";
import { BUTTON_IMPORT } from "@coli.codes/reflect-web-builder";
import { css } from "coli";
export class ReflectButton extends ReflectReactWidget {
  readonly imports: string = BUTTON_IMPORT.named;
  readonly tag: string = BUTTON_IMPORT.name;

  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
}
