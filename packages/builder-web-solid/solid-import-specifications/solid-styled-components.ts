///
/// solid's official styled components module import specificatons
/// .d.ts type file can be found here - https://github.com/solidjs/solid-styled-components/blob/main/src/index.d.ts
///

import { standard_libraries } from "@web-builder/nodejs";
import { Import } from "coli";

/**
 * Note: solid's styled component uses the named import (not the default import)
 * Learn more: https://github.com/solidjs/solid-styled-components/
 * CoLI: `import { styled } from "solid-styled-components";`
 */
const import_styled = new Import()
  .imports("styled")
  .from(standard_libraries.solud_styled_components.name)
  .make();

/**
 * Learn more: https://github.com/solidjs/solid-styled-components/
 * CoLI: `import { css } from "solid-styled-components";`
 */
const import_css = new Import()
  .imports("css")
  .from(standard_libraries.solud_styled_components.name)
  .make();

/**
 * Learn more: https://github.com/solidjs/solid-styled-components/
 * CoLI: `import { ThemeProvider } from "solid-styled-components";`
 */
const import_theme_provider = new Import()
  .imports("ThemeProvider")
  .from(standard_libraries.solud_styled_components.name)
  .make();

export const solid_styled_components_imports = {
  /**
   * `import styled from "@emotion/native";`
   */
  import_styled: import_styled,
  import_css: import_css,
  import_theme_provider: import_theme_provider,
};

type _named_import =
  | "styled"
  | "css"
  | "ThemeProvider"
  | "DefaultTheme"
  | "shouldForwardProp"
  | "createGlobalStyles";

/**
 * makes the import specification with specified import keywords allowed from solid-styled-components
 * @param _imports
 * @returns
 */
export function make_solid_styled_components_imports(
  ..._imports: _named_import[]
) {
  _imports;

  return new Import()
    .imports(..._imports)
    .from(standard_libraries.solud_styled_components.name)
    .make();
}
