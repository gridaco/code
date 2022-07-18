# Signle file module composition

This directory contains logics & documents for composing a module in a single file (e.g. widget.tsx) having multiple exports.

On web platform, this style **DOES NOT** support importing css files. (.css, .module.css)

## Considerations

- exporting rules

## Example `single-file-multi-widget` module

**Super simple example. - no variables, no conflicting names, no extra styles**

```tsx
import React from "react";

function RootWidget() {
  return (
    <div>
      <Widget1 />
      <Widget2 />
    </div>
  );
}

function Widget1() {
  return <div>widget1 - i have no child</div>;
}

function Widget2() {
  return <div>widget2 - i have no child</div>;
}

export { RootWidget, Widget1, Widget2 };
export default RootWidget;
```

## Abstraction

Let's make the widget names abstract and anonymous for clearer understanding.

```tsx
import React from "react";

function _() {}

function __() {}

function ___() {}

export { _, __, ___ };
export default _;
```
