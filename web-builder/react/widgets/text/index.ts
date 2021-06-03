import { ReflectReactWidget } from "../reflect";
import { TEXT_IMPORT } from "@coli.codes/reflect-web-builder";
import { JSX, JSXText } from "coli";
import { WidgetKey } from "@coli.codes/web-builder-core";
import { CSSProperties } from "@coli.codes/css";

export class ReflectText extends ReflectReactWidget {
  readonly imports: string = TEXT_IMPORT.named;
  readonly tag: string = TEXT_IMPORT.name;

  data: string;
  constructor(p: { key: WidgetKey; data: string }) {
    super({ key: p.key });
    this.data = p.data;
  }

  buildJsx() {
    return JSX.tag(this.tag, {
      children: [new JSXText(this.data)],
    }).make();
  }

  buildStyle(): CSSProperties {
    return <CSSProperties>{
      color: "black", // todo set text color
    };
  }
}
