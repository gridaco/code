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

Adding layer / background blur in flutter is little bit more trickier than css

```dart
//WIP
```
