import * as core from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import * as painting from "../painting";
import * as rendering from "../rendering";
import * as dartui from "../dart-ui";
import { tokens as special, t2t } from "@designto/token";
import { MainImageRepository } from "@design-sdk/asset-repository";
import { Axis, BoxShape } from "@reflect-ui/core";
import { escapeDartString } from "@coli.codes/escape-string";
import { boxDecorationPart } from "../painting";
import {
  flutter_handle_svg_vector_as_bitmap_converted,
  handle_flutter_case_nested_positioned_stack,
  handle_flutter_case_no_size_stack_children,
} from "../case-handling";
import { rd } from "../_utils";
import assert from "assert";
import { WrappingContainer } from "@designto/token/tokens";

export function buildFlutterWidgetFromTokens(
  widget: core.DefaultStyleWidget
): flutter.Widget {
  const composed = compose(widget, {
    is_root: true,
  });

  if (process.env.NODE_ENV === "development") {
    console.info("dev::", "final flutter token composed", composed);
  }

  return composed;
}

function compose(
  widget: core.DefaultStyleWidget,
  context: { is_root: boolean }
) {
  assert(widget, "input widget is required");

  const handleChildren = (
    children: core.DefaultStyleWidget[]
  ): flutter.Widget[] => {
    return children?.map((c) => {
      return handleChild(c);
    });
  };

  const handleChild = (child: core.DefaultStyleWidget): flutter.Widget => {
    return compose(child, { ...context, is_root: false });
  };

  const _remove_width_height_if_root_wh = {
    width: context.is_root ? undefined : rd(widget.width),
    height: context.is_root ? undefined : rd(widget.height),
  };

  const default_props_for_layout = {
    ...widget,
    ..._remove_width_height_if_root_wh,
  };

  //   const _key = keyFromWidget(widget);
  let thisFlutterWidget: flutter.Widget;

  const flex_props = (f: core.Flex) => {
    return {
      mainAxisAlignment: rendering.mainAxisAlignment(f.mainAxisAlignment),
      crossAxisAlignment: rendering.crossAxisAlignment(f.crossAxisAlignment),
      mainAxisSize: rendering.mainAxisSize(f.mainAxisSize),
      verticalDirection: painting.verticalDirection(f.verticalDirection),
    };
  };

  if (widget instanceof core.Column) {
    const children = compose_item_spacing_children(widget.children, {
      itemspacing: widget.itemSpacing,
      axis: widget.direction,
    });
    thisFlutterWidget = new flutter.Column({
      ...default_props_for_layout,
      ...flex_props(widget),
      children: children,
      //   key: _key,
    });
  } else if (widget instanceof core.Row) {
    const children = compose_item_spacing_children(widget.children, {
      itemspacing: widget.itemSpacing,
      axis: widget.direction,
    });
    thisFlutterWidget = new flutter.Row({
      ...default_props_for_layout,
      ...flex_props(widget),
      children: children,
      //   key: _key,
    });
  } else if (widget instanceof core.Wrap) {
    thisFlutterWidget = new flutter.Wrap({
      ...default_props_for_layout,
      direction: painting.axis(widget.direction),
      alignment: rendering.wrapAlignment(widget.alignment),
      spacing: widget.spacing,
      runAlignment: rendering.wrapAlignment(widget.runAlignment),
      runSpacing: widget.runSpacing,
      crossAxisAlignment: rendering.wrapCrossAxisAlignment(
        widget.crossAxisAlignment
      ),
      verticalDirection: painting.verticalDirection(widget.verticalDirection),
      clipBehavior: dartui.clip(widget.clipBehavior),
      children: handleChildren(widget.children),
      key: undefined,
    });
  } else if (widget instanceof core.Flex) {
    // FIXME: FLEX not supported yet.
    thisFlutterWidget = new flutter.Flex({
      ...widget,
      ...default_props_for_layout,
      ...flex_props(widget),
      clipBehavior: null,
      direction: painting.axis(widget.direction),
      children: handleChildren(widget.children),
      //   key: _key,
    });
  } else if (widget instanceof core.Stack) {
    const _remove_overflow_if_root_overflow = {
      clipBehavior: context.is_root
        ? undefined
        : dartui.clip((widget as core.Stack).clipBehavior),
    };

    const children = handle_flutter_case_no_size_stack_children(
      handleChildren(widget.children as [])
    );
    const stack = new flutter.Stack({
      ...default_props_for_layout,
      ..._remove_overflow_if_root_overflow,
      children: children,
      //   key: _key,
    });
    if (!context.is_root) {
      thisFlutterWidget = handle_flutter_case_nested_positioned_stack(stack);
    } else {
      thisFlutterWidget = stack;
    }
  } else if (widget instanceof core.SingleChildScrollView) {
    const _child = handleChild(widget.child);
    thisFlutterWidget = new flutter.SingleChildScrollView({
      // TODO: map axis
      //   scrollDirection: widget.direction,
      child: _child,
    });
  } else if (widget instanceof core.Positioned) {
    const _tmp_length_convert = (l) => {
      return rd(l) as number;
    };

    const _child = handleChild(widget.child);
    if (_child) {
      thisFlutterWidget = new flutter.Positioned({
        left: widget.left && _tmp_length_convert(widget.left),
        right: widget.right && _tmp_length_convert(widget.right),
        top: widget.top && _tmp_length_convert(widget.top),
        bottom: widget.bottom && _tmp_length_convert(widget.bottom),
        child: _child,
      });
      // -------------------------------------
      // override w & h with position provided w/h
      if (_child instanceof flutter.Container) {
        _child.width = rd(widget.width);
        _child.height = rd(widget.height);
      }
      // -------------------------------------
    }
  } else if (widget instanceof core.SizedBox) {
    //
  } else if (widget instanceof core.OverflowBox) {
    //
  } else if (widget instanceof core.Opacity) {
    thisFlutterWidget = new flutter.Opacity({
      opacity: widget.opacity,
      child: handleChild(widget.child),
    });
  } else if (widget instanceof core.Blurred) {
    // FIXME: blur flutter control
    //   const isBlurVisibile = widget.blur.visible;
    //   if (isBlurVisibile) {
    //     if (widget.blur.type === "LAYER_BLUR") {
    //     } else if (widget.blur.type === "BACKGROUND_BLUR") {
    //     }
    //   }
  } else if (widget instanceof core.Rotation) {
    thisFlutterWidget = flutter.Transform.rotate({
      angle: widget.rotation,
      child: handleChild(widget.child),
    });
  } else if (widget instanceof core.Expanded) {
    thisFlutterWidget = new flutter.Expanded({
      flex: widget.flex,
      child: handleChild(widget.child),
    });
  }

  // ----- region clip path ------
  else if (widget instanceof core.ClipRRect) {
    // FIXME: flutter clip rrect support is not ready.
    thisFlutterWidget = handleChild(widget.child);
  } else if (widget instanceof core.ClipPath) {
    // FIXME: flutter clip path support is not ready.
    thisFlutterWidget = handleChild(widget.child);
  }
  // ----- endregion clip path ------
  else if (widget instanceof core.RenderedText) {
    const _escaped_dart_string = escapeDartString(widget.data);
    thisFlutterWidget = new flutter.Text(_escaped_dart_string, {
      ...widget,
      textAlign: dartui.textAlign(widget.textAlign),
      style: painting.textStyle(widget.style),
      /** explicit assignment - field name is different */
      //   key: _key,
    });
  } else if (widget instanceof core.VectorWidget) {
    const id = widget.key.id;
    // use widget as baked image.
    thisFlutterWidget = handleChild(t2t.vector_token_to_image_token(widget));
    // TODO: convert vector data to bitmap, host the image, than load.
    // thisFlutterWidget = flutter_handle_svg_vector_as_bitmap_converted(widget);
  } else if (widget instanceof core.ImageWidget) {
    thisFlutterWidget = flutter.Image.network(widget.src, {
      width: rd(widget.width),
      height: rd(widget.height),
      // fit?: BoxFit;
      //   key: _key,
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

        thisFlutterWidget = flutter.Image.network(
          _tmp_icon_as_img.url ||
            /*fallback*/ "https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png", // TODO: change this
          {
            width: rd(widget.width),
            height: rd(widget.height),
            // fit?: BoxFit;
            //   key: _key,
          }
        );
        break;
      }
      case "remote-uri": {
        thisFlutterWidget = flutter.Image.network(widget.icon.uri, {
          width: rd(widget.size),
          height: rd(widget.size),
          semanticLabel: "icon",
          //   key: _key,
        });
        break;
      }
    }
  }

  // #region component widgets
  // button
  else if (widget instanceof core.ButtonStyleButton) {
    // TODO: widget.icon - not supported
    // thisFlutterWidget = compose_unwrapped_button(_key, widget);
  }
  // textfield
  else if (widget instanceof core.TextField) {
    // thisFlutterWidget = compose_unwrapped_text_input(_key, widget);
  } else if (widget instanceof core.Slider) {
    // thisFlutterWidget = compose_unwrapped_slider(_key, widget);
  }
  // wrapping container
  else if (widget instanceof WrappingContainer) {
    // #region
    // mergable widgets for web
    // if (widget.child instanceof core.TextField) {
    //   thisFlutterWidget = compose_unwrapped_text_input(
    //     _key,
    //     widget.child,
    //     widget
    //   );
    // } else if (widget.child instanceof core.ButtonStyleButton) {
    //   thisFlutterWidget = compose_unwrapped_button(_key, widget.child, widget);
    // } else if (widget.child instanceof core.Slider) {
    //   thisFlutterWidget = compose_unwrapped_slider(_key, widget.child, widget);
    // } else {
    //   throw new Error(
    //     `Unsupported widget type: ${widget.child.constructor.name}`
    //   );
    // }
    // #endregion
  }
  // #endregion

  // execution order matters - some above widgets inherits from Container, this shall be handled at the last.
  else if (widget instanceof core.Container) {
    // flutter cannot set both shape circle & border radius.
    let _deco_part_shape_and_border_radius = {};
    if (widget.shape == BoxShape.circle) {
      _deco_part_shape_and_border_radius = {
        shape: painting.boxshape(widget.shape),
        borderRadius: undefined,
      };
    } else {
      _deco_part_shape_and_border_radius = {
        borderRadius: painting.borderRadius(widget.borderRadius),
        shape: painting.boxshape(widget.shape),
      };
    }

    const _deco_part_bg = boxDecorationPart.fromBackground(widget.background);
    thisFlutterWidget = new flutter.Container({
      padding: painting.edgeinsets(widget.padding),
      margin: painting.edgeinsets(widget.margin),
      width: rd(widget.width),
      height: rd(widget.height),
      decoration: new flutter.BoxDecoration({
        border: painting.border(widget.border),
        ..._deco_part_shape_and_border_radius,
        ..._deco_part_bg,
        boxShadow: painting.boxShadow(widget.boxShadow),
        // TODO: background list
        // background: painting.linearGradient(widget.background.gradient),
      }),
      //   key: _key,
    });
    // thisFlutterWidget.x = widget.x;
    // thisFlutterWidget.y = widget.y;
    // thisFlutterWidget.background = widget.background;
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

    thisFlutterWidget = handleChild(widget.child);
    thisFlutterWidget = wrap_with_sized_and_inject_size(thisFlutterWidget, {
      [remove_size]: undefined, // Double.infinity,
    });
  }
  // -------------------------------------

  // -------------------------------------
  // end of logic gate
  // -------------------------------------
  else {
    const err_user_msg = `The input design was not handled. "${
      widget.key.originName
    }" type of "${widget._type}" - ${JSON.stringify(widget.key)}`;
    console.error(
      "flutter: error while handling the design token",
      err_user_msg,
      "the input token was",
      widget
    );

    // todo - handle case more specific
    thisFlutterWidget = flutter.ErrorWidget.withDetails({
      //   key: _key,
      message: escapeDartString(err_user_msg),
    }) as flutter.Widget;
  }
  // -------------------------------------
  // -------------------------------------

  // post extending - do not abuse this
  if (context.is_root) {
    // TODO: add overflow x hide handling by case.
  }

  return thisFlutterWidget;
}

