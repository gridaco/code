import type { DeclareSpecificationFlag } from "@code-features/flags/--declare";
import { tokenize } from "../..";
import { default_tokenizer_config } from "../../config";
import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { DeclarationWidgetToken } from "@code-features/module";

export function tokenize_flagged_declare(
  node: ReflectSceneNode,
  flag: DeclareSpecificationFlag
): DeclarationWidgetToken | undefined {
  const { export: _export, identifier, value } = flag;

  if (!value) return; // return if flag is silenced.

  const child = tokenize(node, {
    ...default_tokenizer_config,
    should_ignore_flag: (n) => {
      return node.id == n.id;
    },
  });

  const _key = child.key!;

  return new DeclarationWidgetToken({
    key: _key.copyWith({ id: _key.id + "--declare" }),
    child: child,
  });
}
