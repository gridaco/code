import { standard_libraries } from "../../../builder-web-nodejs";
import { Import } from "coli";

/**
 * CoLI: `import styled from "@emotion/styled";`
 */
const import_styled_from_emotion_styled = new Import()
  .importDefault("styled")
  .from(standard_libraries.emotion_styled.name)
  .make();

export const emotion_styled_imports = {
  /**
   * `import styled from "@emotion/styled";`
   */
  import_styled_from_emotion_styled,
};
