# Html image - `<img/>`

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img

## Attributes

This element includes the [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

| name                                                                                                                                          | react            | vue                                                                      | svelte | vanilla          | supported?     |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------ | ------ | ---------------- | -------------- |
| [alt](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt) | `alt`    | `alt`                                                         |        | `alt`    | ✅             |
| [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin) | `crossOrigin` | `crossorigin` |        | `crossorigin` | ✅ |
| [decoding](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-decoding) | `disabled`       | ❌                                                      |        | `decoding` | ✅             |
| [height](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-height) | `form`           | `height`                                                             |        | `height`     | ✅             |
| [intrinsicsize](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-intrinsicsize) | ❌    | ❌                                               |        | `intrinsicsize` | ❌            |
| [ismap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-ismap) | ❌   | `ismap`                                                       |        | `ismap` | ✅             |
| [loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) | `formMethod`     | ❌                                                            |        | `loading` | 🧪 |
| [referrerpolicy](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-referrerpolicy) | `referrerPolicy` | ❌                                                       |        | `referrerpolicy` | ✅             |
| [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) | `sizes`      | ❌                                                                  |        | `sizes`   | ✅             |
| [src](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-src) | `src`        | `src`                                                                |        | `src`        | ✅             |
| [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) | `srcSet`     | `srcset`                                                            |        | `srcset`    | ✅             |
| [width](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-width) | `width` | `width` | | `width` | ✅ |
| [usemap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap) | `useMap` | `usemap` | | `usemap` | ✅ |

> Deprecated attributes are ignored and not listed. (full ver can be found at mdn)



## Vanilla

```html
<img class="fit-picture"
     src="/media/cc0-images/grapefruit-slice-332-332.jpg"
     alt="Grapefruit slice atop a pile of other slices">
```





## React

```tsx
interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string | undefined;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  decoding?: "async" | "auto" | "sync" | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
}
```



## Vue

```vue
<img
     alt="" 
     crossorigin="" 
     height="" 
     ismap 
     src=""
     srcset="" 
     width=""
     usemap="" />
```





## Supported image formats

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#supported_image_formats

- APNG
- AVIF
- GIF
- JPEG
- PNG
- SVG
- WebP
