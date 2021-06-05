import { handle } from "@coli.codes/builder";
import { ExportAssignment } from "@coli.codes/core/assignment/export-assignment";
import { stringfy } from "@coli.codes/export-string";
import { ScopedVariableNamer } from "@coli.codes/naming";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import { JSXElementConfig } from "@coli.codes/web-builder-core";
import {
  buildStyledComponentConfig,
  StyledComponentJSXElementConfig,
} from "@web-builder/styled";
import {
  BlockStatement,
  FunctionDeclaration,
  Import,
  ImportDeclaration,
  JSXClosingElement,
  JSXElement,
  JSXElementLike,
  JSXIdentifier,
  JSXOpeningElement,
  JSXText,
  Return,
  SourceFile,
  VariableDeclaration,
} from "coli";
import { react_imports } from "../../build-app/import-specifications";
import {
  ReactMultiChildWidget,
  ReactSingleChildWidget,
  ReactTextChildWidget,
  ReactWidget,
  WidgetKeyId,
} from "../../widgets.native";
import { ReactComponentExportResult } from "../export-result";

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
  component: ReactWidget
): ReactComponentExportResult {
  const componentName = component.key.name;
  const styledComponentNamer = new ScopedVariableNamer(
    component.key.id,
    ReservedKeywordPlatformPresets.react
  );
  // buildWidgetExportable(component);

  const styledConfigWidgetMap: StyledConfigWidgetMap = getWidgetStyledConfigMap(
    component,
    {
      namer: styledComponentNamer,
    }
  );

  function getStyledConfigById(id: string): StyledComponentJSXElementConfig {
    return styledConfigWidgetMap.get(id);
  }

  function buildComponentFunction(): FunctionDeclaration {
    function jsxBuilder(widget: ReactWidget) {
      const children = widget.children?.map((comp) => {
        const config = getStyledConfigById(comp.key.id);
        if (comp instanceof ReactTextChildWidget) {
          return buildTextChildJsx(comp, config);
        }

        const childrenJSX = comp.children?.map((cc) => jsxBuilder(cc));
        return new JSXElement({
          openingElement: new JSXOpeningElement(config.tag),
          closingElement: new JSXClosingElement(config.tag),
          children: childrenJSX,
        });
      });

      const config = getStyledConfigById(widget.key.id);
      if (widget instanceof ReactTextChildWidget) {
        return buildTextChildJsx(widget, config);
      }
      return new JSXElement({
        openingElement: new JSXOpeningElement(config.tag),
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

  const styledComponentDeclarations = Array.from(
    styledConfigWidgetMap.keys()
  ).map((k) => {
    return styledConfigWidgetMap.get(k).styledComponent;
  });

  const file = buildReactComponentFile({
    componentName: componentName,
    imports: imports,
    component: componentFunction,
    styleVariables: styledComponentDeclarations,
  });

  const final = stringfy(file.blocks, {
    language: "tsx",
    formatter: {
      parser: "typescript",
      use: "pritter",
    },
  });

  return {
    code: final,
    componentName: componentFunction.id.name,
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

  file.import(...imports);
  file.declare(component);
  file.declare(...styleVariables);
  file.export(new ExportAssignment(component.id));

  return file;
}

type StyledConfigWidgetMap = Map<WidgetKeyId, StyledComponentJSXElementConfig>;
function getWidgetStyledConfigMap(
  rootWidget: ReactWidget,
  preferences: {
    namer: ScopedVariableNamer;
  }
): StyledConfigWidgetMap {
  const styledConfigWidgetMap: StyledConfigWidgetMap = new Map();

  function mapper(w: ReactWidget) {
    const isRoot = w.key.id == rootWidget.key.id;
    const id = w.key.id;
    const styledConfig = buildStyledComponentConfig(w, {
      transformRootName: true,
      namer: preferences.namer,
      context: {
        root: isRoot,
      },
    });

    styledConfigWidgetMap.set(id, styledConfig);
    w.children?.map((wc) => {
      mapper(wc);
    });
  }

  mapper(rootWidget);

  return styledConfigWidgetMap;
}

////
//// region jsx tree builder
////

export function buildWidgetExportable(widget: ReactWidget) {
  const _key = widget.key;
  const _id = _key.id;
  const _name = _key.name;
  const jsxconfg = widget.jsxConfig();
  let jsx;
  let style;

  if (widget instanceof ReactMultiChildWidget) {
    const children = widget.children;
    jsx = buildJsx(widget);

    //
  } else if (widget instanceof ReactSingleChildWidget) {
    const child = widget.child;
    jsx = buildJsx(widget);
    //
  } else if (widget instanceof ReactTextChildWidget) {
    const text = widget.text;
    jsx = buildTextChildJsx(widget, jsxconfg);
    //
  }

  //   return new ReactComponentExportable({});
}

function handleWidget(widget: ReactWidget) {}

function buildTextChildJsx(
  textchildwidget: ReactTextChildWidget,
  config: JSXElementConfig
) {
  const text = textchildwidget.text;
  const tag = handle<JSXIdentifier>(config.tag);

  const jsxtext = new JSXText(text);
  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      atrributes: config.attributes,
    }),
    children: jsxtext,
    closingElement: new JSXClosingElement(tag),
  });
}

function buildContainingJsx(
  container: JSXElementConfig,
  children: Array<JSXElementLike>
): JSXElementLike {
  const tag = handle<JSXIdentifier>(container.tag);
  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      atrributes: container.attributes,
    }),
    closingElement: new JSXClosingElement(tag),
    children: children,
  });
}

function buildJsx(widget: ReactWidget): JSXElementLike {
  const children = buildChildrenJsx(widget.children);
  const container = buildContainingJsx(widget.jsxConfig(), children);
  return container;
}

function buildChildrenJsx(children: Array<ReactWidget>): Array<JSXElementLike> {
  return children?.map((c) => {
    return buildJsx(c);
  });
}
