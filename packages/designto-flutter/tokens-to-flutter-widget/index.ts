import * as core from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import * as painting from "../painting";
import * as rendering from "../rendering";
import { tokens as special } from "@designto/token";
import { MainImageRepository } from "@design-sdk/core/assets-repository";
import { Axis } from "@reflect-ui/core";
import { Double } from "@flutter-builder/flutter";
import { escapeDartString } from "@coli.codes/escape-string";

export function buildFlutterWidgetFromTokens(
  widget: core.Widget
): flutter.Widget {
  const composed = compose(widget, {
    is_root: true,
  });

  if (process.env.NODE_ENV === "development") {
    console.info("dev::", "final web token composed", composed);
  }

  return composed;
}

function compose(widget: core.Widget, context: { is_root: boolean }) {
  const handleChildren = (children: core.Widget[]): flutter.Widget[] => {
    return children?.map((c) => {
      return handleChild(c);
    });
  };

  const handleChild = (child: core.Widget): flutter.Widget => {
    return compose(child, { ...context, is_root: false });
  };

  const _remove_width_height_if_root_wh = {
    width: context.is_root ? undefined : widget.width,
    height: context.is_root ? undefined : widget.height,
  };

  const default_props_for_layout = {
    ...widget,
    ..._remove_width_height_if_root_wh,
  };

  const flex_props = (f: core.Flex) => {
    return {
      mainAxisAlignment: rendering.mainAxisAlignment(f.mainAxisAlignment),
      crossAxisAlignment: rendering.crossAxisAlignment(f.crossAxisAlignment),
    };
  };
  //   const _key = keyFromWidget(widget);

  let thisFlutterWidget: flutter.Widget;
  if (widget instanceof core.Column) {
    thisFlutterWidget = new flutter.Column({
      ...default_props_for_layout,
      ...flex_props(widget),
      children: handleChildren(widget.children),
      //   key: _key,
    });
  } else if (widget instanceof core.Row) {
    thisFlutterWidget = new flutter.Row({
      ...default_props_for_layout,
      ...flex_props(widget),
      children: handleChildren(widget.children),
      //   key: _key,
    });
  } else if (widget instanceof core.Flex) {
    // FIXME: FLEX not supported yet.
    // thisFlutterWidget = new flutter.Flex({
    //   //   direction: widget.direction,
    //   //   ...widget,
    //   //   ...default_props_for_layout,
    //   children: handleChildren(widget.children),
    //   //   key: _key,
    // });
  } else if (widget instanceof core.Stack) {
    const _remove_overflow_if_root_overflow = {
      clipBehavior: context.is_root
        ? undefined
        : (widget as core.Stack).clipBehavior,
    };

    thisFlutterWidget = new flutter.Stack({
      ...default_props_for_layout,
      ..._remove_overflow_if_root_overflow,
      children: handleChildren(widget.children as []),
      //   key: _key,
    });
  } else if (widget instanceof core.SingleChildScrollView) {
    const _child = handleChild(widget.child);
    thisFlutterWidget = new flutter.SingleChildScrollView({
      // TODO: map axis
      //   scrollDirection: widget.direction,
      child: _child,
    });
  } else if (widget instanceof core.Positioned) {
    const _tmp_length_convert = (l) => {
      return l as number;
    };

    const _child = handleChild(widget.child);
    thisFlutterWidget = new flutter.Positioned({
      left: _tmp_length_convert(widget.left),
      right: _tmp_length_convert(widget.right),
      top: _tmp_length_convert(widget.top),
      bottom: _tmp_length_convert(widget.bottom),
      child: _child,
    });
    // -------------------------------------
    // override w & h with position provided w/h
    if (_child instanceof flutter.Container) {
      _child.width = widget.width;
      _child.height = widget.height;
    }
    // -------------------------------------
  } else if (widget instanceof core.Opacity) {
    thisFlutterWidget = new flutter.Opacity({
      opacity: widget.opacity,
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
  else if (widget instanceof core.Text) {
    const _escaped_dart_string = escapeDartString(widget.data);
    thisFlutterWidget = new flutter.Text(_escaped_dart_string, {
      ...widget,
      style: painting.textStyle(widget.style),
      /** explicit assignment - field name is different */
      //   key: _key,
    });
  } else if (widget instanceof core.VectorWidget) {
    // TODO: convert vector data to bitmap, host the image, than load.
    // thisFlutterWidget = new flutter.Svg({
    //   ...widget,
    //   data: widget.data,
    //   fill: widget.fill,
    //   //   key: _key,
    // });
  } else if (widget instanceof core.ImageWidget) {
    thisFlutterWidget = flutter.Image.network(widget.src, {
      width: widget.width,
      height: widget.height,
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
            width: widget.width,
            height: widget.height,
            // fit?: BoxFit;
            //   key: _key,
          }
        );
        break;
      }
      case "remote-uri": {
        thisFlutterWidget = flutter.Image.network(widget.icon.uri, {
          ...widget,
          semanticLabel: "icon",
          //   key: _key,
        });
        break;
      }
    }
  }

  // execution order matters - some above widgets inherits from Container, this shall be handled at the last.
  else if (widget instanceof core.Container) {
    thisFlutterWidget = new flutter.Container({
      padding: painting.edgeinsets(widget.padding),
      margin: painting.edgeinsets(widget.margin),
      width: widget.width,
      height: widget.height,
      decoration: new flutter.BoxDecoration({
        border: painting.border(widget.border),
        borderRadius: painting.borderRadius(widget.borderRadius),
        shape: painting.boxshape(widget.shape),
        // TODO:
        // boxShadow:
        // background:
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
    thisFlutterWidget[remove_size] = Double.infinity;
  }
  // -------------------------------------

  // -------------------------------------
  // end of logic gate
  // -------------------------------------
  else {
    // todo - handle case more specific
    thisFlutterWidget = new flutter.ErrorWidget.withDetails({
      //   key: _key,
      message: `The input design was not handled. "${
        widget.key.originName
      }" type of "${widget._type}" - ${JSON.stringify(widget.key)}`,
    });
  }
  // -------------------------------------
  // -------------------------------------

  // post extending - do not abuse this
  if (context.is_root) {
    // TODO: add overflow x hide handling by case.
  }

  return thisFlutterWidget;
}
