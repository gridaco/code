import * as core from "@reflect-ui/core";
import { tokens as special } from "@designto/token";
import * as rn from "@web-builder/react-native";
import { JsxWidget, StylableJsxWidget, keyFromWidget } from "@web-builder/core";
import { MainImageRepository } from "@design-sdk/core/assets-repository";
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
import * as reusable from "@code-features/component/tokens";
import assert from "assert";

interface RnWidgetComposerConfig {}

export function buildRNWidgetFromTokens(
  widget: core.Widget,
  config: RnWidgetComposerConfig
): JsxWidget {
  const composed = compose(
    widget,
    {
      is_root: true,
    },
    config
  );
  return composed;
}

export type Composer = (
  widget: core.Widget,
  context?: { is_root: boolean },
  config?: RnWidgetComposerConfig
) => StylableJsxWidget;

function compose<T extends JsxWidget>(
  widget: core.Widget,
  context: { is_root: boolean },
  config: RnWidgetComposerConfig
): T {
  assert(widget, "input widget is required");

  const handleChildren = <T extends JsxWidget>(
    children: core.Widget[]
  ): T[] => {
    return children?.map((c) => {
      return handleChild(c);
    });
  };

  const handleChild = <T extends JsxWidget>(child: core.Widget): T => {
    return compose(child, { ...context, is_root: false }, config);
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
  let thisRnWidget: JsxWidget;

  // ------------------------------------
  // region layouts
  // ------------------------------------
  if (widget instanceof core.Column) {
    thisRnWidget = new rn.Column({
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Row) {
    thisRnWidget = new rn.Row({
      ...default_props_for_layout,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Wrap) {
    thisRnWidget = compose_wrap(widget, handleChildren(widget.children));
  } else if (widget instanceof core.Flex) {
    thisRnWidget = new rn.Flex({
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

    thisRnWidget = new rn.Stack({
      ...default_props_for_layout,
      ..._remove_overflow_if_root_overflow,
      children: handleChildren(widget.children as []),
      key: _key,
    });
  } else if (widget instanceof core.SingleChildScrollView) {
    // since web css does not require additional hierarchy for scroll view, we can simply merge properties.
    // merge single child scroll view properties for
    thisRnWidget = new rn.Flex({
      ...widget.child,
      ...widget,
      // overflow: "auto", // TODO: inspect me
      children: handleChildren(widget.children as []),
      key: _key,
    });
    //
  } else if (widget instanceof core.Positioned) {
    thisRnWidget = compose_wrapped_with_positioned(widget, handleChild);
  } else if (widget instanceof core.SizedBox) {
    thisRnWidget = compose_wrapped_with_sized_box(widget, handleChild);
  } else if (widget instanceof core.OverflowBox) {
    thisRnWidget = compose_wrapped_with_overflow_box(widget, handleChild);
  }
  // ENGREGION layouts ------------------------------------------------------------------------
  else if (widget instanceof core.Opacity) {
    thisRnWidget = compose_wrapped_with_opacity(widget, handleChild);
  } else if (widget instanceof core.Blurred) {
    thisRnWidget = compose_wrapped_with_blurred(widget, handleChild);
  } else if (widget instanceof core.Rotation) {
    thisRnWidget = compose_wrapped_with_rotation(widget, handleChild);
  }
  // ----- region clip path ------
  else if (widget instanceof core.ClipRRect) {
    thisRnWidget = compose_wrapped_with_clip_rrect(widget, handleChild);
  } else if (widget instanceof core.ClipPath) {
    // FIXME: add clip-path support for react-native
    // const child = handleChild<StylableJsxWidget>(widget.child);
    // child.extendStyle({
    //   ...css.clipPath(widget),
    //   top: undefined,
    //   left: undefined,
    //   right: undefined,
    //   bottom: undefined,
    // });
    // thisRnWidget = child;
  }
  // ----- endregion clip path ------
  else if (widget instanceof core.RenderedText) {
    thisRnWidget = new rn.Text({
      ...widget,
      key: _key,
      textStyle:
        widget.style /** explicit assignment - field name is different */,
      data: widget.data,
      // experimental element specification
      elementPreference: widget.element_preference_experimental,
    });
  } else if (widget instanceof core.VectorWidget) {
    thisRnWidget = rn.SvgElement(
      {
        width: widget.width,
        height: widget.height,
        data: widget.data,
        fill: widget.fill,
        key: _key,
      },
      {
        config: {
          module: "react-native-svg",
          prefer_mode: "svg-with-path",
        },
      }
    );
  } else if (widget instanceof core.ImageWidget) {
    thisRnWidget = new rn.ImageElement({
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

        thisRnWidget = new rn.ImageElement({
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
        thisRnWidget = new rn.ImageElement({
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
    const container = new rn.Container({
      ...widget,
      key: _key,
      borderRadius: widget.borderRadius,
      width: widget.width,
      height: widget.height,
    });
    container.x = widget.x;
    container.y = widget.y;
    container.background = widget.background;
    thisRnWidget = container;
  }

  // -------------------------------------
  // special tokens
  // -------------------------------------
  else if (widget instanceof special.Stretched) {
    thisRnWidget = compose_wrapped_with_clip_stretched(widget, handleChild);
  }
  // -------------------------------------
  // -------------------------------------
  // support component / instance
  else if (widget instanceof reusable.InstanceWidget) {
    throw "not implemented";
    // thisRnWidget = compose_instanciation(widget, handleChild);
  }
  //
  // -------------------------------------
  // -------------------------------------
  // end of logic gate
  // -------------------------------------
  else {
    if (thisRnWidget)
      throw new Error(
        "internal error. this final exception gate should not be entered since there is already a composed widget."
      );
    // todo - handle case more specific
    thisRnWidget = new rn.ErrorWidget({
      key: _key,
      errorMessage: `The input design was not handled. "${
        widget.key.originName
      }" type of "${widget._type}" - ${JSON.stringify(widget.key)}`,
    });
    console.warn("not handled", widget);
  }
  // -------------------------------------
  // -------------------------------------

  // post extending - do not abuse this
  if (context.is_root) {
    // thisRnWidget.extendStyle({
    //   // TODO: add overflow x hide handling by case.
    //   // "overflow-x": "hidden",
    // });
  }

  return thisRnWidget as T;
}
