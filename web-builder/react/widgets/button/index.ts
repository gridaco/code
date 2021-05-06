import { ReflectReactWidget } from "../reflect";
import { BUTTON_IMPORT } from "@coli.codes/reflect-web-builder";
import { CSSStyleDeclaration } from "coli/lib/languages/css";
export class ReflectButton extends ReflectReactWidget {
  readonly imports: string = BUTTON_IMPORT.named;
  readonly tag: string = BUTTON_IMPORT.name;

  buildStyle(): CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
}
