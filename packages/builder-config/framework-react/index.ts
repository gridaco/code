import { ComponentOutput } from "../output";

export interface ReactComponentOutput extends ComponentOutput {}

export type ReactStylingStrategy = "css" | "styled-components" | "css-in-jsx";
