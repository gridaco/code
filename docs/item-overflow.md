# Item overflowing scenarios (static, no-scroll)

This is not a document for overflowing layout, a scroll. ([Go here for overflowing layout scroll docs](./overflow-layout-scroll.md))

This document describes how to handle intentionally overflowed items per by frameworks.

This is a good example of the overflowing static example.
![item overflow static intended overflow example design](./assets/item-overflow-static-intended-overflow-example-design.png)

## Web - css

```css
.container {
  background-color: black; /*(visual factor)*/
  overflow: hidden; /* <-- do not scroll overflow */
}

.overflow {
  position: relative;
  left: -10%; /* <-- overflow static position */
  margin: 10px; /*(visual factor)*/
  background-color: red; /*(visual factor)*/
  width: 1000px; /* <-- overflowing size */
}
```

## Flutter

**Using OverflowBox**

```dart
OverflowBox(
    minWidth: 0.0,
    minHeight: 0.0,
    maxWidth: double.infinity,
    maxHeight: double.infinity,
    alignment: Alignment.center,    /* <--- we can dynamically align to match the design's snapshot */
    child:
        Container(
            color: red,
            width: 4000,            /* <--- overflowing width */
            height: 50
        )
);
```

_References_

- [Flutter#OverflowBox](https://api.flutter.dev/flutter/widgets/OverflowBox-class.html)
