---
title: "Figma Box Shadow"
version: 0.1.0
revision: 1
---

# Figma Box Shadow

The box shadow is handled as the shadow of the effect from figma.

![](https://static.figma.com/uploads/9def6cce093b164306328ee228028155d13d72d0)

[figma DropShadowEffect](https://www.figma.com/plugin-docs/api/Effect/#dropshadoweffect)

## drop-shadow

**css**

- [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)

**syntax**

offset-x | offset-y | color

offset-x | offset-y | blur-radius | color

offset-x | offset-y | blur-radius | spread-radius | color

inset | offset-x | offset-y | color

Any number of shadows, separated by commas

```css
box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
```

**flutter**

- [BoxShadow](https://api.flutter.dev/flutter/painting/BoxShadow-class.html)

```dart
BoxShadow(
  offset: Offset(10.0, 10.0),
  blurRadius: 3.0,
  color: Color.fromARGB(255, 0, 0, 0),
  spreadRadius: 5.0,
)
```

## inner-shadow

**cs**

using `inset` keyword

```css
box-shadow: inset 10px 10px red;
```

**flutter**

```dart
<!-- WIP -->
```

### What is spread radius?

ref: fhttps://drafts.csswg.org/css-backgrounds/#spread-distance

WIP
