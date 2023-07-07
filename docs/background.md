# background (fills)

Background handling is quite straightforward, but there are some edge cases that we need to consider.

## Considerations

### A. Multiple Backgrounds

While CSS supports having multiple background in a single widget, Flutter doesn't.

### B. Mixed Types

### C. Background Image `transform`

Neither CSS nor Flutter supports applying `transform` to a background image. We have to transform the widget tree to properly render it, wrapping the ImageWidget with .

### D. Video Background Image

Using Image as a background in a single widget is not supported in all major frameworks. we have to Transform the widget tree to stack the video as a background to properly render it.

### E. Tree Transformation

### Related Documents

- [Multiple Background Images](./background-multiple-images.md)

## Tokenization

Factors to consider

- does background image has opacity?
- does background image has transform?
- does background image has filter?
- does background image has rotation?
- does background image has scale factor for tile mode?

| Count | Children (n) | Type         | Has Image | Has Video | Image Transform | Image Filter | Composition                   | Token Tree                      | option                                   | Notes                                                                                                                                              |
| ----- | ------------ | ------------ | --------- | --------- | --------------- | ------------ | ----------------------------- | ------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`   | `*`          | -            | -         | -         | -               | -            | -                             | -                               | -                                        | -                                                                                                                                                  |
| `1`   | `*`          | `color`      | -         | -         | -               | -            | `background-color(node)`      | `Container()`                   | -                                        | If node has single fill with color, use standard background color handling                                                                         |
| `1`   | `*`          | `gradient`   | -         | -         | -               | -            | `background-gradient(node)`   | `Container()`                   | -                                        | If node has single fill with gradient, use standard background color handling                                                                      |
| `1`   | `*`          | `image`      | `true`    | -         | `false`         | `false`      | `background-image(node)`      | `Container()`                   | -                                        | If node has single fill with image, use standard background image handling                                                                         |
| `1`   | `0`          | `image`      | `true`    | -         | `false`         | `false`      | `image()`                     | `Image()`                       | `{ use_image_widget_if_possible: true }` | Optionally, If node has single fill with image, with no children, no filter nor transform, it can be transformed to image widget                   |
| `1`   | `*`          | `video`      | -         | `true`    | -               | -            | `background-video`            | `Stack(Video(), Container())`   | -                                        | If node has single fill with video, use tree transformation to put video under new `Stack` as `Video` along with the node itself as a `Container`  |
| `>1`  | `*`          | `color[]`    | -         | -         | -               | -            | `[background-color(node)]`    | `Container(...)`                | -                                        | -                                                                                                                                                  |
| `>1`  | `*`          | `gradient[]` | -         | -         | -               | -            | `[background-gradient(node)]` | `Container(...)`                | -                                        | -                                                                                                                                                  |
| `>1`  | `*`          | `image[]`    | `true`    | -         | `false`         | `false`      | `[background-image(node)]`    | `Container(...)`                | -                                        | -                                                                                                                                                  |
| `>1`  | `0`          | `image[]`    | `true`    | -         | `false`         | `false`      | `Stack(image()[])`            | `Image()`                       | `{ use_image_widget_if_possible: true }` | Optionally, If node has multiple image fills, with no children, no filter nor transform, it can be transformed to image widget                     |
| `>1`  | `*`          | `video[]`    | -         | `true`    | -               | -            | `background-video-many`       | `Stack(Video()[], Container())` | -                                        | If node has multiple video fills, use tree transformation to put videos under new `Stack` as `Video[]` along with the node itself as a `Container` |
| `>1`  | `*`          | `mixed`      | `false`   | `false`   | -               | -            | `background(node)`            | `Container(...)`                | -                                        | If node has multiple mixed fills, but not image or video, use the standard background-image and background-gradient                                |
| `>1`  | `*`          | `mixed`      | `false`   | `false`   | -               | -            | `background(node)`            | `Container(...)`                | -                                        | If node has multiple mixed fills, but not image or video, use the standard background-image and background-gradient                                |
