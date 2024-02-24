import { handle } from "@coli.codes/builder";
import {
  JSXElementConfig,
  StylableJSXElementConfig,
  TextChildWidget,
  JsxWidget,
  StylableJsxWidget,
} from "..";
import {
  NoStyleJSXElementConfig,
  StyledComponentJSXElementConfig,
} from "@web-builder/styled";
import {
  JSXAttributes,
  JSXChildLike,
  JSXClosingElement,
  JSXElement,
  JSXIdentifier,
  JSXOpeningElement,
  JSXSelfClosingElement,
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

/**
 *
 * A Utility-like general jsx builder globally used while building html tree.
 *
 * @param widget
 * @param repository
 * @returns
 */
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
    preprocess?: (jsx: JSXElementConfig) => JSXElementConfig;
  },
  options: {
    self_closing_if_possible?: boolean;
  }
): JSXChildLike {
  const force_dont_self_close = options.self_closing_if_possible === false;
  const mapper = (widget: JsxWidget) => {
    let _jsxcfg = widget.jsxConfig();
    if (_jsxcfg.type === "static-tree") {
      return _jsxcfg.tree;
    }

    // preprocess
    _jsxcfg = repository.preprocess?.(_jsxcfg) ?? _jsxcfg;

    const children = widget.children?.map(mapper);

    if (widget instanceof StylableJsxWidget) {
      const styledconfig = repository.styledConfig(widget.key.id);
      // region build jsx
      let jsx;
      if (widget instanceof TextChildWidget) {
        jsx = buildTextChildJsx(widget, styledconfig);
      } else {
        jsx = _jsx_element_with_self_closing_if_possible({
          tag: styledconfig.tag,
          attributes: styledconfig.attributes,
          children: children,
          options: {
            force_dont_self_close: force_dont_self_close,
          },
        });
      }
      // endregion build jsx

      // apply injected transformer (if present)
      repository.idTransformer?.(jsx, styledconfig.id);

      return jsx;
    } else {
      if (_jsxcfg.type === "tag-and-attr") {
        const _tag = handle(_jsxcfg.tag);
        const jsx = _jsx_element_with_self_closing_if_possible({
          tag: _tag,
          attributes: _jsxcfg.attributes,
          children: children,
          options: {
            force_dont_self_close: force_dont_self_close,
          },
        });

        return jsx;
      } else {
        // unreachable (static-tree is handled above)
      }
      return;
    }
  };

  return mapper(widget);
}

function _jsx_element_with_self_closing_if_possible({
  children,
  tag,
  attributes,
  options = {
    force_dont_self_close: false,
  },
}: {
  tag: JSXIdentifier;
  children?: any;
  attributes: JSXAttributes;
  options?: {
    force_dont_self_close?: boolean;
  };
}) {
  if (!options?.force_dont_self_close && (!children || children.length == 0)) {
    return new JSXSelfClosingElement(tag, {
      attributes: attributes,
    });
  } else {
    return new JSXElement({
      openingElement: new JSXOpeningElement(tag, {
        attributes: attributes,
      }),
      closingElement: new JSXClosingElement(tag),
      children: children,
    });
  }
}
