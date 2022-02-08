import { ScopedVariableNamer } from "@coli.codes/naming";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import {
  NoStyleJSXElementConfig,
  StyledComponentJSXElementConfig,
} from "@web-builder/styled";
import { BlockStatement, Import, ImportDeclaration, Return } from "coli";
import { react_imports } from "../react-import-specifications";
import { JsxWidget } from "@web-builder/core";
import {
  buildJsx,
  getWidgetStylesConfigMap,
  WidgetStyleConfigMap,
} from "@web-builder/core/builders";
import { react as react_config } from "@designto/config";
import { makeReactModuleFile, ReactModuleFile } from "../react-module-file";
import { StyledComponentDeclaration } from "@web-builder/styled/styled-component-declaration";
import { ReactWidgetModuleExportable } from "../react-module";

export class ReactStyledComponentsBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  private readonly styledConfigWidgetMap: WidgetStyleConfigMap;
  private readonly namer: ScopedVariableNamer;
  readonly config: react_config.ReactStyledComponentsConfig;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: react_config.ReactStyledComponentsConfig;
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
    return buildJsx(
      widget,
      {
        styledConfig: (id) => this.styledConfig(id),
      },
      {
        self_closing_if_possible: true,
      }
    );
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

export class ReactStyledComponentWidgetModuleExportable extends ReactWidgetModuleExportable {
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
    super({
      name,
      body,
      imports,
    });

    this.declarations = declarations;
  }

  asFile({
    exporting,
  }: {
    exporting: react_config.ReactComponentExportingCofnig;
  }) {
    return makeReactModuleFile({
      name: this.name,
      path: "src/components",
      imports: this.imports,
      declarations: this.declarations,
      body: this.body,
      config: {
        exporting: exporting,
      },
    });
  }
}
