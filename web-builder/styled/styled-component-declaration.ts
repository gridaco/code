import {
  ast,
  css,
  Identifier,
  PropertyAccessExpression,
  TaggedTemplateExpression,
  VariableDeclaration,
} from "coli";
import { WidgetWithStyle } from "@coli.codes/web-builder-core";
import { SyntaxKind } from "@coli.codes/core/ast/syntax-kind";
import { nameVariable, NameCases } from "@coli.codes/naming";
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
      kind: SyntaxKind.LetKeyword,
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
  const varname = nameVariable(widgetConfig.key.name, {
    case: NameCases.pascal,
  });

  return new StyledComponentDeclaration(varname.name, {
    style: widgetConfig.buildStyle(),
  });
}
