import {
  StylableJsxWidget,
  SvgElement,
  UnstylableJSXElementConfig,
  WidgetKey,
} from "@web-builder/core";
import { JSX, JSXAttribute, StringLiteral } from "coli";

export class SvgWithPathElement extends SvgElement {
  path({ fill }: { fill: string | false }) {
    return <StylableJsxWidget>{
      key: new WidgetKey(`${this.key.id}.svg-path`, "svg-path"),
      styleData: () => null,
      jsxConfig: () => {
        // from `import Svg, { Path } from "react-native-svg";`
        const _tag = JSX.identifier("Path");
        return {
          type: "static-tree",
          tree: JSX.tag("Path", {
            selfClosing: true,
            attributes: [
              fill &&
                new JSXAttribute("fill", new StringLiteral(fill || "current")),
              new JSXAttribute("d", new StringLiteral(this.data ?? "")),
            ],
          }).make(),
        };
      },
    };
  }

  private get childConfig() {
    // single "Path" element make by above `path` method
    return this.children[0].jsxConfig() as UnstylableJSXElementConfig;
  }

  jsxConfig(): UnstylableJSXElementConfig {
    // from `import Svg from "react-native-svg";`
    const tree = JSX.tag("Svg", {
      children: [this.childConfig.tree],
      attributes: [
        new JSXAttribute("width", new StringLiteral("100%")),
        new JSXAttribute("height", new StringLiteral("100%")),
      ],
    }).make();

    return {
      type: "static-tree",
      tree: tree,
    };
  }
}
