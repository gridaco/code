import { CSSProperties } from "@coli.codes/css";
import { Axis, DimensionLength, MainAxisSize } from "@reflect-ui/core";
import { length } from "../../length";

export function flexsizing({
  mainAxisSize,
  width,
  height,
  flex,
  direction,
}: {
  direction: Axis;
  mainAxisSize?: MainAxisSize;
  width?: DimensionLength;
  height?: DimensionLength;
  flex?: number;
}): {
  "align-self"?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline"
    | "auto";
  flex?: number | "none" | undefined;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
} {
  switch (mainAxisSize) {
    case MainAxisSize.max: {
      return {
        "align-self": "stretch",
      };
    }
    case MainAxisSize.min: {
      switch (direction) {
        case Axis.horizontal:
        case Axis.vertical:
          return {
            flex: "none",
            width: width && length(width),
            height: height && length(height),
          };
      }
    }
  }

  // TODO:
  // 1. add widht / height handling
}
