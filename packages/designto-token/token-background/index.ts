import { ReflectSceneNode } from "@design-sdk/figma";
import { retrieveFill } from "@design-sdk/core/utils";
import { paintToColor } from "@design-sdk/core/utils/colors";
import { Figma } from "@design-sdk/figma-types";
import { Color } from "@reflect-ui/core";

function fromFills(fills: ReflectSceneNode["fills"]) {
  if (fills && fills.length > 0) {
    return forceFillsToSolidColor(fills);
  }
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

export const tokenBackground = {
  fromFills: fromFills,
};
