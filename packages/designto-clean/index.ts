import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { ReflectLintFeedback } from "@reflect-ui/lint/lib/feedbacks/feedback";
import { DefaultSeectionLintRunner } from "@reflect-ui/lint/lib/linter";

export function runLints(
  node: ReflectSceneNode
): ReadonlyArray<ReflectLintFeedback> {
  const linter = new DefaultSeectionLintRunner(node);

  const feedbacks = linter.runLints();
  return feedbacks;
}
