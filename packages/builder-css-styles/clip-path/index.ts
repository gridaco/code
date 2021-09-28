import { CSSProperties, CSSProperty } from "@coli.codes/css";
import {
  ClipRRect,
  isCircularRadius,
  isEllipticalRadius,
} from "@reflect-ui/core";
import { px } from "../dimensions";
import { inset } from "../inset";

type CssClipInput = ClipRRect;

export function clipPath(clip: CssClipInput): CSSProperties {
  if (clip instanceof ClipRRect) {
    if (typeof clip.borderRadius.all !== undefined) {
      if (isCircularRadius(clip.borderRadius.all)) {
        return {
          "clip-path": inset({
            radius: clip.borderRadius.all as number,
          }),
        };
      } else if (isEllipticalRadius(clip.borderRadius.all)) {
        // TODO: non elliptical radius not supported
      }
    } else {
      // each radii
      // TODO: each round corner not supported
    }
  }
  console.info("clip-path with", clip, "is not yet supported");
  return undefined;
  //
}

function from_path(): CSSProperty.ClipPath {
  // clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');
  return "path()";
}

function from_ellipse(): CSSProperty.ClipPath {
  return "ellipse(50% at 50% 50%)";
  // clip-path: ellipse(50px 60px at 0 10% 20%);
}

function from_poligon(): CSSProperty.ClipPath {
  return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  // clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

function from_circle(): CSSProperty.ClipPath {
  return "circle(50% at 50% 50%)";
  //     clip-path: circle(50px at 0 100px);
}

function from_url(): CSSProperty.ClipPath {
  return "url()";
  // clip-path: url(resources.svg#c1);
}

function from_box(): CSSProperty.ClipPath {
  return "margin-box";
  // clip-path: margin-box;
  // clip-path: border-box;
  // clip-path: padding-box;
  // clip-path: content-box;
  // clip-path: fill-box;
  // clip-path: stroke-box;
  // clip-path: view-box;
}
