import { nodes } from "@bridged.xyz/design-sdk";
import { retrieveFill } from "@bridged.xyz/design-sdk/lib/utils";
import * as flutter from "@bridged.xyz/flutter-builder";
import { interpretGradient } from "../interpreter/gradient.interpret";
import { interpretImageFills } from "../interpreter/image.interpret";
import { makeBorderRadius } from "./border-radius.make";
import { makeBorder } from "./border.make";
import { makeBoxShadow } from "./box-shadow.make";
import { makeColorFromRGBO } from "./color.make";
import { Figma } from "@bridged.xyz/design-sdk";

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
