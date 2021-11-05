# Figma text shadow

The text shadow is handled as the shadow of the effect from figma.

![](https://static.figma.com/uploads/9def6cce093b164306328ee228028155d13d72d0)

[figma DropShadowEffect](https://www.figma.com/plugin-docs/api/Effect/#dropshadoweffect)

[W3C](https://www.w3.org/TR/css-text-decor-4/#propdef-text-shadow)

## drop-shadow

**css**

- [`text-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)

**syntax**

1. offsetX offsetY blurRadius color
2. color offsetX offsetY blurRadius
3. offsetX offsetY color
4. color offsetX offsetY

```css
text-shadow: 1px 1px 2px #ff2;
text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
```

**flutter**

- [`Shadow`](https://api.flutter.dev/flutter/dart-ui/Shadow-class.html)

```dart
Shadow(
  offset: Offset(10.0, 10.0),
  blurRadius: 3.0,
  color: Color.fromARGB(255, 0, 0, 0),
)
```

### inner-shadow

It is not currently supported, and it appears to be replaced with drop-shadow.

## Why text shadow isn't support `spread radius`?

The spread radius, the 4th arg of box shadow, is not supported by text shadow. According to W3C,
It says `geometry of a glyph is not so simple as a box`. It is likely to be added later.
