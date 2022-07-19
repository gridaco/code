import {
  ScopedVariableNamer,
  ReservedKeywordPlatformPresets,
} from "@coli.codes/naming";
import { StyledComponentJSXElementConfig } from "@web-builder/styled";
import {
  react_imports,
  ReactWidgetModuleExportable,
  emotion_styled_imports,
  styled_components_imports,
} from "@web-builder/react-core";
import { JsxWidget } from "@web-builder/core";
import { BlockStatement, ImportDeclaration, Return } from "coli";
import {
  buildJsx,
  StylesConfigMapBuilder,
  StylesRepository,
} from "@web-builder/core/builders";
import { react as react_config } from "@designto/config";
import {
  StyledComponentDeclaration,
  create_duplication_reduction_map,
} from "@web-builder/styled";
import { makeEsWidgetModuleFile } from "@web-builder/module-es";
import { Framework } from "@grida/builder-platform-types";
import { JSXWidgetModuleBuilder } from "@web-builder/module-jsx";

export class ReactStyledComponentsModuleBuilder extends JSXWidgetModuleBuilder<react_config.ReactStyledComponentsConfig> {
  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: react_config.ReactStyledComponentsConfig;
  }) {
    super({
      entry,
      config,
      framework: Framework.react,
      namer: new ScopedVariableNamer(
        entry.key.id,
        ReservedKeywordPlatformPresets.react
      ),
    });
  }

  protected initStylesConfigMapBuilder(): StylesConfigMapBuilder {
    return new StylesConfigMapBuilder(
      this.entry,
      {
        namer: this.namer,
        rename_tag: true /** styled component tag shoule be renamed */,
      },
      Framework.react
    );
  }

  protected initStylesRepository(): false | StylesRepository {
    return new StylesRepository(
      this.stylesMapper.map,
      create_duplication_reduction_map
    );
  }

  protected jsxBuilder(widget: JsxWidget) {
    return buildJsx(
      widget,
      {
        styledConfig: (id) => this.stylesConfig(id),
      },
      {
        self_closing_if_possible: true,
      }
    );
  }

  protected partImports() {
    return [this.partImportReact(), this.partImportStyled()];
  }

  protected partImportStyled() {
    switch (this.config.module) {
      case "@emotion/styled":
        return emotion_styled_imports.import_styled_from_emotion_styled;
      case "styled-components":
        return styled_components_imports.import_styled_from_styled_components;
    }
  }

  protected partImportReact() {
    return react_imports.import_react_from_react;
  }

  protected partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  private partStyledComponentsDeclarations() {
    return Array.from(this.stylesRepository.uniques())
      .map((k) => {
        return (this.stylesRepository.get(k) as StyledComponentJSXElementConfig)
          .styledComponent;
      })
      .filter((s) => s);
  }

  protected partDeclarations() {
    return this.partStyledComponentsDeclarations();
  }

  public asExportableModule() {
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
    return makeEsWidgetModuleFile({
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
