import { input, output, config } from "../proc";
import { tokenize } from "@designto/token";
import { Widget } from "@reflect-ui/core";
import * as toreact from "@designto/react";
import * as tovanilla from "@designto/vanilla";
import * as toflutter from "@designto/flutter";
import {
  fetch_all_assets,
  finalize_temporary_assets_with_prefixed_static_string_keys__dangerously,
} from "@code-features/assets";
import { BaseImageRepositories } from "@design-sdk/core/assets-repository";
import { k } from "@web-builder/core";

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
  const _tokenized_widget_input = { widget: token };
  switch (framework.framework) {
    case "vanilla":
      return designToVanilla({ input: _tokenized_widget_input, asset_config });
    case "react":
      return designToReact({ input: _tokenized_widget_input, asset_config });
    case "flutter":
      return designToFlutter({ input: _tokenized_widget_input, asset_config });
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
    res.code.raw = dangerous_temporary_asset_replacer(res.code.raw, assets);
    res.scaffold.raw = dangerous_temporary_asset_replacer(
      res.scaffold.raw,
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
  input: { widget: Widget };
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  await Promise.resolve();

  const flutterwidget = toflutter.buildFlutterWidget(input.widget);
  const flutterapp = toflutter.buildFlutterApp(flutterwidget);

  // ------------------------------------------------------------------------
  // finilize temporary assets
  // this should be placed somewhere else
  if (asset_config?.asset_repository && !asset_config.skip_asset_replacement) {
    const assets = await fetch_all_assets(asset_config?.asset_repository);
    flutterapp.scaffold.raw = dangerous_temporary_asset_replacer(
      flutterapp.scaffold.raw,
      assets
    );
    flutterapp.code.raw = dangerous_temporary_asset_replacer(
      flutterapp.code.raw,
      assets
    );
  }
  // ------------------------------------------------------------------------

  return flutterapp;
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
    res.code.raw = dangerous_temporary_asset_replacer(res.code.raw, assets);
    res.scaffold.raw = dangerous_temporary_asset_replacer(
      res.scaffold.raw,
      assets
    );
  }
  // ------------------------------------------------------------------------

  return res;
}

const default_asset_replacement_prefix = "grida://assets-reservation/images/";
const dangerous_temporary_asset_replacer = (r, a) => {
  return finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
    r,
    default_asset_replacement_prefix,
    a,
    { fallback: k.image_smallest_fallback_source_base_64 }
  );
};
