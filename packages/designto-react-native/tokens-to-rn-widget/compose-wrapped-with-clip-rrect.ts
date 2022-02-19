import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";
import type { ViewStyle } from "react-native";

export function compose_wrapped_with_clip_rrect(
  widget: core.ClipRRect,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  const br = css.borderRadius(widget.borderRadius);

  const style: ViewStyle = {
    overflow: "hidden", // do we need this on rn?
    width: "100%", // ----- need better approach
    height: "100%", // ----- need better approach
  };

  // convert css property to rn property
  if (br["border-radius"]) {
    style["borderRadius"] = br["border-radius"] as any as number;
  } else {
    style["borderTopLeftRadius"] = br[
      "border-top-left-radius"
    ] as any as number;
    style["borderTopRightRadius"] = br[
      "border-top-right-radius"
    ] as any as number;
    style["borderBottomRightRadius"] = br[
      "border-bottom-right-radius"
    ] as any as number;
    style["borderBottomLeftRadius"] = br[
      "border-bottom-left-radius"
    ] as any as number;
  }

  child.extendStyle<ViewStyle>(style);
  return child;
}
