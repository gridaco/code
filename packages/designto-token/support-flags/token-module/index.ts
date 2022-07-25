import type { ModuleFlag } from "@code-features/flags/--module";
import { keyFromNode } from "../../key";
import { tokenize } from "../..";
import { default_tokenizer_config } from "../../config";
import { handleChildren } from "../../main";
import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function tokenize_flagged_module(
  flag: ModuleFlag,
  node: ReflectSceneNode
) {
  throw new Error("Method not implemented.");
}
