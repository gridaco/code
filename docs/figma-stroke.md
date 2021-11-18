---
title: "Figma stroke"
version: 0.1.0
revision: 1
---

# Figma stroke

[figma api docs #strokestyleid](https://www.figma.com/plugin-docs/api/StickyNode/#strokestyleid)

figma stroke

**css**

[border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)

```css
border: 1px solid #000;
/* or */
border-top: 1px solid red;
```

> **syntax**
>
> style
>
> width | style
>
> style | color
>
> width | style | color

**flutter**

[Border()](https://api.flutter.dev/flutter/painting/Border-class.html)

```dart
Border(
  top: BorderSide(width: 1.0, color: Colors.black,
)
// or
Border.all(width: 1.0, color: Colors.black)
```

# Figma multi strokes

Fimga storkes can be a array just like fills. as well as gradient & image as a paint.

## web - css

**Multiple border tricks**

- https://css-tricks.com/snippets/css/multiple-borders/
