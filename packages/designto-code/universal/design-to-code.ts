import { input, output, config, build } from "../proc";
import { tokenize, wrap } from "@designto/token";
import { Widget } from "@reflect-ui/core";
import * as toReact from "@designto/react";
import * as toPreact from "@designto/preact";
import * as toSolid from "@designto/solid-js";
import * as toReactNative from "@designto/react-native";
import * as toVanilla from "@designto/vanilla";
import * as toFlutter from "@designto/flutter";
import {
  fetch_all_assets,
  finalize_temporary_assets_with_prefixed_static_string_keys__dangerously,
} from "@code-features/assets";
import { BaseImageRepositories } from "@design-sdk/asset-repository";
import { k } from "@web-builder/core";
import {
  default_tokenizer_config,
  TokenizerConfig,
} from "@designto/token/config";
import {
  default_build_configuration,
  FrameworkConfig,
} from "@grida/builder-config";
// import { reusable } from "@code-features/component";
import assert from "assert";
import { debug, debugIf } from "@designto/debugger";

interface AssetsConfig {
  asset_repository?: BaseImageRepositories<string>;
  skip_asset_replacement?: boolean;
  /**
   * this is currently only supported on vanilla framework - for preview.
   */
  custom_asset_replacement?: { type: "static"; resource: string };
}

export type Result = output.ICodeOutput & { widget: Widget } & {
  framework: FrameworkConfig;
};

export type DesignToCodeInput = {
  input: input.IDesignInput;
  framework: config.FrameworkConfig;
  build_config?: config.BuildConfiguration;
  asset_config: AssetsConfig;
};

export async function designToCode({
  input,
  framework: framework_config,
  asset_config,
  build_config = config.default_build_configuration,
}: DesignToCodeInput): Promise<Result> {
  assert(input, "input is required");
  debugIf(
    framework_config.framework !== "vanilla",
    "dev: starting designtocode with user input",
    input,
    framework_config,
    build_config,
    asset_config
  );

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

  /* COMPONENT SUPPORT IS DISABLED.
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
  */

  const _tokenized_widget_input = {
    widget: vanilla_token,
    // reusable_widget_tree: reusable_widget_tree,
  };

  const _extend_result = {
    ..._tokenized_widget_input,
    framework: framework_config,
  };

  switch (framework_config.framework) {
    case "preview":
      return {
        ...(await designToVanillaPreview({
          input: _tokenized_widget_input,
          build_config: build_config,
          vanilla_config: framework_config,
          asset_config: asset_config,
        })),
        ..._extend_result,
      };
    case "vanilla":
      return {
        ...(await designToVanilla({
          input: _tokenized_widget_input,
          build_config: build_config,
          vanilla_config: framework_config,
          asset_config: asset_config,
        })),
        ..._extend_result,
      };
    case "react":
      return {
        ...(await designToReact({
          input: _tokenized_widget_input,
          build_config: build_config,
          react_config: framework_config,
          asset_config: asset_config,
        })),
        ..._extend_result,
      };
    case "react-native":
      return {
        ...(await designToReactNative({
          input: _tokenized_widget_input,
          build_config: build_config,
          reactnative_config: framework_config,
          asset_config: asset_config,
        })),
        ..._extend_result,
      };
    case "preact": {
      return {
        ...(await designToPreact({
          input: _tokenized_widget_input,
          build_config: build_config,
          preact_config: framework_config,
          asset_config: asset_config,
        })),
        ..._extend_result,
      };
    }
    case "flutter":
      return {
        ...(await designToFlutter({
          input: _tokenized_widget_input,
          build_config: build_config,
          flutter_config: framework_config,
          asset_config: asset_config,
        })),
        ..._extend_result,
      };
    case "solid-js":
      return {
        ...(await designToSolid({
          input: _tokenized_widget_input,
          build_config: build_config,
          solid_config: framework_config,
          asset_config: asset_config,
        })),
        ..._extend_result,
      };
  }

  throw `The framework "${
    // @ts-ignore
    framework_config.framework
  }" is not supported at this point.`;
}

export const designTo = {
  react: designToReact,
  reactnative: designToReactNative,
  preact: designToPreact,
  solid: designToSolid,
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
    const reactwidget = toReact.buildReactWidget(input.widget);
    debug("dev::", "final web token composed", {
      input: input.widget,
      reactwidget,
    });

    const res = toReact.buildReactApp(reactwidget, react_config);
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
    return toReact.buildReusableReactApp__Experimental(
      input.reusable_widget_tree
    ) as any;
  }
}

export async function designToReactNative({
  input,
  reactnative_config,
  build_config,
  asset_config,
}: {
  input: { widget: Widget; reusable_widget_tree? };
  reactnative_config: config.ReactNativeFrameworkConfig;
  /**
   * TODO: pass this to tokenizer +@
   */
  build_config: config.BuildConfiguration;
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  const rnWidget = toReactNative.buildReactNativeWidget(input.widget);
  const res = toReactNative.buildReactNativeApp(rnWidget, reactnative_config);
  return res;

  // console.error("designToReactNative is not implemented yet.");
  // return {
  //   code: { raw: "// react-native is not yet supported" },
  //   scaffold: { raw: "// react-native is not yet supported" },
  //   name: "rn app",
  //   id: input.widget.key.id,
  // };
}

export async function designToPreact({
  input,
  preact_config,
  build_config,
  asset_config,
}: {
  input: { widget: Widget; reusable_widget_tree? };
  preact_config: config.PreactFrameworkConfig;
  /**
   * TODO: pass this to tokenizer +@
   */
  build_config: config.BuildConfiguration;
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  const preactWidget = toPreact.buildPreactWidget(input.widget);
  const res = toPreact.buildPreactApp(preactWidget, preact_config);
  return res;
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

  const flutterwidget = toFlutter.buildFlutterWidget(input.widget);
  const flutterapp = toFlutter.buildFlutterApp(flutterwidget, {
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
  throw "not ready";
}

export async function designToSolid({
  input,
  solid_config,
  build_config,
  asset_config,
}: {
  input: { widget: Widget; reusable_widget_tree? };
  solid_config: config.SolidFrameworkConfig;
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
    const reactwidget = toReact.buildReactWidget(input.widget);

    debug("dev::", "final web token composed", {
      input: input.widget,
      reactwidget,
    });

    const res = toSolid.buildSolidApp(reactwidget, solid_config);
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
    throw "Reusable components for solid-js is not ready yet.";
  }
}

export async function designToVanillaPreview({
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
  vanilla_config: config.VanillaPreviewFrameworkConfig;
  asset_config?: AssetsConfig;
}): Promise<output.ICodeOutput> {
  const vanillawidget = toVanilla.buildVanillaWidget(
    input.widget,
    vanilla_config as any as config.VanillaFrameworkConfig
  );
  const res = toVanilla.buildVanillaPreviewFile(vanillawidget, vanilla_config);

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
  const vanillawidget = toVanilla.buildVanillaWidget(
    input.widget,
    vanilla_config
  );
  const res = toVanilla.buildVanillaFile(vanillawidget, vanilla_config);

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
