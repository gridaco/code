# Figma blur effects

![](https://static.figma.com/uploads/9def6cce093b164306328ee228028155d13d72d0)

- layer blur - blur this layer
- background blur - blur the background behind the layer (filter)

Thankfully, figma does not have multiple blur (same blur). Each only one blur effects can be applied. (hooray 🥳)

The possible combinatons would be,

- none
- layer blur
- background blur
- layer blur + background blur

_References_

- [Figma#BlurEffect](https://www.figma.com/plugin-docs/api/Effect/#blureffect)

## Web - css

- layer blur - [`filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
- background blur - [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [`blur()`](<https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur()>)

**Background blur with `backdrop-filter: blur()`**

```css
backdrop-filter: blur(2px);
```

**Layer blur with `filter: blur()`**

```css
filter: blur(4px);
```

## Flutter

<!-- Adding layer / background blur in flutter is little bit more trickier than css -->

- layer blur - [`ImageFiltered`](https://api.flutter.dev/flutter/widgets/ImageFiltered-class.html)
- background blur - [`backdropFilter`](https://api.flutter.dev/flutter/widgets/BackdropFilter-class.html)
- [`ImageFilter.blur()`](https://api.flutter.dev/flutter/dart-ui/ImageFilter/ImageFilter.blur.html)

[`reference`](https://dev.to/boilplate/how-to-blur-in-flutter-5891)

**layer blur with `ImageFiltered`**

```dart
ImageFiltered(
  imageFilter: ImageFilter.blur(sigmaX: 3.0, sigmaY: 3.0),
  child: child
)
```

**background blur with `BackdropFilter`**

```dart
BackdropFilter(
  filter: ImageFilter.blur(sigmaX: 3.0, sigmaY: 3.0),
  child: child
)
```
