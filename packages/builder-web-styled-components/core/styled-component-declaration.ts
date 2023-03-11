import {
  SyntaxKind,
  CallExpression,
  HTML5IDENTIFIERNAMES,
  Html5IdentifierNames,
  Identifier,
  PropertyAccessExpression,
  StringLiteral,
  TaggedTemplateExpression,
  TemplateLiteral,
  VariableDeclaration,
} from "coli";
import { CSSProperties, buildCSSStyleData } from "@coli.codes/css";
import { formatStyledTempplateString } from "../formatter";

type StyledComponentDeclarationInitializerIdentifierOption<T extends string> =
  | {
      type: "tagged-template";
      identifier: T;
    }
  | {
      type: "parameter-call";
      identifier: Html5IdentifierNames;
    };

/**
 * taggged template - styled.div`${style}`
 * parameter call - styled("div")`${style(props)}` (only sting)
 */
export type StyledComponentDeclarationInitializer<
  T extends string = Html5IdentifierNames
> = {
  style: CSSProperties;
} & StyledComponentDeclarationInitializerIdentifierOption<T>;

export class StyledComponentDeclaration extends VariableDeclaration {
  static styledIdentifier = new Identifier("styled");
  private initialization: StyledComponentDeclarationInitializer;
  constructor(
    readonly name: string,
    initializer: StyledComponentDeclarationInitializer
  ) {
    super(name, {
      initializer: StyledComponentDeclaration.makeinitializer(
        initializer.style,
        initializer.identifier,
        initializer.type
      ),
      kind: SyntaxKind.ConstKeyword,
    });

    this.initialization = initializer;
  }

  static makeStyleBody(style: CSSProperties) {
    const { main, pseudo } = buildCSSStyleData(style);

    const pseudos = Object.keys(pseudo).map((k) => {
      const b = pseudo[k];
      const lines = b.split("\n").filter((l) => l.length > 0);
      return `${k} {${
        lines.length ? ["", ...lines].join("\n\t") + "\n" : ""
      }}\n`;
    });

    const body = [main, ...pseudos].join("\n");

    const _fmted_body = formatStyledTempplateString(body);

    return _fmted_body;
  }

  static makeinitializer(
    style: CSSProperties,
    identifier: string,
    type: StyledComponentDeclarationInitializerIdentifierOption<any>["type"] = "tagged-template"
  ): TaggedTemplateExpression {
    let tag;
    switch (type) {
      // styled("div")`${style}`
      // styled(Container)`${style}`
      case "parameter-call": {
        // check if the identifier is a html5 identifier. if not, then do not make it a string literal.
        let arg;
        if (HTML5IDENTIFIERNAMES.includes(identifier)) {
          arg = new StringLiteral(identifier);
        } else {
          arg = new Identifier(identifier);
        }

        tag = new CallExpression(
          StyledComponentDeclaration.styledIdentifier,
          arg
        );
        break;
      }
      // styled.div`${style}`
      case "tagged-template": {
        tag = new PropertyAccessExpression(
          StyledComponentDeclaration.styledIdentifier,
          identifier
        );
        break;
      }
    }

    return new TaggedTemplateExpression(tag, {
      template: new TemplateLiteral(`\n${this.makeStyleBody(style)}\n`),
    });
  }
}
