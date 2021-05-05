import { ImageWidget } from "@reflect-ui/core";
import { ImagePaint } from "@reflect-ui/core/lib/cgr";

function fromStar(): ImageWidget {
  return new ImageWidget();
}

function fromPaint(paint: ImagePaint): ImageWidget {
  return new ImageWidget();
}

function fromLine(): ImageWidget {
  return new ImageWidget();
}

function fromGroup(): ImageWidget {
  return new ImageWidget();
}

function fromFrame(): ImageWidget {
  return new ImageWidget();
}

export const tokenizeBitmap = {
  fromStar: fromStar,
  fromPaint: fromPaint,
  fromLine: fromLine,
  fromGroup: fromGroup,
  fromFrame: fromFrame,
};
