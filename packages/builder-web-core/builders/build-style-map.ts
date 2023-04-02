import { CSSProperties } from "@coli.codes/css";
import { WidgetKeyId, StylableJsxWidget, JsxWidget } from "@web-builder/core";
import { JSXAttributes, JSXIdentifier, ScopedVariableNamer } from "coli";
import { buildStyledComponentConfig } from "@web-builder/styled";
import assert from "assert";
import { Framework } from "@grida/builder-platform-types";

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

export type JSXWithOrWithoutStyleElementConfig =
  | JSXWithStyleElementConfig
  | JSXWithoutStyleElementConfig;

export type WidgetStyleConfigMap = Map<
  WidgetKeyId,
  JSXWithOrWithoutStyleElementConfig
>;

interface StylesConfigMapBuilderPreference {
  /**
   * namer is required regardless to the `rename_tag` preference. this renamer also contributes to the id / class of the building css block, even if the `rename_tag` is set to false
   */
  namer: ScopedVariableNamer;

  /**
   * rather to rename the tag of the element while building a config map.
   * this will actually alter the name of the coli object while iterating.
   */
  rename_tag: boolean;
}

/**
 * builds the config map for the styled components with the givven root jsx tree.
 * iterates throught the children recursively and builds the config map.
 *
 * optimizer can be passed here to reduce the output size of the config map.
 */
export class StylesConfigMapBuilder {
  private _map: WidgetStyleConfigMap = new Map();

  constructor(
    readonly root: JsxWidget,
    readonly preferences: StylesConfigMapBuilderPreference,
    readonly framework: Framework
  ) {
    this._mapper(this.root);
  }

  private _mapper(widget: JsxWidget) {
    assert(widget, "widget is required for building style config map");

    if (widget.jsxConfig().type === "static-tree") {
      return;
    }

    const { id } = widget.key;
    const isRoot = id == this.root.key.id;

    if (widget instanceof StylableJsxWidget) {
      const styledConfig = buildStyledComponentConfig(widget, {
        transformRootName: true,
        namer: this.preferences.namer,
        rename_tag: this.preferences.rename_tag,
        context: {
          root: isRoot,
        },
        framework: this.framework,
      });

      // set to map
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
