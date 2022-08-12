import * as core from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import * as painting from "../painting";
import * as rendering from "../rendering";
import * as dartui from "../dart-ui";
import { tokens as special, t2t, SnapshotWidget } from "@designto/token";
import { MainImageRepository } from "@design-sdk/asset-repository";
import { Axis, BoxShape } from "@reflect-ui/core";
import { escapeDartString } from "@coli.codes/escape-string";
import { boxDecorationPart } from "../painting";
import {
  flutter_handle_svg_vector_as_bitmap_converted,
  handle_flutter_biased_center_positioning,
  handle_flutter_case_nested_positioned_stack,
  handle_flutter_case_no_size_stack_children,
} from "../case-handling";
import { rd } from "../_utils";
import assert from "assert";
import { WrappingContainer } from "@designto/token/tokens";
import { handle_default_style_multichild_render_object_widget } from "./handle-default-style-multichild-render-object-widget";
import { compose_flutter_wrap } from "./compose-flutter-wrap";
import { compose_flutter_positioned } from "./compose-flutter-positioned";
import { compose_flutter_unwrapped_text_field } from "./compose-flutter-unwrapped-textfield";
import { compose_flutter_unwrapped_button } from "./compose-flutter-unwrapped-button";
import { compose_flutter_unwrapped_progress_indicator } from "./compose-flutter-unwrapped-progress-indicator";
import { compose_flutter_unwrapped_checkbox } from "./compose-flutter-unwrapped-checkbox";
import { compose_flutter_unwrapped_slider } from "./compose-flutter-unwrapped-slider";
import { unwrappedChild } from "@designto/token/wrappings";

export function compose(widget: core.DefaultStyleWidget): flutter.Widget {
  const composed = _compose(widget, {
    is_root: true,
  });

  if (process.env.NODE_ENV === "development") {
    console.info("dev::", "final flutter token composed", composed);
  }
  return composed;
}

export type Composer<T extends flutter.Widget = flutter.Widget> = (
  widget: core.Widget,
  child_composer: Composer,
  context?: { is_root: boolean }
) => T;

