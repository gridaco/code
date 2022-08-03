import with_styled_components from "./react-styled-component-widget";
import with_inline_css from "./react-inline-css-widget";
import with_css_module from "./react-css-module-widget";
import type { JsxWidget } from "@web-builder/core";
import type {
  ReactComponentExportingCofnig,
  ReactStyledComponentsConfig,
  ReactInlineCssConfig,
  ReactCssModuleConfig,
  ReactStylingStrategy,
} from "@grida/builder-config/framework-react";
import type { ReactComponentExportResult } from "@web-builder/react-core";

const finilize = {
  with_styled_components:
    with_styled_components as BuilderFunc<ReactStyledComponentsConfig>,
  with_inline_css: with_inline_css as BuilderFunc<ReactInlineCssConfig>,
  with_css_module: with_css_module as BuilderFunc<ReactCssModuleConfig>,
};

type BuilderFunc<S extends ReactStylingStrategy = ReactStylingStrategy> = (
  entry: JsxWidget,
  config: {
    styling: S;
    exporting: ReactComponentExportingCofnig;
  }
) => ReactComponentExportResult;

export default finilize;
export type { BuilderFunc };
export * from "./widgets-native";
export * from "./widgets-reflect-react";
export { ReactCssModuleBuilder } from "./react-css-module-widget";
export { ReactInlineCssBuilder } from "./react-inline-css-widget";
export { ReactStyledComponentsModuleBuilder } from "./react-styled-component-widget";
