import { nodes } from "@design-sdk/core";
import { Figma } from "@design-sdk/figma";
import { retrieveFill } from "@design-sdk/core/utils";
import * as flutter from "@bridged.xyz/flutter-builder";
import { interpretGradient } from "../interpreter/gradient.interpret";
import { interpretImageFills } from "../interpreter/image.interpret";
import { makeBorderRadius } from "./make-flutter-border-radius";
import { makeBorder } from "./make-flutter-border";
import { makeBoxShadow } from "./make-flutter-box-shadow";
import { makeColorFromRGBO } from "./make-flutter-color";

export function makeBoxDecoration(
  node:
    | nodes.ReflectRectangleNode
    | nodes.ReflectEllipseNode
    | nodes.ReflectFrameNode
): flutter.BoxDecoration | flutter.Color {
  const decorationBackground = makeBoxDecorationBg(node.fills);
  const decorationBorder = makeBorder(node);
  const decorationBoxShadow = makeBoxShadow(node);
  const decorationBorderRadius = makeBorderRadius(node);

  // modify the circle's shape when type is ellipse
  const decorationShape: flutter.BoxShape =
    node instanceof nodes.ReflectEllipseNode
      ? (flutter.BoxShape.circle as flutter.Snippet)
      : undefined;

  // generate the decoration, or just the backgroundColor when color is SOLID.
  const isNotSolid =
    decorationBorder ||
    decorationShape ||
    decorationBorder ||
    decorationBorderRadius ||
    decorationBackground;

  return isNotSolid
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
    : decorationBackground instanceof flutter.Color
    ? (decorationBackground as flutter.Color)
    : undefined;
}

export function makeBoxDecorationBg(
  fills: ReadonlyArray<Figma.Paint>
): flutter.Gradient | flutter.Color | flutter.ImageProvider {
  const fill = retrieveFill(fills);

  if (fill?.type === "SOLID") {
    const opacity = fill.opacity ?? 1.0;
    return makeColorFromRGBO(fill.color, opacity);
  } else if (fill?.type === "GRADIENT_LINEAR") {
    return interpretGradient(fill);
  } else if (fill?.type == "IMAGE") {
    return interpretImageFills(fill);
  }
  return undefined;
}
