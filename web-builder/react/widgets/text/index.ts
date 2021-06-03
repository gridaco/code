import { ReflectReactWidget } from "../reflect";
import { TEXT_IMPORT } from "@coli.codes/reflect-web-builder";
import { css, JSX, JSXText } from "coli";
import { CssNamedColor } from "@coli.codes/core/css/css-color";

export class ReflectText extends ReflectReactWidget {
  readonly imports: string = TEXT_IMPORT.named;
  readonly tag: string = TEXT_IMPORT.name;

  data: string;
  constructor(p: { data: string }) {
    super();
    this.data = p.data;
  }

  buildJsx() {
    return JSX.tag(this.tag, {
      children: [new JSXText(this.data)],
    }).make();
  }

  buildStyle(): css.CSSStyleDeclaration {
    const _css = new css.CSSStyleDeclaration();

    // text color
    _css.color = CssNamedColor.black.name;

    return _css;
  }
}
