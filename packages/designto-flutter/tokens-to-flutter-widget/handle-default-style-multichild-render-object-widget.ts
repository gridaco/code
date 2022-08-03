import {
  // DefaultStyleSingleChildRenderObjectWidget,
  // DefaultStyleMultiChildRenderObjectWidget,
  IDefaultStyleWidget,
} from "@reflect-ui/core";

/**
 * the reflect core token definition is mix of flutter widgets and web standards.
 * some widgets on flutter is redundant, such as Padding and SizedBox. (which can simply be done on css by properties)
 * this is why we need to extract certain properties from reflect core widgets, and re-compose them to flutter widget tree.
 *
 * @deprecated - this function is not ready yet.
 * @param widget
 */
export function handle_default_style_multichild_render_object_widget(
  widget: IDefaultStyleWidget
) {
  widget.boxShadow;

  //
}
