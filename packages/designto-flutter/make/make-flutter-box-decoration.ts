import { nodes } from "@design-sdk/core";
import { Figma } from "@design-sdk/figma";
import { retrieveFill } from "@design-sdk/core/utils";
import * as flutter from "@bridged.xyz/flutter-builder";
import { interpretGradient } from "../interpreter/gradient.interpret";
import { interpretImageFill } from "../interpreter/image.interpret";
import { makeBorderRadius } from "./make-flutter-border-radius";
import { makeBorder } from "./make-flutter-border";
import { makeBoxShadow } from "./make-flutter-box-shadow";
import { makeColorFromRGBO } from "./make-flutter-color";
import { detectIf } from "@reflect-ui/detection";

type DecorationBackgroundLike =
  | flutter.Color
  | flutter.Gradient
  | flutter.ImageProvider;

export function makeBoxDecoration(
  node:
    | nodes.ReflectRectangleNode
    | nodes.ReflectEllipseNode
    | nodes.ReflectFrameNode
): flutter.BoxDecoration | flutter.Color {
  const decorationBorder = makeBorder(node);
  const decorationBoxShadow = makeBoxShadow(node);
  const decorationBorderRadius = makeBorderRadius(node);

  ///
  /// ----------------------------------------------------------------
  ///
  let decorationBackground: DecorationBackgroundLike;
  // case: image bg ---------------------
  const _image_detection_result = detectIf.image(node);
  if (_image_detection_result.result) {
    decorationBackground = makeBoxDecorationImageBg(
      _image_detection_result.data,
      node.id
    );
  }
  // case: solid color or gradient bg --
  else {
    decorationBackground = makeBoxDecorationColorBg(node.fills);
  }
  ///
  /// ----------------------------------------------------------------
  ///

  // modify the circle's shape when type is ellipse
  const decorationShape: flutter.BoxShape =
    node instanceof nodes.ReflectEllipseNode
      ? (flutter.BoxShape.circle as flutter.Snippet)
      : undefined;

  // generate the decoration, or just the backgroundColor when color is SOLID.
  const is_not_simple_solid =
    decorationBorder ||
    decorationShape ||
    decorationBorderRadius ||
    decorationBackground;

  return is_not_simple_solid
    ? new flutter.BoxDecoration({
        borderRadius: decorationBorderRadius,
        shape: decorationShape,
        image:
          decorationBackground instanceof flutter.ImageProvider
            ? new flutter.DecorationImage({
                image: decorationBackground,
                fit: flutter.BoxFit.cover as flutter.Snippet,
              })
            : undefined,
        border: decorationBorder,
        boxShadow: decorationBoxShadow,
        color:
          decorationBackground instanceof flutter.Color
            ? (decorationBackground as flutter.Color)
            : undefined,
        gradient:
          decorationBackground instanceof flutter.Gradient
            ? (decorationBackground as flutter.Gradient)
            : undefined,
      })
    : /** when bg is a simple solid color */
    decorationBackground instanceof flutter.Color
    ? (decorationBackground as flutter.Color)
    : undefined;
}

export function makeBoxDecorationImageBg(
  fill: Figma.ImagePaint,
  key: string
): flutter.ImageProvider {
  return interpretImageFill(fill, key);
}

export function makeBoxDecorationColorBg(
  fills: ReadonlyArray<Figma.Paint>
): flutter.Gradient | flutter.Color {
  const fill = retrieveFill(fills);
  if (!fill) {
    return;
  }

  const opacity = fill.opacity ?? 1.0;

  switch (fill.type) {
    case "GRADIENT_ANGULAR":
    case "GRADIENT_DIAMOND":
    case "GRADIENT_RADIAL":
      // TODO: handle above gradient types (only linear is handled)
      console.log(
        "not handled: `GRADIENT_RADIAL` | `GRADIENT_DIAMOND` | `GRADIENT_ANGULAR`"
      );
      return undefined;
    case "GRADIENT_LINEAR":
      return interpretGradient(fill);
    case "SOLID":
      return makeColorFromRGBO(fill.color, opacity);
    default:
      throw `making colored box decoraton with fill type "${fill?.type}" is not allowed."`;
  }
}
