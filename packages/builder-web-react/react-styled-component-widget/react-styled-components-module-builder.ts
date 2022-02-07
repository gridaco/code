import { stringfy } from "@coli.codes/export-string";
import { ScopedVariableNamer } from "@coli.codes/naming";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import {
  NoStyleJSXElementConfig,
  StyledComponentJSXElementConfig,
} from "@web-builder/styled";
import {
  BlockStatement,
  FunctionDeclaration,
  Import,
  ImportDeclaration,
  Return,
} from "coli";
import { react_imports } from "../react-import-specifications";
import { JsxWidget } from "@web-builder/core";
import {
  buildJsx,
  getWidgetStylesConfigMap,
  WidgetStyleConfigMap,
} from "@web-builder/core/builders";
import {
  add_export_keyword_modifier_to_declaration,
  wrap_with_export_assignment_react_component_identifier,
} from "../react-component-exporting";
import { react } from "@designto/config";
import { ReactModuleFile } from "../react-module-file";
import { StyledComponentDeclaration } from "@web-builder/styled/styled-component-declaration";
import { SyntaxKind } from "@coli.codes/core-syntax-kind";

export class ReactStyledComponentsBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  private readonly styledConfigWidgetMap: WidgetStyleConfigMap;
  private readonly namer: ScopedVariableNamer;
  readonly config: react.ReactStyledComponentsConfig;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: react.ReactStyledComponentsConfig;
  }) {
    this.entry = entry;
    this.widgetName = entry.key.name;
    this.namer = new ScopedVariableNamer(
      entry.key.id,
      ReservedKeywordPlatformPresets.react
    );
    this.styledConfigWidgetMap = getWidgetStylesConfigMap(entry, {
      namer: this.namer,
      rename_tag: true /** styled component tag shoule be renamed */,
    });
    this.config = config;
  }

  private styledConfig(
    id: string
  ): StyledComponentJSXElementConfig | NoStyleJSXElementConfig {
    return this.styledConfigWidgetMap.get(id);
  }

  private jsxBuilder(widget: JsxWidget) {
    return buildJsx(widget, {
      styledConfig: (id) => this.styledConfig(id),
    });
  }

  partImports() {
    return [this.partImportReact(), this.partImportStyled()];
  }

  partImportStyled() {
    switch (this.config.module) {
      case "@emotion/styled":
        return new Import()
          .importDefault("styled")
          .from("@emotion/styled")
          .make();
      case "styled-components":
        return new Import()
          .importDefault("styled")
          .from("styled-components")
          .make();
    }
  }

  partImportReact() {
    return react_imports.import_react_from_react;
  }

  partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  partDeclarations() {
    return Array.from(this.styledConfigWidgetMap.keys())
      .map((k) => {
        return (
          this.styledConfigWidgetMap.get(k) as StyledComponentJSXElementConfig
        ).styledComponent;
      })
      .filter((s) => s);
  }

  asExportableModule() {
    const body = this.partBody();
    const imports = this.partImports();
    const styled_declarations = this.partDeclarations();
    return new ReactStyledComponentWidgetModuleExportable(
      this.widgetName,
      {
        body,
        imports,
        declarations: styled_declarations,
      },
      {
        dependencies: ["react", this.config.module],
      }
    );
  }
}

export class ReactStyledComponentWidgetModuleExportable {
  readonly name: string;
  readonly dependencies: string[];
  readonly body: BlockStatement;
  readonly imports: ImportDeclaration[];
  readonly declarations: StyledComponentDeclaration[];

  constructor(
    name,
    {
      body,
      imports,
      declarations,
    }: {
      body: BlockStatement;
      imports: ImportDeclaration[];
      declarations: StyledComponentDeclaration[];
    },
    {
      dependencies = [],
    }: {
      dependencies?: string[];
    }
  ) {
    this.name = name;
    this.body = body;
    this.imports = imports;
    this.declarations = declarations;

    this.dependencies = dependencies;
  }

  asFile({ exporting }: { exporting: react.ReactComponentExportingCofnig }) {
    const file = new ReactModuleFile({
      name: `${this.name}.tsx`,
      path: "src/components",
    });
    file.imports(...this.imports);

    // console.log("exporting", exporting);
    switch (exporting.type) {
      case "export-default-anonymous-functional-component": {
        // exporting.declaration_syntax_choice;
        // exporting.export_declaration_syntax_choice;
        // exporting.exporting_position;

        const export_default_anaonymous_functional_component =
          new FunctionDeclaration(undefined, {
            body: this.body,
            modifiers: {
              default: SyntaxKind.DefaultKeyword,
              export: SyntaxKind.ExportKeyword,
            },
          });
        file.declare(export_default_anaonymous_functional_component);
        file.declare(...this.declarations);
        break;
      }
      case "export-named-functional-component": {
        // exporting.declaration_syntax_choice;
        // exporting.export_declaration_syntax_choice;

        const named_function_declaration = new FunctionDeclaration(this.name, {
          body: this.body,
        });

        switch (exporting.exporting_position) {
          case "after-declaration":
            file.declare(named_function_declaration);
            file.export(
              wrap_with_export_assignment_react_component_identifier(
                named_function_declaration.id
              )
            );
            file.declare(...this.declarations);
            break;
          case "end-of-file":
            file.declare(named_function_declaration);
            file.declare(...this.declarations);
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
            file.declare(...this.declarations);
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

  finalize(config: react.ReactComponentExportingCofnig) {
    const file = this.asFile({ exporting: config });
    const final = stringfy(file.blocks, {
      language: "tsx",
    });
    return {
      code: final,
      name: this.name,
      dependencies: this.dependencies,
    };
  }
}
