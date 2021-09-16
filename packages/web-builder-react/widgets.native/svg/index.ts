import { ReactWidget } from "../../widgets/widget";
import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { px, color } from "@web-builder/styles";
import { JSX, JSXAttribute, StringLiteral } from "coli";

/**
 * 
 * example output:
 * ```jsx
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.59 2L6 6.58L1.41 2L0 3.41L6 9.41L12 3.41L10.59 2Z"
        fill="#CFCFCF"
      />
    </svg>
 * ```
 */
export class SvgElement extends ReactWidget {
  _type = "svg";

  /**
   * a svg data string
   */
  readonly data: string;
  constructor(p: {
    key: WidgetKey;
    width?: number;
    height?: number;
    /**
     * svg data
     */
    data: string;
  }) {
    super(p);

    // general
    this.width = p.width;
    this.height = p.height;

    // region svg related
    this.data = p.data;
    // endregion svg related
  }

  styleData(): CSSProperties {
    if (!this.data) {
      // svg data might be empty, in this case also w & h won't be available, we still should draw this element, but visually unreachable.
      // so we use 0, 0 for its size
      return {
        width: "0px",
        height: "0px",
      };
    }
    return {
      width: px(this.width),
      height: px(this.height),
      color: color(this.color),
    };
  }

  children = [
    <ReactWidget>{
      key: new WidgetKey(`${this.key.id}.svg-path`, "svg-path"),
      styleData: () => null,
      jsxConfig: () => {
        return {
          tag: JSX.identifier("path"),
          attributes: [
            new JSXAttribute("fill", new StringLiteral("current")),
            new JSXAttribute("d", new StringLiteral(this.data ?? "")),
          ],
        };
      },
    },
  ];

  jsxConfig(): JSXElementConfig {
    return {
      tag: JSX.identifier("svg"),
      attributes: [
        new JSXAttribute(
          "xmlns",
          new StringLiteral("http://www.w3.org/2000/svg")
        ),
      ],
    };
  }
}
