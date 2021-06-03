import { ReflectReactWidget } from "../reflect";
import { BUTTON_IMPORT } from "@coli.codes/reflect-web-builder";
import { css } from "coli";
import { CSSProperties } from "@coli.codes/css";
export class ReflectButton extends ReflectReactWidget {
  readonly imports: string = BUTTON_IMPORT.named;
  readonly tag: string = BUTTON_IMPORT.name;

  buildStyle(): CSSProperties {
    return {};
  }
}
