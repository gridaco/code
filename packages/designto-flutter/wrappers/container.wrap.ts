import { convertToSize } from "../_utils";
import {
  ReflectRectangleNode,
  ReflectEllipseNode,
  ReflectFrameNode,
  ReflectGroupNode,
} from "@design-sdk/figma-node";
import { array } from "@reflect-ui/uiutils";
import * as flutter from "@flutter-builder/flutter";
import { makeBoxDecoration } from "../make/make-flutter-box-decoration";
import { rd } from "../_utils";
import * as painting from "../painting";

export function wrapWithContainer(
  node:
    | ReflectRectangleNode
    | ReflectEllipseNode
    | ReflectFrameNode
    | ReflectGroupNode,
  child?: flutter.Widget,
  options?: { size: flutter.Size }
): flutter.Widget {
  // ignore the view when size is zero or less
  // while technically it shouldn't get less than 0, due to rounding errors,
  // it can get to values like: -0.000004196293048153166
  if (node.width <= 0 || node.height <= 0) {
    return child;
  }

  const _boxDecoration =
    // ignore for GroupNode
    node instanceof ReflectGroupNode ? undefined : makeBoxDecoration(node);

  // if option passed, use option's value
  const _size = array.filters.notEmpty(options?.size)
    ? options.size
    : convertToSize(node);
  // console.log("propSize", _size);

  // todo Image, Gradient & multiple fills

  let _padding: flutter.EdgeInsetsGeometry;
  if (node instanceof ReflectFrameNode) {
    _padding = painting.edgeinsets(node.padding);
  }

  // Container is a container if [_size] or [_boxDecoration] are set.
  if (_size || _boxDecoration) {
    return new flutter.Container({
      width: rd(_size.width),
      height: rd(_size.height),
      child: child,
      padding: _padding,
      // region : decoration or color
      // flutter only either one of two, but not both. providing both will raise error on flutter runtime.
      decoration:
        _boxDecoration instanceof flutter.BoxDecoration
          ? _boxDecoration
          : undefined,
      color:
        _boxDecoration instanceof flutter.Color ? _boxDecoration : undefined,
      // endregion : decoration or color
    });
  } else if (_padding) {
    // console.log("wrapping with padding")
    return new flutter.Padding({
      padding: _padding,
      child: child,
    });
    // if there is just a padding, add Padding
  } else {
    return child;
  }
}
