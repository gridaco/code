---
title: "CSS How to handle multiple background fills"
version: 0.1.0
revision: 1
---

# How to handle multiple background fills

## Definition of `"multiple background fills"`

- one or none active solid fill
- one or more gradient fill above solid fill
- one or more image fill

## Related CSS Properties & Functions

**[color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) & [gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)**

- [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)
- [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
- [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)
- [radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient)
- [repeating-linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient)
- [repeating-radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-radial-gradient)
- [conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient)
- [repeating-conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-conic-gradient)
- [url](https://developer.mozilla.org/en-US/docs/Web/CSS/url)
- element() (not supported yet)
- [image](https://developer.mozilla.org/en-US/docs/Web/CSS/image/image)

**[image](https://developer.mozilla.org/en-US/docs/Web/CSS/image)**

- [background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
- [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
- [background-repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)
- [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)
- [background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)
- [background-clip](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)
- [background-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin)

## Design considerations

What we've considered while building multiple background support for css

- Multiple mixed types - `<color>`, `<gradient>`, and `<image>` - How should we handle them?
- Multiple types with inconsistent transforms - `object-fit`, `object-position`, `background-size`, `background-clip`, `background-origin`
- When to use baked image and when not to.
  - If there are multiple background values with mixed types and inconsistent transforms, it is often better to use baked image for cleaner code, and it's very probable that the box itself works as a artwork
  - When to use baked image as `src` attribute (`<img src="">`) or `background` property

## Possible combinations

single solid fill

```css
._1 {
  background: #fff;
}
._2 {
  background-color: #fff;
}
```

single solid fill with single gradient fill

```css
._1 {
  background-color: #fff;
  background-image: linear-gradient(to bottom, #fff, #fff);
}

._2 {
  background: #fff;
  background-image: linear-gradient(to bottom, #fff, #fff);
}
```

no solid fill with single gradient fill

```css
._1 {
  background: linear-gradient(to bottom, #fff, #fff);
}

._2 {
  background-image: linear-gradient(to bottom, #fff, #fff);
}
```

no solid fill with multiple gradient fill

```css
._1 {
  background: linear-gradient(to bottom, #fff, #fff), linear-gradient(to bottom, #fff, #fff);
}
```

## Image resources management on SSG frameworks

- Next.js (Docs not ready)
