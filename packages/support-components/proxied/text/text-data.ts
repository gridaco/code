import { Proxied } from "@reflect-ui/core/lib/_utility-types";
import { ArgumentProxy, ParameterProxy } from "../types";
export type TextDataProxied = TextDataParameter | TextDataArgument;

export class TextDataParameter extends ParameterProxy<string> {
  readonly type: "text.data" = "text.data";
}

export class TextDataArgument extends ArgumentProxy<string> {
  readonly type: "text.data" = "text.data";
}
