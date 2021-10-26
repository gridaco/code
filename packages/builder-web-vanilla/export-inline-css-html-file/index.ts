import { handle } from "@coli.codes/builder";
import { buildCssStandard } from "@coli.codes/css";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import {
  k,
  TextChildWidget,
  StylableJsxWidget,
  JsxWidget,
} from "@web-builder/core";
import {
  buildTextChildJsx,
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

export function export_inlined_css_html_file(widget: JsxWidget) {
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
    const mapper = (widget) => {
      const jsxcfg = widget.jsxConfig();
      if (jsxcfg.type === "static-tree") {
        return jsxcfg.tree;
      }

      const config = getStyleConfigById(widget.key.id);
      if (widget instanceof TextChildWidget) {
        const jsx = buildTextChildJsx(widget, config);
        injectIdToJsx(jsx, config.id);
        return jsx;
      }

      const childrenJSX = widget.children?.map((cc) => mapper(cc));

      if (widget instanceof StylableJsxWidget) {
        const config = getStyleConfigById(widget.key.id);
        const jsx = new JSXElement({
          openingElement: new JSXOpeningElement(config.tag, {
            attributes: config.attributes,
          }),
          closingElement: new JSXClosingElement(config.tag),
          children: childrenJSX,
        });
        injectIdToJsx(jsx, config.id);
        return jsx;
      } else {
        const config = widget.jsxConfig();
        if (config.type === "tag-and-attr") {
          const _tag = handle(config.tag);
          const jsx = new JSXElement({
            openingElement: new JSXOpeningElement(_tag, {
              attributes: config.attributes,
            }),
            closingElement: new JSXClosingElement(_tag),
            children: childrenJSX,
          });
          return jsx;
        }
        return;
      }
    };

    return mapper(widget);
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
  css_declarations.push({
    key: {
      name: "*",
      selector: "tag",
    },
    style: k.user_agent_stylesheet_override_default,
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