function _compose(
  widget: core.DefaultStyleWidget,
  context: { is_root: boolean; parent?: core.Widget }
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
    return _compose(child, { ...context, is_root: false, parent: widget });
  };

  const _remove_width_height_if_root_wh = {
    width: context.is_root ? undefined : rd(widget.width),
    height: context.is_root ? undefined : rd(widget.height),
  };

  const default_props_for_layout = {
    ...widget,
    ..._remove_width_height_if_root_wh,
  };

  const _key = new flutter.Key(
    escapeDartString(widget.key.originName + " " + `(${widget.key.id})`)
  );

  let final: flutter.Widget;

  // ------------------------------------
  // region layouts
  // ------------------------------------
  if (widget instanceof core.Column) {
    final = new flutter.Column({
      ...default_props_for_layout,
      ...flex_props(widget),
      children: compose_children_with_item_spacing(widget.children, {
        itemspacing: widget.itemSpacing,
        axis: widget.direction,
      }),
      key: _key,
    });
  } else if (widget instanceof core.Row) {
    final = new flutter.Row({
      ...default_props_for_layout,
      ...flex_props(widget),
      children: compose_children_with_item_spacing(widget.children, {
        itemspacing: widget.itemSpacing,
        axis: widget.direction,
      }),
      key: _key,
    });
  } else if (widget instanceof core.Wrap) {
    final = compose_flutter_wrap(_key, widget, handleChildren(widget.children));
  } else if (widget instanceof core.Flex) {
    // FIXME: FLEX not supported yet.
    final = new flutter.Flex({
      ...widget,
      ...default_props_for_layout,
      ...flex_props(widget),
      clipBehavior: null,
      direction: painting.axis(widget.direction),
      children: handleChildren(widget.children),
      key: _key,
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
      key: _key,
    });
    if (!context.is_root) {
      const wh = _nested_stack_wh_by_parent(context.parent);
      console.log("wh", wh);
      final = handle_flutter_case_nested_positioned_stack(stack, {
        widget: widget as SnapshotWidget<core.Stack>,
        ...wh,
      });
    } else {
      final = stack;
    }
  } else if (widget instanceof core.SingleChildScrollView) {
    const _child = handleChild(widget.child);
    final = new flutter.SingleChildScrollView({
      // TODO: map axis
      //   scrollDirection: widget.direction,
      child: _child,
    });
  } else if (widget instanceof core.Positioned) {
    const positioned = handle_flutter_biased_center_positioning(
      widget,
      handleChild,
      {
        compose_positioned: compose_flutter_positioned,
      }
    );

    if (positioned.child instanceof flutter.Container) {
      // -------------------------------------
      // override w & h with position provided w/h
      positioned.child.width = rd(widget.width);
      positioned.child.height = rd(widget.height);
    }

    final = positioned;
    if (!positioned.child) {
      // if the positioned does not contain a child, cancel it.
      final = null;
    }

    // -------------------------------------
  } else if (widget instanceof core.SizedBox) {
    // TODO:
    //
  } else if (widget instanceof core.OverflowBox) {
    // TODO:
    //
  } else if (widget instanceof core.Opacity) {
    final = new flutter.Opacity({
      opacity: rd(widget.opacity),
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
    final = flutter.Transform.rotate({
      angle: widget.rotation,
      child: handleChild(widget.child),
    });
  } else if (widget instanceof core.Expanded) {
    final = new flutter.Expanded({
      flex: widget.flex,
      child: handleChild(widget.child),
    });
  }

  // ----- region clip path ------
  else if (widget instanceof core.ClipRRect) {
    // FIXME: flutter clip rrect support is not ready.
    final = handleChild(widget.child);
  } else if (widget instanceof core.ClipPath) {
    // FIXME: flutter clip path support is not ready.
    final = handleChild(widget.child);
  }
  // ----- endregion clip path ------
  else if (widget instanceof special.SizedText) {
    const text = handleChild(widget.child);
    console.log(widget);
    final = new flutter.SizedBox({
      width: rd(widget.width),
      height: rd(widget.height),
      child: text,
    });
  } else if (widget instanceof core.RenderedText) {
    const _escaped_dart_string = escapeDartString(widget.data);
    final = new flutter.Text(_escaped_dart_string, {
      ...widget,
      textAlign: dartui.textAlign(widget.textAlign),
      style: painting.textStyle(widget.style),
      /** explicit assignment - field name is different */
      key: _key,
    });
  } else if (widget instanceof core.VectorWidget) {
    const id = widget.key.id;
    // use widget as baked image.
    final = handleChild(t2t.vector_token_to_image_token(widget));
    // TODO: convert vector data to bitmap, host the image, than load.
    // thisFlutterWidget = flutter_handle_svg_vector_as_bitmap_converted(widget);
  } else if (widget instanceof core.ImageWidget) {
    final = flutter.Image.network(widget.src, {
      width: rd(widget.width),
      height: rd(widget.height),
      // fit?: BoxFit;
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

        final = flutter.Image.network(
          _tmp_icon_as_img.url ||
            /*fallback*/ "https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png", // TODO: change this
          {
            width: rd(widget.width),
            height: rd(widget.height),
            // fit?: BoxFit;
            key: _key,
          }
        );
        break;
      }
      case "remote-uri": {
        final = flutter.Image.network(widget.icon.uri, {
          width: rd(widget.size),
          height: rd(widget.size),
          semanticLabel: "icon",
          key: _key,
        });
        break;
      }
    }
  }

  // #region component widgets
  // button
  else if (widget instanceof core.ButtonStyleButton) {
    final = compose_flutter_unwrapped_button(_key, widget, handleChild);
  }
  // checkbox
  else if (widget instanceof core.Checkbox) {
    final = compose_flutter_unwrapped_checkbox(_key, widget);
  }
  // textfield
  else if (widget instanceof core.TextField) {
    final = compose_flutter_unwrapped_text_field(_key, widget);
  }
  // slider
  else if (widget instanceof core.Slider) {
    final = compose_flutter_unwrapped_slider(_key, widget);
  }
  // progress
  else if (widget instanceof core.ProgressIndicator) {
    final = compose_flutter_unwrapped_progress_indicator(_key, widget);
  }

  // wrapping container
  else if (widget instanceof WrappingContainer) {
    const { child } = widget;
    // #region
    // mergable widgets @see - designto/web/tokens-to-web-widget.ts
    if (child instanceof core.TextField) {
      final = compose_flutter_unwrapped_text_field(_key, child, widget);
    } else if (widget.child instanceof core.ButtonStyleButton) {
      final = compose_flutter_unwrapped_button(
        _key,
        widget.child,
        handleChild,
        widget
      );
    } else if (child instanceof core.Checkbox) {
      final = compose_flutter_unwrapped_checkbox(_key, child);
    } else if (child instanceof core.Slider) {
      final = compose_flutter_unwrapped_slider(_key, child);
    } else if (child instanceof core.ProgressIndicator) {
      final = compose_flutter_unwrapped_progress_indicator(_key, child);
    }
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
    final = new flutter.Container({
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
      key: _key,
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

    final = handleChild(widget.child);
    // TODO: don't use snapshot's value. use Stretched.preserved_width (TODO: << add this to tokenizer)
    const { snapshot } = unwrappedChild(widget.child) as SnapshotWidget;
    final = size(final, {
      width: snapshot?.width,
      height: snapshot?.height,
      [remove_size]: undefined, // Double.infinity,
    });
  }
  // -------------------------------------

  // -------------------------------------
  // end of logic gate
  // -------------------------------------
  else {
    return err(widget);
  }
  // -------------------------------------
  // -------------------------------------

  // post extending - do not abuse this
  if (context.is_root) {
    // TODO: add overflow x hide handling by case.
  }

  if (!final) {
    return err(widget);
  }

  // wrap existing with extra styles widgets
  final = handle_default_style_multichild_render_object_widget(final, widget);

  return final;
}

function err(widget) {
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
  return flutter.ErrorWidget.withDetails({
    // key: new flutter.Key(`error://${widget.key.id}`),
    message: escapeDartString(err_user_msg),
  }) as flutter.Widget;
}

/**
 * children under col / row with item spacing on each between with sizedbox.
 * ```
 * s = SizedBox()
 * | 1 | 2 | 3 | 4 |
 * | 1 | s | 2 | s | 3 | s | 4
 * ```
 */
function compose_children_with_item_spacing(
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
    return _compose(c, {
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

/**
 * size the widget with width and height.
 * if the widget is a container or sizedbox (or other w, h containing widget), alt the property.
 * if not, wrap with SizeBox with givven size.
 * @param widget
 * @param size
 * @returns
 */
function size(
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
    // remove or assign the size
    widget.width = size.width;
    widget.height = size.height;
    return widget;
  } else {
    return new flutter.SizedBox({
      child: widget,
      width: rd(size.width),
      height: rd(size.height),
    });
  }
}

const flex_props = (f: core.Flex) => {
  return {
    mainAxisAlignment: rendering.mainAxisAlignment(f.mainAxisAlignment),
    crossAxisAlignment: rendering.crossAxisAlignment(f.crossAxisAlignment),
    mainAxisSize: rendering.mainAxisSize(f.mainAxisSize),
    verticalDirection: painting.verticalDirection(f.verticalDirection),
  };
};

function _nested_stack_wh_by_parent(parent: core.Widget): {
  explicit_width: boolean;
  explicit_height: boolean;
  _d_reason?: string;
} {
  if (parent instanceof core.Flex) {
    switch (parent.direction) {
      case Axis.horizontal:
        return {
          explicit_width: true,
          explicit_height: false,
          _d_reason: 'parent is typeof Flex with direction "horizontal"',
        };
      case Axis.vertical:
        return {
          explicit_width: false,
          explicit_height: true,
          _d_reason: 'parent is typeof Flex with direction "vertical"',
        };
    }
  }

  if (parent instanceof core.Stack) {
    return {
      explicit_width: true,
      explicit_height: true,
      _d_reason:
        "parent is typeof Stack, the stack under stack should have both fixed size to be rendered properly",
    };
  }

  if (parent instanceof special.Stretched) {
    switch (parent.axis) {
      case Axis.horizontal:
        return {
          explicit_width: true,
          explicit_height: false,
          _d_reason: 'parent is typeof Stretched with direction "horizontal"',
        };
      case Axis.vertical:
        return {
          explicit_width: false,
          explicit_height: true,
          _d_reason: 'parent is typeof Stretched with direction "vertical"',
        };
    }
  }

  console.log("flutter: _nested_stack_wh_by_parent", parent);
  return {
    explicit_width: false,
    explicit_height: false,
  };
}
