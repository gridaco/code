import { JSXElementConfig, WidgetKey } from "@web-builder/core";
import { JSX, JSXAttribute, Snippet } from "coli";
import { ReactWidget } from "..";

export class Button extends ReactWidget {
  constructor({ key }: { key: WidgetKey }) {
    super({ key });
  }

  children = [
    //
  ];

  styleData() {
    return {};
  }

  jsxConfig() {
    return <JSXElementConfig>{
      tag: JSX.identifier("button"),
      attributes: [
        new JSXAttribute(
          "onClick",
          Snippet.fromStatic("() => { alert(`button click`) }")
        ),
      ],
    };
  }
}
