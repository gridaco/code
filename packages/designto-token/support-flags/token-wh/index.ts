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

  merged.width && (flag_target.width = merged.width);
  merged.minWidth && (flag_target.minWidth = merged.minWidth);
  merged.maxWidth && (flag_target.maxWidth = merged.maxWidth);
  merged.height && (flag_target.height = merged.height);
  merged.minHeight && (flag_target.minHeight = merged.minHeight);
  merged.maxHeight && (flag_target.maxHeight = merged.maxHeight);

  return widget;
}
