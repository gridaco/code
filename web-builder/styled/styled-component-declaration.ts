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
      kind: SyntaxKind.ConstKeyword,
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

/**
 * component variable declration naming preference
 */
export interface NamePreference {
  overrideKeyName?: string;
  overrideFinalName?: string;
}

export function declareStyledComponentVariable(
  widgetConfig: WidgetWithStyle,
  preferences?: {
    name?: NamePreference;
  }
): StyledComponentDeclaration {
  /// region name
  let varname: string;
  if (preferences?.name) {
    const namePref = preferences.name;
    if (namePref.overrideFinalName) {
      varname = namePref.overrideFinalName;
    } else if (namePref.overrideKeyName) {
      varname = nameVariable(namePref.overrideKeyName, {
        case: NameCases.pascal,
      }).name;
    }
  } else {
    varname = nameVariable(widgetConfig.key.name, {
      case: NameCases.pascal,
    }).name;
  }
  ///

  return new StyledComponentDeclaration(varname, {
    style: widgetConfig.styleData(),
  });
}
