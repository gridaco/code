import { InstanceMetaToken } from "@code-features/component/tokens/token-instance";

/**
 * @deprecated wip
 * @param param0
 * @returns
 */
export function finalizeReactReusable_StyledComponents__Experimental({
  tree,
  components,
}: {
  tree;
  components;
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
  //
  return {
    code: "wip",
  };
}
