import { detectIf } from "@reflect-ui/detection";
import { isRouteAction } from "../interpreter/action.interpret";
import { Figma } from "@design-sdk/figma";
export function makeRoutes(): Array<string> {
  const routes = Array<string>();
  const allScreenReactions = fetchAllActionsGlobal({
    onlyScreen: true,
  });

  for (const id of Object.keys(allScreenReactions)) {
    const singleScreenReactions: Figma.Reaction[] = allScreenReactions[id];
    const validReactions = singleScreenReactions.filter((r) =>
      isRouteAction(r)
    );
    for (const reaction of validReactions) {
      if (reaction.action.type == "NODE") {
        routes.push(reaction.action.destinationId);
      }
    }
  }
  return routes;
}

function fetchAllActionsGlobal(options?: {
  onlyScreen: boolean;
}): Map<string, Array<Figma.Reaction>> {
  const filter = options?.onlyScreen
    ? (n: Figma.SceneNode): boolean => {
        // as any type casting might cause an error afterwards.
        return detectIf.screen(n as any).result;
      }
    : () => true;

  let reactions = new Map<string, Array<Figma.Reaction>>();
  Figma.figma.root.children.forEach((page) => {
    page.children.forEach((node) => {
      if (filter(node))
        reactions = new Map([...reactions, ...fetchAllActionsUnderNode(node)]);
    });
  });
  return reactions;
}

function fetchAllActionsUnderNode(
  node: Figma.SceneNode
): Map<string, Array<Figma.Reaction>> {
  let reactions = new Map<string, Array<Figma.Reaction>>();
  if ("reactions" in node) {
    reactions[node.id] = node.reactions;
  }
  if ("children" in node) {
    reactions = new Map<string, Array<Figma.Reaction>>([
      ...reactions,
      ...fetchAllActionsUnderNode(node),
    ]);
  }
  return reactions;
}
