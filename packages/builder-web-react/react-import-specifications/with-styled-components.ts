import { standard_libraries } from "@coli.codes/nodejs-builder";
import { Import } from "coli";

/**
 * CoLI: `import styled from "styled-components";`
 */
const import_styled_from_styled_components = new Import()
  .importDefault("styled")
  .from(standard_libraries.styled_components.name)
  .make();

export const styled_components_imports = {
  /**
   * `import styled from "@emotion/styled";`
   */
  import_styled_from_styled_components,
};
