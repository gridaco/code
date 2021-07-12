import { input, output, config } from "../proc";
import { tokenize } from "@designto/token";
import { Widget } from "@reflect-ui/core";
import * as toreact from "@designto/react";
import * as toflutter from "@designto/flutter";
import { composeAppWithHome } from "@bridged.xyz/flutter-builder";

// ========================================================================
// region FIXME - REMOVE ME
import { MainImageRepository } from "@design-sdk/core/assets-repository";
import { ImageRepositories } from "@design-sdk/figma/asset-repository";
// set image repo for figma platform
MainImageRepository.instance = new ImageRepositories();
// endregion
// ========================================================================

export function designToCode(
  input: input.IDesignInput,
  framework: config.FrameworkConfig
): output.ICodeOutput {
  const token = tokenize(input.design);

  switch (framework.framework) {
    case "react":
      return designToReact({ widget: token });
    case "flutter":
      return designToFlutter(input);
  }
  throw `The framework "${framework}" is not supported at this point.`;
  return;
}

export const designTo = {
  react: designToReact,
  vue: designToVue,
  flutter: designToFlutter,
};

export function designToReact(input: { widget: Widget }): output.ICodeOutput {
  const reactwidget = toreact.buildReactWidget(input.widget);
  return toreact.buildReactApp(reactwidget, {
    template: "cra",
  });
}

export function designToFlutter(input: input.IDesignInput): output.ICodeOutput {
  const flutterAppBuild = toflutter.buildApp(input.design);
  const widget = flutterAppBuild?.widget;
  const app =
    widget &&
    toflutter.makeApp({
      widget: widget,
      scrollable: flutterAppBuild.scrollable,
    });

  const widgetCode = widget?.build()?.finalize();
  const rootAppCode = composeAppWithHome(app);

  return {
    code: { raw: widgetCode },
    scaffold: { raw: rootAppCode },
    id: input.id,
    name: input.name,
  };
}

export function designToVue(input: input.IDesignInput): output.ICodeOutput {
  return;
}
