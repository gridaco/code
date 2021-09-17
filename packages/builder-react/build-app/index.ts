import { Widget } from "../widgets.native";
import { react_imports } from "./import-specifications";
import {
  packages,
  standard_libraries,
  templates,
} from "@coli.codes/nodejs-builder";
/**
 * builds create-react-app wrapped react app.
 *
 *
 * **file structure**
 * - package.json (cra-template-ts-package-json)
 * - src
 *    - index.tsx (cra-template-index-tsx)
 *    - app.tsx (cra-template-app-tsx)
 *    - *\_\_others\_\_*
 * - public
 *    - index.html (cra-template-index-html)
 * @param rootApp
 * @param options
 */
export function buildWrapedCreateReactApp(
  rootApp: Widget,
  options: {
    language: "ts" | "js";
  }
) {
  // setting both `@emotion/styled` and `styled-components` for now. this needs to be handled by option or via coli tree analysis and be only used either one of them.
  const _packageJson = templates.CRA_TYPESCRIPT_PACKAGE_PRESET;
  _packageJson.addDependency(standard_libraries.emotion_styled);
  _packageJson.addDependency(standard_libraries.styled_components);
  _packageJson.addDevDependency(standard_libraries.types_styled_components);

  const package_json_str = _packageJson.stringfy();

  // react_imports.import_react_prepacked
  throw "not implemented";
}
