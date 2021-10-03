import { BoxDecoration } from "@flutter-builder/flutter";
import { Color } from "@reflect-ui/core";
import { Background } from "@reflect-ui/core/lib/background";
import * as dartui from "../dart-ui";

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
        console.error("gradient bg not ready");
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

function fromGradient(): BoxDecoration {
  throw "not ready.";
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
