import { ArtworkFlag } from "@code-features/flags/--artwork";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import { tokenizeGraphics } from "../../token-graphics";

export function tokenize_flagged_artwork(
  node: ReflectSceneNode,
  flag: ArtworkFlag
) {
  return tokenizeGraphics.fromAnyNode(node);
}
