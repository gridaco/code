# Figma Gradient

- [figma paint - gradient paint](https://www.figma.com/plugin-docs/api/Paint/#gradientpaint)
- [css gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)

## Cases

- Gradient fills in Ellipse, Rect, Frame > Standard styles
- Gradient fills in vector path > SVG / PNG
- Complex gradient > SVG / PNG

## Understanding Figma Gradient system - It's not like what you think!

Gradient in figma is bit different on render-styling (css) If you have LinearGradient - `[(black 1) at 0%, (red 0) at 100%]` Representation in css would be `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,0,0) 100%);`, you might think. But this is incorrect.

To match a visually identical gradient, you need to have multiple gradient per colors. (Even if it is in a single fill item)

```css
.single-fill-item {
  background: linear-gradient(90deg, black, transparent), linear-gradient(90deg, rgba(255, 0, 0, 1), transparent);
}
```

**types of gradient**

- linear gradient
- radial gradient
- angular gradient
- diamond gradient

### linear gradient

**css**

- [linear-gradient()](<https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient()>)

`linear-gradient()` css function

```css
background: linear-gradient(45deg, blue, red);
```

> **syntax**
>
> wip

**flutter**

- [LinearGradient()](https://api.flutter.dev/flutter/painting/LinearGradient-class.html)

### radial gradient

**css**

- [radial-gradient()](<https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient()>)

```css
background: radial-gradient(red, blue);
```

**flutter**

- [RadialGradient()](https://api.flutter.dev/flutter/painting/RadialGradient-class.html)

> **gradient paint opacity**
>
> gradient color's opacity \* fill's opacity

> **gradient paint degree**
> WIP

## Note - Fallbacks on complex gradient

> This is a technical issue, we will add support for complex gradient in the future. [Learn More](https://github.com/gridaco/designto-code/issues/78)

Since perfectly providing a visually identical style code is redundant, we provide a fallback on complex gradient. (svg on web, png(optionally) on flutter)

**Fallback cases**

- when gradient position does not starts from (or ends at) 0% or 100%
- when gradient is not linear or radial.
- when not one of the cases
  - n - s (0°) (supported)
  - s - n (180°) (supported)
  - e - w (270°) (supported)
  - w - e (90°) (supported)
  - nw - se (directional) (supported)
  - ne - sw (directional) (supported)
  - sw - ne (directional) (supported)
  - se - nw (directional) (supported)
