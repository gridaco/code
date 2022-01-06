import { FixWHFlag } from "@code-features/flags";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import { IWHStyleWidget, Widget } from "@reflect-ui/core";
import { tokenize } from "../../main";
import { unwrappedChild } from "../../wrappings";

export function tokenize_flagged_fix_wh(
  node: ReflectSceneNode,
  flag: FixWHFlag[]
): Widget {
  if (!flag.length) return;
  const widget = tokenize(node, {
    should_ignore_flag: (n) => {
      return node.id == n.id;
    },
  });

  const flag_target = unwrappedChild(widget) as IWHStyleWidget;

  const merged = flag
    .map((f) => f)
    .reduce<IWHStyleWidget>((a, b) => {
      let rec: IWHStyleWidget = {};
      ///
      /// NOTE:
      /// we are currently fixing the width of the target by specifying all of the current, min, max value.
      /// this is not ideal, but it is the best we can do for now.
      /// why we are also specifying min, max is because we yet don't have a correct handling system to determine if the current token's value is modified by flag or not.
      /// so it is very possible that width/height will be modified, or remvoed by other logic gates. to prevent this, we also specify min, max.
      ///
      switch (b.flag) {
        case "fix-width":
          rec["width"] = flag_target.width;
          rec["minWidth"] = flag_target.width;
          rec["maxWidth"] = flag_target.width;
          break;
        case "fix-height":
          rec["height"] = flag_target.height;
          rec["minHeight"] = flag_target.height;
          rec["maxHeight"] = flag_target.height;
          break;
      }
      return {
        ...a,
        ...rec,
      };
    }, {});

  merged.width && (flag_target.width = merged.width);
  merged.minWidth && (flag_target.minWidth = merged.minWidth);
  merged.maxWidth && (flag_target.maxWidth = merged.maxWidth);
  merged.height && (flag_target.height = merged.height);
  merged.minHeight && (flag_target.minHeight = merged.minHeight);
  merged.maxHeight && (flag_target.maxHeight = merged.maxHeight);

  return widget;
}
