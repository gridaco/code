export default class VanillaTextFitPlugin {
  //
  constructor(options: VanillaTextFitPluginOptions) {
    //
    //
  }
}

type VanillaTextFitPluginOptions = FixedElementVanillaTextFitPluginOption;

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
