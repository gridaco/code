# Figma line-height

[figma api docs](https://www.figma.com/developers/api#files-types)

figma line-height is separated into three parts: px, %, and auto. auto is the default set when the user does not set line-height.

# css

[`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)

**line-height**

```css
/* px */
line-height: 10px;
/* % */
line-height: 10%;
```

**auto**

If it is auto, it is not specified because it is the default.

# flutter

[`StrutStyle`](https://api.flutter.dev/flutter/painting/StrutStyle-class.html)

[`height`](https://api.flutter.dev/flutter/painting/StrutStyle/height.html)

```dart
Text(
  'Hi!\nWe are Grida!',
  strutStyle: StrutStyle(
    height: 1.2,
  ),
);

```
