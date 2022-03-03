import { Language } from "@grida/builder-platform-types";
import { ComponentOutput } from "../output";
import type { WebImgAltConfig } from "../platform-web/web-img-alt";
import type { WebAdditionalCssDeclarationConfig } from "../platform-web/additional-css-declaration";

export interface VanillaComponentOutput extends ComponentOutput {}

export interface VanillaFrameworkConfig {
  framework: "vanilla";
  language: Language.html;
  imgage_alt: WebImgAltConfig;
  additional_css_declaration?: WebAdditionalCssDeclarationConfig;
}
