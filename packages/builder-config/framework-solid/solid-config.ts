import type { Language } from "@grida/builder-platform-types";

/**
 * builder configuration input for solidjs applications
 */
export interface SolidFrameworkConfig {
  framework: "solidjs";
  language: Language.jsx | Language.tsx;
  styling;
}
