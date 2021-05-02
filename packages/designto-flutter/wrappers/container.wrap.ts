import { convertToSize } from "../convert";
import { nodes } from "@bridged.xyz/design-sdk";
import { makeEdgeInsets } from "../make";
import { array } from "@reflect-ui/uiutils";
import * as flutter from "@bridged.xyz/flutter-builder";
import { makeBoxDecoration } from "../make/box-decoration.make";
import { roundDouble } from "../convert/double.convert";

export function wrapWithContainer(
  node:
    | nodes.ReflectRectangleNode
    | nodes.ReflectEllipseNode
    | nodes.ReflectFrameNode
    | nodes.ReflectGroupNode,
  child?: flutter.Widget,
  options?: { size: flutter.Size }
): flutter.Widget {
  // ignore the view when size is zero or less
  // while technically it shouldn't get less than 0, due to rounding errors,
  // it can get to values like: -0.000004196293048153166
  if (node.width <= 0 || node.height <= 0) {
    return child;
  }

  // ignore for Groups
  const propBoxDecoration =
    node instanceof nodes.ReflectGroupNode
      ? undefined
      : makeBoxDecoration(node);
  // if option passed, use option's value
  const propSize = array.filters.notEmpty(options?.size)
    ? options.size
    : convertToSize(node);
  console.log("propSize", propSize);

  // todo Image, Gradient & multiple fills

  let propPadding: flutter.EdgeInsetsGeometry;
  if (node instanceof nodes.ReflectFrameNode) {
    propPadding = makeEdgeInsets(node);
  }

  if (propSize || propBoxDecoration) {
    // Container is a container if [propSize] or [propBoxDecoration] are set.
    // console.log("wrapping with container. child - ", child)
    return new flutter.Container({
      width: roundDouble(propSize.width),
      height: roundDouble(propSize.height),
      child: child,
      padding: propPadding,
      decoration:
        propBoxDecoration instanceof flutter.BoxDecoration
          ? propBoxDecoration
          : undefined,
      color:
        propBoxDecoration instanceof flutter.Color
          ? propBoxDecoration
          : undefined,
    });
  } else if (propPadding) {
    // console.log("wrapping with padding")
    return new flutter.Padding({
      padding: propPadding,
      child: child,
    });
    // if there is just a padding, add Padding
  } else {
    return child;
  }
}

type GradientDirection = {
  begin: flutter.AlignmentGeometry;
  end: flutter.AlignmentGeometry;
};

export function gradientDirection(angle: number): GradientDirection {
  switch (
    array.nearestValue(angle, [-180, -135, -90, -45, 0, 45, 90, 135, 180])
  ) {
    case 0:
      return {
        begin: flutter.Alignment.centerLeft,
        end: flutter.Alignment.centerRight,
      };
    case 45:
      return {
        begin: flutter.Alignment.topLeft,
        end: flutter.Alignment.bottomRight,
      };
    case 90:
      return {
        begin: flutter.Alignment.topCenter,
        end: flutter.Alignment.bottomCenter,
      };
    case 135:
      return {
        begin: flutter.Alignment.topRight,
        end: flutter.Alignment.bottomLeft,
      };
    case -45:
      return {
        begin: flutter.Alignment.bottomLeft,
        end: flutter.Alignment.topRight,
      };
    case -90:
      return {
        begin: flutter.Alignment.bottomCenter,
        end: flutter.Alignment.topCenter,
      };
    case -135:
      return {
        begin: flutter.Alignment.bottomRight,
        end: flutter.Alignment.topLeft,
      };
    default:
      // when 180 or -180
      return {
        begin: flutter.Alignment.centerRight,
        end: flutter.Alignment.centerLeft,
      };
  }
}
