import { JsxWidget } from "@web-builder/core";
import { react as react_config } from "@designto/config";
import {
  ReactInlineCssBuilder,
  ReactInlineCssWidgetModuleExportable,
} from "./react-inline-css-module-builder";

interface Config {
  styling: react_config.ReactInlineCssConfig;
  exporting: react_config.ReactComponentExportingCofnig;
}

export default function finalizeReactWidget_InlineCss(
  entry: JsxWidget,
  { styling, exporting }: Config
) {
  const builder = new ReactInlineCssBuilder({
    entry,
    config: styling,
  });
  return builder.asExportableModule().finalize(exporting);
}

export { ReactInlineCssBuilder, ReactInlineCssWidgetModuleExportable };
