import type { IDefaultStyleWidget } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";
import * as painting from "../painting";
import * as rendering from "../rendering";
import * as dartui from "../dart-ui";

// import type { Composer } from ".";
/**
 * the reflect core token definition is mix of flutter widgets and web standards.
 * some widgets on flutter is redundant, such as Padding and SizedBox. (which can simply be done on css by properties)
 * this is why we need to extract certain properties from reflect core widgets, and re-compose them to flutter widget tree.
 *
 * @param widget
 */
export function handle_default_style_multichild_render_object_widget(
  flutter_widget: flutter.Widget,
  core_widget: core.Widget
  // composer: Composer
): flutter.Widget {
  if (
    // these widget does not needs to be handled.
    flutter_widget instanceof flutter.ButtonStyleButton ||
    flutter_widget instanceof flutter.ProgressIndicator ||
    flutter_widget instanceof flutter.Slider ||
    flutter_widget instanceof flutter.TextField ||
    flutter_widget instanceof flutter.Checkbox
  ) {
    return flutter_widget;
  }

  const {
    boxShadow,
    background,
    border,
    borderRadius,
    height,
    width,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    margin,
    padding,
  } = core_widget as IDefaultStyleWidget;

  let target: flutter.Widget = flutter_widget;

  const _only_padding = check(
    padding,
    ...[background, margin, boxShadow, border, borderRadius]
  );

  if (_only_padding) {
    return apply_padding(target, padding);
  }

  if (boxShadow) {
    //
  }

  if (padding || margin || background) {
    return new flutter.Container({
      child: target,
      padding: padding && painting.edgeinsets(padding),
      margin: margin && painting.edgeinsets(margin),
      // decoration
    });
  }

  return target;
}

const check = (yes, ...nos: Array<any>) => {
  return !!yes && !nos.some((n) => !!n);
};

// injection
// looping

function apply_padding(
  widget: flutter.Widget,
  padding: IDefaultStyleWidget["padding"]
) {
  return new flutter.Padding({
    key: new flutter.Key("[padding]" + widget.key?.value),
    child: widget,
    padding: painting.edgeinsets(padding),
  });
}

function apply_background() {}

function apply_margin() {}
