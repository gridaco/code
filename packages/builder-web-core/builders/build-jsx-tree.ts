import { handle } from "@coli.codes/builder";
import {
  JSXElementConfig,
  StylableJSXElementConfig,
  TextChildWidget,
  JsxWidget,
  StylableJsxWidget,
} from "@web-builder/core";
import {
  NoStyleJSXElementConfig,
  StyledComponentJSXElementConfig,
} from "@web-builder/styled";
import {
  JSXChildLike,
  JSXClosingElement,
  JSXElement,
  JSXIdentifier,
  JSXOpeningElement,
} from "coli";

////
//// region jsx tree builder
////
export function buildTextChildJsx(
  textchildwidget: TextChildWidget,
  config: StylableJSXElementConfig
) {
  const text = textchildwidget.textData().jsxConfig();
  const tag = handle<JSXIdentifier>(config.tag);

  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      attributes: config.attributes,
    }),
    children: text.tree,
    closingElement: new JSXClosingElement(tag),
  });
}

export function buildContainingJsx(
  container: JSXElementConfig,
  children: Array<JSXChildLike>
): JSXChildLike {
  switch (container.type) {
    case "static-tree": {
      return handle<JSXChildLike>(container.tree);
    }
    case "tag-and-attr": {
      const tag = handle<JSXIdentifier>(container.tag);
      return new JSXElement({
        openingElement: new JSXOpeningElement(tag, {
          attributes: container.attributes,
        }),
        closingElement: new JSXClosingElement(tag),
        children: children,
      });
    }
    default:
      throw new Error("error while building jsx");
  }
}

export function buildJsx(
  widget: JsxWidget,
  repository: {
    styledConfig: (
      key: string
    ) => StyledComponentJSXElementConfig | NoStyleJSXElementConfig;
    /**
     * required for id based styling strategy
     */
    idTransformer?: (jsx, id: string) => void;
  }
): JSXChildLike {
  const mapper = (widget: JsxWidget) => {
    const _jsxcfg = widget.jsxConfig();
    if (_jsxcfg.type === "static-tree") {
      return _jsxcfg.tree;
    }

    const children = widget.children?.map(mapper);

    if (widget instanceof StylableJsxWidget) {
      const styledconfig = repository.styledConfig(widget.key.id);
      if (widget instanceof TextChildWidget) {
        const jsx = buildTextChildJsx(widget, styledconfig);
        repository.idTransformer?.(jsx, styledconfig.id);
        return jsx;
      }
      const jsx = new JSXElement({
        openingElement: new JSXOpeningElement(styledconfig.tag, {
          attributes: styledconfig.attributes,
        }),
        closingElement: new JSXClosingElement(styledconfig.tag),
        children: children,
      });
      repository.idTransformer?.(jsx, styledconfig.id);
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
          children: children,
        });
        return jsx;
      }
      return;
    }
  };

  return mapper(widget);
}
