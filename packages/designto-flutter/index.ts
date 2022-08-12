import { Widget } from "@reflect-ui/core";
import { compose } from "./tokens-to-flutter-widget";
import { flutter as config } from "@grida/builder-config";
import * as flutter from "@flutter-builder/flutter";
import { composeAppWithHome } from "@flutter-builder/flutter";
import { makeApp } from "./app";
import { nameit, NameCase } from "@coli.codes/naming";
import { WidgetKey } from "@reflect-ui/core";

const import_material = "import 'package:flutter/material.dart';";
const ignore_lint =
  "// ignore_for_file: sort_child_properties_last, prefer_const_constructors, prefer_const_literals_to_create_immutables";
export function buildFlutterApp(
  key: WidgetKey,
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
  const rootAppCode = ignore_lint + "\n" + composeAppWithHome(app);

  return {
    id: p.id,
    name: nameit(key.name, {
      // @ts-ignore
      case: "snake",
    }).name,
    code: {
      raw: composeWidgetClassFile({
        imports: [ignore_lint, import_material],
        className: nameit(key.name, {
          // @ts-ignore
          case: "pascal",
        }).name,
        widgetTree: widgetCode,
      }),
    },
    scaffold: { raw: rootAppCode },
    main: { raw: rootAppCode },
  };
}

export function buildFlutterWidget(widget: Widget) {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }
  return compose(widget);
}

export function composeWidgetClassFile({
  imports,
  className,
  widgetTree,
}: {
  imports: string[];
  className: string;
  widgetTree: string;
}) {
  return `
${imports?.join("\n") ?? ""}

class ${className} extends StatelessWidget {
@override
Widget build(BuildContext context) { return
${widgetTree}
}}
`;
  // return compose(src);
}
