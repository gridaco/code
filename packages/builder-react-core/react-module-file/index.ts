import {
  SourceFile,
  BlockStatement,
  FunctionDeclaration,
  Import,
  ImportDeclaration,
  Return,
  Declaration,
} from "coli";
import { SyntaxKind } from "@coli.codes/core-syntax-kind";
import { react as react_config } from "@designto/config";
import {
  add_export_keyword_modifier_to_declaration,
  wrap_with_export_assignment_react_component_identifier,
} from "../react-component-exporting";

export class ReactModuleFile extends SourceFile {
  constructor({ name, path }: { name: string; path: string }) {
    super({ name, path });
  }
}

export function makeReactModuleFile({
  name,
  path,
  imports,
  body,
  declarations,
  config,
}: {
  name: string;
  path: string;
  imports: ImportDeclaration[];
  body: BlockStatement;
  declarations: Declaration[];
  config: {
    exporting: react_config.ReactComponentExportingCofnig;
  };
}) {
  const { exporting } = config;
  const file = new ReactModuleFile({
    name: `${name}.tsx`,
    path: path,
  });
  file.imports(...imports);

  // console.log("exporting", exporting);
  switch (exporting.type) {
    case "export-default-anonymous-functional-component": {
      // exporting.declaration_syntax_choice;
      // exporting.export_declaration_syntax_choice;
      // exporting.exporting_position;

      const export_default_anaonymous_functional_component =
        new FunctionDeclaration(undefined, {
          body: body,
          modifiers: {
            default: SyntaxKind.DefaultKeyword,
            export: SyntaxKind.ExportKeyword,
          },
        });
      file.declare(export_default_anaonymous_functional_component);
      file.declare(...declarations);
      break;
    }
    case "export-named-functional-component": {
      // exporting.declaration_syntax_choice;
      // exporting.export_declaration_syntax_choice;

      const named_function_declaration = new FunctionDeclaration(name, {
        body: body,
      });

      switch (exporting.exporting_position) {
        case "after-declaration":
          file.declare(named_function_declaration);
          file.export(
            wrap_with_export_assignment_react_component_identifier(
              named_function_declaration.id
            )
          );
          file.declare(...declarations);
          break;
        case "end-of-file":
          file.declare(named_function_declaration);
          file.declare(...declarations);
          file.export(
            wrap_with_export_assignment_react_component_identifier(
              named_function_declaration.id
            )
          );
          break;
        case "with-declaration":
          const _exported_named_function_declaration =
            add_export_keyword_modifier_to_declaration<FunctionDeclaration>(
              named_function_declaration
            );
          file.declare(_exported_named_function_declaration);
          file.declare(...declarations);
          break;
      }
      break;
    }
    case "export-named-class-component":
      break;
    case "export-anonymous-class-component":
      throw new Error("Class component not supported");
  }

  return file;
}
