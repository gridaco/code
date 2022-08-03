import { Slider, Container, Colors } from "@reflect-ui/core";
import type { AsSliderFlag } from "@code-features/flags/types";
import type {
  ReflectEllipseNode,
  ReflectFrameNode,
  ReflectRectangleNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { keyFromNode } from "../../key";
import assert from "assert";
import { tokenizeLayout } from "../../token-layout";
import { unwrappedChild } from "../../wrappings";
import { RoundSliderThumbShape } from "@reflect-ui/core";
import { WrappingContainer } from "../../tokens";

/**
 *
 */
export function tokenize_flagged_slider(
  node: ReflectSceneNode,
  flag: AsSliderFlag
): Slider | WrappingContainer | undefined {
  if (flag.value === false) return;

  const validated = validate_slider(node);
  if (validated.error === false) {
    const _key = keyFromNode(node);

    switch (validated.__type) {
      case "frame-as-slider": {
        const { slider_root, thumb, value } = validated;

        // TODO: use theme color as default if non available
        const fallbackcolor = Colors.blue;

        // initial value -----------------------------
        const p_w = slider_root.width;
        const v_w = value?.width ?? 0;
        // calculate percentage of value by its width, round to 2 decimal point
        const _initial_value =
          Math.round((v_w / p_w + Number.EPSILON) * 100) / 100;
        // -------------------------------------------

        // thumb style -------------------------------
        const _thumbcolor = thumb.primaryColor ?? fallbackcolor;
        // currently only round thumb is supported
        const _thumbsize =
          Math.max(thumb?.height ?? 0, thumb?.width ?? 0) ?? undefined;
        const _thumbelevation = thumb.primaryShadow?.blurRadius ?? undefined;
        // -------------------------------------------

        // active color ------------------------------
        const _activecolor = value?.primaryColor ?? fallbackcolor;
        // -------------------------------------------

        const container = unwrappedChild(
          tokenizeLayout.fromFrame(
            slider_root,
            slider_root.children,
            { is_root: false },
            {}
          )
        ) as Container;

        return new WrappingContainer({
          ...container,
          key: keyFromNode(node),
          child: new Slider({
            key: _key,
            ...container,
            activeColor: _activecolor,
            divisions: 0.01, // when min - max is 0 - 1
            thumbColor: _thumbcolor,
            thumbShape: new RoundSliderThumbShape({
              elevation: _thumbelevation,
              enabledThumbRadius: _thumbsize,
            }),
            initialValue: _initial_value,
          }),
        });
      }
      default:
        throw new Error(
          `unexpected type while handling slider flag ${validated.__type}`
        );
    }
  } else {
    throw new Error(validated.error);
  }
}

type ThumbAcceptableNode =
  | ReflectFrameNode
  | ReflectRectangleNode
  | ReflectEllipseNode;

type ValueIndicatorAcceptableNode = ReflectFrameNode | ReflectRectangleNode;

/**
 * validate if layer casted as slider can be actually tokenized to slider.
 *
 * - when applyed to frame,
 *    1. the root should be a long rect 1:1 < n
 *    2. the height of the value should be n >= (height of the root)
 *    3. the knob should be 1:1 size w:h
 *
 */
function validate_slider(node: ReflectSceneNode):
  | {
      __type: "frame-as-slider";
      error: false;
      slider_root: ReflectFrameNode;
      thumb: ThumbAcceptableNode;
      value?: ValueIndicatorAcceptableNode;
    }
  | { error: string } {
  assert(!!node, "target must not be null or undefined");
  switch (node.type) {
    case "FRAME": {
      // find the root of slider
      // find the value of the slider
      // find the thumb of the slider
      const root = node;

      const thumb = node.grandchildren.find((n) => {
        // TODO: move this to detection
        const _0 =
          n.type === "FRAME" || n.type === "RECTANGLE" || n.type === "ELLIPSE";
        const _1 = n.width > 0 && n.height > 0;
        const _2 = n.width <= 40 && n.height <= 40;
        const _3 = n.width === n.height;
        return _0 && _1 && _2 && _3;
      });

      assert(thumb, "thumb node is required. no qualified node found.");

      const value = node.grandchildren
        .filter((n) => n.id !== thumb?.id)
        .find((n) => {
          const _0 = n.type === "FRAME" || n.type === "RECTANGLE";
          const _1 = n.width > 0 && n.height > 0;
          const _2 = n.height === root.height;
          const _3 = n.primaryColor !== root.primaryColor;
          return _0 && _1 && _2 && _3;
        });

      return {
        __type: "frame-as-slider",
        slider_root: root,
        thumb: thumb as ThumbAcceptableNode,
        value: value as ValueIndicatorAcceptableNode,
        error: false,
      };
    }
    default:
      return { error: "slider target is not a valid frame or a text node" };
  }
}
