import {
  SyntaxKind,
  ExportAssignment,
  FunctionDeclaration,
  Identifier,
  VariableDeclaration,
  VariableStatement,
} from "coli";

type ExportAssignable = VariableStatement | FunctionDeclaration;
/**
 * Makes `function Component` to `export function Compinent`
 */
export function add_export_keyword_modifier_to_declaration<
  O extends ExportAssignable = ExportAssignable
>(
  declaration: FunctionDeclaration | VariableDeclaration | VariableStatement
): O {
  if (declaration instanceof FunctionDeclaration) {
    declaration.modifiers.export = SyntaxKind.ExportKeyword;
    return declaration as O;
  }
  if (declaration instanceof VariableDeclaration) {
    return new VariableStatement({
      kind: declaration.kind,
      modifiers: { export: SyntaxKind.ExportKeyword },
      declarations: [declaration],
    }) as O;
  }

  if (declaration instanceof VariableStatement) {
    declaration.modifiers.export = SyntaxKind.ExportKeyword;
    return declaration as O;
  }
}

/**
 * Makes `Component` to `export Component`
 * @param id
 * @returns
 */
export function wrap_with_export_assignment_jsx_component_identifier(
  id: Identifier
) {
  return new ExportAssignment(id);
}
