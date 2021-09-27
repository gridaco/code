# Figma Boolean operation and how to handle it.

> **Theoretically, svg support for boolean operation is possible.** But, we don't support this on remote version of design to code.

Boolean operation is most used when making a vector shape combining rects / circles / and poligons, thus it can also be used with any other node such as image. So the most efficient way to support boolean operation is to making everything boolean as a image snapshot, embeding it as a artwork.

On plugin version, we would still interpret this as a sort of a artwork, but in a svg data form.

https://www.figma.com/plugin-docs/api/BooleanOperationNode/

## TL;DR Falls back to artwork

- svg in plugin
- png in remote
