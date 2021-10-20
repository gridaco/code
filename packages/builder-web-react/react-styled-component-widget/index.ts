import { ExportAssignment } from "@coli.codes/core/assignment/export-assignment";
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
  JSXClosingElement,
  JSXElement,
  JSXOpeningElement,
  Return,
  SourceFile,
  VariableDeclaration,
} from "coli";
import { react_imports } from "../react-import-specifications";
import { TextChildWidget, WidgetTree } from "@web-builder/core";
import { ReactComponentExportResult } from "../export-result";
import {
  buildTextChildJsx,
  getWidgetStylesConfigMap,
  WidgetStyleConfigMap,
} from "@web-builder/core/builders";
import { wrap_with_export_assignment_react_component_identifier } from "../react-component-exporting";
import { react } from "@designto/config";

/**
 * styled components pattern with either emotion or styled-component
 * @todo - this is not fully implemented
 * @param entry
 * @returns
 */
export function stringfyReactWidget_STYLED_COMPONENTS(
  entry: WidgetTree,
  {
    config,
  }: {
    config: react.ReactStyledComponentsConfig;
  }
): ReactComponentExportResult {
  const builder = new ReactStyledComponentsBuilder({ entry, config });
  return builder.asFile().finalize();
}

class ReactStyledComponentsBuilder {
  private readonly entry: WidgetTree;
  private readonly widgetName: string;
  private readonly styledConfigWidgetMap: WidgetStyleConfigMap;
  private readonly namer: ScopedVariableNamer;
  readonly config: react.ReactStyledComponentsConfig;

  constructor({
    entry,
    config,
  }: {
    entry: WidgetTree;
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

  private jsxBuilder(widget: WidgetTree) {
    const _jsxcfg = widget.jsxConfig();
    if (_jsxcfg.type === "static-tree") {
      return _jsxcfg.tree;
    }

    const children = widget.children?.map((comp) => {
      const config = this.styledConfig(comp.key.id);
      if (comp instanceof TextChildWidget) {
        return buildTextChildJsx(comp, config);
      }

      const childrenJSX = comp.children?.map((cc) => this.jsxBuilder(cc));
      return new JSXElement({
        openingElement: new JSXOpeningElement(config.tag, {
          attributes: config.attributes,
        }),
        closingElement: new JSXClosingElement(config.tag),
        children: childrenJSX,
      });
    });

    const config = this.styledConfig(widget.key.id);
    if (widget instanceof TextChildWidget) {
      return buildTextChildJsx(widget, config);
    }
    return new JSXElement({
      openingElement: new JSXOpeningElement(config.tag, {
        attributes: config.attributes,
      }),
      closingElement: new JSXClosingElement(config.tag),
      children: children,
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

  partFunction(): FunctionDeclaration {
    let jsxTree = this.jsxBuilder(this.entry);
    const componentFunction = new FunctionDeclaration(this.widgetName, {
      body: new BlockStatement(new Return(jsxTree)),
    });

    return componentFunction;
  }

  partDeclarations() {
    return Array.from(this.styledConfigWidgetMap.keys())
      .map((k) => {
        return (this.styledConfigWidgetMap.get(
          k
        ) as StyledComponentJSXElementConfig).styledComponent;
      })
      .filter((s) => s);
  }

  asFile() {
    const file = new SourceFile({
      name: `${this.widgetName}.tsx`,
      path: "src/components",
    });

    const functionDeclaration = this.partFunction();

    file.imports(...this.partImports());
    file.declare(functionDeclaration);
    file.declare(...this.partDeclarations());
    file.export(
      wrap_with_export_assignment_react_component_identifier(
        functionDeclaration.id
      )
    );

    return new Exportable(file, {
      dependencies: ["@emotion/styled", "react"],
    });
  }
}

class Exportable {
  readonly name: string;
  readonly file: SourceFile;
  readonly dependencies: string[];

  constructor(
    file: SourceFile,
    { dependencies = [] }: { dependencies?: string[] }
  ) {
    this.dependencies = dependencies;
    this.file = file;
  }

  finalize() {
    const final = stringfy(this.file.blocks, {
      language: "tsx",
    });
    return {
      code: final,
      name: this.name,
      dependencies: this.dependencies,
    };
  }
}
