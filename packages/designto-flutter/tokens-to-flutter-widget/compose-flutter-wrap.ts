import * as core from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import * as painting from "../painting";
import * as rendering from "../rendering";
import * as dartui from "../dart-ui";

export function compose_flutter_wrap(
  key: flutter.Key,
  wrap: core.Wrap,
  children: flutter.Widget[]
): flutter.Wrap {
  return new flutter.Wrap({
    // ...wrap,
    direction: painting.axis(wrap.direction),
    alignment: rendering.wrapAlignment(wrap.alignment),
    spacing: wrap.spacing,
    runAlignment: rendering.wrapAlignment(wrap.runAlignment),
    runSpacing: wrap.runSpacing,
    crossAxisAlignment: rendering.wrapCrossAxisAlignment(
      wrap.crossAxisAlignment
    ),
    verticalDirection: painting.verticalDirection(wrap.verticalDirection),
    clipBehavior: dartui.clip(wrap.clipBehavior),
    children: children,
    key: key,
  });
}
