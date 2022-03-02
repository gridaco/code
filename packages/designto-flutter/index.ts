import { Widget } from "@reflect-ui/core";
import { buildFlutterWidgetFromTokens } from "./tokens-to-flutter-widget";
import { flutter as config } from "@designto/config";
import * as flutter from "@flutter-builder/flutter";
import { composeAppWithHome } from "@flutter-builder/flutter";
import { makeApp } from "./make/make-flutter-material-app";

export function buildFlutterApp(
  widget: flutter.Widget,
  p: { id: string }
): config.FlutterComponentOutput {
  const app =
    widget &&
    makeApp({
      widget: widget,
      scrollable: false,
    });

  const widgetCode = widget?.build()?.finalize();
  const rootAppCode = composeAppWithHome(app);

  return {
    id: p.id,
    name: "flutterapp",
    code: { raw: widgetCode },
    scaffold: { raw: rootAppCode },
  };
}

export function buildFlutterWidget(widget: Widget) {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }
  return buildFlutterWidgetFromTokens(widget);
}
