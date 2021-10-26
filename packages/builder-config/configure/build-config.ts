/**
 * design to code, code gen build configuration
 */
export interface BuildConfiguration {
  /**
   * Forces to Wraps the final output with a OverflowBox - which makes the widget output's overflow to hidden.
   * This is useful for baking a preview for a embedded environment. (grida uses this on assistant's non resizable preview - a scale only preview)
   *
   * @default false
   */
  force_root_widget_fixed_size_no_scroll?: boolean;

  /**
   * if disabled(true), we won't use components as reference to generate component compat code.
   * @default false
   */
  disable_components?: boolean;
}

export const default_build_configuration: BuildConfiguration = {
  force_root_widget_fixed_size_no_scroll: false,
  disable_components: false,
};
