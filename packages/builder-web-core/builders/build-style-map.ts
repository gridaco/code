import { CSSProperties } from "@coli.codes/css";
import { WidgetKeyId, StylableJsxWidget, JsxWidget } from "@web-builder/core";
import { JSXAttributes, JSXIdentifier, ScopedVariableNamer } from "coli";
import { buildStyledComponentConfig } from "@web-builder/styled";

export interface JSXWithStyleElementConfig {
  id: string;
  tag: JSXIdentifier;
  attributes?: JSXAttributes;
  style: CSSProperties;
}

export interface JSXWithoutStyleElementConfig {
  id?: string;
  tag: JSXIdentifier;
  attributes?: JSXAttributes;
}

export type WidgetStyleConfigMap = Map<
  WidgetKeyId,
  JSXWithStyleElementConfig | JSXWithoutStyleElementConfig
>;

export function getWidgetStylesConfigMap(
  rootWidget: JsxWidget,
  preferences: {
    namer: ScopedVariableNamer;
    rename_tag: boolean;
  }
): WidgetStyleConfigMap {
  const styledConfigWidgetMap: WidgetStyleConfigMap = new Map();

  function mapper(widget: JsxWidget) {
    if (!widget) {
      throw `cannot map trough ${widget}`;
    }
    if (widget.jsxConfig().type === "static-tree") {
      return;
    }

    const isRoot = widget.key.id == rootWidget.key.id;
    const id = widget.key.id;
    if (widget instanceof StylableJsxWidget) {
      const styledConfig = buildStyledComponentConfig(widget, {
        transformRootName: true,
        namer: preferences.namer,
        rename_tag: preferences.rename_tag,
        context: {
          root: isRoot,
        },
      });

      styledConfigWidgetMap.set(id, styledConfig);
    }
    widget.children?.map((childwidget) => {
      mapper(childwidget);
    });
  }

  mapper(rootWidget);

  return styledConfigWidgetMap;
}
