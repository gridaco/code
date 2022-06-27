import { ScopedVariableNamer } from "@coli.codes/naming";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import { BlockStatement, ImportDeclaration, Return } from "coli";
import {
  react_imports,
  ReactWidgetModuleExportable,
  emotion_styled_imports,
  styled_components_imports,
} from "@web-builder/react-core";
import { JsxWidget } from "@web-builder/core";
import {
  buildJsx,
  StylesConfigMapBuilder,
  StylesRepository,
} from "@web-builder/core/builders";
import {
  react as react_config,
  reactnative as rn_config,
} from "@designto/config";
import { reactnative_imports } from "../rn-import-specifications";
import {
  NoStyleJSXElementConfig,
  StyledComponentJSXElementConfig,
  StyledComponentDeclaration,
  create_duplication_reduction_map,
} from "@web-builder/styled";
import { makeEsWidgetModuleFile } from "@web-builder/module-es";

export class ReactNativeStyledComponentsModuleBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  private readonly stylesMapper: StylesConfigMapBuilder;
  private readonly stylesRepository: StylesRepository;
  private readonly namer: ScopedVariableNamer;
  readonly config: rn_config.ReactNativeStyledComponentsConfig;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: rn_config.ReactNativeStyledComponentsConfig;
  }) {
    this.entry = entry;
    this.widgetName = entry.key.name;
    this.namer = new ScopedVariableNamer(
      entry.key.id,
      ReservedKeywordPlatformPresets.react
    );

    this.stylesMapper = new StylesConfigMapBuilder(entry, {
      namer: this.namer,
      rename_tag: true /** styled component tag shoule be renamed */,
    });

    this.stylesRepository = new StylesRepository(
      this.stylesMapper.map,
      create_duplication_reduction_map
    );

    this.config = config;
  }

  private styledConfig(
    id: string
  ): StyledComponentJSXElementConfig | NoStyleJSXElementConfig {
    return this.stylesRepository.get(id);
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
    return [
      this.partImportReact(),
      this.partImportReactNative(),
      this.partImportStyled(),
    ];
  }

  partImportStyled() {
    switch (this.config.module) {
      case "@emotion/native":
        return emotion_styled_imports.import_styled_from_emotion_native;
      case "styled-components/native":
        return styled_components_imports.import_styled_from_styled_components_native;
    }
  }

  partImportReact() {
    return react_imports.import_react_from_react;
  }

  partImportReactNative() {
    return reactnative_imports.import_react_prepacked;
  }

  partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  partDeclarations() {
    return Array.from(this.stylesRepository.uniques())
      .map((k) => {
        return (this.styledConfig(k) as StyledComponentJSXElementConfig)
          .styledComponent;
      })
      .filter((s) => s);
  }

  asExportableModule() {
    const body = this.partBody();
    const imports = this.partImports();
    const styled_declarations = this.partDeclarations();
    return new ReactNativeStyledComponentWidgetModuleExportable(
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

export class ReactNativeStyledComponentWidgetModuleExportable extends ReactWidgetModuleExportable {
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
