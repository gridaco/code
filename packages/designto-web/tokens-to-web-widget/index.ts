import * as core from "@reflect-ui/core";
import * as web from "@web-builder/core";
import { WidgetTree } from "@web-builder/core";
import { keyFromWidget } from "@web-builder/core";
import { MainImageRepository } from "@design-sdk/core/assets-repository";

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

  let thisReactWidget: WidgetTree;
  if (widget instanceof core.Column) {
    thisReactWidget = new web.Column({
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Row) {
    thisReactWidget = new web.Row({
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Stack) {
    thisReactWidget = new web.Stack({
      ...default_props_for_layout,
      children: handleChildren(widget.children as []),
      key: _key,
    }).__tmp_set_explicit_min_height(widget.height);
  } else if (widget instanceof core.SingleChildScrollView) {
    // since web css does not require additional hierarchy for scroll view, we can simply merge properties.
    // merge single child scroll view properties for
    thisReactWidget = new web.Flex({
      ...widget.child,
      ...widget,
      overflow: "auto",
      children: handleChildren(widget.children as []),
      key: _key,
    });
    //
  } else if (widget instanceof core.Positioned) {
    thisReactWidget = handleChild(widget.child);
    // TODO: shoul apply to all widgets. - make a container builder and blend the constraint properties.
    if (thisReactWidget instanceof web.Container) {
      // -------------------------------------
      // override w & h with position provided w/h
      thisReactWidget.width = widget.width;
      thisReactWidget.height = widget.height;
      // -------------------------------------
      thisReactWidget.constraint = {
        left: widget.left,
        top: widget.top,
        right: widget.right,
        bottom: widget.bottom,
      };
    }
  } else if (widget instanceof core.Text) {
    thisReactWidget = new web.Text({
      ...widget,
      data: widget.data,
      key: _key,
    });
  } else if (widget instanceof core.VectorWidget) {
    thisReactWidget = new web.SvgElement({
      ...widget,
      data: widget.data,
      fill: widget.fill,
      key: _key,
    });
  } else if (widget instanceof core.ImageWidget) {
    thisReactWidget = new web.ImageElement({
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

        thisReactWidget = new web.ImageElement({
          ...widget,
          src:
            _tmp_icon_as_img.url ||
            /*fallback*/ "https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png", // TODO: change this
          key: _key,
        });
        break;
      }
      case "remote-uri": {
        thisReactWidget = new web.ImageElement({
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
    thisReactWidget = new web.Container({
      ...widget,
      key: _key,
      borderRadius: widget.borderRadius,
    });
    thisReactWidget.color = widget.color;
    thisReactWidget.x = widget.x;
    thisReactWidget.y = widget.y;
    thisReactWidget.width = widget.width;
    thisReactWidget.height = widget.height;
    thisReactWidget.background = widget.background;
  } else {
    // todo - handle case more specific
    thisReactWidget = new web.ErrorWidget({
      key: _key,
      errorMessage: `The input design was not handled. "${
        widget.key.originName
      }" type of "${widget._type}" - ${JSON.stringify(widget)}`,
    });
  }

  return thisReactWidget;
}
