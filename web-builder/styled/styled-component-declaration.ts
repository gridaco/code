import {
  ast,
  css,
  Identifier,
  PropertyAccessExpression,
  TaggedTemplateExpression,
  VariableDeclaration,
} from "coli";
import { WidgetWithStyle } from "@coli.codes/web-builder-core";

export class StyledComponentDeclaration extends VariableDeclaration {
  static styledIdentifier = new Identifier("styled");

  constructor(
    readonly name: string,
    params: {
      style: string | css.CSSStyleDeclaration;
    }
  ) {
    super(name, {
      initializer: StyledComponentDeclaration.makeinitializer(),
      kind: "const",
    });
  }

  static makeinitializer(): TaggedTemplateExpression {
    return new TaggedTemplateExpression(
      new PropertyAccessExpression(
        StyledComponentDeclaration.styledIdentifier,
        "div"
      ),
      {
        template: new ast.TemplateLiteral(`
              margin: 60px 20px;
            `),
      }
    );
  }
}

export function declareStyledComponentVariable(
  widgetConfig: WidgetWithStyle
): StyledComponentDeclaration {
  return new StyledComponentDeclaration("Wrapper", {
    style: widgetConfig.buildStyle(),
  });
}
