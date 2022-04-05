import { CSSProperties } from "@coli.codes/css";
import { WidgetKeyId, StylableJsxWidget, JsxWidget } from "@web-builder/core";
import { JSXAttributes, JSXIdentifier, ScopedVariableNamer } from "coli";
import { buildStyledComponentConfig } from "@web-builder/styled";
import assert from "assert";

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

interface StylesConfigMapBuilderPreference {
  namer: ScopedVariableNamer;
  rename_tag: boolean;
}

export class StylesConfigMapBuilder {
  readonly root: JsxWidget;
  readonly preferences: StylesConfigMapBuilderPreference;
  private readonly _map: WidgetStyleConfigMap = new Map();
  //
  constructor(root: JsxWidget, preferences: StylesConfigMapBuilderPreference) {
    this.root = root;
    this.preferences = preferences;

    this._mapper(this.root);
  }

  private _mapper(widget: JsxWidget) {
    assert(widget, "widget is required for building style config map");

    if (widget.jsxConfig().type === "static-tree") {
      return;
    }

    const isRoot = widget.key.id == this.root.key.id;
    const id = widget.key.id;
    if (widget instanceof StylableJsxWidget) {
      const styledConfig = buildStyledComponentConfig(widget, {
        transformRootName: true,
        namer: this.preferences.namer,
        rename_tag: this.preferences.rename_tag,
        context: {
          root: isRoot,
        },
      });

      this._map.set(id, styledConfig);
    }
    widget.children?.map((childwidget) => {
      this._mapper(childwidget);
    });
  }

  public get map(): WidgetStyleConfigMap {
    return this._map;
  }
}
