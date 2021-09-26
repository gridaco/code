import { input, output, config } from "../proc";
import { tokenize } from "@designto/token";
import { Widget } from "@reflect-ui/core";
import * as toreact from "@designto/react";
import * as tovanilla from "@designto/vanilla";
import * as toflutter from "@designto/flutter";
import { composeAppWithHome } from "@bridged.xyz/flutter-builder";
import {
  fetch_all_assets,
  finalize_temporary_assets_with_prefixed_static_string_keys__dangerously,
} from "@code-features/assets";
import { BaseImageRepositories } from "@design-sdk/core/assets-repository";

interface AssetsConfig {
  asset_repository?: BaseImageRepositories<string>;
  skip_asset_replacement?: boolean;
}

export async function designToCode({
  input,
  framework,
  asset_config,
}: {
  input: input.IDesignInput;
  framework: config.FrameworkConfig;
  asset_config: AssetsConfig;
}): Promise<output.ICodeOutput> {
  const token = tokenize(input.design);

  switch (framework.framework) {
    case "vanilla":
      return designToVanilla({ input: { widget: token }, asset_config });
    case "react":
      return designToReact({ input: { widget: token }, asset_config });
    case "flutter":
      return designToFlutter({ input, asset_config });
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
  asset_config,
}: {
  input: { widget: Widget };
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  const reactwidget = toreact.buildReactWidget(input.widget);
  const res = toreact.buildReactApp(reactwidget, {
    template: "cra",
  });

  // ------------------------------------------------------------------------
  // finilize temporary assets
  // this should be placed somewhere else
  if (asset_config?.asset_repository && !asset_config.skip_asset_replacement) {
    const assets = await fetch_all_assets(asset_config.asset_repository);
    res.code.raw = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      res.code.raw,
      default_asset_replacement_prefix,
      assets
    );
    res.scaffold.raw = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      res.scaffold.raw,
      default_asset_replacement_prefix,
      assets
    );
  }
  // ------------------------------------------------------------------------

  return res;
}

export async function designToFlutter({
  input,
  asset_config,
}: {
  input: input.IDesignInput;
  asset_config?: AssetsConfig;
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
  if (asset_config?.asset_repository && !asset_config.skip_asset_replacement) {
    const assets = await fetch_all_assets(asset_config?.asset_repository);
    rootAppCode = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      rootAppCode,
      default_asset_replacement_prefix,
      assets
    );
    widgetCode = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      widgetCode,
      default_asset_replacement_prefix,
      assets
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

export async function designToVanilla({
  input,
  asset_config,
}: {
  input: { widget: Widget };
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  const vanillawidget = tovanilla.buildVanillaWidget(input.widget);
  const res = tovanilla.buildVanillaFile(vanillawidget);

  // ------------------------------------------------------------------------
  // finilize temporary assets
  // this should be placed somewhere else
  if (asset_config?.asset_repository && !asset_config.skip_asset_replacement) {
    const assets = await fetch_all_assets(asset_config.asset_repository);
    res.code.raw = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      res.code.raw,
      default_asset_replacement_prefix,
      assets
    );
    res.scaffold.raw = finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
      res.scaffold.raw,
      default_asset_replacement_prefix,
      assets
    );
  }
  // ------------------------------------------------------------------------

  return res;
}

const default_asset_replacement_prefix = "grida://assets-reservation/images/";
