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
