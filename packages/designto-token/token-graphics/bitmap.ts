import { ImageWidget } from "@reflect-ui/core";
import { ImagePaint } from "@reflect-ui/core/lib/cgr";

function fromStar(): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromPaint(paint: ImagePaint): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromLine(): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromGroup(): ImageWidget {
  // return new ImageWidget();
  return;
}

function fromFrame(): ImageWidget {
  // return new ImageWidget();
  return;
}

export const tokenizeBitmap = {
  fromStar: fromStar,
  fromPaint: fromPaint,
  fromLine: fromLine,
  fromGroup: fromGroup,
  fromFrame: fromFrame,
};
