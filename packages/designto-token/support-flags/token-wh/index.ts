import { WHDeclarationFlag } from "@code-features/flags";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import {
  Container,
  DimensionLength,
  EdgeInsets,
  isPossibleDimensionLength,
  IWHStyleWidget,
  Widget,
} from "@reflect-ui/core";
import { tokenize } from "../../tokenizer";
import { unwrappedChild } from "../../wrappings";

export function tokenize_flagged_wh_declaration(
  node: ReflectSceneNode,
  flag: WHDeclarationFlag[]
): Widget {
  if (!flag.length) return;

  const merged = flag
    .map((f) => f)
    .reduce<IWHStyleWidget>((a, b) => {
      if (isPossibleDimensionLength(b.value)) {
        let rec: IWHStyleWidget = {};
        switch (b.flag) {
          case "width":
            rec["width"] = b.value as DimensionLength;
            break;
          case "min-width":
            rec["minWidth"] = b.value;
            break;
          case "max-width":
            rec["maxWidth"] = b.value;
            break;
          case "height":
            rec["height"] = b.value as DimensionLength;
            break;
          case "min-height":
            rec["minHeight"] = b.value;
            break;
          case "max-height":
            rec["maxHeight"] = b.value;
            break;
        }
        return {
          ...a,
          ...rec,
        };
      } else {
        // TODO: support complex values
      }
      return a;
    }, {});

  const widget = tokenize(node, {
    should_ignore_flag: (n) => {
      return node.id == n.id;
    },
  });

  const flag_target = unwrappedChild(widget) as IWHStyleWidget;

  // set wh preference
  merged.width && (flag_target.width = merged.width);
  merged.minWidth && (flag_target.minWidth = merged.minWidth);
  merged.maxWidth && (flag_target.maxWidth = merged.maxWidth);
  merged.height && (flag_target.height = merged.height);
  merged.minHeight && (flag_target.minHeight = merged.minHeight);
  merged.maxHeight && (flag_target.maxHeight = merged.maxHeight);

  // if the constraints are set to left & right or top & bottom, we have to add `margin-(?): auto;` to make align the item to center as it is on origin design.
  // Learn more about this transformation - https://stackoverflow.com/questions/17993471/css-wont-center-div-with-max-width
  // TODO: the margin's value to "auto" is not acceptable. this is a abberation, needs to fixed.
  const container = widget as Container;
  const _provide_initial_margin_if_none = () => {
    if (!container.margin) {
      container.margin = new EdgeInsets({
        top: undefined,
        right: undefined,
        bottom: undefined,
        left: undefined,
      });
    }
  };
  if (node.constraints.horizontal == "STRETCH") {
    _provide_initial_margin_if_none();
    container.margin.left = "auto" as any;
    container.margin.right = "auto" as any;
  }

  if (node.constraints.vertical == "STRETCH") {
    _provide_initial_margin_if_none();
    container.margin.top = "auto" as any;
    container.margin.bottom = "auto" as any;
  }

  return widget;
}
