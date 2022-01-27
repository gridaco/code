import { Language } from "@grida/builder-platform-types";
import { ComponentOutput } from "../output";
import type { WebImgAltConfig } from "../platform-web/web-img-alt";
export interface VanillaComponentOutput extends ComponentOutput {}

export interface VanillaFrameworkConfig {
  framework: "vanilla";
  language: Language.html;
  imgage_alt: WebImgAltConfig;
}
