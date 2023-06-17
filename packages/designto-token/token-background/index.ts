import type { Background, Color, ObjectColor } from "@reflect-ui/core";
import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { paintToColor, retrieveFill } from "@design-sdk/figma-utils";
import { Figma } from "@design-sdk/figma-types";
import { tokenize_gradient } from "../token-gradient";
import { tokenize_background_image } from "./background-image";

function fromFills(fills: ReflectSceneNode["fills"]): Background {
  fills = fills && fills.filter((f) => f.visible);
  if (fills && fills.length > 0) {
    return forceSingleFill(fills);
    // return forceFillsToSolidColor(fills);
  }
}

function fromPaint(paint: Figma.Paint): Background {
  switch (paint.type) {
    case "SOLID":
      return {
        type: "solid-color",
        // TODO: support other than object color
        ...(paintToColor(paint) as ObjectColor),
      };
    case "GRADIENT_RADIAL":
    case "GRADIENT_LINEAR":
    case "GRADIENT_DIAMOND":
    case "GRADIENT_ANGULAR":
      return {
        type: "gradient",
        ...tokenize_gradient(paint),
      };
    case "IMAGE":
      return {
        type: "graphics",
        ...tokenize_background_image(paint),
      };
    // TODO: handle video, although, it should't be handled here.
    // case "VIDEO": {
    //   //
    // }
  }
}

function forceSingleFill(fills: ReflectSceneNode["fills"]): Background {
  const forced: Figma.Paint = retrieveFill(fills);
  return fromPaint(forced);
}

function forceFillsToSolidColor(fills: ReadonlyArray<Figma.Paint>): Color {
  const fill: Figma.SolidPaint = retrieveFill(fills, {
    onlySolid: true,
  });
  const color = paintToColor(fill);

  // polifill -- some color fills are not supported. in this case since nothing will be visible, we will add a alpha black color to tell user that something is here.
  if (!color && fills.filter((f) => f.type !== "IMAGE").length > 0) {
    console.error(
      `color conversion not supported, falling back to alpha black`
    );
    return paintToColor(<Figma.SolidPaint>{
      type: "SOLID",
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
      opacity: 0.05,
      visible: true,
    });
  }
  // -------

  return color;
}

export const tokenizeBackground = {
  fromFills: fromFills,
};
