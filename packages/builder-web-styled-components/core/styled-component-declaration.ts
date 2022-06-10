import {
  Html5IdentifierNames,
  Identifier,
  PropertyAccessExpression,
  TaggedTemplateExpression,
  TemplateLiteral,
  VariableDeclaration,
} from "coli";
import { SyntaxKind } from "@coli.codes/core-syntax-kind";
import { CSSProperties, buildCSSStyleData } from "@coli.codes/css";
import { formatStyledTempplateString } from "../formatter";

export class StyledComponentDeclaration extends VariableDeclaration {
  static styledIdentifier = new Identifier("styled");

  styledAccessorIdentifier: Html5IdentifierNames;
  constructor(
    readonly name: string,
    params: {
      style: CSSProperties;
      identifier: Html5IdentifierNames;
    }
  ) {
    super(name, {
      initializer: StyledComponentDeclaration.makeinitializer(
        params.style,
        params.identifier
      ),
      kind: SyntaxKind.ConstKeyword,
    });

    this.styledAccessorIdentifier = params.identifier;
  }

  static makeinitializer(
    style: CSSProperties,
    html5tag: Html5IdentifierNames
  ): TaggedTemplateExpression {
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
    return new TaggedTemplateExpression(
      new PropertyAccessExpression(
        StyledComponentDeclaration.styledIdentifier,
        html5tag
      ),
      {
        template: new TemplateLiteral(`\n${_fmted_body}\n`),
      }
    );
  }
}
