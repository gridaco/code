# documentation meta

Grida requires certain meta data of the generated tokens (declarations) to keep sync between updated designs and previously genrerated codes. Doc meta allows grida to add comments (hidden doc) to store and read metadatas.

## Doc meta in Markdown format

markdown format docmeta uses html comment format to store hidden metadatas.

Markdown is used on languages listed below. (VSCode well supports markdown in below docstrings.)

- tsdoc
- jsdoc

For example:

```html
<!-- grida.meta.widget_declaration | engine : 20222.1.2 | uri : grida.co/scenes/xxx -->
```

Which can be decoded in json format like below.

```json
// grida.meta.widget_declaration
{
  "engine": "20222.1.2",
  "uri": "grida.co/scenes/xxx"
}
```
