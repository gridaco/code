import { MaterialApp, Widget } from "@flutter-builder/flutter";
import { makeScaffold } from "./flutter-scaffold";
import { makeTheme } from "./flutter-theme";

export function makeApp(home: {
  widget: Widget;
  scrollable: boolean;
}): MaterialApp {
  return new MaterialApp({
    title: "app built with grida.co",
    debugShowCheckedModeBanner: false,
    home: Widget.prebuilt(
      wrapWithBuilder(
        makeScaffold(home.widget, home.scrollable).build().finalize()
      )
    ),
    theme: makeTheme(),
  });
}

// this is required, since Theme.of(context) uses context, which wont get effected, if sharing the same root.
function wrapWithBuilder(content): string {
  return `Builder(builder: (BuildContext context){
        return ${content}
    })`;
}
