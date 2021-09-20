import { input, output, config } from "../proc";
import { tokenize } from "@designto/token";
import { Widget } from "@reflect-ui/core";
import * as toreact from "@designto/react";
import * as toflutter from "@designto/flutter";
import { composeAppWithHome } from "@bridged.xyz/flutter-builder";
import {
  fetch_all_assets,
  finalize_temporary_assets_with_prefixed_static_string_keys__dangerously,
} from "@code-features/assets";
import { BaseImageRepositories } from "@design-sdk/core/assets-repository";

export async function designToCode({
  input,
  framework,
  asset_repository,
}: {
  input: input.IDesignInput;
  framework: config.FrameworkConfig;
  asset_repository?: BaseImageRepositories<string>;
}): Promise<output.ICodeOutput> {
  const token = tokenize(input.design);

  switch (framework.framework) {
    case "react":
      return designToReact({ input: { widget: token }, asset_repository });
    case "flutter":
      return designToFlutter({ input, asset_repository });
  }
  throw `The framework "${framework}" is not supported at this point.`;
  return;
}

export const designTo = {
  react: designToReact,
  vue: designToVue,
  flutter: designToFlutter,
};

export async function designToReact({
  input,
  asset_repository,
}: {
  input: { widget: Widget };
  asset_repository?: BaseImageRepositories<string>;
}): Promise<output.ICodeOutput> {
  await Promise.resolve();
  const reactwidget = toreact.buildReactWidget(input.widget);
  const res = toreact.buildReactApp(reactwidget, {
    template: "cra",
  });

  // ------------------------------------------------------------------------
  // finilize temporary assets
  // this should be placed somewhere else
  if (asset_repository) {
    res.code.raw = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      res.code.raw,
      "grida://assets-reservation/images/",
      await fetch_all_assets(asset_repository)
    );
    res.scaffold.raw = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      res.scaffold.raw,
      "grida://assets-reservation/images/",
      await fetch_all_assets(asset_repository)
    );
  }
  // ------------------------------------------------------------------------

  return res;
}

export async function designToFlutter({
  input,
  asset_repository,
}: {
  input: input.IDesignInput;
  asset_repository?: BaseImageRepositories<string>;
}): Promise<output.ICodeOutput> {
  await Promise.resolve();

  const flutterAppBuild = toflutter.buildApp(input.design);
  const widget = flutterAppBuild?.widget;
  const app =
    widget &&
    toflutter.makeApp({
      widget: widget,
      scrollable: flutterAppBuild.scrollable,
    });

  let widgetCode = widget?.build()?.finalize();
  let rootAppCode = composeAppWithHome(app);
  // ------------------------------------------------------------------------
  // finilize temporary assets
  // this should be placed somewhere else
  if (asset_repository) {
    rootAppCode = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      rootAppCode,
      "grida://assets-reservation/images/",
      await fetch_all_assets(asset_repository)
    );
    widgetCode = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      widgetCode,
      "grida://assets-reservation/images/",
      await fetch_all_assets(asset_repository)
    );
  }
  // ------------------------------------------------------------------------

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
