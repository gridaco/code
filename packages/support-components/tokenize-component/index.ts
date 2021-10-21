import { convert } from "@design-sdk/figma-node-conversion";
import type { ComponentNode } from "@design-sdk/figma-types";
import { tokenize as normalTokenize, tokenizeText } from "@designto/token";
import { TextDataParameter, ProxiedText } from "../proxied";
import assert from "assert";
import { ReflectSceneNode } from "@design-sdk/figma-node";

function fromComponentNode(component: ComponentNode) {
  assert(component);

  const reflect = convert.intoReflectNode(component);

  return handleNode(reflect);
}

function handleNode(node: ReflectSceneNode) {
  switch (node.type) {
    case "TEXT": {
      //
      // TODO: check overrided data, then process it.
      //
      const _normal_text_token = tokenizeText.fromText(node);
      return new ProxiedText({
        ..._normal_text_token,
        data: new TextDataParameter({
          key: node.id,
          defaultValue: _normal_text_token.data,
        }),
      });
    }
    default: {
      if ("children" in node) {
        return {
          ...normalTokenize(node),
          children: handleChildren(node.children),
        };
      }
      // other types are currently not supported as a component
      return normalTokenize(node);
    }
  }
}

function handleChildren(children: ReflectSceneNode[]) {
  return children.map(handleNode);
}

export const tokenizeComponent = {
  fromComponentNode: fromComponentNode,
};
