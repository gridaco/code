import { WHDeclarationFlag } from "@code-features/flags";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import {
  DimensionLength,
  isPossibleDimensionLength,
  IWHStyleWidget,
  Widget,
} from "@reflect-ui/core";
import { tokenize } from "../../main";
import { unwrappedChild } from "../../wrappings";

export function tokenize_flagged_wh_declaration(
  node: ReflectSceneNode,
  flag: WHDeclarationFlag
): Widget {
  if (!flag.value) return;

  const widget = tokenize(node, {
    should_ignore_flag: (n) => {
      return node.id == n.id;
    },
  });

  const flag_target = unwrappedChild(widget) as IWHStyleWidget;

  const inject_width = () => {
    flag_target.width = flag.value as DimensionLength;
  };

  const inject_min_width = () => {
    flag_target.minWidth = flag.value as DimensionLength;
  };

  const inject_max_width = () => {
    flag_target.maxWidth = flag.value as DimensionLength;
  };

  const inject_height = () => {
    flag_target.height = flag.value as DimensionLength;
  };

  const inject_min_height = () => {
    flag_target.minHeight = flag.value as DimensionLength;
  };

  const inject_max_height = () => {
    flag_target.maxHeight = flag.value as DimensionLength;
  };

  switch (flag.flag) {
    case "width":
      if (isPossibleDimensionLength(flag.value)) {
        inject_width();
      } else {
        // TODO:
      }
      break;
    case "min-width":
      inject_min_width();
      break;
    case "max-width":
      inject_max_width();
      break;
    case "height":
      if (isPossibleDimensionLength(flag.value)) {
        inject_height();
      } else {
        // TODO:
      }
      break;
    case "min-height":
      inject_min_height();
      break;
    case "max-height":
      inject_max_height();
      break;
  }

  console.log("whinjection", flag, flag.flag, widget, flag_target);

  return widget;
}
