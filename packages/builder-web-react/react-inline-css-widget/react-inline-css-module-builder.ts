import { react as react_config } from "@designto/config";
import type { JsxWidget } from "@web-builder/core";

/**
 * CSS In JS Style builder for React Framework
 *
 *
 * css in js is a pattern that allows you to use css as a object in jsx, to property `style`.
 *
 * ```tsx
 * // output be like...
 * <div style={{ color: "red" }}/>
 * ```
 *
 */
export class ReactCssInJSBuilder {
  private readonly entry: JsxWidget;
  readonly config: react_config.ReactInlineCssConfig;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: react_config.ReactInlineCssConfig;
  }) {
    this.entry = entry;
    this.config = config;
  }
}