/**
 * children under col / row with item spacing on each between with sizedbox.
 * ```
 * s = SizedBox()
 * | 1 | 2 | 3 | 4 |
 * | 1 | s | 2 | s | 3 | s | 4
 * ```
 */
function compose_item_spacing_children(
  children: core.DefaultStyleWidget[],
  args: {
    itemspacing: number;
    axis: Axis;
  }
) {
  let injection = undefined;
  if (args.itemspacing) {
    const wh = args.axis === Axis.horizontal ? "width" : "height";
    injection = new flutter.SizedBox({
      [wh]: rd(args.itemspacing),
    });
  }
  return compoes_children_with_injection(children, injection);
}

/**
 * children under col / row with item spacing on each between.
 * ```
 * | 1 | 2 | 3 | 4 |
 * | 1 | x | 2 | x | 3 | x | 4
 * ```
 */
function compoes_children_with_injection(
  children: core.DefaultStyleWidget[],
  between?: flutter.Widget
): flutter.Widget[] {
  const composedchildren = children.map((c) => {
    return compose(c, {
      is_root: false,
    });
  });

  const result: flutter.Widget[] = [];
  composedchildren.forEach((c, i) => {
    result.push(c);
    if (between) {
      if (i !== children.length - 1) {
        result.push(between);
      }
    }
  });
  return result;
  // const result = array.reduce((r, a) => r.concat(a, 0), [0]);
}

function wrap_with_sized_and_inject_size(
  widget: flutter.Widget,
  size: {
    width?: flutter.double;
    height?: flutter.double;
  }
) {
  if (
    widget instanceof flutter.Container ||
    widget instanceof flutter.SizedBox
  ) {
    size.width && (widget.width = size.width);
    size.height && (widget.height = size.height);
    return widget;
  } else {
    return new flutter.SizedBox({
      child: widget,
      width: rd(size.width),
      height: rd(size.height),
    });
  }
}
