import { Slider, Container, Colors } from "@reflect-ui/core";
import type { AsSliderFlag } from "@code-features/flags/types";
import type {
  ReflectEllipseNode,
  ReflectFrameNode,
  ReflectRectangleNode,
  ReflectSceneNode,
  ReflectTextNode,
} from "@design-sdk/figma-node";
import { keyFromNode } from "../../key";
import assert from "assert";
import { tokenizeLayout } from "../../token-layout";
import { paintToColor } from "@design-sdk/core/utils/colors";
import { unwrappedChild } from "../../wrappings";
import { RoundSliderThumbShape } from "@reflect-ui/core/lib/slider.thumb";

/**
 *
 * from
 * ```
 * row|col[
 *  enabled text,
 *  other elements,
 * ]
 * ```
 *
 * to
 * ```
 * input {
 *  enabled text
 * }
 * ```
 */
export function tokenize_flagged_slider(
  node: ReflectSceneNode,
  flag: AsSliderFlag
): Slider | Container {
  if (flag.value === false) return;

  const validated = validate_slider(node);
  if (validated.error === false) {
    const _key = keyFromNode(node);

    switch (validated.__type) {
      case "frame-as-slider": {
        const { slider_root, thumb, value } = validated;

        // initial value -----------------------------
        const p_w = slider_root.width;
        const v_w = value?.width ?? 0;
        // calculate percentage of value by its width, round to 2 decimal point
        const _initial_value =
          Math.round((v_w / p_w + Number.EPSILON) * 100) / 100;
        // -------------------------------------------

        // active color ------------------------------
        // TODO: use theme color as default if non available
        const _activecolor = value?.primaryColor ?? Colors.blue;
        // -------------------------------------------

        // thumb style -------------------------------
        const _thumbcolor = thumb?.primaryColor ?? Colors.blue;
        // currently only round thumb is supported
        const _thumbsize =
          Math.max(thumb?.height ?? 0, thumb?.width ?? 0) ?? undefined;
        const _thumbelevation = thumb?.primaryShadow?.blurRadius ?? undefined;
        // -------------------------------------------

        const container = unwrappedChild(
          tokenizeLayout.fromFrame(
            slider_root,
            slider_root.children,
            { is_root: false },
            {}
          )
        ) as Container;

        // @ts-ignore FIXME: no tsignore
        return new Container({
          ...container,
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
 * validate if layer casted as input can be actually tokenized to input.
 *
 * - when applyed to frame,
 *    1. the root should be a flex
 *    2. the children should be a valid text node
 *
 * - when applyed to text,
 *    1. the text should be visible
 *    2. the text should be not empty
 * @param input
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
      return { error: "input target is not a valid frame or a text node" };
  }
}
