import { ColiObjectLike } from "@coli.codes/builder";
import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig } from "@coli.codes/web-builder-core";
import { JSX, JSXElementLike, css } from "coli";

import { ReactWidget } from "../widget";

export class Container extends ReactWidget {
  styleData(): CSSProperties {
    return {};
  }
  jsxConfig(): JSXElementConfig {
    return {
      tag: JSX.identifier("div"),
    };
  }
}
