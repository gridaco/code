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
import { CSSProperties, buildCssStandard } from "@coli.codes/css";

export class StyledComponentDeclaration extends VariableDeclaration {
  static styledIdentifier = new Identifier("styled");

  constructor(
    readonly name: string,
    params: {
      style: CSSProperties;
    }
  ) {
    super(name, {
      initializer: StyledComponentDeclaration.makeinitializer(params.style),
      kind: SyntaxKind.LetKeyword,
    });
  }

  static makeinitializer(style: CSSProperties): TaggedTemplateExpression {
    const stylestring = buildCssStandard(style);
    return new TaggedTemplateExpression(
      new PropertyAccessExpression(
        StyledComponentDeclaration.styledIdentifier,
        "div"
      ),
      {
        template: new ast.TemplateLiteral(stylestring),
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
