import * as express from "express";
import * as useragent from "express-useragent";
import { designToCode, Result } from "@designto/code";
import { config } from "@designto/config";
import { preview_presets } from "@grida/builder-config-preset";

const build_config = {
  ...config.default_build_configuration,
  disable_components: true,
};
preview_presets.default;

const app = express();

app.get("/", (req, res) => {
  res.redirect("https://grida.co");
});

app.get("files/:filekey", (req, res) => {
  const { filekey } = req.params;
  console.log("filekey", filekey);

  designToCode({
    input: null, //_input,
    build_config: build_config,
    framework: preview_presets.default,
    asset_config: {
      skip_asset_replacement: false,
      asset_repository: null, // MainImageRepository.instance,
      custom_asset_replacement: {
        type: "static",
        resource:
          "https://bridged-service-static.s3.us-west-1.amazonaws.com/placeholder-images/image-placeholder-bw-tile-100.png",
      },
    },
  })
    .then(res.send)
    .catch(res.send);
});

app.use(useragent.express());

export { app };
