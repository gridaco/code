import { convert } from "@design-sdk/figma-node-conversion";
import type { ComponentNode } from "@design-sdk/figma-types";
import { tokenize as normalTokenize, tokenizeText } from "@designto/token";
import { TextDataParameter, ProxiedText } from "../proxied";
import assert from "assert";

function fromComponentNode(component: ComponentNode) {
  assert(component);

  const reflect = convert.intoReflectNode(component);

  reflect.children.map((child) => {
    switch (child.type) {
      case "TEXT": {
        const _normal_text_token = tokenizeText.fromText(child);
        return new ProxiedText({
          ..._normal_text_token,
          data: new TextDataParameter({
            key: child.id,
            defaultValue: _normal_text_token.data,
          }),
        });
      }
      default: {
        // other types are currently not supported as a component
        return normalTokenize(child);
      }
    }
  });
}

export const tokenizeComponent = {
  fromComponentNode: fromComponentNode,
};
