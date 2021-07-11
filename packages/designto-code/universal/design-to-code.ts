import { input, output, config } from "../proc";
import { tokenize } from "@designto/token";
import { Widget } from "@reflect-ui/core";
import * as toreact from "@designto/react";

export function designToCode(
  input: input.DesignInput,
  framework: config.FrameworkConfig
): output.CodeOutput {
  const token = tokenize(input.design);

  switch (framework.framework) {
    case "react":
      return designToReact({ widget: token });
    case "flutter":
      return designToFlutter(input);
  }
  return;
}

export const designTo = {
  react: designToReact,
  vue: designToVue,
  flutter: designToFlutter,
};

export function designToReact(input: { widget: Widget }): output.CodeOutput {
  const reactwidget = toreact.buildReactWidget(input.widget);
  return toreact.buildReactApp(reactwidget, {
    template: "cra",
  });
}
export function designToFlutter(input: input.DesignInput): output.CodeOutput {
  return;
}
export function designToVue(input: input.DesignInput): output.CodeOutput {
  return;
}
