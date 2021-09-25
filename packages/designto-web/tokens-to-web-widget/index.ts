import * as core from "@reflect-ui/core";
import { tokens as special } from "@designto/token";
import * as web from "@web-builder/core";
import { WidgetTree } from "@web-builder/core";
import { keyFromWidget } from "@web-builder/core";
import { MainImageRepository } from "@design-sdk/core/assets-repository";
import * as css from "@web-builder/styles";
import { Axis } from "@reflect-ui/core";

export function buildWebWidgetFromTokens(
  widget: core.Widget,
  context: {
    is_root: boolean;
  }
): WidgetTree {
  const handleChildren = (children: core.Widget[]): WidgetTree[] => {
    return children?.map((c) => {
      return handleChild(c);
    });
  };

  const handleChild = (child: core.Widget): WidgetTree => {
    return buildWebWidgetFromTokens(child, { ...context, is_root: false });
  };

  const _remove_width_height_if_root_wh = {
    width: context.is_root ? undefined : widget.width,
    height: context.is_root ? undefined : widget.height,
  };

  const default_props_for_layout = {
    ...widget,
    ..._remove_width_height_if_root_wh,
  };

  const _key = keyFromWidget(widget);

  let thisWebWidget: WidgetTree;
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
  } else if (widget instanceof core.Flex) {
    thisWebWidget = new web.Flex({
      ...widget,
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Stack) {
    thisWebWidget = new web.Stack({
      ...default_props_for_layout,
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
    thisWebWidget = handleChild(widget.child);
    // -------------------------------------
    // override w & h with position provided w/h
    thisWebWidget.extendStyle({
      width: css.px(widget.width),
      height: css.px(widget.height),
    });
    // -------------------------------------
    thisWebWidget.constraint = {
      left: widget.left,
      top: widget.top,
      right: widget.right,
      bottom: widget.bottom,
    };
  } else if (widget instanceof core.Text) {
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
    });
    thisWebWidget.color = widget.color;
    thisWebWidget.x = widget.x;
    thisWebWidget.y = widget.y;
    thisWebWidget.width = widget.width;
    thisWebWidget.height = widget.height;
    thisWebWidget.background = widget.background;
  }

  // -------------------------------------
  // special tokens
  // -------------------------------------
  else if (widget instanceof special.Stretched) {
    let remove_size;
    switch (widget.axis) {
      case Axis.horizontal:
        remove_size = "height";
        break;
      case Axis.vertical:
        remove_size = "width";
        break;
    }

    thisWebWidget = handleChild(widget.child);
    thisWebWidget.extendStyle({
      "align-self": "stretch",
      [remove_size]: undefined,
    });
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
