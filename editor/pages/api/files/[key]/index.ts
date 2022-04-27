import { designToCode, Result } from "@designto/code";
import { config } from "@designto/config";
import { preview_presets } from "@grida/builder-config-preset";
import assert from "assert";
import { fetch } from "@design-sdk/figma-remote";
import { DesignInput } from "@designto/config/input";
import {
  ImageRepository,
  MainImageRepository,
} from "@design-sdk/core/assets-repository";
import { RemoteImageRepositories } from "@design-sdk/figma-remote/lib/asset-repository/image-repository";

const build_config = {
  ...config.default_build_configuration,
  disable_components: true,
};

export default async function handler(req, res) {
  const { key, node } = req.query;
  const { authorization } = req.headers as { authorization: string };
  const { framework } = req.body;

  if (!authorization) {
    res.status(401).json({ status: "unauthorized" });
    return;
  }

  if (!authorization.startsWith("Bearer ")) {
    res.status(401).json({ error: "Invalid authorization header" });
    return;
  }

  if (!node) {
    res.status(400).json({
      status: "error",
      error: "node is required add ?node=<node> to the request",
    });
  }

  const _access_token = authorization.substring(7); // "Bearer "
  const auth = {
    // accessToken: _access_token,
    personalAccessToken: _access_token,
  };

  let figma;
  try {
    figma = await fetch.fetchTargetAsReflect({
      file: key,
      node: node,
      auth: auth,
    });
  } catch (e) {
    res.status(500).json({ status: "error", error: e.message });
    return;
  }

  MainImageRepository.instance = new RemoteImageRepositories(key, {
    authentication: auth,
  });

  MainImageRepository.instance.register(
    new ImageRepository(
      "fill-later-assets",
      "grida://assets-reservation/images/"
    )
  );

  designToCode({
    input: DesignInput.fromApiResponse({
      raw: figma.raw,
      entry: figma.reflect,
    }),
    build_config: build_config,
    framework: framework ?? preview_presets.default,
    asset_config: {
      asset_repository: MainImageRepository.instance,
    },
  })
    .then(res.json)
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        status: "error",
        error: e,
      });
    });
}
