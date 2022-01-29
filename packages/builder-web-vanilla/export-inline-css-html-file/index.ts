import { handle } from "@coli.codes/builder";
import { buildCssStandard, CSSProperties } from "@coli.codes/css";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import {
  k,
  TextChildWidget,
  StylableJsxWidget,
  JsxWidget,
} from "@web-builder/core";
import {
  buildJsx,
  getWidgetStylesConfigMap,
  JSXWithoutStyleElementConfig,
  JSXWithStyleElementConfig,
  WidgetStyleConfigMap,
} from "@web-builder/core/builders";
import {
  JSXAttribute,
  JSXClosingElement,
  JSXElement,
  JSXElementLike,
  JSXOpeningElement,
  ScopedVariableNamer,
  stringfy,
  StringLiteral,
} from "coli";

const html_render = ({ css, body }: { css: string; body: string }) => {
  const indenter = (s: string, tabs: number = 0) =>
    s.replace(/\n/g, "\n" + "\t".repeat(tabs));
  return `<!DOCTYPE html>
<html>
  <head>
    <style>
${indenter(css, 3)}
    </style>
  </head>
  <body>
${indenter(body, 2)}
  </body>
</html>`;
};

interface CssDeclaration {
  key: {
    name: string;
    selector: "tag" | "id" | "class";
  };
  style: CSSProperties;
}

export function export_inlined_css_html_file(
  widget: JsxWidget,
  config: {
    additional_css_declarations?: CssDeclaration[];
  }
) {
  const componentName = widget.key.name;
  const styledComponentNamer = new ScopedVariableNamer(
    widget.key.id,
    ReservedKeywordPlatformPresets.html
  );

  const styles_map: WidgetStyleConfigMap = getWidgetStylesConfigMap(widget, {
    namer: styledComponentNamer,
    rename_tag: false, // vanilla html tag will be preserved.
  });

  function getStyleConfigById(
    id: string
  ): JSXWithStyleElementConfig | JSXWithoutStyleElementConfig {
    return styles_map.get(id);
  }

  function buildBodyHtml(widget: JsxWidget) {
    return buildJsx(widget, {
      styledConfig: (id) => getStyleConfigById(id),
      idTransformer: (jsx, id) => injectIdToJsx(jsx, id),
    });
  }

  const css_declarations = Array.from(styles_map.keys())
    .map((k) => {
      const item = styles_map.get(k) as JSXWithStyleElementConfig;
      return {
        key: {
          name: item.id,
          selector: "id",
        },
        style: item.style,
      };
    })
    .filter((s) => s);

  // global vanilla default injected style
  css_declarations.push({
    key: {
      name: "*",
      selector: "tag",
    },
    style: k.user_agent_stylesheet_override_default,
  });

  // declare additional styles requested by user
  config.additional_css_declarations?.forEach((d) => {
    css_declarations.push(d);
  });

  const strfied_css = css_declarations
    .map((css) => {
      const selectors = {
        id: "#",
        class: ".",
        tag: "",
      };
      const stylestring = buildCssStandard(css.style);
      const key = selectors[css.key.selector] + css.key.name;
      return `${key} {${formatCssBodyString(stylestring)}}`;
    })
    .join("\n\n");
  const body = buildBodyHtml(widget);
  const strfied_body = stringfy(body, {
    language: "jsx",
  });

  const final = html_render({
    css: strfied_css,
    body: strfied_body,
  });

  return {
    code: final,
    name: componentName,
    /** TODO: add fonts as dependency */
    dependencies: [],
  };
}

/**
 * injects id attribute to existing jsx for css selectors.
 * @param jsx
 * @param id
 */
function injectIdToJsx(jsx: JSXElementLike, id: string) {
  let attr;

  if (jsx instanceof JSXElement) {
    attr = jsx.openingElement.attributes;
  }

  if (jsx instanceof JSXOpeningElement) {
    attr = jsx.attributes;
  }

  //
  if (attr) {
    attr.push(new JSXAttribute("id", new StringLiteral(id)));
  } else {
    console.clear();
    console.error(jsx);
    throw new Error("unsupported jsx element");
  }
}

/**
 * from
 * ```
 * `
 * color: white;
 * width: 24px;
 * `
 * ```
 *
 * to
 * ```
 * `
 *  color: white;
 *  width: 24px;
 * `
 * ```
 */
export function formatCssBodyString(styleString: string): string {
  const lines = [];
  let declarationLines = 0;
  styleString.split("\n").map((l) => {
    if (l.length <= 1) {
      // this is not a style property line. ignore it
      lines.push(l);
    } else {
      lines.push(`\t${l}`);
      declarationLines += 1;
    }
  });

  if (declarationLines == 0) {
    // if no actual style declration in style string.
    return "";
  }

  return lines.join("\n");
}
