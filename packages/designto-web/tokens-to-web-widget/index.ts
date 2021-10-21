import * as core from "@reflect-ui/core";
import { tokens as special } from "@designto/token";
import * as web from "@web-builder/core";
import { StylableJsxWidget } from "@web-builder/core";
import { keyFromWidget } from "@web-builder/core";
import { MainImageRepository } from "@design-sdk/core/assets-repository";
import * as css from "@web-builder/styles";
import { compose_wrap } from "./compose-wrap";
import { compose_wrapped_with_clip_rrect } from "./compose-wrapped-with-clip-rrect";
import { compose_wrapped_with_rotation } from "./compose-wrapped-with-rotation";
import { compose_wrapped_with_blurred } from "./compose-wrapped-with-blurred";
import { compose_wrapped_with_opacity } from "./compose-wrapped-with-opacity";
import { compose_wrapped_with_positioned } from "./compose-wrapped-with-positioned";
import { compose_wrapped_with_clip_stretched } from "./compose-wrapped-with-stretched";
import { compose_wrapped_with_sized_box } from "./compose-wrapped-with-sized-box";
import { compose_wrapped_with_overflow_box } from "./compose-wrapped-with-overflow-box";
import { IWHStyleWidget } from "@reflect-ui/core";

export function buildWebWidgetFromTokens(
  widget: core.Widget
): StylableJsxWidget {
  const composed = compose(widget, {
    is_root: true,
  });

  if (process.env.NODE_ENV === "development") {
    console.info("dev::", "final web token composed", composed);
  }

  return composed;
}

export type Composer = (
  widget: core.Widget,
  context?: { is_root: boolean }
) => StylableJsxWidget;

function compose(widget: core.Widget, context: { is_root: boolean }) {
  const handleChildren = (children: core.Widget[]): StylableJsxWidget[] => {
    return children?.map((c) => {
      return handleChild(c);
    });
  };

  const handleChild = (child: core.Widget): StylableJsxWidget => {
    return compose(child, { ...context, is_root: false });
  };

  const _remove_width_height_if_root_wh = {
    width: context.is_root ? undefined : (widget as IWHStyleWidget).width,
    height: context.is_root ? undefined : (widget as IWHStyleWidget).height,
  };

  const default_props_for_layout = {
    ...widget,
    ..._remove_width_height_if_root_wh,
  };

  const _key = keyFromWidget(widget);

  let thisWebWidget: StylableJsxWidget;
  // ------------------------------------
  // region layouts
  // ------------------------------------
  if (widget instanceof core.Column) {
    thisWebWidget = new web.Column({
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Row) {
    thisWebWidget = new web.Row({
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Wrap) {
    thisWebWidget = compose_wrap(widget, handleChildren(widget.children));
  } else if (widget instanceof core.Flex) {
    thisWebWidget = new web.Flex({
      ...widget,
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Stack) {
    const _remove_overflow_if_root_overflow = {
      clipBehavior: context.is_root
        ? undefined
        : (widget as core.Stack).clipBehavior,
    };

    thisWebWidget = new web.Stack({
      ...default_props_for_layout,
      ..._remove_overflow_if_root_overflow,
      children: handleChildren(widget.children as []),
      key: _key,
    });
  } else if (widget instanceof core.SingleChildScrollView) {
    // since web css does not require additional hierarchy for scroll view, we can simply merge properties.
    // merge single child scroll view properties for
    thisWebWidget = new web.Flex({
      ...widget.child,
      ...widget,
      overflow: "auto",
      children: handleChildren(widget.children as []),
      key: _key,
    });
    //
  } else if (widget instanceof core.Positioned) {
    thisWebWidget = compose_wrapped_with_positioned(widget, handleChild);
  } else if (widget instanceof core.SizedBox) {
    thisWebWidget = compose_wrapped_with_sized_box(widget, handleChild);
  } else if (widget instanceof core.OverflowBox) {
    thisWebWidget = compose_wrapped_with_overflow_box(widget, handleChild);
  }
  // ENGREGION layouts ------------------------------------------------------------------------
  else if (widget instanceof core.Opacity) {
    thisWebWidget = compose_wrapped_with_opacity(widget, handleChild);
  } else if (widget instanceof core.Blurred) {
    thisWebWidget = compose_wrapped_with_blurred(widget, handleChild);
  } else if (widget instanceof core.Rotation) {
    thisWebWidget = compose_wrapped_with_rotation(widget, handleChild);
  }
  // ----- region clip path ------
  else if (widget instanceof core.ClipRRect) {
    thisWebWidget = compose_wrapped_with_clip_rrect(widget, handleChild);
  } else if (widget instanceof core.ClipPath) {
    thisWebWidget = handleChild(widget.child);
    thisWebWidget.extendStyle({
      ...css.clipPath(widget),
      top: undefined,
      left: undefined,
      right: undefined,
      bottom: undefined,
    });
  }
  // ----- endregion clip path ------
  else if (widget instanceof core.RenderedText) {
    thisWebWidget = new web.Text({
      ...widget,
      textStyle:
        widget.style /** explicit assignment - field name is different */,
      data: widget.data,
      key: _key,
    });
  } else if (widget instanceof core.VectorWidget) {
    thisWebWidget = new web.SvgElement({
      ...widget,
      data: widget.data,
      fill: widget.fill,
      key: _key,
    });
  } else if (widget instanceof core.ImageWidget) {
    thisWebWidget = new web.ImageElement({
      ...widget,
      src: widget.src,
      key: _key,
    });
  } else if (widget instanceof core.IconWidget) {
    // TODO: not ready - svg & named icon not supported

    switch ((widget.icon as core.IconData)._type) {
      case "named-icon": {
        const _tmp_icon_as_img = MainImageRepository.instance
          .get("fill-later-assets")
          .addImage({
            key: widget.key.id,
          });

        thisWebWidget = new web.ImageElement({
          ...widget,
          width: widget.size,
          height: widget.size,
          src:
            _tmp_icon_as_img.url ||
            /*fallback*/ "https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png", // TODO: change this
          key: _key,
        });
        break;
      }
      case "remote-uri": {
        thisWebWidget = new web.ImageElement({
          ...widget,
          width: widget.size,
          height: widget.size,
          src: widget.icon.uri,
          key: _key,
          alt: "icon",
        });
        break;
      }
    }
  }

  // execution order matters - some above widgets inherits from Container, this shall be handled at the last.
  else if (widget instanceof core.Container) {
    thisWebWidget = new web.Container({
      ...widget,
      key: _key,
      borderRadius: widget.borderRadius,
      width: widget.width,
      height: widget.height,
    });
    thisWebWidget.x = widget.x;
    thisWebWidget.y = widget.y;
    thisWebWidget.background = widget.background;
  }

  // -------------------------------------
  // special tokens
  // -------------------------------------
  else if (widget instanceof special.Stretched) {
    thisWebWidget = compose_wrapped_with_clip_stretched(widget, handleChild);
  }
  // -------------------------------------

  // -------------------------------------
  // end of logic gate
  // -------------------------------------
  else {
    // todo - handle case more specific
    thisWebWidget = new web.ErrorWidget({
      key: _key,
      errorMessage: `The input design was not handled. "${
        widget.key.originName
      }" type of "${widget._type}" - ${JSON.stringify(widget.key)}`,
    });
  }
  // -------------------------------------
  // -------------------------------------

  // post extending - do not abuse this
  if (context.is_root) {
    thisWebWidget.extendStyle({
      // TODO: add overflow x hide handling by case.
      // "overflow-x": "hidden",
    });
  }

  return thisWebWidget;
}
