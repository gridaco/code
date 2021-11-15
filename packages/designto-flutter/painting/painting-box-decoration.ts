import { BoxDecoration } from "@flutter-builder/flutter";
import { Color, Gradient, GradientType } from "@reflect-ui/core";
import { Background } from "@reflect-ui/core/lib/background";
import * as dartui from "../dart-ui";
import { linearGradient } from "./painting-linear-gradient";
import { radialGradient } from "./painting-radial-gradient";

function fromColor(color: Color): BoxDecoration {
  return new BoxDecoration({
    color: dartui.color(color),
  });
}

function fromBackground(b: Background): BoxDecoration {
  if (!b) {
    return;
  }

  if (Array.isArray(b)) {
    throw "multiple bg not supported";
  } else {
    switch (b.type) {
      case "gradient": {
        return fromGradient(b as Gradient);
        break;
      }
      case "graphics": {
        console.error("graphics bg not ready");
        break;
      }
      case "solid-color": {
        return fromColor(b as Color);
      }
    }
  }
}

function fromGradient(g: Gradient): BoxDecoration {
  switch (g?._type) {
    case GradientType.LINEAR: {
      return new BoxDecoration({
        gradient: linearGradient(g),
      });
    }
    case GradientType.RADIAL: {
      return new BoxDecoration({
        gradient: radialGradient(g),
      });
    }
    default: {
      // TODO: add;
      // GRADIENT_ANGULAR;
      // GRADIENT_DIAMOND;
      throw new Error(
        `Gradient type of "${g}" is not yet supported on flutter platform.`
      );
    }
  }
}

function fromImage(): BoxDecoration {
  throw "not ready.";
}

export const boxDecorationPart = {
  fromColor: fromColor,
  fromBackground: fromBackground,
  fromGradient: fromGradient,
  fromImage: fromImage,
};
