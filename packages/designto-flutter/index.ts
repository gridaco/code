import { Widget } from "@reflect-ui/core";
import { compose } from "./tokens-to-flutter-widget";
import { flutter as config } from "@grida/builder-config";
import * as flutter from "@flutter-builder/flutter";
import { composeAppWithHome } from "@flutter-builder/flutter";
import { makeApp } from "./app";

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
  const rootAppCode =
    "// ignore_for_file: sort_child_properties_last, prefer_const_constructors, prefer_const_literals_to_create_immutables" +
    "\n" +
    composeAppWithHome(app);

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
  return compose(widget);
}
