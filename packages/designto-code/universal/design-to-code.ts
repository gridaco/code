import { input, output, config, build } from "../proc";
import { tokenize, wrap } from "@designto/token";
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
import {
  default_tokenizer_config,
  TokenizerConfig,
} from "@designto/token/config";
import { default_build_configuration } from "@designto/config";
import { reusable } from "@code-features/component";
import assert from "assert";

interface AssetsConfig {
  asset_repository?: BaseImageRepositories<string>;
  skip_asset_replacement?: boolean;
  /**
   * this is currently only supported on vanilla framework - for preview.
   */
  custom_asset_replacement?: { type: "static"; resource: string };
}

export type Result = output.ICodeOutput & { widget: Widget };

export async function designToCode({
  input,
  framework: framework_config,
  asset_config,
  build_config = config.default_build_configuration,
}: {
  input: input.IDesignInput;
  framework: config.FrameworkConfig;
  build_config?: config.BuildConfiguration;
  asset_config: AssetsConfig;
}): Promise<Result> {
  assert(input, "input is required");
  if (process.env.NODE_ENV === "development") {
    if (framework_config.framework == "vanilla") {
    } else {
      console.info(
        "dev: starting designtocode with user input",
        input,
        framework_config,
        build_config,
        asset_config
      );
    }
  }

  // post token processing
  let tokenizer_config: TokenizerConfig = {
    ...default_tokenizer_config,
    id: input.id,
  };
  if (build_config.force_root_widget_fixed_size_no_scroll) {
    tokenizer_config.custom_wrapping_provider = (w, n, d) => {
      if (n.id === input.entry.id) {
        return wrap.withSizedBox(wrap.withOverflowBox(w), {
          width: n.width,
          height: n.height,
        });
      }
      return false;
    };
  }

  if (build_config.disable_detection) {
    tokenizer_config.disable_detection = true;
  }

  if (build_config.disable_flags_support) {
    tokenizer_config.disable_flags_support = true;
  }

  const vanilla_token = tokenize(input.entry, tokenizer_config);

  // post token processing for componentization
  let reusable_widget_tree;
  if (!build_config.disable_components) {
    try {
      reusable_widget_tree = reusable({
        entry: vanilla_token,
        repository: input.repository,
      });
      // TODO: WIP
    } catch (_) {
      console.error("error while building reusable widget tree.", _);
    }
  }

  const _tokenized_widget_input = {
    widget: vanilla_token,
    reusable_widget_tree: reusable_widget_tree,
  };

  switch (framework_config.framework) {
    case "vanilla":
      return {
        ...(await designToVanilla({
          input: _tokenized_widget_input,
          build_config: build_config,
          vanilla_config: framework_config,
          asset_config: asset_config,
        })),
        ..._tokenized_widget_input,
      };
    case "react":
      return {
        ...(await designToReact({
          input: _tokenized_widget_input,
          build_config: build_config,
          react_config: framework_config,
          asset_config: asset_config,
        })),
        ..._tokenized_widget_input,
      };
    case "flutter":
      return {
        ...(await designToFlutter({
          input: _tokenized_widget_input,
          build_config: build_config,
          flutter_config: framework_config,
          asset_config: asset_config,
        })),
        ..._tokenized_widget_input,
      };
  }
  throw `The framework "${framework_config}" is not supported at this point.`;
  return;
}

export const designTo = {
  react: designToReact,
  vue: designToVue,
  flutter: designToFlutter,
};

export async function designToReact({
  input,
  react_config,
  build_config,
  asset_config,
}: {
  input: { widget: Widget; reusable_widget_tree? };
  react_config: config.ReactFrameworkConfig;
  /**
   * TODO: pass this to tokenizer +@
   */
  build_config: config.BuildConfiguration;
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  if (
    build_config.disable_components ||
    // automatically fallbacks if no valid data was passed
    !input.reusable_widget_tree
  ) {
    const reactwidget = toreact.buildReactWidget(input.widget);
    if (process.env.NODE_ENV === "development") {
      console.info("dev::", "final web token composed", {
        input: input.widget,
        reactwidget,
      });
    }

    const res = toreact.buildReactApp(reactwidget, react_config);
    // ------------------------------------------------------------------------
    // finilize temporary assets
    // this should be placed somewhere else
    if (
      asset_config?.asset_repository &&
      !asset_config.skip_asset_replacement
    ) {
      const assets = await fetch_all_assets(asset_config.asset_repository);
      res.code.raw = dangerous_temporary_asset_replacer(res.code.raw, assets);
      res.scaffold.raw = dangerous_temporary_asset_replacer(
        res.scaffold.raw,
        assets
      );
    }
    // ------------------------------------------------------------------------

    return res;
  } else {
    return toreact.buildReusableReactApp__Experimental(
      input.reusable_widget_tree
    ) as any;
  }
}

export async function designToFlutter({
  input,
  asset_config,
  build_config = default_build_configuration,
  flutter_config,
}: {
  input: { widget: Widget };
  asset_config?: AssetsConfig;
  /**
   * TODO: pass this to tokenizer +@
   */
  build_config?: config.BuildConfiguration;
  flutter_config?: config.FlutterFrameworkConfig;
}): Promise<output.ICodeOutput> {
  await Promise.resolve();

  const flutterwidget = toflutter.buildFlutterWidget(input.widget);
  const flutterapp = toflutter.buildFlutterApp(flutterwidget, {
    id: input.widget.key.id,
  });

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
  vanilla_config,
  build_config,
}: {
  input: { widget: Widget };
  /**
   * TODO: pass this to tokenizer +@
   */
  build_config: config.BuildConfiguration;
  vanilla_config: config.VanillaFrameworkConfig;
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  const vanillawidget = tovanilla.buildVanillaWidget(
    input.widget,
    vanilla_config
  );
  const res = tovanilla.buildVanillaFile(vanillawidget, vanilla_config);

  // ------------------------------------------------------------------------
  // finilize temporary assets
  // this should be placed somewhere else
  if (asset_config.custom_asset_replacement) {
    const keys = Object.keys(asset_config.asset_repository.mergeAll());
    res.code.raw = dangerous_custom_static_resource_replacer(
      res.code.raw,
      keys,
      asset_config.custom_asset_replacement.resource
    );
    res.scaffold.raw = dangerous_custom_static_resource_replacer(
      res.scaffold.raw,
      keys,
      asset_config.custom_asset_replacement.resource
    );
  } else {
    if (
      asset_config?.asset_repository &&
      !asset_config.skip_asset_replacement
    ) {
      const assets = await fetch_all_assets(asset_config.asset_repository);
      res.code.raw = dangerous_temporary_asset_replacer(res.code.raw, assets);
      res.scaffold.raw = dangerous_temporary_asset_replacer(
        res.scaffold.raw,
        assets
      );
    }
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

const dangerous_custom_static_resource_replacer = (
  code: string,
  keys: string[],
  staticres: string
) => {
  return finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
    code,
    default_asset_replacement_prefix,
    {
      replacer: (k) => staticres,
      keys,
    },
    { fallback: k.image_smallest_fallback_source_base_64 }
  );
};
