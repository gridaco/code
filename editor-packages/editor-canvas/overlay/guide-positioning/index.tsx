import React from "react";
import { box_to_xywh, scale, spacing_guide } from "../../math";
import type { Box } from "../../types";
import * as k from "../k";
import { SizeMeterLabelBox } from "../size-meter-label-box";

export function PositionGuide({
  a,
  b,
  zoom,
}: {
  a: Box;
  b: Box;
  zoom: number;
}) {
  const { spacing, box: __box } = spacing_guide(a, b);
  const box = scale(__box, zoom);
  const [_t, _r, _b, _l] = spacing;
  const sizemeterprops = (size: number) => {
    // TODO: drop the xywh use
    let xywh = box_to_xywh(box);

    return {
      size: Math.round(size * 10) / 10 + "px",
      background: "orange",
      zoom: 1,
      xywh,
    };
  };

  return (
    <div
      id="position-guide"
      style={{
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
    >
      <SpacingGuideLine length={_t} side={"t"} box={box} zoom={zoom} label />
      <SizeMeterLabelBox {...sizemeterprops(_t)} />
      <SpacingGuideLine length={_r} side={"r"} box={box} zoom={zoom} label />
      <SizeMeterLabelBox {...sizemeterprops(_r)} />
      <SpacingGuideLine length={_b} side={"b"} box={box} zoom={zoom} label />
      <SizeMeterLabelBox {...sizemeterprops(_b)} />
      <SpacingGuideLine length={_l} side={"l"} box={box} zoom={zoom} label />
      <SizeMeterLabelBox {...sizemeterprops(_l)} />
    </div>
  );
}

function SpacingGuideLine({
  length,
  zoom,
  side,
  box,
  width = 1,
  label,
}: {
  label?: boolean;
  width?: number;
  length: number;
  box: Box;
  zoom: number;
  side: "t" | "r" | "b" | "l";
}) {
  const d = 100;

  // is vertical line
  const isvert = side === "t" || side === "b";
  const l_scalex = isvert ? width / d : (length / d) * zoom;
  const l_scaley = isvert ? (length / d) * zoom : width / d;
  const [, , w, h] = box_to_xywh(box);

  let trans = { x: 0, y: 0 };
  switch (side) {
    case "t": {
      trans = {
        x: box[0] + (d * l_scalex - d) / 2 + w / 2,
        y: box[1] - d / 2 - (length / 2) * zoom,
      };
      break;
    }
    case "r": {
      trans = {
        x: box[2] - d / 2 + (length / 2) * zoom,
        y: box[1] + (d * l_scaley - d) / 2 + h / 2,
      };
      break;
    }
    case "b": {
      trans = {
        x: box[0] + (d * l_scalex - d) / 2 + w / 2,
        y: box[3] - d / 2 + (length / 2) * zoom,
      };
      break;
    }
    case "l": {
      trans = {
        x: box[0] - d / 2 - (length / 2) * zoom,
        y: box[1] + (d * l_scaley - d) / 2 + h / 2,
      };
      break;
    }
  }

  return (
    <div
      id={side}
      style={{
        position: "fixed",
        width: d,
        height: d,
        opacity: 1,
        pointerEvents: "none",
        cursor: "none",
        willChange: "transform",
        transformOrigin: "0px, 0px",
        transform: `translate3d(${trans.x}px, ${trans.y}px, 0) scaleX(${l_scalex}) scaleY(${l_scaley})`,
        backgroundColor: "orange",
        zIndex: k.Z_INDEX_GUIDE_POSITION,
      }}
    />
  );
}

function AuxiliaryLine() {}
