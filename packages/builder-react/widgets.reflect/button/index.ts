import { ReflectReactWidget } from "../reflect-widget";
import { BUTTON_IMPORT } from "@web-builder/reflect-ui";
import { css } from "coli";
import { CSSProperties } from "@coli.codes/css";
export class ReflectButton extends ReflectReactWidget {
  readonly imports: string = BUTTON_IMPORT.named;
  readonly tag: string = BUTTON_IMPORT.name;

  styleData(): CSSProperties {
    return {};
  }

  attributes() {
    return {};
  }
}
