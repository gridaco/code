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

While..

- `D` stands for declaration
- `I` stands for instanciation

```
- D
  - D
  - I
  - I
    - D
      - I
      - I
  - I
```

```
- D
  - I:D1
  - I
  - I
    - I:D2
- D1
- D2
```

```tsx
const D = (
  <>
    <D1 />
    <I />
    <I>
      <D2 />
      <I />
      <I />
    </I>
  </>
);

const D1 = <></>;

const D2 = (
  <>
    <I />
    <I />
  </>
);
```

There are few ways to handle the input tree like above.

- Iterative declaration: declare required components while looping through the input tree.
- Pre-iteration declarations: declare abstraction with pre-iteration and declare with plain array (non nested)

Pro & Cons:
Iterative declaration is more human like and easy to understand the progress. But this recursive approach can cause unexpected behavior.

Pre iteration has more structure and abstraction, can be also used for multi-file declaration. But this approach is considered non human-like (Not the way human developers think)

## Input Model

```ts
import type { Widget } from "@reflect-ui/core";
type Token = Widget | WidgetDeclarationToken | WidgetInstanciationToken;

type Input = {
  entry: DeclarationToken;
};

abstract class DeclarationToken {}
abstract class InstanciationToken {}

class WidgetDeclarationToken extends DeclarationToken {
  declaration: Widget;
}

class WidgetInstanciationToken extends InstanciationToken {
  instanciation: WidgetDeclarationToken;
}
```
