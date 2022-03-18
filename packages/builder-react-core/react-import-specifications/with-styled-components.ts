import { standard_libraries } from "@web-builder/nodejs";
import { Import } from "coli";

/**
 * CoLI: `import styled from "styled-components";`
 */
const import_styled_from_styled_components = new Import()
  .importDefault("styled")
  .from(standard_libraries.styled_components.name)
  .make();

/**
 * CoLI: `import styled from "styled-components/native";`
 */
const import_styled_from_styled_components_native = new Import()
  .importDefault("styled")
  // styled-components/native
  .from(standard_libraries.styled_components.name + "/native")
  .make();

export const styled_components_imports = {
  /**
   * `import styled from "styled-components";`
   */
  import_styled_from_styled_components,
  /**
   * `import styled from "styled-components/native";`
   */
  import_styled_from_styled_components_native,
};
