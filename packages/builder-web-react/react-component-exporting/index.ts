import { SyntaxKind } from "@coli.codes/core-syntax-kind";
import {
  ExportAssignment,
  FunctionDeclaration,
  Identifier,
  VariableDeclaration,
  VariableStatement,
} from "coli";

export function add_export_keyword_modifier_to_declaration(
  declaration: FunctionDeclaration | VariableDeclaration | VariableStatement
): FunctionDeclaration | VariableStatement {
  if (declaration instanceof FunctionDeclaration) {
    declaration.modifiers.export = SyntaxKind.ExportKeyword;
    return declaration;
  }
  if (declaration instanceof VariableDeclaration) {
    return new VariableStatement({
      kind: declaration.kind,
      modifiers: { export: SyntaxKind.ExportKeyword },
      declarations: [declaration],
    });
  }

  if (declaration instanceof VariableStatement) {
    declaration.modifiers.export = SyntaxKind.ExportKeyword;
    return declaration;
  }
}

export function wrap_with_export_assignment_react_component_identifier(
  id: Identifier
) {
  return new ExportAssignment(id);
}
