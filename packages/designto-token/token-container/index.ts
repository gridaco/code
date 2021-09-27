import { nodes } from "@design-sdk/core";
import { retrieveFill } from "@design-sdk/core/utils";
import { paintToColor } from "@design-sdk/core/utils/colors";
import { Figma } from "@design-sdk/figma-types";
import * as core from "@reflect-ui/core";
import { Color } from "@reflect-ui/core";
import { BoxShape } from "@reflect-ui/core/lib/box-shape";
import { keyFromNode } from "../key";
function fromRectangle(rect: nodes.ReflectRectangleNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(rect),
    children: undefined,
    width: rect.width,
    height: rect.height,
    borderRadius: rect.cornerRadius,
    background: forceFillsToSolidColor(rect.fills),
  });

  container.x = rect.x;
  container.y = rect.y;
  // container.border = new core.Border() as any; // FIXME: handle by count of fills.
  return container;
}

function fromEllipse(ellipse: nodes.ReflectEllipseNode): core.Container {
  const container = new core.Container({
    key: keyFromNode(ellipse),
    children: undefined,
    width: ellipse.width,
    height: ellipse.height,
    borderRadius: { all: Math.max(ellipse.width, ellipse.height) / 2 },
    background: forceFillsToSolidColor(ellipse.fills),
  });

  container.x = ellipse.x;
  container.y = ellipse.y;
  container.border = ellipse.strokes as any; // todo
  container.shape = BoxShape.circle;

  return container;
}

export const tokenizeContainer = {
  fromRectangle: fromRectangle,
  fromEllipse: fromEllipse,
};

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
