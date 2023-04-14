import Plugin from "@code-plugin/core";
import { Framework } from "@grida/builder-platform-types";
import type { HtmlIdCssModuleBuilder } from "@web-builder/vanilla/html-css-id-widget";
import { inject } from "./injector";
export default class VanillaTextFitPlugin extends Plugin {
  preset = "@code-plugins/vanilla-textfit";
  name = "VanillaTextFitPlugin";
  config: VanillaTextFitPluginConfigs;
  //
  constructor(config: VanillaTextFitPluginConfigs) {
    super({
      framework: Framework.vanilla,
    });
    this.config = config;
  }

  apply(context: any): void {
    context.hooks.afterVanillaCSSBundle.tap(this.name, (config) => {
      const builder: HtmlIdCssModuleBuilder = config.builder;
      switch (this.config.strategy) {
        case "width-and-height": {
          inject(
            builder,
            this.config.strategy,
            ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"].map(
              (selector) => ({
                selector,
                option: {
                  maxFontSize: this.config.option.max,
                  minFontSize: this.config.option.min,
                  reProcess: this.config.option.reProcess,
                },
              })
            )
          );
          break;
        }
      }
    });
  }
}

type VanillaTextFitPluginConfigs = VanillaTextFitPluginWidthAndHeightConfig;

type FitOption = {
  /**
   * max font size to be resized in px
   * @default 80
   */
  max?: number;

  /**
   * min font size to be resized in px
   * @default 6
   */
  min?: number;

  /**
   * if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
   * @default false
   */
  reProcess?: boolean;

  /**
   * if true, textFit will fit text to element width, regardless of text height
   * @default false
   */
  widthOnly?: boolean;
};

interface VanillaTextFitPluginWidthAndHeightConfig {
  strategy: "width-and-height";
  option: Omit<FitOption, "widthOnly">;
}

/**
 * @deprecated
 */
type FixedElementVanillaTextFitPluginOption = {
  /**
   * this only applies to fixed (static) size elements
   */
  mode: "fixied";
} & {
  log: LogLevel;
  include: "*" | QuerySelector[];
  exclude: "*" | QuerySelector[];
} & FitOption;

type QuerySelector = `#${string}` | `.${string}` | string;

type LogLevel = "none" | "error";
