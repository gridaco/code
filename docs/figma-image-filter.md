---
stage: draft
note: image with image filter applyed is not supported atm. see the reason below
---

# Image Filters in Figma and how we handle it

> Note: The Figma's Image Filter implementation is custom and not directly compatible with Image processing standards like CSS Filter. For the accuracy, we have to use exported node image to render this visually as-is. (Yet, exporting image applys to whole node, we can't handle individual fills - it would bake the entier node including other properties and children)

The porperties of `ImageFilters` are,

- `exposure` - _similar to `brightness` in CSS Filter_
- `contrast` - _similar to `contrast` in CSS Filter_
- `saturation` - _similar to `saturate` in CSS Filter_
- `temperature` - _similar to `hue-rotate` in CSS Filter_
- `tint` - _similar to `hue-rotate` in CSS Filter_
- `highlights` - _similar to `brightness` in CSS Filter_
- `shadows` - _similar to `brightness` in CSS Filter_

| Property    | CSS                        | Flutter                                                                                  |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| exposure    | \*`brightness`, `contrast` | N/A                                                                                      |
| contrast    | \*`contrast`               | `ColorFilter`                                                                            |
| saturation  | `saturate`                 | `ColorFilter.matrix([1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1, 0])` |
| temperature | N/A                        | `ColorFilter.matrix([1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1, 0])` |
| tint        | N/A                        | `ColorFilter.matrix([1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1, 0])` |
| highlights  | N/A                        | `ColorFilter.matrix([1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1, 0])` |
| shadows     | N/A                        | `ColorFilter.matrix([1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 1, 0])` |

## CSS

CSS Filter mapped to Figma's Image Filter

| CSS Filter    | Figma's Image Filter       |
| ------------- | -------------------------- |
| `blur`        | N/A (available ine ffects) |
| `brightness`  | `exposure`                 |
| `contrast`    | `contrast`                 |
| `drop-shadow` |                            |
| `grayscale`   |                            |
| `hue-rotate`  |                            |
| `invert`      |                            |
| `opacity`     |                            |
| `saturate`    | `saturation`               |
| `sepia`       |                            |

**`Fimga#ImageFilter#exposure`**

```css
/* Exposure doesn't have a direct equivalent in CSS, 
   but we can use brightness and contrast to mimic this.
   Since CSS doesn't accept negative values for these functions,
   we'll use a value of 0.5 to represent -1, 1 to represent 0, 
   and 1.5 to represent 1. */
img {
  filter: brightness(0.5) contrast(1.5); /* -1 in Figma */
}
img {
  filter: brightness(1) contrast(1); /* 0 in Figma */
}
img {
  filter: brightness(1.5) contrast(0.5); /* 1 in Figma */
}
```

**`Fimga#ImageFilter#contrast`**

```css
/* Contrast in CSS */
img {
  filter: contrast(0); /* -1 in Figma */
}
img {
  filter: contrast(1); /* 0 in Figma */
}
img {
  filter: contrast(2); /* 1 in Figma */
}
```

**`Fimga#ImageFilter#saturation`**

```css
/* Saturation in CSS */
img {
  filter: saturate(0); /* -1 in Figma */
}
img {
  filter: saturate(1); /* 0 in Figma */
}
img {
  filter: saturate(2); /* 1 in Figma */
}
```
