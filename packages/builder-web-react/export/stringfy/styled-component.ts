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
import { react_imports } from "../../build-app/import-specifications";
import { TextChildWidget, WidgetTree } from "@web-builder/core";
import { ReactComponentExportResult } from "../export-result";
import {
  buildTextChildJsx,
  getWidgetStylesConfigMap,
  WidgetStyleConfigMap,
} from "@web-builder/core/builders";

const IMPORT_DEFAULT_STYLED_FROM_EMOTION_STYLED = new Import()
  .importDefault("styled")
  .from("@emotion/styled")
  .make();

const imports = [
  react_imports.import_react_from_react,
  IMPORT_DEFAULT_STYLED_FROM_EMOTION_STYLED,
];

/**
 * styled components pattern with either emotion or styled-component
 * @todo - this is not fully implemented
 * @param component
 * @returns
 */
export function stringfyReactWidget_STYLED_COMPONENTS(
  component: WidgetTree
): ReactComponentExportResult {
  const componentName = component.key.name;
  const styledComponentNamer = new ScopedVariableNamer(
    component.key.id,
    ReservedKeywordPlatformPresets.react
  );
  // buildWidgetExportable(component);

  const styledConfigWidgetMap: WidgetStyleConfigMap = getWidgetStylesConfigMap(
    component,
    {
      namer: styledComponentNamer,
      rename_tag: true /** styled component tag shoule be renamed */,
    }
  );

  function getStyledConfigById(
    id: string
  ): StyledComponentJSXElementConfig | NoStyleJSXElementConfig {
    return styledConfigWidgetMap.get(id);
  }

  function buildComponentFunction(): FunctionDeclaration {
    function jsxBuilder(widget: WidgetTree) {
      const children = widget.children?.map((comp) => {
        const config = getStyledConfigById(comp.key.id);
        if (comp instanceof TextChildWidget) {
          return buildTextChildJsx(comp, config);
        }

        const childrenJSX = comp.children?.map((cc) => jsxBuilder(cc));
        return new JSXElement({
          openingElement: new JSXOpeningElement(config.tag, {
            attributes: config.attributes,
          }),
          closingElement: new JSXClosingElement(config.tag),
          children: childrenJSX,
        });
      });

      const config = getStyledConfigById(widget.key.id);
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

    let jsxTree = jsxBuilder(component);
    const componentFunction = new FunctionDeclaration(componentName, {
      body: new BlockStatement(new Return(jsxTree)),
    });

    return componentFunction;
  }

  const componentFunction = buildComponentFunction();

  const styledComponentDeclarations = Array.from(styledConfigWidgetMap.keys())
    .map((k) => {
      return (styledConfigWidgetMap.get(k) as StyledComponentJSXElementConfig)
        .styledComponent;
    })
    .filter((s) => s);

  const file = buildReactComponentFile({
    componentName: componentName,
    imports: imports,
    component: componentFunction,
    styleVariables: styledComponentDeclarations,
  });

  const final = stringfy(file.blocks, {
    language: "tsx",
    // formatter: {
    //   parser: "typescript",
    //   use: "pritter",
    // },
  });

  return {
    code: final,
    name: componentFunction.id.name,
    dependencies: ["@emotion/styled", "react"],
  };
}

function buildReactComponentFile(p: {
  componentName: string;
  imports: Array<ImportDeclaration>;
  component: FunctionDeclaration;
  styleVariables: Array<VariableDeclaration>;
}): SourceFile {
  const { imports, componentName, component, styleVariables } = p;
  const file = new SourceFile({
    name: `${componentName}.tsx`,
    path: "src/components",
  });

  file.imports(...imports);
  file.declare(component);
  file.declare(...styleVariables);
  file.export(new ExportAssignment(component.id));

  return file;
}
