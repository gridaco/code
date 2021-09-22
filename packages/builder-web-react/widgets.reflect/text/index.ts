import { ReflectReactWidget } from "../reflect-widget";
import { TEXT_IMPORT } from "@web-builder/reflect-ui";
import { JSX, JSXText } from "coli";
import { WidgetKey } from "../../../builder-web-core";
import { CSSProperties } from "@coli.codes/css";

export class ReflectText extends ReflectReactWidget {
  readonly imports: string = TEXT_IMPORT.named;
  readonly tag: string = TEXT_IMPORT.name;

  data: string;
  constructor(p: { key: WidgetKey; data: string }) {
    super({ key: p.key });
    this.data = p.data;
  }

  attributes() {
    throw new Error("Method not implemented.");
  }

  styleData(): CSSProperties {
    return <CSSProperties>{
      color: "black", // todo set text color
    };
  }
}
