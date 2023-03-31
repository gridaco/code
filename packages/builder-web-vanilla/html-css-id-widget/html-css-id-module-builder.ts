import {
  NoStyleJSXElementConfig,
  StyledComponentJSXElementConfig,
} from "@web-builder/styled";
import { JSXChildLike } from "coli";
import { StylesRepository } from "@web-builder/core/builders";
import { create_duplication_reduction_map } from "@web-builder/styled";
import { buildCSSStyleData, CSSProperties } from "@coli.codes/css";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming";
import { k, JsxWidget } from "@web-builder/core";
import {
  buildJsx,
  StylesConfigMapBuilder,
  JSXWithStyleElementConfig,
} from "@web-builder/core/builders";
import {
  JSXAttribute,
  JSXElement,
  JSXElementLike,
  JSXOpeningElement,
  ScopedVariableNamer,
  stringfy,
  StringLiteral,
} from "coli";
import { Framework } from "@grida/builder-platform-types";
import { stringfy as stringfyHtmlMeta, HtmlMeta } from "../html-meta";
import { TFontService } from "@code-features/fonts";
import { htmlFontsMiddleware } from "./html-fonts-middleware";

interface CssDeclaration {
  key: {
    name: string;
    selector: "tag" | "id" | "class";
  };
  style: CSSProperties;
}

export type HtmlModuleBuilderConfig = {
  disable_all_optimizations?: boolean;
  additional_css_declarations?: CssDeclaration[];
  fonts?: {
    services: ReadonlyArray<TFontService>;
  };
};

export class HtmlIdCssModuleBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  private readonly stylesMapper: StylesConfigMapBuilder;
  private readonly stylesRepository: StylesRepository;
  private readonly namer: ScopedVariableNamer;
  private readonly _head: string[] = [];
  readonly config: HtmlModuleBuilderConfig;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: HtmlModuleBuilderConfig;
  }) {
    this.entry = entry;
    this.widgetName = entry.key.name;
    this.config = config;
    this.namer = new ScopedVariableNamer(
      entry.key.id,
      ReservedKeywordPlatformPresets.html
    );

    this.stylesMapper = new StylesConfigMapBuilder(
      entry,
      {
        namer: this.namer,
        rename_tag: false, // vanilla html tag will be preserved.
      },
      Framework.vanilla
    );

    this.stylesRepository = new StylesRepository(
      this.stylesMapper.map,
      this.config?.disable_all_optimizations
        ? undefined
        : // ALWAYS USE EXACT OVERLAPPING STYLE REDUCTION STRATEGY FOR PREVIEW VANILLA
          create_duplication_reduction_map
    );

    if (config.fonts) {
      htmlFontsMiddleware(this, config.fonts.services);
    }
  }

  private styledConfig(
    id: string
  ): StyledComponentJSXElementConfig | NoStyleJSXElementConfig {
    return this.stylesRepository.get(id);
  }

  private jsxBuilder(widget: JsxWidget) {
    return buildJsx(
      widget,
      {
        styledConfig: (id) => this.styledConfig(id),
        idTransformer: (jsx, id) => injectIdToJsx(jsx, id),
      },
      {
        self_closing_if_possible: false, // html cannot be self closed
      }
    );
  }

  /**
   * adds literal string to <head> tag
   */
  head(...items: string[]) {
    this._head.push(...items);
    return this;
  }

  /**
   * build the part head, excluding styles
   */
  partHead(): string {
    return this._head.join("\n");
  }

  partStyles(): string {
    const css_declarations: CssDeclaration[] = [];

    // global vanilla default injected style
    css_declarations.push({
      key: {
        name: "*",
        selector: "tag",
      },
      style: k.user_agent_stylesheet_override_default,
    });

    // ------------------
    // standard body css
    css_declarations.push(
      ...Array.from(this.stylesRepository.uniques())
        .map((k) => {
          const item = this.stylesRepository.get(
            k
          ) as JSXWithStyleElementConfig;
          return <CssDeclaration>{
            key: {
              name: item.id,
              selector: "id",
            },
            style: item.style,
          };
        })
        .filter((s) => s)
    );
    // ------------------

    // declare additional styles requested by user
    this.config.additional_css_declarations?.forEach((d) => {
      css_declarations.push(d);
    });

    const strfied_css = css_declarations
      .map((css) => {
        const selectors = {
          id: "#",
          class: ".",
          tag: "",
        };

        const style = buildCSSStyleData(css.style);
        const key = selectors[css.key.selector] + css.key.name;

        // main
        const main = `${key} {${formatCssBodyString(style.main)}}`;

        // support pseudo-selectors
        const pseudos = Object.keys(style.pseudo).map((k) => {
          const body = style.pseudo[k];
          const pseudo = `${key}${k} {${formatCssBodyString(body)}}`;
          return pseudo;
        });

        const all = [main, ...pseudos].join("\n");

        return all;
      })
      .join("\n\n");

    return strfied_css;
  }

  partBody(): JSXChildLike {
    let jsxTree = this.jsxBuilder(this.entry);
    return jsxTree;
  }

  /**
   *
   * @returns merged final html file src
   */
  render(): string {
    const strfied_body = stringfy(this.partBody(), {
      language: "jsx",
      indentation: "\t",
    });

    const final = html_render({
      head: this.partHead(),
      css: this.partStyles(),
      body: strfied_body,
    });

    return final;
  }

  export() {
    return {
      code: this.render(),
      name: this.widgetName,
      /** TODO: add fonts as dependency */
      dependencies: [],
    };
  }
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

const html_render = ({
  head,
  css,
  body,
}: {
  head: string;
  css: string;
  body: string;
}) => {
  // TODO: fixme - this is inacurate (the first line won't be indented)
  const indenter = (s: string, tabs: number = 0) =>
    s.replace(/\n/g, "\n" + "\t".repeat(tabs));

  return `<!DOCTYPE html>
<html>
  <head>
${indenter(
  stringfyHtmlMeta({
    charset: "utf-8",
  }),
  2
)}
${indenter(head, 2)}
    <style>
${indenter(css, 3)}
    </style>
  </head>
  <body>
${indenter(body, 2)}
  </body>
</html>`;
};

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
function formatCssBodyString(styleString: string): string {
  const lines: string[] = [];
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
