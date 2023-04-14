import Plugin from "@code-plugin/core";
import { Framework } from "@grida/builder-platform-types";
import type { HtmlIdCssModuleBuilder } from "@web-builder/vanilla/html-css-id-widget";
import { inject } from "./injector";
export default class VanillaTextFitPlugin extends Plugin {
  preset = "@code-plugins/vanilla-textfit";
  name = "VanillaTextFitPlugin";
  options: VanillaTextFitPluginOptions;
  //
  constructor(options: VanillaTextFitPluginOptions) {
    super({
      framework: Framework.vanilla,
    });
    this.options = options;
  }

  apply(context: any): void {
    context.hooks.afterVanillaCSSBundle.tap(this.name, (config) => {
      const builder: HtmlIdCssModuleBuilder = config.builder;

      switch (this.options.strategy) {
        case "width-and-height": {
          inject(
            builder,
            ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"].map(
              (selector) => ({
                selector,
                option: {},
              })
            )
          );
          break;
        }
      }
    });
  }
}

type VanillaTextFitPluginOptions = VanillaTextFitPluginConfig;

type FitOption = {
  /**
   * max font size to be resized in px
   * @default 80
   */
  max: number;

  /**
   * min font size to be resized in px
   * @default 6
   */
  min: number;

  /**
   * if true, textFit will fit text to element width, regardless of text height
   * @default false
   */
  widthOnly: boolean;
};

interface VanillaTextFitPluginConfig {
  strategy: "width-and-height";
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
