import { standard_libraries } from "@web-builder/nodejs";
import { Import } from "coli";

/**
 * CoLI: `import styled from "@emotion/styled";`
 */
const import_styled_from_emotion_styled = new Import()
  .importDefault("styled")
  .from(standard_libraries.emotion_styled.name)
  .make();

/**
 * CoLI: `import styled from "@emotion/native";`
 */
const import_styled_from_emotion_native = new Import()
  .importDefault("styled")
  .from(standard_libraries.emotion_native.name)
  .make();

export const emotion_styled_imports = {
  /**
   * `import styled from "@emotion/styled";`
   */
  import_styled_from_emotion_styled,
  /**
   * `import styled from "@emotion/native";`
   */
  import_styled_from_emotion_native,
};
