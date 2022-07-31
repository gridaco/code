import {
  ReflectRectangleNode,
  ReflectEllipseNode,
  ReflectFrameNode,
} from "@design-sdk/figma-node";
import { Figma } from "@design-sdk/figma";
import { retrieveFill } from "@design-sdk/core/utils";
import * as flutter from "@flutter-builder/flutter";
import { interpretImageFill } from "../interpreter/image.interpret";
import * as painting from "../painting";
import { makeColorFromRGBO } from "./make-flutter-color";
import { tokenizeBorder, tokenize_gradient } from "@designto/token";
import { LinearGradient, RadialGradient } from "@reflect-ui/core";

type DecorationBackgroundLike =
  | flutter.Color
  | flutter.Gradient
  | flutter.ImageProvider;

export function makeBoxDecoration(
  node: ReflectRectangleNode | ReflectEllipseNode | ReflectFrameNode
): flutter.BoxDecoration | flutter.Color {
  const _border = tokenizeBorder.fromNode(node);
  const decorationBorder = painting.border(_border);
  const decorationBoxShadow = painting.boxShadow(node.shadows);
  const decorationBorderRadius = painting.borderRadius(node.cornerRadius);

  ///
  /// ----------------------------------------------------------------
  ///
  let decorationBackground: DecorationBackgroundLike;
  // case: image bg ---------------------
  if (node.primaryImage) {
    decorationBackground = makeBoxDecorationImageBg(
      node.fills.find<Figma.ImagePaint>(
        //@ts-ignore
        (f) => f.type === "IMAGE"
      ),
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
    node instanceof ReflectEllipseNode
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
      // TODO: handle above gradient types (only linear is handled)
      console.log("not handled: `GRADIENT_DIAMOND` | `GRADIENT_ANGULAR`");
      return undefined;
    case "GRADIENT_LINEAR":
      const lg = tokenize_gradient(fill as Figma.GradientPaint);
      return painting.linearGradient(lg as LinearGradient);
    case "GRADIENT_RADIAL":
      const rg = tokenize_gradient(fill as Figma.GradientPaint);
      return painting.radialGradient(rg as RadialGradient);
    case "SOLID":
      console.log("solid color");
      return makeColorFromRGBO(fill.color, opacity);
    default:
      throw `making colored box decoraton with fill type "${fill?.type}" is not allowed."`;
  }
}
