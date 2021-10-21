import {
  InstanceMetaToken,
  InstanceWidget,
} from "@code-features/component/tokens/token-instance";
import { MasterComponentWidget } from "@code-features/component/tokens/token-master-component";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import { ReactStyledComponentsBuilder } from "./react-styled-components-module-builder";

/**
 * @deprecated wip
 * @param param0
 * @returns
 */
export function finalizeReactReusable_StyledComponents__Experimental({
  tree,
  components,
}: {
  tree: InstanceWidget;
  components: MasterComponentWidget[];
}) {
  const hanlde = (token) => {
    if (token instanceof InstanceMetaToken) {
      const children = token.master["children"]?.map(hanlde);
      return {
        ...token.master,
        children,
      };
    } else {
      return token;
    }
  };

  const token = hanlde(tree);
  console.log("token", token);
  const webwi = buildWebWidgetFromTokens(token);
  console.log("webwi", webwi);
  const builder = new ReactStyledComponentsBuilder({
    entry: webwi,
    config: {
      type: "styled-components",
      module: "@emotion/styled",
    },
  });

  const code = builder.asExportableModule().finalize({
    type: "export-named-functional-component",
    exporting_position: "with-declaration",
    export_declaration_syntax_choice: "export",
    declaration_syntax_choice: "function",
  });
  //
  return code;
}
