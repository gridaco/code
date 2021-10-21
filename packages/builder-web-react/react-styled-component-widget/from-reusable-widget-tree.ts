import {
  InstanceMetaToken,
  InstanceWidget,
} from "@code-features/component/tokens/token-instance";
import { MasterComponentWidget } from "@code-features/component/tokens/token-master-component";

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
  //
  return {
    code: "wip",
  };
}
