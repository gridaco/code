import type { CSSProperties } from "@coli.codes/css";
import type { JSXAttributes, JSXIdentifier } from "coli";
import type { StyledComponentDeclaration } from "./styled-component-declaration";
import type { ScopedVariableNamer } from "@coli.codes/naming";

export interface StyledComponentJSXElementConfig {
  id: string;
  tag: JSXIdentifier;
  attributes?: JSXAttributes;
  style: CSSProperties;
  styledComponent: StyledComponentDeclaration;
}

export interface NoStyleJSXElementConfig {
  id?: string;
  tag: JSXIdentifier;
  attributes?: JSXAttributes;
}

/**
 * component variable declration naming preference
 */
export interface NamePreference {
  namer: ScopedVariableNamer;
  overrideKeyName?: string;
  overrideFinalName?: string;
}
